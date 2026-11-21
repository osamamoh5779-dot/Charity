import {
  ChartColumn,
  FolderHeart,
  FolderKanban,
  Globe,
  HandCoins,
  HandHeart,
  HeartHandshake,
  Layers,
  MapPin,
  Receipt,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  ShieldUser,
  Smartphone,
  Tags,
  TrendingUp,
  Users,
} from "lucide-react";

export const ROLE_STYLES = {
  admin: {
    variant: "purple",
    icon: ShieldUser,
    iconClass: "text-primary-light",
  },
  volunteer: {
    variant: "success",
    icon: HandHeart,
    iconClass: "text-emerald-400",
    channel: {
      icon: Smartphone,
      label: "Volunteers use the mobile app, not the dashboard",
    },
    note: "Volunteer accounts have mobile-exclusive credentials for geo-tagged case creation, family interviews, and field deliveries.",
  },
  donor: {
    variant: "warning",
    icon: HandCoins,
    iconClass: "text-amber-400",
    channel: {
      icon: Globe,
      label: "Donors use the donor portal, not the dashboard",
    },
    note: "Donor logins are scoped to public case discovery, verified tax-deductible receipt downloads, and private progress tracking of sponsored families.",
  },
};
export const FALLBACK_ROLE_STYLE = {
  variant: "neutral",
  icon: Shield,
  iconClass: "text-ink-secondary",
};

export const MODULE_META = {
  users: { icon: Users, description: "Accounts and access" },
  roles: { icon: ShieldCheck, description: "Roles and their permissions" },
  cases: {
    icon: FolderKanban,
    description: "Humanitarian assistance requests",
  },
  donations: { icon: Receipt, description: "Donations and receipts" },
  volunteers: { icon: HandHeart, description: "Volunteer roster" },
  impacts: { icon: TrendingUp, description: "Impact updates" },
  settings: { icon: Settings, description: "Organization settings" },
};
export const DEFAULT_MODULE_ICON = Layers;

const MODULE_ICON_RULES = [
  [/log|audit|activity/i, ScrollText],
  [/assistan/i, HeartHandshake],
  [/categor/i, Tags],
  [/case/i, FolderHeart],
  [/donat/i, Receipt],
  [/volunt/i, HandHeart],
  [/impact/i, TrendingUp],
  [/stat|report/i, ChartColumn],
  [/city|cities|area|location/i, MapPin],
  [/role/i, ShieldCheck],
  [/user/i, Users],
  [/setting/i, Settings],
];

export function getModuleIcon(key = "", name = "") {
  if (MODULE_META[key]?.icon) return MODULE_META[key].icon;
  const text = `${key} ${name}`;
  return (
    MODULE_ICON_RULES.find(([pattern]) => pattern.test(text))?.[1] ??
    DEFAULT_MODULE_ICON
  );
}

export const ACTIONS = {
  view: { label: "View list", description: "Open the list page" },
  show: { label: "View details", description: "Open a single record" },
  create: { label: "Create", description: "Add new records" },
  edit: { label: "Edit", description: "Change existing records" },
  status: {
    label: "Change status",
    description: "Activate or deactivate records",
  },
  delete: { label: "Delete", description: "Remove records" },
  restore: { label: "Restore", description: "Bring back deleted records" },
};

export const ROLE_LIMITS = [10, 25, 50, 100];
export const DEFAULT_LIMIT = 10;
export const SEARCH_DEBOUNCE_MS = 350;
