import { ChevronDown, LogOut } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { useAuth } from "../hooks/useAuth";

function Trigger({ ref, ...props }) {
  const { user } = useAuth();
  return (
    <button
      ref={ref}
      type="button"
      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-1.5 py-1 text-start transition hover:bg-card-hover"
      {...props}
    >
      <Avatar name={user.full_name} src={user.image} size="md" tone="teal" />
      <span className="hidden leading-tight sm:block">
        <span className="block text-sm font-semibold text-ink">{user.full_name}</span>
        <span className="block text-xs text-primary-light">{user.type_name}</span>
      </span>
      <ChevronDown className="h-4 w-4 text-ink-secondary" aria-hidden="true" />
    </button>
  );
}

export default function UserMenu() {
  const { signOut } = useAuth();
  return (
    <DropdownMenu
      label="Account menu"
      trigger={Trigger}
      items={[{ label: "Log out", icon: LogOut, danger: true, onSelect: signOut }]}
    />
  );
}
