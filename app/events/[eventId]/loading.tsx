import { Skeleton } from "@/components/ui/Skeleton";

export default function EventDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation Placeholder */}
      <div className="flex items-center gap-2 text-xs">
        <Skeleton className="h-4 w-12 rounded" />
        <span className="text-slate-300">/</span>
        <Skeleton className="h-4 w-44 rounded" />
      </div>

      {/* Main Showcase Card */}
      <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-8">
        {/* Header & Badges */}
        <div className="pb-6 border-b border-slate-100 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-9 w-3/4 max-w-lg rounded-xl" />
          <Skeleton className="h-4 w-full max-w-2xl rounded" />
          <Skeleton className="h-4 w-4/5 max-w-xl rounded" />
        </div>

        {/* Metadata Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100"
            >
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* RSVP Section */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-36 rounded" />
            <Skeleton className="h-3 w-64 rounded" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Attendees Breakdown Placeholder */}
      <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100 space-y-1.5">
          <Skeleton className="h-6 w-44 rounded-lg" />
          <Skeleton className="h-3.5 w-32 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-3"
            >
              <Skeleton className="h-4 w-24 rounded" />
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="h-3.5 w-24 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
