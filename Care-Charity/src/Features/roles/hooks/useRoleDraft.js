import { useCallback, useMemo, useState } from "react";
import { useSaveRolePermissions } from "./useRoles";

 
export default function useRoleDraft(role) {
  const [changes, setChanges] = useState({});
  const { mutate, reset, isPending, isError, error } = useSaveRolePermissions();

   
  const enabled = useMemo(() => {
    const set = new Set(role.permissions);
    for (const [key, on] of Object.entries(changes)) on ? set.add(key) : set.delete(key);
    return set;
  }, [role.permissions, changes]);

  const dirty = useMemo(
    () => Object.entries(changes).some(([key, on]) => role.permissions.includes(key) !== on),
    [role.permissions, changes],
  );

   
  const change = useCallback(
    (keys, on) => {
      reset();
      setChanges((c) => ({ ...c, ...Object.fromEntries(keys.map((k) => [k, on])) }));
    },
    [reset],
  );

  const discard = useCallback(() => {
    reset();
    setChanges({});
  }, [reset]);

  const submit = () => mutate({ id: role.id, permissions: [...enabled] }, { onSuccess: () => setChanges({}) });

  return { enabled, dirty, saving: isPending, error: isError ? error.message : "", change, discard, submit };
}
