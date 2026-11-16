
import { cn } from "../../utils/cn";


const COLORS = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  teal: "bg-teal",
};

const SIZES = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = "primary",
  size = "md",
  label,
  showValue = false,
  className,
}) {
 
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5 text-xs">
          {label && <span className="text-ink-secondary">{label}</span>}
          {showValue && (
            <span className="text-ink-soft font-medium tnum">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(
          "w-full rounded-full bg-border overflow-hidden",
          SIZES[size],
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            COLORS[color],
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
