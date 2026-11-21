import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPermissions } from "../api";
import useLanguage from "@/hooks/useLanguage";
import { buildCatalog } from "../permissions";

const EMPTY = [];

export default function useCatalog() {
  const language = useLanguage();
  const { data } = useQuery({
    queryKey: ["permissions", language],
    queryFn: ({ signal }) => fetchPermissions(signal),
    staleTime: 10 * 60_000,
  });

  return useMemo(
    () => (data ? buildCatalog(data, language) : EMPTY),
    [data, language],
  );
}
