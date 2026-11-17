// Components/UI/SearchInput.jsx
import { Search, X } from "lucide-react";
import { cn } from "../../utils/cn";

import {fieldClass} from "./FieldClass";

 
export default function SearchInput({
  ref,
  value,
  onChange,
  onClear,
  shortcut,  
  placeholder = "Search...",
  className,
  ...props
}) {
  const hasValue = value !== undefined && value !== "";

  return (
    <div className={cn("relative flex items-center", className)}>
        
      <Search
        aria-hidden="true"
        className="w-4 h-4 text-ink-secondary absolute start-3.5 pointer-events-none"
      />

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Escape" && hasValue && onClear) onClear();
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          fieldClass(false),
          "h-10 ps-10 pe-10",
           
          "[&::-webkit-search-cancel-button]:appearance-none",
        )}
        {...props}
      />

      {hasValue && onClear ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute end-2.5 w-6 h-6 rounded-md inline-flex items-center justify-center text-ink-secondary hover:text-primary hover:bg-primary/10 transition cursor-pointer"
        >
          <X aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
      ) : (
        shortcut && (
          <kbd className="absolute end-3 px-1.5 py-0.5 rounded-md border border-border-light bg-card text-[11px] text-ink-muted font-sans pointer-events-none">
            {shortcut}
          </kbd>
        )
      )}
    </div>
  );
}
