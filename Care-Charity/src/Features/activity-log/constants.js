import {
  ArrowLeftRight,
  CalendarClock,
  Cog,
  FileText,
  HandCoins,
  HeartHandshake,
  UserRound,
} from "lucide-react";

export const PAGE_SIZE = 10;
export const DEFAULT_SORT = "-created_at";

export const DEFAULT_FILTERS = {
  tab: "all",
  q: "",
  action: "all",
  role: "all",
  status: "all",
  range: "24h",
  sort: DEFAULT_SORT,
};

export const TABS = [
  { value: "all", label: "All Events" },
  { value: "donations", label: "Donations" },
  { value: "cases", label: "Cases" },
  { value: "volunteers", label: "Volunteers" },
  { value: "system", label: "System" },
];

export const ROLE_OPTIONS = ["Admin", "Volunteer", "Donor", "System"];

export const STATUS_OPTIONS = [
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

export const RANGE_OPTIONS = [
  { value: "24h", label: "Last 24 Hours" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
];

 
export const ACTION_OPTIONS = [
  "Approved donation",
  "Made donation",
  "Marked installment paid",
  "Submitted new case",
  "Assigned volunteer",
  "Approved volunteer application",
  "Created fund transfer",
  "Deactivated user",
];

 
export const TARGET_ICONS = {
  donation: HandCoins,
  case: HeartHandshake,
  installment: CalendarClock,
  transfer: ArrowLeftRight,
  user: UserRound,
  system: Cog,
};
export const FALLBACK_TARGET_ICON = FileText;
