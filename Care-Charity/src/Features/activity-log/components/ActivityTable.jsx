import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { parseSort } from "@/utils/sort";
import Badge from "@/Components/ui/Badge";
import Button from "@/Components/ui/Button";
import StatusBadge from "@/Components/ui/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableLoading,
  TablePagination,
  TableRow,
} from "@/Components/ui/Table";
import { ChangesCell, TargetCell, UserCell } from "./cells";
 
const COLUMNS = [
  {
    key: "time",
    header: "Time & ID",
    nowrap: true,
    sortKey: "created_at",
    cell: (log) => (
      <>
        <p className="font-medium text-ink-strong tnum">{log.time}</p>
        <p className="text-[10px] text-ink-secondary">{log.day}</p>
        <Badge variant="teal" size="xs" square className="mt-1">
          #{log.id}
        </Badge>
      </>
    ),
  },
  {
    key: "user",
    header: "User",
    nowrap: true,
    sortKey: "user",
    cell: (log) => <UserCell user={log.user} />,
  },
  {
    key: "action",
    header: "Action",
    nowrap: true,
    sortKey: "action",
    cell: (log) => (
      <Badge variant={log.action.variant} dot>
        {log.action.label}
      </Badge>
    ),
  },
  {
    key: "target",
    header: "Target",
    cell: (log) => <TargetCell target={log.target} />,
  },
  {
    key: "changes",
    header: "Changes",
    cell: (log) => (
      <ChangesCell changes={log.changes} failed={log.status === "failed"} />
    ),
  },
  {
    key: "status",
    header: "Status",
    sortKey: "status",
    cell: (log) => <StatusBadge status={log.status} />,
  },
  {
    key: "view",
    header: "Details",
    align: "end",
    nowrap: true,
    cell: (log, { onView }) => (
      <button
        type="button"
        onClick={() => onView(log)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-teal hover:text-teal/100 transition cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        View
        <ChevronRight
          aria-hidden="true"
          strokeWidth={3}
          className="w-3 h-3 rtl:rotate-180"
        />
      </button>
    ),
  },
];

export default function ActivityTable({
  rows,
  total,
  page,
  pageSize,
  loading,
  stale,
  error,
  sort,
  onPageChange,
  onSort,
  onView,
  onRetry,
  onReset,
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const { field, dir } = parseSort(sort);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div
        aria-busy={loading || stale}
        className={cn("transition-opacity", stale && "opacity-60")}
      >
        <Table bare className="min-w-[1100px]">
          <TableHeader>
            <TableRow hoverable={false}>
              {COLUMNS.map((c) => (
                <TableHead
                  key={c.key}
                  align={c.align}
                  sortable={!!c.sortKey}
                  sorted={c.sortKey && c.sortKey === field ? dir : false}
                  onSort={() => onSort(c.sortKey)}
                >
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableLoading rows={6} columns={COLUMNS.length} />
            ) : error ? (
              <TableEmpty
                colSpan={COLUMNS.length}
                title="Couldn't load activity"
                description={error}
              >
                <Button variant="secondary" size="sm" onClick={onRetry}>
                  Retry
                </Button>
              </TableEmpty>
            ) : rows.length === 0 ? (
              <TableEmpty
                colSpan={COLUMNS.length}
                title="No events match your filters."
                description="Try changing or resetting the filters."
              >
                <Button variant="secondary" size="sm" onClick={onReset}>
                  Reset filters
                </Button>
              </TableEmpty>
            ) : (
              rows.map((log) => (
                <TableRow key={log.id} className="text-xs">
                  {COLUMNS.map((c) => (
                    <TableCell
                      key={c.key}
                      align={c.align}
                      className={c.nowrap ? "whitespace-nowrap" : undefined}
                    >
                      {c.cell(log, { onView })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        bordered
        numbered
        page={page}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        previousLabel="Previous"
        nextLabel="Next"
        summary={
          <p className="text-xs text-ink-secondary tabular-nums">
            Showing{" "}
            <span className="text-ink font-medium">
              {from} - {to}
            </span>{" "}
            of{" "}
            <span className="text-ink font-medium">
              {total.toLocaleString("en-US")}
            </span>{" "}
            events
          </p>
        }
      />
    </div>
  );
}
