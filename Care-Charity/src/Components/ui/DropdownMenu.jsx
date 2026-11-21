import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

const MENU_WIDTH = 192;

export default function DropdownMenu({ label = "More actions", trigger: Trigger, items, className }) {
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();

  const close = useCallback(() => setPos(null), []);

  const toggle = () => {
    if (pos) return close();
    const r = btnRef.current.getBoundingClientRect();
    const flip = r.bottom + 8 + items.length * 40 > window.innerHeight;
    const rtl = document.documentElement.dir === "rtl";
    const edge = rtl ? r.left : r.right - MENU_WIDTH;
    const left = Math.min(Math.max(8, edge), window.innerWidth - MENU_WIDTH - 8);
    setPos({ left, top: flip ? undefined : r.bottom + 4, bottom: flip ? window.innerHeight - r.top + 4 : undefined });
  };

  useEffect(() => {
    if (!pos) return;
    const onDown = (e) => {
      if (!menuRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    menuRef.current?.querySelector("button:not(:disabled)")?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos, close]);

  return (
    <>
      <Trigger
        ref={btnRef}
        aria-haspopup="menu"
        aria-expanded={!!pos}
        aria-controls={pos ? menuId : undefined}
        aria-label={label}
        title={label}
        onClick={toggle}
      />
      {pos &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            style={{ left: pos.left, top: pos.top, bottom: pos.bottom, width: MENU_WIDTH }}
            className={cn(
              "fixed z-50 overflow-hidden rounded-xl border border-border-light bg-card p-1 shadow-2xl",
              className,
            )}
          >
            {items.map(({ label: text, icon: Icon, onSelect, danger, disabled }) => (
              <button
                key={text}
                type="button"
                role="menuitem"
                disabled={disabled}
                onClick={() => {
                  close();
                  onSelect?.();
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-0 bg-transparent px-3 py-2 text-start text-xs font-medium transition",
                  "focus-visible:bg-card-hover focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                  danger
                    ? "text-rose-400 hover:bg-danger/10"
                    : "text-ink-soft hover:bg-card-hover hover:text-ink",
                )}
              >
                {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />}
                {text}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
