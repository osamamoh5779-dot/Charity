import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

const SIZES = { sm: "max-w-sm", md: "max-w-xl", lg: "max-w-3xl" };


export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon: Icon,
  footer,
  size = "md",
  children,
  className,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    const prevOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; 
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-canvas/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl border border-border-light bg-card text-ink shadow-2xl outline-none",
          SIZES[size],
          className,
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border bg-sidebar px-6 py-4">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
            )}
            <div>
              <h2 className="m-0 text-sm font-bold text-ink">{title}</h2>
              {subtitle && <p className="m-0 text-[11px] text-ink-secondary">{subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-ink-secondary transition hover:bg-card-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-primary-light"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <footer className="flex items-center justify-end gap-3 border-t border-border bg-sidebar px-6 py-3.5">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
