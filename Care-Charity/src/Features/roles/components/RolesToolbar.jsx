import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";
import Tabs from "@/components/ui/Tabs";
import { ROLE_LIMITS } from "../constants";

const SHORTCUT = typeof navigator !== "undefined" && /Mac/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K";

const VIEW_MODES = [
  { value: "paged", label: "Paginated" },
  { value: "all", label: "Show All" },
];

const POP = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.15 },
};

export default function RolesToolbar({ filters, busy }) {
  const { text, setText, clearSearch, showAll, setShowAll, limit, setLimit, active, reset } = filters;
  const searchRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key?.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-md">
      <SearchInput
        ref={searchRef}
        className="min-w-[260px] flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClear={clearSearch}
        loading={busy}
        placeholder="Search roles by name..."
        shortcut={SHORTCUT}
      />

      <Tabs variant="segmented" items={VIEW_MODES} value={showAll ? "all" : "paged"} onChange={(v) => setShowAll(v === "all")} />

      <AnimatePresence initial={false}>
        {!showAll && (
          <motion.div key="limit" {...POP} className="w-full sm:w-36">
            <Select aria-label="Roles per page" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              {ROLE_LIMITS.map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
            </Select>
          </motion.div>
        )}
        {active && (
          <motion.div key="reset" {...POP}>
            <Button variant="secondary" leftIcon={<RotateCcw className="h-4 w-4" />} onClick={reset}>
              Reset
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
