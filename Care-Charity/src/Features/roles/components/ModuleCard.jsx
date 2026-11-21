import { memo } from "react";
import { cn } from "@/utils/cn";
import Switch from "@/components/ui/Switch";

function PermissionRow({ perm, checked, disabled, onToggle }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2.5 transition-colors",
        checked ? "bg-primary/5" : !disabled && "hover:bg-ink/[0.02]",
      )}
    >
      <div className="min-w-0 leading-tight">
        <span
          className={cn(
            "block text-[13px] font-semibold",
            checked ? "text-ink" : "text-slate-300",
          )}
        >
          {perm.label}
        </span>
        {perm.description && (
          <p
            className={cn(
              "m-0 mt-0.5 text-[11px]",
              checked ? "text-slate-400" : "text-slate-500",
            )}
          >
            {perm.description}
          </p>
        )}
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

function ModuleCard({ module, enabled, editable, onChange }) {
  const Icon = module.icon;
  const viewKey = module.permissions.find((p) => p.action === "view")?.key;
  const granted = module.permissions.filter((p) => enabled.has(p.key)).length;
  const allOn = granted === module.permissions.length;

  const toggle = (keys, on) =>
    onChange(
      on && viewKey && !keys.includes(viewKey) ? [...keys, viewKey] : keys,
      on,
    );

  return (
    <section className="mb-5 block break-inside-avoid overflow-hidden rounded-xl border border-border bg-sidebar">
      <header className="flex items-center justify-between gap-3 border-b border-slate-800/60 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400"
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0 leading-tight">
            <h4 className="m-0 text-[15px] font-semibold text-ink">
              {module.label}
            </h4>
            {module.description && (
              <p className="m-0 mt-0.5 text-[11px] text-slate-500">
                {module.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full border border-primary-light/25 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-light tnum">
            {granted} of {module.permissions.length}
          </span>
          {editable && module.permissions.length > 1 && (
            <button
              type="button"
              onClick={() =>
                toggle(
                  module.permissions.map((p) => p.key),
                  !allOn,
                )
              }
              className={cn(
                "cursor-pointer rounded-md border-0 bg-transparent px-2 py-1 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/10",
                "focus-visible:outline-2 focus-visible:outline-primary-light",
              )}
            >
              {allOn ? "clear all" : "Allow all"}
            </button>
          )}
        </div>
      </header>

      <div className="divide-y divide-slate-800/60">
        {module.permissions.map((perm) => (
          <PermissionRow
            key={perm.key}
            perm={perm}
            checked={enabled.has(perm.key)}
            disabled={!editable}
            onToggle={toggle}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(ModuleCard);
