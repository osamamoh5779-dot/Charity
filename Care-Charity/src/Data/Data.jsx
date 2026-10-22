import { 
  LuLayoutDashboard, 
  LuFolderOpen, 
  LuHandCoins, 
  LuUsers, 
  LuTrendingUp, 
  LuCreditCard, 
  LuArrowLeftRight, 
  LuBot, 
  LuFileText, 
  LuHistory, 
  LuUserCog, 
  LuSettings 
} from "react-icons/lu";

export const themepage = "light";

export const sidebarItems = [
  {
    label: "Overview",
    path: "/overview",
    icon: LuLayoutDashboard,
    indicator: true,
  },
  {
    label: "Cases",
    path: "/cases",
    icon: LuFolderOpen,
  },
  {
    label: "Donations Review",
    path: "/donations-review",
    icon: LuHandCoins,
    badge: 48,
    badgeType: "warning",
  },
  {
    label: "Volunteers",
    path: "/volunteers",
    icon: LuUsers,
    badge: 19,
    badgeType: "success",
  },
  {
    label: "Impact",
    path: "/impact",
    icon: LuTrendingUp,
  },
  {
    label: "Payments",
    path: "/payments",
    icon: LuCreditCard,
  },
  {
    label: "Fund Transfers",
    path: "/fund-transfers",
    icon: LuArrowLeftRight,
  },
  {
    label: "AI Assistant",
    path: "/ai-assistant",
    icon: LuBot,
    indicator: true,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: LuFileText,
  },
  {
    label: "Activity Log",
    path: "/activity-log",
    icon: LuHistory,
  },
  {
    label: "Users & Roles",
    path: "/users",
    icon: LuUserCog,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: LuSettings,
  },
];