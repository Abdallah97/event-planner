import { Skeleton } from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section Placeholder */}
      <section className="card p-10 sm:p-14 bg-white border border-slate-100 rounded-3xl shadow-sm text-center space-y-5">
        <Skeleton className="h-6 w-48 rounded-full mx-auto" />
        <Skeleton className="h-10 sm:h-12 w-3/4 max-w-2xl rounded-2xl mx-auto" />
        <Skeleton className="h-4 sm:h-5 w-2/3 max-w-xl rounded-lg mx-auto" />
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
          <Skeleton className="h-11 w-44 rounded-xl mx-auto sm:mx-0" />
          <Skeleton className="h-11 w-44 rounded-xl mx-auto sm:mx-0" />
        </div>
      </section>

      {/* Feature Highlights Grid Placeholder */}
      <section className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="card p-6 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-3.5"
          >
            <Skeleton className="w-12 h-12 rounded-2xl" />
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-4/5 rounded" />
          </div>
        ))}
      </section>
    </div>
  );
}
