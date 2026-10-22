import { useMutation } from "@tanstack/react-query";
import { downloadCsv } from "@/utils/csv";
import { fetchAllLogs } from "../api";

const HEADER = ["id", "time", "user", "role", "action", "target", "status"];

export default function useExportLogs() {
  return useMutation({
 
    mutationFn: async (filters) => {
      const logs = await fetchAllLogs(filters);
      downloadCsv({
        filename: "activity-log.csv",
        header: HEADER,
        rows: logs.map((r) => [
          r.id,
          r.created_at,
          r.user.name,
          r.user.role,
          r.action.label,
          `${r.target.title} (${r.target.sub})`,
          r.status,
        ]),
      });
    },
  });
}
