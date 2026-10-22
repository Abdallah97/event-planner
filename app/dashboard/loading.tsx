import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-60 rounded-xl" />
          <Skeleton className="h-4 w-96 max-w-full rounded-md" />
        </div>
        <Skeleton className="h-9 w-36 rounded-xl self-start sm:self-auto" />
      </div>

      {/* Metrics Row (4 cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="w-8 h-8 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-14 rounded-lg" />
            <Skeleton className="h-3 w-28 rounded" />
          </div>
        ))}
      </div>

      {/* My Created Events Section */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-52 rounded-lg" />
            <Skeleton className="h-3.5 w-64 rounded" />
          </div>
          <Skeleton className="h-4 w-28 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between space-y-4 h-48"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
                <Skeleton className="h-5 w-4/5 rounded-lg" />
                <Skeleton className="h-3.5 w-full rounded" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-3.5 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My RSVPs Section */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100 space-y-1.5">
          <Skeleton className="h-6 w-56 rounded-lg" />
          <Skeleton className="h-3.5 w-72 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between space-y-4 h-44"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-3.5 w-2/3 rounded" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-3.5 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
