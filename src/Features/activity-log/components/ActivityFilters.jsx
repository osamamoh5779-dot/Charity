import { useEffect, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import Select from "@/Components/ui/Select";
import SearchInput from "@/Components/ui/SearchInput";
import Tabs from "@/Components/ui/Tabs";
import { ACTION_OPTIONS, RANGE_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS, TABS } from "../constants";

const SHORTCUT =
  typeof navigator !== "undefined" && /Mac/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K";

const toOption = (o) => (typeof o === "string" ? { value: o, label: o } : o);

function FilterSelect({ label, allLabel, options, value, onChange, className }) {
  return (
    <Select
      wrapperClassName={className}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {allLabel && <option value="all">{allLabel}</option>}
      {options.map(toOption).map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  );
}

export default function ActivityFilters({ filters, counts, onChange, onReset, searchRef }) {
   
  useEffect(() => {
    const onKey = (e) => {
      if (e.key?.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchRef]);

  const tabs = useMemo(() => TABS.map((t) => ({ ...t, count: counts?.[t.value] })), [counts]);

  return (
    <>
      <Tabs
        value={filters.tab}
        onChange={(v) => onChange("tab", v)}
        items={tabs}
        className="pb-4 border-b border-border"
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          ref={searchRef}
          className="flex-1 min-w-[240px]"
          value={filters.q}
          onChange={(e) => onChange("q", e.target.value)}
          onClear={() => onChange("q", "")}
          placeholder="Search by user, action, or ID..."
          shortcut={SHORTCUT}
        />

        <FilterSelect
          className="w-full sm:w-48"
          label="Event type"
          allLabel="All Event Types"
          options={ACTION_OPTIONS}
          value={filters.action}
          onChange={(v) => onChange("action", v)}
        />
        <FilterSelect
          className="w-full sm:w-36"
          label="Role"
          allLabel="All Roles"
          options={ROLE_OPTIONS}
          value={filters.role}
          onChange={(v) => onChange("role", v)}
        />
        <FilterSelect
          className="w-full sm:w-40"
          label="Status"
          allLabel="All Statuses"
          options={STATUS_OPTIONS}
          value={filters.status}
          onChange={(v) => onChange("status", v)}
        />
        <FilterSelect
          className="w-full sm:w-44"
          label="Date range"
          options={RANGE_OPTIONS}
          value={filters.range}
          onChange={(v) => onChange("range", v)}
        />

        <IconButton icon={RotateCcw} label="Reset filters" variant="secondary" size="md" onClick={onReset} />
      </div>
    </>
  );
}
