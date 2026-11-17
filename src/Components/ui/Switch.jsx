  
import { cn } from "../../utils/cn";



export default function Switch({ ref, label, className, ...props }) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer has-[:disabled]:opacity-60 has-[:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="peer sr-only"
          {...props}
        />

        <span className="w-9 h-5 rounded-full bg-border-light transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary" />

      
        <span className="absolute top-0.5 start-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4 rtl:peer-checked:-translate-x-4" />
      </span>

      {label && <span className="text-sm text-ink-soft">{label}</span>}
    </label>
  );
}