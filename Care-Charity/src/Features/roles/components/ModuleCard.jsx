import { memo } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/utils/cn";
import Badge from "@/components/ui/Badge";
import Switch from "@/components/ui/Switch";
import { SUPER_ADMIN_KEY } from "../constants";
import { canGrant } from "../permissions";

function PermissionRow({ perm, checked, disabled, onToggle }) {
  const muted = disabled && !checked;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-border bg-canvas p-2.5",
        muted && "opacity-75",
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={cn("text-[13px] font-semibold", muted ? "text-ink-secondary" : "text-ink-strong")}>
            {perm.label}
          </span>
          {perm.superAdminOnly && (
            <Badge variant="warning" size="xs" square>
              Super Admin only
            </Badge>
          )}
        </div>
        <p className="mt-2 text-[11px] text-ink-muted">{perm.description}</p>
      </div>

      <Switch
        aria-label={perm.label}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onToggle([perm.key], e.target.checked)}
      />
    </div>
  );
}


function ModuleCard({ module, role, enabled, onChange }) {
  const Icon = module.icon;
  const editable = !role.locked;
  const restricted = module.superAdminOnly && role.key !== SUPER_ADMIN_KEY;

   
  const isOn = (key) => role.locked || enabled.has(key);
  const grantable = module.permissions.filter((p) => canGrant(role, module, p));
  const granted = module.permissions.filter((p) => isOn(p.key)).length;
  const allOn = grantable.every((p) => isOn(p.key));

  return (
    <section
      className={cn(
        "flex flex-col gap-3.5 rounded-xl border border-border bg-sidebar p-4 transition hover:border-border-light",
        restricted && "opacity-65",
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border pb-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
              restricted
                ? "border-border-light bg-white/5 text-ink-secondary"
                : "border-primary-light/30 bg-primary/10 text-primary-light",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <h4 className="m-0 text-[15px] font-semibold text-ink">{module.label}</h4>
            <p className="mt-2 text-[11px] text-ink-muted">{module.description}</p>
          </div>
        </div>

        {restricted ? (
          <Badge variant="warning" size="sm" square>
            Super Admin only
          </Badge>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-primary-light/25 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-light tnum">
              {granted} of {module.permissions.length}
            </span>
            {editable && grantable.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(grantable.map((p) => p.key), !allOn)}
                className="cursor-pointer border-0 bg-transparent p-0 text-[11px] font-medium text-primary-light hover:underline focus-visible:outline-2 focus-visible:outline-primary-light"
              >
                {allOn ? "Clear all" : "Allow all"}
              </button>
            )}
          </div>
        )}
      </header>

      <div className="space-y-2">
        {module.permissions.map((perm) => (
          <PermissionRow
            key={perm.key}
            perm={perm}
            checked={isOn(perm.key)}
            disabled={!editable || !canGrant(role, module, perm)}
            onToggle={onChange}
          />
        ))}
      </div>

      {restricted && (
        <p className="m-0 mt-auto rounded-lg border border-border bg-white/[0.02] py-1.5 text-center text-[11px] font-medium text-ink-muted">
          <Lock aria-hidden="true" className="mr-1 inline h-3 w-3" />
          Restricted to Super Admin
        </p>
      )}
    </section>
  );
}

export default memo(ModuleCard);
