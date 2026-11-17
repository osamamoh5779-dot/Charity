import { useRef } from "react";
import { Download, SlidersHorizontal } from "lucide-react";
import Button from "@/Components/ui/Button";
import PageHeader from "@/Components/PageHeader";
import { PAGE_SIZE } from "../constants";
import useActivityFilters from "../hooks/useActivityFilters";
import useActivityLogs from "../hooks/useActivityLogs";
import useExportLogs from "../hooks/useExportLogs";
import ActivityFilters from "./ActivityFilters";
import ActivityTable from "./ActivityTable";


export default function ActivityLog() {
  const searchRef = useRef(null);
  const { filters, page, setPage, setFilter, toggleSort, reset } = useActivityFilters();
  const { items, total, counts, loading, stale, error, reload } = useActivityLogs(filters, page);
  const exporter = useExportLogs();

  
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        breadcrumb={["System", "Activity Log"]}
        title="Activity Log"
        description="A complete record of all actions taken by admins, volunteers, and donors."
        actions={
          <>
            {exporter.isError && (
              <span role="alert" className="text-xs text-rose-400">
                Export failed
              </span>
            )}
            <Button
              variant="secondary"
              leftIcon={<Download className="w-4 h-4" />}
              loading={exporter.isPending}
              disabled={loading || total === 0}
              onClick={() => exporter.mutate(filters)}
            >
              Export Logs (CSV)
            </Button>
            <Button
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              onClick={() => searchRef.current?.focus()}
            >
              Filter Logs
            </Button>
          </>
        }
      />
      
      <ActivityFilters filters={filters} counts={counts} onChange={setFilter} onReset={reset} searchRef={searchRef} />

      <ActivityTable
        rows={items}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        loading={loading}
        stale={stale}
        error={error}
        sort={filters.sort}
        onPageChange={setPage}
        onSort={toggleSort}
      
        onRetry={reload}
        onReset={reset}
      />

    
    </div>
  );
}
