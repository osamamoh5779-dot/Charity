import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import InfoBanner from "@/components/ui/InfoBanner";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  subject,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  error = "",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-border-light bg-card p-6 text-center shadow-2xl outline-none sm:p-8"
      >
        <span
          aria-hidden="true"
          className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-danger/20 bg-danger/10 text-danger"
        >
          <Trash2 className="h-6 w-6" />
        </span>

        <h2
          id="confirm-title"
          className="m-0 mt-4 text-xl font-bold tracking-tight text-ink"
        >
          {title}
        </h2>
        <p
          id="confirm-message"
          className="m-0 mt-2 text-sm leading-relaxed text-ink-secondary"
        >
          {message}
        </p>

        {subject && (
          <div className="mt-4 flex justify-center">
            <span className="inline-block max-w-full truncate rounded-full border border-border bg-sidebar px-4 py-1.5 text-sm font-semibold text-ink">
              {subject}
            </span>
          </div>
        )}

        {error && (
          <InfoBanner variant="error" className="mt-4 text-start">
            {error}
          </InfoBanner>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
