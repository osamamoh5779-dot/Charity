import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { ToastContext } from "./toastContext";

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    tone: "bg-success/10 text-success",
    bar: "bg-success",
  },
  error: {
    icon: AlertCircle,
    tone: "bg-danger/10 text-danger",
    bar: "bg-danger",
  },
  info: {
    icon: Info,
    tone: "bg-primary/10 text-primary-light",
    bar: "bg-primary",
  },
};

const DURATION = 4500;
const MAX_VISIBLE = 4;
let nextId = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  useEffect(() => {
    const active = timers.current;
    return () => active.forEach(clearTimeout);
  }, []);

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ variant = "info", title, description, duration = DURATION }) => {
      const id = ++nextId;
      setToasts((list) =>
        [...list, { id, variant, title, description, duration }].slice(
          -MAX_VISIBLE,
        ),
      );
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      );
      return id;
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      show,
      dismiss,
      success: (title, description) =>
        show({ variant: "success", title, description }),
      error: (title, description) =>
        show({ variant: "error", title, description }),
      info: (title, description) =>
        show({ variant: "info", title, description }),
    }),
    [show, dismiss],
  );

  return (
    <ToastContext value={api}>
      {children}

      <MotionConfig reducedMotion="user">
        <div
          aria-live="polite"
          className="pointer-events-none fixed inset-x-4 bottom-4 z-60 flex flex-col gap-3 sm:inset-x-auto sm:bottom-6 sm:end-6 sm:w-96"
        >
          <AnimatePresence initial={false}>
            {toasts.map((t) => {
              const {
                icon: Icon,
                tone,
                bar,
              } = VARIANTS[t.variant] ?? VARIANTS.info;
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    transition: { duration: 0.15 },
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  role={t.variant === "error" ? "alert" : "status"}
                  className="pointer-events-auto relative overflow-hidden rounded-2xl border border-border-light bg-card shadow-xl"
                >
                  <div className="flex items-start gap-3 p-4">
                    <span
                      aria-hidden="true"
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="m-0 text-sm font-semibold text-ink">
                        {t.title}
                      </p>
                      {t.description && (
                        <p className="m-0 mt-0.5 text-xs leading-relaxed text-ink-secondary">
                          {t.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => dismiss(t.id)}
                      aria-label="Dismiss"
                      className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-ink-secondary transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <X aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>

                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: t.duration / 1000, ease: "linear" }}
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left rtl:origin-right ${bar}`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </ToastContext>
  );
}
