import PageHeader from "@/components/PageHeader";
import useRoles from "../hooks/useRoles";
import RolesList from "./RolesList";

export default function Roles() {
  const { roles, loading, error, reload } = useRoles();

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        breadcrumb={["System", "Roles & Permissions"]}
        title="Roles & Permissions"
        description="Define roles and control what each one is allowed to do across the platform"
      />
      <RolesList roles={roles} loading={loading} error={error}  onRetry={reload} />
    </div>
  );
}
