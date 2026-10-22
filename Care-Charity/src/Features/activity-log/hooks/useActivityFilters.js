import { useCallback, useState } from "react";
import { DEFAULT_FILTERS } from "../constants";

export default function useActivityFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

 
  const setFilter = useCallback((key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  }, []);

   
  const toggleSort = useCallback((field) => {
    setFilters((f) => ({ ...f, sort: f.sort === field ? `-${field}` : field }));
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  return { filters, page, setPage, setFilter, toggleSort, reset };
}
