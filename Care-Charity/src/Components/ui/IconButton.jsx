import { cn } from "../../utils/cn";

const VARIANTS = {
  ghost:
    "bg-transparent hover:bg-primary/10 text-ink-secondary hover:text-primary border-transparent",
  secondary:
    "bg-transparent hover:bg-primary/10 hover:border-primary/40 text-ink-soft hover:text-primary border-border-light",
  solid:
    "bg-card hover:bg-card-hover text-ink-secondary hover:text-ink border-border",
  danger:
    "bg-transparent hover:bg-danger/10 text-ink-secondary hover:text-danger border-transparent",
};

const SIZES = {
  sm: "w-8 h-8 rounded-lg [&>svg]:size-4",
  md: "w-10 h-10 rounded-lg [&>svg]:size-5",
  lg: "w-12 h-12 rounded-xl [&>svg]:size-5",
};

export default function IconButton({
  icon: Icon,
  label,
  variant = "ghost",
  size = "sm",
  type = "button",
  className,
  ...props
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center border shrink-0 cursor-pointer transition",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
