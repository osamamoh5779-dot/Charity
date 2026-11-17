import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

export default function PageHeader({ breadcrumb = [], title, description, actions }) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        {breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider"
          >
            {breadcrumb.map((item, i) => {
              const last = i === breadcrumb.length - 1;
              return (
                <Fragment key={item}>
                  {i > 0 && (
                    <ChevronRight aria-hidden="true" className="h-3 w-3 text-ink-muted rtl:rotate-180" />
                  )}
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? "text-primary-light" : "text-ink-secondary"}
                  >
                    {item}
                  </span>
                </Fragment>
              );
            })}
          </nav>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-secondary">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
