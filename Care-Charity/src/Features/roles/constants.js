import {
  ArrowLeftRight,
  Bot,
  CalendarCheck,
  FileText,
  FolderKanban,
  Globe,
  HandCoins,
  HandHeart,
  Receipt,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldUser,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

 
export const ROLE_STYLES = {
  super_admin: {
    variant: "teal",
    icon: ShieldCheck,
    iconClass: "text-teal-400",
    note: "System role, permissions cannot be edited. Super Admin maintains unconditional authority over all system resources.",
  },
  admin: { variant: "purple", icon: ShieldUser, iconClass: "text-primary-light" },
  volunteer: {
    variant: "success",
    icon: HandHeart,
    iconClass: "text-emerald-400",
    channel: { icon: Smartphone, label: "Volunteers use the mobile app, not the dashboard" },
    note: "Volunteer accounts have mobile-exclusive credentials for geo-tagged case creation, family interviews, and field deliveries.",
  },
  donor: {
    variant: "warning",
    icon: HandCoins,
    iconClass: "text-amber-400",
    channel: { icon: Globe, label: "Donors use the donor portal, not the dashboard" },
    note: "Donor logins are scoped to public case discovery, verified tax-deductible receipt downloads, and private progress tracking of sponsored families.",
  },
};
export const FALLBACK_ROLE_STYLE = { variant: "neutral", icon: Shield, iconClass: "text-ink-secondary" };

export const SUPER_ADMIN_KEY = "super_admin";

 
const p = (key, label, description, superAdminOnly = false) => ({ key, label, description, superAdminOnly });

export const MODULES = [
  {
    key: "cases",
    label: "Cases",
    description: "Humanitarian assistance requests",
    icon: FolderKanban,
    permissions: [
      p("cases.view", "View Cases", "Browse active, funded, and urgent cases"),
      p("cases.create", "Create Case", "Publish new urgent assistance requests directly"),
      p("cases.edit", "Edit Case", "Update targets, medical reports, and descriptions"),
      p("cases.delete", "Delete Case", "Permanently remove unpublished draft cases", true),
    ],
  },
  {
    key: "donations",
    label: "Donations",
    description: "Review bank slips and proofs",
    icon: Receipt,
    permissions: [
      p("donations.view", "View Donations", "Inspect incoming receipts and donor histories"),
      p("donations.approve", "Approve Donations", "Approve or reject uploaded bank transfer receipts"),
    ],
  },
  {
    key: "volunteers",
    label: "Volunteers & Submissions",
    description: "Volunteer roster & field triage",
    icon: Users,
    permissions: [
      p("volunteers.view", "View Volunteers", "View volunteer profiles and proposed cases"),
      p("volunteers.create", "Create Volunteer", "Register new field volunteers manually"),
      p("volunteers.edit", "Edit Volunteer", "Update volunteer phone and assigned zones"),
      p("volunteers.approve", "Approve Submissions", "Approve or reject proposed cases from volunteers"),
    ],
  },
  {
    key: "installments",
    label: "Installments & Payments",
    description: "Recurring sponsorships and payouts",
    icon: CalendarCheck,
    permissions: [
      p("installments.view", "View Installments", "Inspect payment schedules and due dates"),
      p("installments.edit", "Edit Installment", "Mark installments as paid or rescheduled"),
      p("installments.approve", "Approve Installment", "Disburse funds to beneficiary wallet/bank"),
    ],
  },
  {
    key: "fund_transfers",
    label: "Fund Transfers",
    description: "Surplus reallocations across cases",
    icon: ArrowLeftRight,
    permissions: [
      p("fund_transfers.view", "View Transfers", "Review history of case capital movements"),
      p("fund_transfers.create", "Create Transfer", "Initiate reallocation between source & target cases"),
      p("fund_transfers.approve", "Approve Transfer", "Authorize final balance adjustment & ledger posting", true),
    ],
  },
  {
    key: "impact",
    label: "Impact",
    description: "Proof updates and case completion logs",
    icon: TrendingUp,
    permissions: [
      p("impact.view", "View Impact", "Browse published family impact stories"),
      p("impact.create", "Create Impact", "Post proof photos and beneficiary resolution notes"),
      p("impact.edit", "Edit Impact", "Revise story text and metrics after publishing"),
      p("impact.delete", "Delete Impact", "Remove archived or outdated impact updates"),
    ],
  },
  {
    key: "reports",
    label: "Reports",
    description: "Financial stats & aggregate exports",
    icon: FileText,
    permissions: [
      p("reports.view", "View Reports", "Inspect financial summaries and deficit overviews"),
      p("reports.export", "Export Reports", "Download CSV, Excel, or PDF ledger exports"),
    ],
  },
  {
    key: "ai_audit",
    label: "AI Assistant & Audit Logs",
    description: "Intelligence query & immutable records",
    icon: Bot,
    permissions: [
      p("ai_assistant.view", "View AI Assistant", "Interact with natural language charity assistant"),
      p("audit_log.view", "View Audit Log", "Review staff timeline actions and timestamps"),
    ],
  },
  {
    key: "users_roles",
    label: "Users & Roles",
    description: "Access governance & credentials",
    icon: ShieldAlert,
    superAdminOnly: true,
    permissions: [
      p("users_roles.manage", "View & Edit Users", "Staff provisioning and RBAC roles"),
      p("users_roles.delete_user", "Delete User Account", "Revoke platform credentials"),
    ],
  },
  {
    key: "settings",
    label: "Settings",
    description: "Organization defaults & policies",
    icon: Settings,
    superAdminOnly: true,
    permissions: [p("settings.manage", "View & Edit Global Settings", "Currency, NGO legal reg, and API integrations")],
  },
];
