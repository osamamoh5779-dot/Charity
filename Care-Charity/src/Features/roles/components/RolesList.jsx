import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { MODULES } from "../constants";
import { countPermissions } from "../permissions";
import RoleCard from "./RoleCard";
import RoleFormModal from "./RoleFormModal";

export default function RolesList({ roles, loading, error, onRetry }) {
  const [dialog, setDialog] = useState(null);
  const [newRoleId, setNewRoleId] = useState(null);
  const closeDialog = useCallback(() => setDialog(null), []);

  const openId = newRoleId ?? roles.find((r) => !r.locked)?.id;

  const editRole = useCallback((role) => setDialog({ type: "role", role }), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="m-0 text-sm font-medium text-ink-secondary">
          {loading ?? "Loading roles…"}
        </p>
        <Button
          variant="secondary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setDialog({ type: "role", role: null })}
        >
          New Role
        </Button>
      </div>

      {loading ? (
        <div className="space-y-5" aria-busy="true">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center shadow-xl">
          <p className="m-0 text-sm font-medium text-ink">
            Couldn't load roles
          </p>
          <p className="mb-0 mt-1 text-xs text-ink-secondary">{error}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              modules={MODULES}
              defaultOpen={role.id === openId}
              onEdit={editRole}
            />
          ))}
        </div>
      )}

      <RoleFormModal
        role={dialog?.type === "role" ? dialog.role : undefined}
        roles={roles}
        totalPermissions={countPermissions(MODULES)}
        onClose={closeDialog}
        onCreated={(role) => setNewRoleId(role.id)}
      />
    </div>
  );
}
