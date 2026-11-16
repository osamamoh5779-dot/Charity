import { api } from "@/services/http";

export function mapRole(raw) {
  return {
    ...raw,
    permissions: raw.permissions ?? [],
    locked: !!raw.is_system,
  };
}

export async function fetchRoles(signal) {
  const { data } = await api.get("/roles", { signal });
  return data.data.map(mapRole);
}

export async function createRole(payload) {
  const { data } = await api.post("/roles", payload);
  return mapRole(data.data);
}

export async function saveRolePermissions(id, permissions) {
  const { data } = await api.put(`/roles/${id}/permissions`, { permissions });
  return mapRole(data.data);
}

export async function updateRole(id, payload) {
  const { data } = await api.patch(`/roles/${id}`, payload);
  return mapRole(data.data);
}
