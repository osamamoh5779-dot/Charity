import { Hash, ShieldPlus, UserPen } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import useFormState from "@/hooks/useFormState";
import { useCreateRole, useUpdateRole } from "../hooks/useRoles";

const FORM_ID = "role-form";
const SLUG_RE = /^[a-z][a-z0-9_]{1,39}$/;

function RoleForm({ role, roles, totalPermissions, onClose, onCreated }) {
  const isNew = !role;
  const create = useCreateRole();
  const update = useUpdateRole();
  const mutation = isNew ? create : update;

  const { form, errors, setErrors, set } = useFormState({
    key: role?.key ?? "",
    name: role?.name ?? "",
    description: role?.description ?? "",
    copy_from: "none",
  });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (isNew) {
      if (!SLUG_RE.test(form.key)) errs.key = "Use lowercase letters, numbers and underscores (start with a letter)";
      else if (roles.some((r) => r.key === form.key)) errs.key = "This slug is already used";
    }
    if (!form.name.trim()) errs.name = "Display name is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const details = { name: form.name.trim(), description: form.description.trim() };

    if (!isNew) return update.mutate({ id: role.id, ...details }, { onSuccess: onClose });

    const source = roles.find((r) => String(r.id) === form.copy_from);
    create.mutate(
      { key: form.key, ...details, permissions: source ? source.permissions : [] },
      { onSuccess: (created) => (onCreated(created), onClose()) },
    );
  };

   
  const copyable = roles.filter((r) => !r.locked);

  return (
    <Modal
      open
      size="md"
      onClose={onClose}
      icon={isNew ? ShieldPlus : UserPen}
      title={isNew ? "New Role" : "Edit Role"}
      subtitle={isNew ? "Define a role, then fine-tune its permissions on its card" : role.name}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} loading={mutation.isPending}>
            {isNew ? "Create Role" : "Save changes"}
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={submit} noValidate className="space-y-4">
        <Input
          label="Role name (slug)"
          required
          mono
          leftIcon={Hash}
          placeholder="e.g. field_coordinator"
          hint={isNew ? "Unique machine-readable identifier used for token RBAC claims" : "The slug can't be changed"}
          value={form.key}
          onChange={set("key")}
          error={errors.key}
          disabled={!isNew}
        />
        <Input
          label="Display name"
          required
          placeholder="e.g. Field Coordinator"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
        />
        <TextArea
          label="Description"
          placeholder="Describe the responsibilities and scope of this role"
          value={form.description}
          onChange={set("description")}
        />
        {isNew && (
          <Select
            label="Copy permissions from"
            hint="Starts the new role with the permissions of an existing role"
            value={form.copy_from}
            onChange={set("copy_from")}
          >
            <option value="none">None (start blank)</option>
            {copyable.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.permissions.length} of {totalPermissions} enabled)
              </option>
            ))}
          </Select>
        )}

        {mutation.isError && (
          <p role="alert" className="m-0 text-xs text-rose-400">
            {mutation.error.message}
          </p>
        )}
      </form>
    </Modal>
  );
}

 
export default function RoleFormModal({ role, ...props }) {
  if (role === undefined) return null;
  return <RoleForm role={role} {...props} />;
}
