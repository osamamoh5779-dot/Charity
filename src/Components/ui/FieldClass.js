
import { cn } from "../../utils/cn";




export const fieldClass = (error) =>
  cn(
    "w-full bg-canvas border rounded-lg text-sm text-ink placeholder:text-ink-muted transition",
    "focus:outline-none focus:ring-2",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    error
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-border-light focus:border-primary focus:ring-primary/20",
  );
