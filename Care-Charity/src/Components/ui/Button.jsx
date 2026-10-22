import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const VARIANTS = {
  primary:
    "bg-primary hover:bg-primary-light text-canvas font-semibold border-transparent shadow-sm shadow-primary/30",
  secondary:
    "bg-transparent hover:bg-card-hover text-ink-soft hover:text-ink border-border-light",
  danger: "bg-danger hover:opacity-90 text-white border-transparent",
  ghost:
    "bg-transparent hover:bg-card-hover text-ink-secondary hover:text-ink border-transparent",
};

const SIZES = {
  sm: "h-8 px-3.5 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  className,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 border font-medium cursor-pointer transition",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
