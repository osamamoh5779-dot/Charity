import { api } from "@/services/http";
import { clearTokens, getDeviceId, setTokens } from "@/services/tokenStore";
import { DASHBOARD_USER_TYPES, PUSH_TOKEN_PLACEHOLDER } from "./constants/auth";

export class NotDashboardUserError extends Error {
  constructor() {
    super("This account cannot open the dashboard");
    this.name = "NotDashboardUserError";
    this.code = "NOT_DASHBOARD_USER";
  }
}

export async function fetchProfile() {
  const { data } = await api.get("/public/profile");
  return data?.data?.user ?? null;
}

export async function changeLanguage(locale) {
  await api.post("/public/profile/change/lang", { locale });
}

export async function fetchFlags() {
  const { data } = await api.get("/public/profile/permissions");
  return Object.fromEntries(
    Object.entries(data?.data ?? {}).map(([flag, value]) => [
      flag,
      value === true,
    ]),
  );
}

async function revoke(accessToken) {
  try {
    await api.post(
      "/public/logout",
      { imei: getDeviceId() },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        skipAuth: true,
        skipAuthRefresh: true,
        timeout: 8_000,
      },
    );
  } catch {
    void 0;
  }
}

export async function signIn({ identifier, password, remember }) {
  const { data } = await api.post(
    "/public/login",
    {
      email: identifier,
      password,
      imei: getDeviceId(),
      token: PUSH_TOKEN_PLACEHOLDER,
      device_type: "website",
    },
    { skipAuth: true, skipAuthRefresh: true },
  );

  const payload = data?.data;
  const user = payload?.data;
  const accessToken = payload?.access_token;
  const refreshToken = payload?.refresh_token;

  if (
    !user ||
    typeof accessToken !== "string" ||
    typeof refreshToken !== "string"
  ) {
    throw new Error("Unexpected response from the server.");
  }

  if (!DASHBOARD_USER_TYPES.includes(user.type)) {
    await revoke(accessToken);
    throw new NotDashboardUserError();
  }

  setTokens({ accessToken, refreshToken }, { remember });

  try {
    const flags = await fetchFlags();
    return { user, flags };
  } catch (error) {
    await revoke(accessToken);
    clearTokens();
    throw error;
  }
}

export async function signOut() {
  await api.post("/public/logout", { imei: getDeviceId() }, { timeout: 8_000 });
}
