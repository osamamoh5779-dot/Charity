import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="p-6">
      <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center">
        <p className="m-0 text-3xl font-bold text-ink">404</p>
        <p className="mb-0 mt-1 text-sm text-ink-secondary">This page doesn't exist.</p>
        <Link to="/" className="mt-4 inline-block text-xs font-semibold text-teal-400 hover:text-teal-300">
          Go home
        </Link>
      </div>
    </div>
  );
}
