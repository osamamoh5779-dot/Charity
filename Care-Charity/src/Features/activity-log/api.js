import { api } from "@/services/http";
import { formatDay, formatTime } from "@/utils/date";
import { FALLBACK_TARGET_ICON, PAGE_SIZE, TARGET_ICONS } from "./constants";

 
export function mapLog(raw) {
  const d = new Date(raw.created_at);
  return {
    ...raw,
    time: formatTime(d),
    day: formatDay(d),
    changes: raw.changes ?? [],
    target: {
      ...raw.target,
      icon: TARGET_ICONS[raw.target?.type] ?? FALLBACK_TARGET_ICON,
    },
  };
}
 
export function toParams({ page, ...filters }) {
  const out = {};
  for (const [k, v] of Object.entries(filters)) {
    const val = typeof v === "string" ? v.trim() : v;
    if (val !== "" && val !== "all" && val != null) out[k] = val;
  }
  if (page) Object.assign(out, { page, page_size: PAGE_SIZE });
  return out;
}

export async function fetchLogs(filters, signal) {
  const { data } = await api.get("/activity-logs", {
    params: toParams(filters),
    signal,
  });
  return {
    items: data.data.map(mapLog),
    total: data.meta.total,
    counts: data.meta.counts,
  };
}

export async function fetchAllLogs(filters) {
  const { data } = await api.get("/activity-logs/export", {
    params: toParams(filters),
  });
  return data.data.map(mapLog);
}
