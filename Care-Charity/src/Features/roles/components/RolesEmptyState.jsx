import { motion } from "framer-motion";
import { Plus, SearchX, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import { ROLE_ITEM } from "../motion";

export default function RolesEmptyState({ ref, search, canCreate, onClear, onCreate }) {
  const searching = Boolean(search);
  const Icon = searching ? SearchX : Shield;

  return (
    <motion.div
      ref={ref}
      layout="position"
      variants={ROLE_ITEM}
      role="status"
      className="rounded-2xl border border-border bg-card px-5 py-16 text-center shadow-xl"
    >
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-border-light bg-ink/5 text-cyan-400">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <p className="mb-0 mt-4 text-sm font-semibold text-ink">{searching ? `No roles match “${search}”` : "No roles yet"}</p>
      <p className="mb-0 mt-1 text-xs text-ink-secondary">
        {searching ? "Try a different name, or clear the search to see every role." : "Create the first role to start assigning permissions."}
      </p>
      {searching ? (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onClear}>
          Clear search
        </Button>
      ) : (
        canCreate && (
          <Button variant="secondary" size="sm" className="mt-5" leftIcon={<Plus className="h-4 w-4" />} onClick={onCreate}>
            New Role
          </Button>
        )
      )}
    </motion.div>
  );
}
