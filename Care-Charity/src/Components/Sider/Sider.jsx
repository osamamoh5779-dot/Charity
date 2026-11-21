import { useState } from "react";
import { NavLink } from "react-router";
import { ChevronsLeft } from "lucide-react";
import { sidebarItems } from "../../Data/Data";

const STORAGE_KEY = "we-care.sidebar-collapsed";

const readCollapsed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(readCollapsed);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* storage blocked: the choice just won't survive a reload */
    }
  };

  return (
    <aside
      aria-label="Main navigation"
      className={`sticky top-0 flex h-dvh shrink-0 select-none flex-col self-start overflow-hidden border-e border-border bg-sidebar/60 backdrop-blur-xl transition-[width] duration-200 ${
        collapsed ? "w-18" : "w-64"
      }`}
    >
      <div
        className={`flex h-15 shrink-0 items-center border-b border-border ${
          collapsed ? "justify-center" : "justify-between px-4"
        }`}
      > 
        {!collapsed && (
          <h2 className="m-0 truncate text-base font-bold text-ink">
            Care Charity
          </h2>
        )}

        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-ink-secondary transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ChevronsLeft
            aria-hidden="true"
            className={`h-5 w-5 transition-transform ${
              collapsed ? "rotate-180 rtl:rotate-0" : "rtl:rotate-180"
            }`}
          />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-3">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={collapsed ? item.label : undefined}
            aria-label={item.label}
            className={({ isActive }) =>
              `flex h-10 items-center rounded-lg text-sm font-medium no-underline transition-colors ${
                collapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary/10 font-semibold text-primary-light"
                  : "text-ink-secondary hover:bg-ink/5 hover:text-ink"
              }`
            }
          >
            <item.icon aria-hidden="true" className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
