import { cn } from "@/utils/cn";

const Bar = ({ className }) => <div className={cn("rounded-md bg-slate-800/70", className)} />;

export default function RoleCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-6 shadow-xl">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-start gap-3.5 sm:items-center">
          <div className="h-12 w-12 shrink-0 rounded-xl border border-border-light bg-ink/5" />
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <Bar className="h-6 w-36" />
              <Bar className="h-5 w-16 rounded-full" />
            </div>
            <Bar className="h-3.5 w-56 max-w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 lg:w-64">
          <div className="flex items-center justify-between">
            <Bar className="h-6 w-44 rounded-full" />
            <Bar className="h-4 w-8" />
          </div>
          <Bar className="h-1.5 w-full rounded-full" />
        </div>

        <div className="flex items-center gap-2 self-end lg:self-center">
          <Bar className="h-10 w-10 rounded-lg" />
          <Bar className="h-10 w-20 rounded-lg" />
          <Bar className="h-10 w-32 rounded-lg" />
          <Bar className="h-10 w-10 rounded-lg" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Bar key={i} className="h-7 w-24 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
