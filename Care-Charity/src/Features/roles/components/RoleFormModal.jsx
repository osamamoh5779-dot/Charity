import { useState } from "react";
import { Hash, ShieldPlus, UserPen } from "lucide-react";
import Button from "@/components/ui/Button";
import InfoBanner from "@/components/ui/InfoBanner";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import useFormState from "@/hooks/useFormState";
import { useToast } from "@/hooks/useToast";
import { useCreateRole, useUpdateRole } from "../hooks/useRoles";

const FORM_ID = "role-form";
const SLUG_RE = /^[a-z0-9_]+$/;

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

function RoleForm({ role, roles, totalPermissions, onClose, onCreated }) {
  const isNew = !role;
  const create = useCreateRole();
  const update = useUpdateRole();
  const mutation = isNew ? create : update;
  const toast = useToast();

  const {
    form,
    errors,
    setErrors,
    set,
    update: setField,
  } = useFormState({
    key: role?.key ?? "",
    name: role?.name ?? "",
    description: role?.description ?? "",
    copy_from: "none",
  });
  const [slugEdited, setSlugEdited] = useState(false);

  const onNameChange = (e) => {
    set("name")(e);
    if (isNew && !slugEdited) setField("key", slugify(e.target.value));
  };
  const onKeyChange = (e) => {
    setSlugEdited(true);
    set("key")(e);
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (isNew && !SLUG_RE.test(form.key))
      errs.key = "Use lowercase letters, numbers and underscores only";
    if (!form.name.trim()) errs.name = "Display name is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const details = {
      name: form.name.trim(),
      description: form.description.trim(),
    };

    if (!isNew) {
      return update.mutate(
        { role, ...details },
        {
          onSuccess: () => {
            toast.success("Role updated", `"${details.name}" was saved.`);
            onClose();
          },
        },
      );
    }

    const source = roles.find((r) => String(r.id) === form.copy_from);
    create.mutate(
      {
        key: form.key,
        ...details,
        ids: source ? Object.values(source.permissionIds) : [],
      },
      { onSuccess: (created) => (onCreated(created), onClose()) },
    );
  };

  const server = mutation.error?.fieldErrors;

  return (
    <Modal
      open
      size="md"
      onClose={onClose}
      icon={isNew ? ShieldPlus : UserPen}
      title={isNew ? "New Role" : "Edit Role"}
      subtitle={
        isNew
          ? "Define a role, then fine-tune its permissions on its card"
          : role.name
      }
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
          label="Display name"
          required
          placeholder="e.g. Field Coordinator"
          value={form.name}
          onChange={onNameChange}
          error={errors.name ?? server?.display_name?.[0]}
        />
        <Input
          label="Role name (slug)"
          required
          mono
          leftIcon={Hash}
          placeholder="e.g. field_coordinator"
          hint={
            isNew
              ? "Unique identifier. Filled in from the display name"
              : "The slug can't be changed"
          }
          value={form.key}
          onChange={onKeyChange}
          error={errors.key ?? server?.name?.[0]}
          disabled={!isNew}
        />
        <TextArea
          label="Description"
          placeholder="Describe the responsibilities and scope of this role"
          value={form.description}
          onChange={set("description")}
          error={server?.description?.[0]}
        />
        {isNew && (
          <Select
            label="Copy permissions from"
            hint="Starts the new role with the permissions of an existing role"
            value={form.copy_from}
            onChange={set("copy_from")}
          >
            <option value="none">None (start blank)</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.permissions.length} of {totalPermissions} enabled)
              </option>
            ))}
          </Select>
        )}

        {mutation.isError && !server && (
          <InfoBanner variant="error">{mutation.error.message}</InfoBanner>
        )}
      </form>
    </Modal>
  );
}

export default function RoleFormModal({ role, ...props }) {
  if (role === undefined) return null;
  return <RoleForm role={role} {...props} />;
}
