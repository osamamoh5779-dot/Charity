import { CheckCircle2, Clock, XCircle } from "lucide-react";
import Badge from "./Badge";

const STATUS = {
  success: { variant: "success", icon: CheckCircle2, label: "Success" },
  pending: { variant: "warning", icon: Clock, label: "Pending" },
  failed: { variant: "danger", icon: XCircle, label: "Failed" },
};

export default function StatusBadge({ status, children, ...props }) {
  const s = STATUS[status] ?? STATUS.pending;
  return (
    <Badge variant={s.variant} icon={s.icon} {...props}>
      {children ?? s.label}
    </Badge>
  );
}
