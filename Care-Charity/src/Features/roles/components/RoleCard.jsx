import { memo, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import InfoBanner from "@/components/ui/InfoBanner";
import ProgressBar from "@/components/ui/ProgressBar";
import { FALLBACK_ROLE_STYLE, ROLE_STYLES } from "../constants";
import useRoleDraft from "../hooks/useRoleDraft";
import ModuleCard from "./ModuleCard";

const stop = (e) => e.stopPropagation();
const plural = (n, word) =>
  `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;

function ModuleSummary({ label, granted, total }) {
  const none = granted === 0;
  return (
    <span className="rounded-lg border border-border bg-sidebar px-2.5 py-1 text-xs text-ink-secondary">
      <strong
        className={cn(
          "font-semibold",
          none ? "text-ink-muted" : "text-primary-light",
        )}
      >
        {label}:
      </strong>{" "}
      <span className={none ? "text-ink-muted" : undefined}>
        {none ? "None" : granted === total ? "Full" : `${granted}/${total}`}
      </span>
    </span>
  );
}

function RoleCard({ role, modules, defaultOpen, flags, onEdit, onDelete }) {
  const [open, setOpen] = useState(defaultOpen);
  const draft = useRoleDraft(role, modules);
  const toggle = () => setOpen((o) => !o);

  const style = ROLE_STYLES[role.key] ?? FALLBACK_ROLE_STYLE;
  const Icon = style.icon;
  const Channel = style.channel?.icon;
  const bodyId = `role-${role.id}-body`;

  const { perModule, total, granted } = useMemo(() => {
    const perModule = modules.map((m) => ({
      module: m,
      total: m.permissions.length,
      granted: m.permissions.filter((p) => draft.enabled.has(p.key)).length,
    }));
    return {
      perModule,
      total: perModule.reduce((n, m) => n + m.total, 0),
      granted: perModule.reduce((n, m) => n + m.granted, 0),
    };
  }, [modules, draft.enabled]);
  const percent = total ? Math.round((granted / total) * 100) : 0;

  return (
    <article
      className={cn(
        "rounded-2xl border bg-card p-6 shadow-xl transition",
        open
          ? "border-primary-light/60 ring-1 ring-primary-light/30"
          : "border-border hover:border-border-light",
      )}
    >
      <div
        onClick={toggle}
        className="flex cursor-pointer select-none flex-col justify-between gap-4 lg:flex-row lg:items-center"
      >
        <div className="flex items-start gap-3.5 sm:items-center">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              open
                ? "border-primary-light/30 bg-primary/10 text-primary-light"
                : "border-border-light bg-ink/5 text-ink-secondary",
            )}
          >
            <Icon className="h-6 w-6" />
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="m-0 text-xl font-bold tracking-tight text-ink">
                {role.name}
              </h3>
              <Badge size="sm" className="font-semibold">
                {plural(role.users_count, "user")}
              </Badge>
              {draft.dirty && (
                <Badge
                  size="sm"
                  square
                  variant="warning"
                  dot
                  className="motion-safe:animate-pulse"
                >
                  Unsaved changes
                </Badge>
              )}
            </div>
            <p className="m-0 mt-1 text-[13px] text-ink-secondary">
              {role.description}
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="flex flex-col gap-1.5 lg:w-64">
          <div className="flex items-center justify-between text-[13px] font-medium">
            <span className="rounded-full border border-border bg-sidebar px-2.5 py-0.5 text-ink-secondary">
              <strong className="font-semibold text-primary-light tnum">
                {granted}
              </strong>{" "}
              of {total} permissions enabled
            </span>
            <span className="text-xs font-semibold text-primary-light tnum">
              {percent}%
            </span>
          </div>
          <ProgressBar value={granted} max={total} size="sm" />
        </div>

        <div className="flex items-center gap-2 self-end lg:self-center">
          <div className="flex items-center gap-2" onClick={stop}>
            {flags.is_update && (
              <>
                <IconButton
                  icon={Pencil}
                  label="Edit role details"
                  size="md"
                  onClick={() => onEdit(role)}
                />
                <Button
                  variant="secondary"
                  disabled={!draft.dirty || draft.saving}
                  onClick={draft.discard}
                >
                  Discard
                </Button>
                <Button
                  disabled={!draft.dirty}
                  loading={draft.saving}
                  onClick={draft.submit}
                >
                  Save changes
                </Button>
              </>
            )}
            {flags.is_delete && (
              <IconButton
                icon={Trash2}
                variant="danger"
                size="md"
                label={
                  role.key === "admin"
                    ? "System role, can't be deleted"
                    : role.users_count > 0
                      ? "Remove this role from its users first"
                      : "Delete role"
                }
                disabled={role.key === "admin" || role.users_count > 0}
                onClick={() => onDelete(role)}
              />
            )}
          </div>
          <span
            aria-hidden="true"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border bg-sidebar",
              open
                ? "border-primary-light/30 text-primary-light"
                : "border-border text-ink-secondary",
            )}
          >
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={toggle}
        className="sr-only"
      >
        {open ? "Collapse" : "Expand"} {role.name} permissions
      </button>

      {draft.error && (
        <InfoBanner variant="error" className="mt-4">
          {draft.error}
        </InfoBanner>
      )}

      {open ? (
        <div id={bodyId} className="mt-5 space-y-4 border-t border-border pt-5">
          {style.note && <InfoBanner>{style.note}</InfoBanner>}
          <div className="-mb-5 columns-1 gap-5 lg:columns-2">
            {modules.map((m) => (
              <ModuleCard
                key={m.key}
                module={m}
                enabled={draft.enabled}
                editable={!!flags.is_update}
                onChange={draft.change}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          id={bodyId}
          className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"
        >
          <div className="flex flex-wrap gap-2">
            {perModule.map(({ module, granted, total }) => (
              <ModuleSummary
                key={module.key}
                label={module.label}
                granted={granted}
                total={total}
              />
            ))}
          </div>
          {Channel && (
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-ink/[0.03] px-3 py-1 text-xs font-medium text-ink-secondary">
              <Channel
                aria-hidden="true"
                className="h-3.5 w-3.5 text-primary-light"
              />
              {style.channel.label}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

export default memo(RoleCard);
