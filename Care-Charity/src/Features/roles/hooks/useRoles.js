import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useLanguage from "@/hooks/useLanguage";
import { createRole, deleteRole, fetchRoles, updateRole } from "../api";

const EMPTY = [];

export const ALL_ROLES = Object.freeze({ search: "", showAll: true });

export default function useRoles(filters, { enabled = true } = {}) {
  const language = useLanguage();
  const { search, showAll, page, limit } = filters;
  const params = showAll
    ? { search, showAll }
    : { search, showAll, page, limit };

  const query = useQuery({
    queryKey: ["roles", "list", params, language],
    queryFn: ({ signal }) => fetchRoles(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60_000,
    enabled,
  });

  return {
    roles: query.data?.roles ?? EMPTY,
    flags: query.data?.flags ?? {},
    meta: query.data?.meta ?? null,
    loading: query.isPending,
    stale: query.isPlaceholderData,
    fetching: query.isFetching,
    error: query.isError ? query.error.message : "",
    reload: () => query.refetch(),
  };
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateRole,
    onSuccess: () =>
      Promise.all([
        qc.invalidateQueries({ queryKey: ["roles"] }),
        qc.invalidateQueries({ queryKey: ["users"] }),
      ]),
  });
}

export function useSaveRolePermissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ role, ids }) => updateRole({ role, ids }),
    onSuccess: (_saved, { role, keys, idByKey }) => {
      const permissionIds = Object.fromEntries(
        keys.map((k) => [k, idByKey[k]]),
      );
      qc.setQueriesData({ queryKey: ["roles", "list"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          roles: old.roles.map((r) =>
            r.id === role.id ? { ...r, permissions: keys, permissionIds } : r,
          ),
        };
      });
      qc.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roles"] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
