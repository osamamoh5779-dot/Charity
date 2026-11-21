export const ROUTE_FLAGS = {
  users: "is_users",
  roles: "is_roles",
};

const PAGE_ORDER = ["/activity-log", "/users", "/roles"];

const segment = (path) => path.split("/")[1] ?? "";

export const canOpenPath = (flags, path) => {
  const flag = ROUTE_FLAGS[segment(path)];
  return !flag || flags?.[flag] === true;
};

export const firstAllowedPath = (flags) => PAGE_ORDER.find((p) => canOpenPath(flags, p)) ?? null;
