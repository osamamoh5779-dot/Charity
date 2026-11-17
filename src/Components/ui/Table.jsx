import { cn } from "../../utils/cn";
 

const ALIGN = { start: "text-start", center: "text-center", end: "text-end" };
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

 
export function Table({
  bare = false,
  className,
  containerClassName,
  ...props
}) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto",
        !bare && "rounded-lg border border-border bg-card",
        containerClassName,
      )}
    >
      <table
        className={cn(
          "w-full border-collapse text-sm text-ink-soft",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn("border-b border-border bg-canvas/50", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }) {
  // آخر صف من غير خط سفلي
  return (
    <tbody
      className={cn("[&>tr:last-child]:border-b-0", className)}
      {...props}
    />
  );
}

 
export function TableRow({
  selected = false,
  hoverable = true,
  className,
  ...props
}) {
  return (
    <tr
      data-selected={selected || undefined}
      className={cn(
        "border-b border-border transition-colors data-selected:bg-primary/10",
        hoverable && "hover:bg-card-hover",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({
  children,
  sortable = false,
  sorted = false,  
  onSort,
  align = "start",
  className,
  ...props
}) {
  const Icon =
    sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown;
  const ariaSort = !sortable
    ? undefined
    : sorted === "asc"
      ? "ascending"
      : sorted === "desc"
        ? "descending"
        : "none";

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cn(
        "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-secondary",
        ALIGN[align],
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "group inline-flex cursor-pointer items-center gap-1.5 rounded text-[11px] font-semibold uppercase tracking-wider",
            "hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            sorted && "text-ink",
          )}
        >
          {children}
          <Icon
            aria-hidden="true"
            strokeWidth={sorted ? 2.75 : 2.25}
            className={cn(
              "h-4 w-4 shrink-0 transition",
              sorted
                ? "text-primary"
                : "text-ink-secondary group-hover:text-ink",
            )}
          />
        </button>
      ) : (
        children
      )}
    </th>
  );
}
export function TableCell({ align, className, ...props }) {
  return (
    <td
      className={cn("px-4 py-3 align-middle", align && ALIGN[align], className)}
      {...props}
    />
  );
}

 
export function TableEmpty({
  colSpan,
  title = "لا توجد نتائج",
  description,
  children,
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center">
        <p className="m-0 font-medium text-ink">{title}</p>
        {description && (
          <p className="mb-0 mt-1 text-ink-secondary">{description}</p>
        )}
        {children && <div className="mt-4 flex justify-center">{children}</div>}
      </td>
    </tr>
  );
}

 
export function TableLoading({ rows = 5, columns = 4 }) {
  return Array.from({ length: rows }, (_, r) => (
    <tr key={r} className="border-b border-border">
      {Array.from({ length: columns }, (_, c) => (
        <td key={c} className="px-4 py-3">
          <div className="h-4 w-full max-w-40 animate-pulse rounded bg-border" />
        </td>
      ))}
    </tr>
  ));
}

 
function getPages(page, last) {
  const nums = [...new Set([1, 2, 3, page, last])]
    .filter((n) => n >= 1 && n <= last)
    .sort((a, b) => a - b);
  return nums.flatMap((n, i) =>
    i > 0 && n - nums[i - 1] > 1 ? ["…", n] : [n],
  );
}

const PAGE_BTN =
  "h-8 min-w-8 cursor-pointer rounded-md border px-3 text-sm focus-visible:outline-2 focus-visible:outline-primary-light disabled:cursor-not-allowed disabled:opacity-50";
const PAGE_IDLE = "border-border bg-card text-ink-soft hover:bg-card-hover";
const PAGE_CURRENT = "border-primary bg-primary text-white";
 
export function TablePagination({
  page,
  lastPage,
  total,
  pageSize,
  onChange,
  numbered = false,
  bordered = false,
  summary,
  previousLabel = "السابق",
  nextLabel = "التالي",
  className,
}) {
  const last =
    lastPage ?? (pageSize && total ? Math.ceil(total / pageSize) : 1);
  if (!last || last <= 1) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-3 text-sm text-ink-secondary sm:flex-row",
        bordered ? "border-t border-border px-5 py-4" : "pt-4",
        className,
      )}
    >
      {summary ?? (
        <span>
          صفحة {page} من {last}
          {total != null && ` · الإجمالي ${total}`}
        </span>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className={cn(PAGE_BTN, PAGE_IDLE)}
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          {previousLabel}
        </button>

        {numbered &&
          getPages(page, last).map((p, i) =>
            p === "…" ? (
              <span key={`dots-${i}`} className="px-1 text-ink-muted">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                aria-current={p === page ? "page" : undefined}
                className={cn(PAGE_BTN, p === page ? PAGE_CURRENT : PAGE_IDLE)}
                onClick={() => onChange(p)}
              >
                {p.toLocaleString("en-US")}
              </button>
            ),
          )}

        <button
          type="button"
          className={cn(PAGE_BTN, PAGE_IDLE)}
          disabled={page >= last}
          onClick={() => onChange(page + 1)}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
