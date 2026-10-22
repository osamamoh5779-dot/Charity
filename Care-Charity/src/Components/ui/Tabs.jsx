 
import { cn } from "../../utils/cn";


const LIST = {
  underline: "flex gap-6 border-b border-border",
  pill: "flex flex-wrap items-center gap-2",
  segmented:
    "inline-flex p-1 gap-1 rounded-lg bg-canvas border border-border-light",
};

const TAB = {
  underline:
    "relative pb-3 text-sm font-medium after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:transition",
  pill: "h-10 px-4 rounded-lg border text-sm font-medium",
  segmented: "h-8 px-3 rounded-md text-xs font-medium",
};

const ACTIVE = {
  underline: "text-primary-light after:bg-primary-light",
  pill: "bg-primary/10 border-primary/40 text-primary-light",
  segmented: "bg-primary text-canvas font-semibold",
};

const IDLE = {
  underline: "text-ink-secondary hover:text-primary after:bg-transparent",
  pill: "border-transparent text-ink-secondary hover:text-primary hover:bg-primary/5",
  segmented: "text-ink-secondary hover:text-primary",
};

 
const COUNT_BASE =
  "px-1.5 py-0.5 rounded-md border text-[11px] leading-none tnum";

const COUNT_ACTIVE = {
  underline: "bg-teal/15 border-teal/40 text-teal",
  pill: "bg-teal/15 border-teal/40 text-teal",
  segmented: "bg-canvas/20 border-transparent text-canvas",
};

const COUNT_IDLE = "bg-card-hover border-border-light text-ink-secondary";

export default function Tabs({
  items,
  value,
  onChange,
  variant = "pill",
  className,
}) {
  return (
    <div role="tablist" className={cn(LIST[variant], className)}>
      {items.map(({ value: v, label, count, icon: Icon }) => {
        const selected = v === value;

        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(v)}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap transition cursor-pointer",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              TAB[variant],
              selected ? ACTIVE[variant] : IDLE[variant],
            )}
          >
            {Icon && <Icon aria-hidden="true" className="w-4 h-4" />}
            {label}
            {count !== undefined && (
              <span
                className={cn(
                  COUNT_BASE,
                  selected ? COUNT_ACTIVE[variant] : COUNT_IDLE,
                )}
              >
                {typeof count === "number"
                  ? count.toLocaleString("en-US")
                  : count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}