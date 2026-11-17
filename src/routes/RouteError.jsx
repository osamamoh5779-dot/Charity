import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : (error?.message ?? "Something went wrong");

  return (
    <div className="p-6">
      <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center">
        <p className="m-0 font-medium text-ink">This page failed to load</p>
        <p className="mb-0 mt-1 text-sm text-ink-secondary">{message}</p>
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-8 cursor-pointer rounded-lg border border-border-light bg-transparent px-3.5 text-xs font-medium text-ink-soft hover:bg-card-hover hover:text-ink"
          >
            Reload
          </button>
          <Link to="/" className="inline-flex h-8 items-center text-xs font-semibold text-teal-400 hover:text-teal-300">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
