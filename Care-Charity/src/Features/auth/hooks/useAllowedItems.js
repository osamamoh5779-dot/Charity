import { useMemo } from "react";
import { canOpenPath } from "@/config/access";
import { useAuth } from "./useAuth";

export function useAllowedItems(items) {
  const { flags } = useAuth();
  return useMemo(() => items.filter((item) => canOpenPath(flags, item.path)), [items, flags]);
}
