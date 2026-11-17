import { cn } from "@/utils/cn";

const SIZES = {
  sm: "w-7 h-7 text-[11px]",
  md: "w-9 h-9 text-xs",
  lg: "w-11 h-11 text-sm",
};

const TONES = {
  primary: "bg-primary/15 text-primary-light border-primary/30",
  teal: "bg-teal/15 text-teal border-teal/30",
  neutral: "bg-card-hover text-ink-soft border-border",
  system: "bg-card-hover text-teal border-border-light",
};

// "Elena Vance" -> "EV"
function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({
  name,
  src,
  icon: Icon,
  size = "md",
  tone = "neutral",
  online = false,
  className,
}) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border font-bold overflow-hidden",
          SIZES[size],
          TONES[tone] ?? TONES.neutral,
        )}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : Icon ? (
          <Icon aria-hidden="true" className="w-3.5 h-3.5" />
        ) : (
          getInitials(name)
        )}
      </span>

      {online && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-card"
        />
      )}
    </span>
  );
}
