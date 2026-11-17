import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRole, fetchRoles, saveRolePermissions, updateRole } from "../api";

const EMPTY = [];

 
export default function useRoles() {
  const query = useQuery({
    queryKey: ["roles"],
    queryFn: ({ signal }) => fetchRoles(signal),
    staleTime: 5 * 60_000,  
  });

  return {
    roles: query.data ?? EMPTY,
    loading: query.isPending,
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
    mutationFn: ({ id, ...payload }) => updateRole(id, payload),
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
    mutationFn: ({ id, permissions }) => saveRolePermissions(id, permissions),
    onSuccess: (role) => {
      
      qc.setQueryData(["roles"], (list) => list?.map((r) => (r.id === role.id ? { ...r, ...role } : r)));
      qc.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
