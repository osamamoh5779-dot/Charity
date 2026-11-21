import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/hooks/useToast";
import useCatalog from "../hooks/useCatalog";
import { useDeleteRole } from "../hooks/useRoles";
import { ROLE_ITEM, ROLE_LIST } from "../motion";
import RoleCard from "./RoleCard";
import RoleCardSkeleton from "./RoleCardSkeleton";
import RolesEmptyState from "./RolesEmptyState";
import RolesPagination from "./RolesPagination";
import RolesToolbar from "./RolesToolbar";

const count = (n) => n.toLocaleString("en-US");
const Num = ({ children }) => (
  <span className="font-semibold text-ink tnum">{children}</span>
);

function StatusText({ loading, roles, meta, search }) {
  if (loading) return "Loading roles…";
  const match = search ? ` matching “${search}”` : "";
  if (roles.length === 0)
    return search ? `No roles match “${search}”` : "No roles";

  const noun = (n) => (n === 1 ? "role" : "roles");
  if (!meta) {
    return (
      <>
        Showing all <Num>{count(roles.length)}</Num> {noun(roles.length)}
        {match}
      </>
    );
  }
  return (
    <>
      Showing <Num>{`${count(meta.from)}–${count(meta.to)}`}</Num> of{" "}
      <Num>{count(meta.total)}</Num> {noun(meta.total)}
      {match}
    </>
  );
}

export default function RolesList({ list, filters, openId, onEdit, onCreate }) {
  const { roles, flags, meta, loading, stale, fetching, error, reload } = list;
  const { page, setPage, showAll, search } = filters;

  const modules = useCatalog();
  const removeRole = useDeleteRole();

  const toast = useToast();
  const [roleToDelete, setRoleToDelete] = useState(null);

  const {
    mutate: deleteRole,
    reset: resetDelete,
    isPending: deleting,
  } = removeRole;

  const askDelete = useCallback((role) => setRoleToDelete(role), []);

  const closeDelete = useCallback(() => {
    if (deleting) return;
    setRoleToDelete(null);
    resetDelete();
  }, [deleting, resetDelete]);

  const confirmDelete = useCallback(() => {
    if (!roleToDelete) return;
    deleteRole(roleToDelete.id, {
      onSuccess: () => {
        toast.success("Role deleted", `"${roleToDelete.name}" was removed.`);
        setRoleToDelete(null);
      },
    });
  }, [deleteRole, roleToDelete, toast]);
  useEffect(() => {
    if (!meta || stale) return;
    const last = Math.max(meta.totalPages, 1);
    if (page > last) setPage(last, { replace: true });
  }, [meta, stale, page, setPage]);

  const topRef = useRef(null);
  const goToPage = useCallback(
    (p) => {
      setPage(p);
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      topRef.current?.scrollIntoView({
        block: "start",
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [setPage],
  );

  const listKey = meta ? `page-${meta.page}-${meta.perPage}` : "all";
  const showPagination = !showAll && meta && roles.length > 0;

  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-6">
        <div ref={topRef} className="sticky top-4 z-20">
          <RolesToolbar filters={filters} busy={fetching || filters.pending} />
        </div>

        <p
          aria-live="polite"
          className="mb-5 text-sm font-medium text-ink-secondary"
        >
          <StatusText
            loading={loading}
            roles={roles}
            meta={meta}
            search={search}
          />
        </p>

        {loading ? (
          <div className="space-y-5" role="status" aria-busy="true">
            <span className="sr-only">Loading roles</span>
            {Array.from({ length: 3 }, (_, i) => (
              <RoleCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center shadow-xl">
            <p className="m-0 text-sm font-medium text-ink">
              Couldn't load roles
            </p>
            <p className="mb-0 mt-1 text-xs text-ink-secondary">{error}</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={reload}
            >
              Retry
            </Button>
          </div>
        ) : (
          <motion.div
            key={listKey}
            variants={ROLE_LIST}
            initial="hidden"
            animate="show"
            aria-busy={stale}
            className={cn(
              "relative flex flex-col gap-5 transition-opacity",
              stale && "opacity-60",
            )}
          >
            <AnimatePresence mode="popLayout">
              {roles.length === 0 ? (
                <RolesEmptyState
                  key="empty"
                  search={search}
                  canCreate={!!flags.is_store}
                  onClear={filters.clearSearch}
                  onCreate={onCreate}
                />
              ) : (
                roles.map((role) => (
                  <motion.div
                    key={role.id}
                    layout="position"
                    variants={ROLE_ITEM}
                  >
                    <RoleCard
                      role={role}
                      modules={modules}
                      flags={flags}
                      defaultOpen={role.id === openId}
                      onEdit={onEdit}
                      onDelete={askDelete}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {showPagination && (
          <RolesPagination
            page={meta.page}
            totalPages={Math.max(meta.totalPages, 1)}
            onChange={goToPage}
          />
        )}
      </div>
      <ConfirmDialog
        open={Boolean(roleToDelete)}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        title="Delete this role?"
        message="It will be permanently removed. This action can't be undone."
        subject={roleToDelete?.name}
        confirmLabel="Delete role"
        loading={deleting}
        error={removeRole.isError ? removeRole.error.message : ""}
      />
    </MotionConfig>
  );
}
