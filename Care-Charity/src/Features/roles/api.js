import { api, unwrap } from "@/services/http";

function mapRole(raw, detail = raw) {
  const perms = detail?.permissions ?? [];
  return {
    id: raw.id,
    key: raw.name,
    name: raw.display_name,
    description: raw.description ?? "",
    users_count: raw.users_count ?? 0,
    permissions: perms.map((p) => p.name),
    permissionIds: Object.fromEntries(perms.map((p) => [p.name, p.id])),
  };
}

export function rolesListParams({
  search = "",
  showAll = false,
  page = 1,
  limit = 10,
} = {}) {
  const params = { all_data: showAll ? 0 : 1 };
  if (!showAll) Object.assign(params, { page, limit });
  const q = search.trim();
  if (q) params.search = q;
  return params;
}

function mapMeta(meta) {
  if (!meta) return null;
  const totalPages = meta.total_pages ?? meta.last_page ?? 1;
  return {
    total: meta.total ?? 0,
    page: meta.current_page ?? 1,
    perPage: meta.per_page,
    totalPages,
    from: meta.from ?? 0,
    to: meta.to ?? 0,
  };
}

export async function fetchRoles(query, signal) {
  const body = unwrap(
    await api.get("/admin/roles", { params: rolesListParams(query), signal }),
  );
  const rows = Array.isArray(body) ? body : body.data;

  const details = await Promise.all(
    rows.map(
      async (r) =>
        unwrap(await api.get(`/admin/roles/${r.id}`, { signal })).role,
    ),
  );
  return {
    roles: rows.map((r, i) => mapRole(r, details[i])),
    flags: body.permissions ?? {},
    meta: Array.isArray(body) ? null : mapMeta(body.meta),
  };
}

export async function createRole({ key, name, description, ids }) {
  const res = await api.post("/admin/roles", {
    name: key,
    display_name: name,
    description,
    permissions: ids,
  });
  return mapRole(unwrap(res).role);
}

export async function updateRole({
  role,
  name = role.name,
  description = role.description,
  ids,
}) {
  const res = await api.put(`/admin/roles/${role.id}`, {
    name: role.key,
    display_name: name,
    description,
    ...(ids && { permissions: ids }),
  });
  return mapRole(unwrap(res).role);
}

export async function deleteRole(id) {
  await api.delete(`/admin/roles/${id}`);
}

export async function fetchPermissions(signal) {
  return unwrap(await api.get("/admin/permissions", { signal }));
}
