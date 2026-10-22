import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Bell, ChevronRight } from "lucide-react";
import Avatar from "@/Components/ui/Avatar";
import IconButton from "@/Components/ui/IconButton";
import SearchInput from "@/Components/ui/SearchInput";
import Tabs from "@/Components/ui/Tabs";
import ThemeToggle from "@/Components/ui/ToggleTheme";
import { sidebarItems } from "../../Data/Data"; 

const LANGS = [
  { value: "ar", label: "AR" },
  { value: "en", label: "EN" },
];

const SHORTCUT =
  typeof navigator !== "undefined" && /Mac/i.test(navigator.userAgent)
    ? "⌘K"
    : "Ctrl K";

function getInitialLang() {
  try {
    return localStorage.getItem("lang") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

function HeaderBreadcrumb() {
  const { pathname } = useLocation();
  const current = sidebarItems.find((i) => i.path === pathname)?.label ?? "";

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden min-w-0 items-center gap-2 text-sm md:flex"
    >
      <span className="text-ink-secondary">Dashboards</span>
      <ChevronRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-ink-muted rtl:rotate-180"
      />
      <span aria-current="page" className="truncate font-semibold text-ink">
        {current}
      </span>
    </nav>
  );
}

export default function Header({
  user = { name: "Elena Vance", role: "Super Admin", avatar: null },
  unreadCount = 0,
}) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", lang);
    } catch { /* empty */ }
  }, [lang]);

  
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 sm:px-6">
      <HeaderBreadcrumb />

      <div className="ms-auto flex items-center gap-2 sm:gap-3">
        <SearchInput
          ref={searchRef}
          className="w-44 sm:w-72 lg:w-96"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search cases, donors, receipts..."
          shortcut={SHORTCUT}
        />

        <Tabs
          variant="segmented"
          items={LANGS}
          value={lang}
          onChange={setLang}
          className="hidden sm:inline-flex"
        />

        <ThemeToggle size="md" />

        <span className="relative">
          <IconButton
            icon={Bell}
            size="md"
            label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
          />
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute end-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-card"
            />
          )}
        </span>

        <span
          aria-hidden="true"
          className="hidden h-8 w-px bg-border sm:block"
        />

        <div className="flex items-center gap-2.5">
          <Avatar name={user.name} src={user.avatar} tone="primary" size="md" />
          <div className="hidden leading-tight lg:block">
            <p className="text-sm font-semibold text-ink-strong">{user.name}</p>
            <p className="text-[11px] font-medium text-primary-light">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
