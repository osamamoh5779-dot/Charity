import { SUPER_ADMIN_KEY } from "./constants";

 
export const canGrant = (role, module, perm) =>
  role.key === SUPER_ADMIN_KEY || !(module.superAdminOnly || perm.superAdminOnly);

export const countPermissions = (modules) => modules.reduce((n, m) => n + m.permissions.length, 0);
