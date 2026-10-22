import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { fetchLogs } from "../api";

export default function useActivityLogs(filters, page) {
  const q = useDebouncedValue(filters.q.trim());
  const params = { ...filters, q, page };

  const query = useQuery({
    queryKey: ["activity-logs", params],
    queryFn: ({ signal }) => fetchLogs(params, signal),  
    placeholderData: keepPreviousData,  
  });

  return {
    items: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    counts: query.data?.counts,
    loading: query.isPending,  
    stale: query.isPlaceholderData,  
    error: query.isError ? query.error.message : "",
    reload: () => query.refetch(),
  };
}
