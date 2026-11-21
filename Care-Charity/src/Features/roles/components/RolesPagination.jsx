import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { buildPageItems } from "../pagination";

export default function RolesPagination({ page, totalPages, onChange }) {
  return (
    <motion.nav
      aria-label="Roles pagination"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-between gap-3 pt-1 sm:flex-row"
    >
      <p className="m-0 text-xs text-ink-muted tnum">
        Page {page} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />}
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </Button>

        {buildPageItems(page, totalPages).map((item, i) =>
          item === "gap" ? (
            <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-ink-muted">
              …
            </span>
          ) : (
            <Button
              key={item}
              size="sm"
              variant={item === page ? "primary" : "secondary"}
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              className="min-w-8 tnum"
              onClick={() => item !== page && onChange(item)}
            >
              {item}
            </Button>
          ),
        )}

        <Button
          variant="secondary"
          size="sm"
          rightIcon={<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />}
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </motion.nav>
  );
}
