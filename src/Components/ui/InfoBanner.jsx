 
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";


const VARIANTS = {
  info: {
    box: "bg-primary/10 border-primary/20 text-ink-soft",
    iconColor: "text-primary-light",
    icon: Info,
  },
  warning: {
    box: "bg-warning/10 border-warning/25 text-ink-soft",
    iconColor: "text-warning",
    icon: AlertTriangle,
  },
  error: {
    box: "bg-danger/10 border-danger/25 text-danger",
    iconColor: "text-danger",
    icon: AlertCircle,
  },
  success: {
    box: "bg-success/10 border-success/25 text-ink-soft",
    iconColor: "text-success",
    icon: CheckCircle2,
  },
};

export default function InfoBanner({
  variant = "info",
  title,
  onClose, 
  className,
  children,
}) {
  const v = VARIANTS[variant];
  const Icon = v.icon;

  return (
    <div
       
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed",
        v.box,
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn("w-4 h-4 shrink-0 mt-0.5", v.iconColor)}
      />

      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-ink mb-0.5">{title}</p>}
        <div>{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 w-5 h-5 rounded-md inline-flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-white/10 transition cursor-pointer"
        >
          <X aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
