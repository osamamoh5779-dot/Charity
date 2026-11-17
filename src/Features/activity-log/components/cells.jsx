import { Settings } from "lucide-react";
import Avatar from "@/Components/ui/Avatar";

function ChangeLine({ change, failed }) {
  return (
    <span className="block font-mono text-[11px] whitespace-nowrap text-ink-soft">
      {change.field}:{" "}
      {change.from != null && (
        <>
          <del className="line-through text-ink-secondary">{change.from}</del> →{" "}
        </>
      )}
      <span className={failed ? "text-rose-400" : "text-primary-light"}>{change.to}</span>
    </span>
  );
}

 
export function ChangesCell({ changes, failed }) {
  if (changes.length === 0) return <span className="text-ink-muted">—</span>;
  const shown = changes.slice(0, 2);
  const more = changes.length - shown.length;
  return (
    <div className="space-y-0.5">
      {shown.map((c) => (
        <ChangeLine key={c.field} change={c} failed={failed} />
      ))}
      {more > 0 && <span className="text-[10px] text-ink-secondary">+{more} more</span>}
    </div>
  );
}

export function UserCell({ user }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar size="sm" name={user.name} tone={user.tone} icon={user.system ? Settings : undefined} />
      <div>
        <p className="font-medium text-ink-strong">{user.name}</p>
        <p
          className={
            user.role === "Admin"
              ? "text-[10px] font-medium text-primary-light"
              : "text-[10px] font-medium text-ink-secondary"
          }
        >
          {user.sub ?? user.role}
        </p>
      </div>
    </div>
  );
}

export function TargetCell({ target }) {
  const TargetIcon = target.icon;
  return (
    <>
      <div className="flex items-center gap-1.5 font-medium text-ink-strong whitespace-nowrap">
        <TargetIcon aria-hidden="true" className="w-4 h-4 text-primary-light shrink-0" />
        {target.title}
      </div>
      <p className="mt-0.5 text-[10px] text-ink-secondary whitespace-nowrap">{target.sub}</p>
    </>
  );
}
