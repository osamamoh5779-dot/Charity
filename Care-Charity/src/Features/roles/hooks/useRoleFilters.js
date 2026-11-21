import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { DEFAULT_LIMIT, ROLE_LIMITS, SEARCH_DEBOUNCE_MS } from "../constants";

const toPage = (v) => {
  const n = Number.parseInt(v ?? "", 10);
  return n > 0 ? n : 1;
};
const toLimit = (v) => {
  const n = Number.parseInt(v ?? "", 10);
  return ROLE_LIMITS.includes(n) ? n : DEFAULT_LIMIT;
};

export default function useRoleFilters() {
  const [params, setParams] = useSearchParams();
  const search = params.get("q")?.trim() ?? "";
  const showAll = params.get("all") === "0";
  const page = toPage(params.get("page"));
  const limit = toLimit(params.get("limit"));

  const update = useCallback(
    (patch, { replace = false } = {}) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(patch)) {
            if (value == null) next.delete(key);
            else next.set(key, String(value));
          }
          return next;
        },
        { replace },
      );
    },
    [setParams],
  );

  const [text, setText] = useState(search);

  const [seenSearch, setSeenSearch] = useState(search);
  if (search !== seenSearch) {
    setSeenSearch(search);
    if (search !== text.trim()) setText(search);
  }

  const committed = useRef(search);
  const updateRef = useRef(update);
  useEffect(() => {
    committed.current = search;
    updateRef.current = update;
  });

  useEffect(() => {
    const q = text.trim();
    if (q === committed.current) return;
    const timer = setTimeout(() => {
      committed.current = q;
      updateRef.current({ q: q || null, page: null }, { replace: true });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [text]);

  const clearSearch = useCallback(() => {
    setText("");
    committed.current = "";
    update({ q: null, page: null }, { replace: true });
  }, [update]);

  const setShowAll = useCallback((on) => update({ all: on ? "0" : null, page: null }), [update]);
  const setLimit = useCallback((n) => update({ limit: n === DEFAULT_LIMIT ? null : n, page: null }), [update]);
  const setPage = useCallback((p, options) => update({ page: p > 1 ? p : null }, options), [update]);

  const reset = useCallback(() => {
    setText("");
    committed.current = "";
    update({ q: null, all: null, limit: null, page: null });
  }, [update]);

  const query = useMemo(() => ({ search, showAll, page, limit }), [search, showAll, page, limit]);

  return {
    query,
    text,
    setText,
    search,
    showAll,
    page,
    limit,
    pending: text.trim() !== search,
    active: Boolean(text.trim() || search || showAll || limit !== DEFAULT_LIMIT),
    reset,
    clearSearch,
    setShowAll,
    setLimit,
    setPage,
  };
}
