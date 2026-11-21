import { ShieldAlert } from "lucide-react";

export default function Forbidden() {
  return (
    <div role="alert" className="grid min-h-[60vh] place-items-center p-6 text-center">
      <div className="max-w-sm">
        <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-warning" aria-hidden="true" />
        <h1 className="m-0 text-xl font-bold text-ink">No access</h1>
        <p className="mb-0 mt-2 text-sm text-ink-secondary">
          You don't have permission to open this page. Ask a Super Admin to update your role.
        </p>
      </div>
    </div>
  );
}
