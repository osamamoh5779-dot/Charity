
import { cn } from "../../utils/cn";



import { Check } from "lucide-react";


export default function Checkbox({ ref, label, className, ...props }) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5 cursor-pointer has-[:disabled]:opacity-60 has-[:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "peer appearance-none w-5 h-5 rounded border border-border-light bg-canvas cursor-pointer transition",
            "checked:bg-primary checked:border-primary",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
          {...props}
        />
        <Check
          aria-hidden="true"
          strokeWidth={3}
          className="absolute inset-0 m-auto w-3.5 h-3.5 text-canvas pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
        />
      </span>

      {label && <span className="text-sm text-ink-soft">{label}</span>}
    </label>
  );
}