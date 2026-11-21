
const REFRESH_KEY = "we-care.refresh_token";
const DEVICE_KEY = "we-care.device_id";

const LEGACY = { access: "care.access", refresh: "care.refresh", imei: "care.imei" };

let accessToken = null;

const read = (storage, key) => {
  try {
    return window[storage].getItem(key);
  } catch {
    return null;
  }
};
const write = (storage, key, value) => {
  try {
    window[storage].setItem(key, value);
  } catch {
    void 0;
  }
};
const remove = (storage, key) => {
  try {
    window[storage].removeItem(key);
  } catch {
    void 0;
  }
};

function migrateLegacy() {
  const legacyImei = read("localStorage", LEGACY.imei);
  if (legacyImei && !read("localStorage", DEVICE_KEY)) write("localStorage", DEVICE_KEY, legacyImei);
  remove("localStorage", LEGACY.access);
  remove("localStorage", LEGACY.refresh);
  remove("localStorage", LEGACY.imei);
}
migrateLegacy();

export const getAccessToken = () => accessToken;

export const getRefreshToken = () =>
  read("sessionStorage", REFRESH_KEY) ?? read("localStorage", REFRESH_KEY);

export const hasRefreshToken = () => Boolean(getRefreshToken());

export function setTokens({ accessToken: access, refreshToken: refresh }, { remember } = {}) {
  accessToken = access;

  const useLocal =
    remember === undefined ? !read("sessionStorage", REFRESH_KEY) : Boolean(remember);

  remove(useLocal ? "sessionStorage" : "localStorage", REFRESH_KEY);
  write(useLocal ? "localStorage" : "sessionStorage", REFRESH_KEY, refresh);
}

export function clearTokens() {
  accessToken = null;
  remove("sessionStorage", REFRESH_KEY);
  remove("localStorage", REFRESH_KEY);
}

function randomId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getDeviceId() {
  let id = read("localStorage", DEVICE_KEY);
  if (!id) {
    id = `dashboard-${randomId()}`;
    write("localStorage", DEVICE_KEY, id);
  }
  return id;
}
