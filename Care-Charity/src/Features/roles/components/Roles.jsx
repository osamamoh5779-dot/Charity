import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import useCatalog from "../hooks/useCatalog";
import useRoleFilters from "../hooks/useRoleFilters";
import useRoles, { ALL_ROLES } from "../hooks/useRoles";
import { countPermissions } from "../permissions";
import RoleFormModal from "./RoleFormModal";
import RolesList from "./RolesList";
import { useToast } from "@/hooks/useToast";

export default function Roles() {
  const filters = useRoleFilters();
  const list = useRoles(filters.query);
  const modules = useCatalog();
  const toast = useToast();

  const [formRole, setFormRole] = useState(undefined);
  const [newRoleId, setNewRoleId] = useState(null);
  const closeForm = useCallback(() => setFormRole(undefined), []);
  const openCreate = useCallback(() => setFormRole(null), []);

  const everyRole = useRoles(ALL_ROLES, { enabled: formRole !== undefined });
  const formRoles = everyRole.roles.length ? everyRole.roles : list.roles;

  const { clearSearch } = filters;
  const handleCreated = useCallback(
    (role) => {
      setNewRoleId(role.id);
      clearSearch();
      toast.success(
        "Role created",
        `"${role.name}" is ready. Fine-tune its permissions on its card.`,
      );
    },
    [clearSearch, toast],
  );
  const openId = newRoleId ?? list.roles[0]?.id;

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        breadcrumb={["System", "Roles & Permissions"]}
        title="Roles & Permissions"
        description="Define roles and control what each one is allowed to do across the platform"
        actions={
          list.flags.is_store && (
            <Button
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={openCreate}
            >
              New Role
            </Button>
          )
        }
      />

      <RolesList
        list={list}
        filters={filters}
        openId={openId}
        onEdit={setFormRole}
        onCreate={openCreate}
      />

      <RoleFormModal
        role={formRole}
        roles={formRoles}
        totalPermissions={countPermissions(modules)}
        onClose={closeForm}
        onCreated={handleCreated}
      />
    </div>
  );
}
