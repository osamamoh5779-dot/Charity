import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  hasRefreshToken,
  setTokens,
} from "./tokenStore";
import { emitSessionExpired } from "./sessionEvents";
import { getLanguage } from "@/utils/language";

const baseURL = import.meta.env.VITE_API_URL ?? "/api/v1";

export const api = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
});

const bare = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
  timeout: 15_000,
});

export const unwrap = (res) => res.data.data;

export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpiredError";
  }
}

export const isAuthFailure = (error) =>
  error instanceof SessionExpiredError ||
  [401, 403].includes(error?.response?.status);

function describe(error) {
  const { response } = error;
  const status = response?.status;
  const fields = status === 422 ? response.data?.errors : undefined;
  error.fieldErrors = fields;
  error.message = !status
    ? "Network error, check your connection."
    : status === 429
      ? "Too many attempts, please try again later."
      : status >= 500
        ? "Server error, please try again."
        : fields
          ? (Object.values(fields)[0]?.[0] ?? "Please check the form.")
          : (response.data?.message ?? `Request failed (${status})`);
  return error;
}

let inflightRefresh = null;

async function requestNewTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new SessionExpiredError();

  const { data } = await bare.post("/public/refresh", null, {
    headers: { Authorization: `Bearer ${refreshToken}`, lang: getLanguage() },
  });

  const payload = data?.data;
  if (
    typeof payload?.access_token !== "string" ||
    typeof payload?.refresh_token !== "string"
  ) {
    throw new SessionExpiredError();
  }

  setTokens({
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
  });
  return payload.access_token;
}

export function refreshSession() {
  if (!inflightRefresh) {
    const run = () => requestNewTokens();
    const job = globalThis.navigator?.locks
      ? globalThis.navigator.locks.request("we-care-auth-refresh", run)
      : run();
    inflightRefresh = Promise.resolve(job).finally(() => {
      inflightRefresh = null;
    });
  }
  return inflightRefresh;
}

api.interceptors.request.use((config) => {
  if (!config.headers.has("lang")) config.headers.set("lang", getLanguage());

  const token = getAccessToken();
  if (token && !config.skipAuth && !config.headers.has("Authorization")) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    const config = error.config;
    const canRefresh =
      error.response?.status === 401 &&
      config &&
      !config.skipAuthRefresh &&
      !config._retried &&
      hasRefreshToken();

    if (!canRefresh) return Promise.reject(describe(error));

    config._retried = true;

    const sentWith = config.headers?.get?.("Authorization");
    const current = getAccessToken();
    const alreadyRefreshed =
      Boolean(current) && sentWith !== `Bearer ${current}`;

    if (!alreadyRefreshed) {
      try {
        await refreshSession();
      } catch (refreshError) {
        if (isAuthFailure(refreshError)) {
          clearTokens();
          emitSessionExpired();
        }
        return Promise.reject(describe(error));
      }
    }

    config.headers.delete("Authorization");
    return api(config);
  },
);

export const mockApi = axios.create({
  baseURL: "/api",
  headers: { Accept: "application/json" },
});
mockApi.interceptors.response.use(
  (res) => res,
  (error) =>
    axios.isCancel(error)
      ? Promise.reject(error)
      : Promise.reject(describe(error)),
);
