import { cn } from "@/utils/cn";
const VARIANTS = {
  success: "bg-success/15 text-success border-success/30",  
  teal: "bg-teal/15 text-teal border-teal/30",  
  info: "bg-primary/15 text-primary-light border-primary/30",
  purple: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30",  
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-rose/15 text-rose border-rose/30",
  neutral: "bg-card-hover text-ink-soft border-border",
};
const SIZES = {
  xs: "px-1.5 py-0.5 text-[10px]",
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

 
export default function Badge({
  variant = "neutral",
  size = "md",
  square = false,
  icon: Icon,
  dot = false,
  className,
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border font-medium whitespace-nowrap",
        square ? "rounded-md" : "rounded-full",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-current"
        />
      )}
      {Icon && <Icon aria-hidden="true" className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
