import { Skeleton } from "@/components/ui/Skeleton";

export default function EventsLoading() {
  return (
    <div className="space-y-8">
      {/* 1. UPCOMING EVENTS CARDS GRID SKELETON */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-7 w-44 rounded-lg" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="card p-5 bg-white border border-slate-100/90 rounded-2xl shadow-xs flex flex-col justify-between h-[280px]"
            >
              <div>
                {/* Header: Icon & Days Left Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <Skeleton className="w-9 h-9 rounded-xl" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                {/* Title */}
                <Skeleton className="h-5 w-4/5 rounded-lg mb-2" />

                {/* Location */}
                <Skeleton className="h-3.5 w-1/2 rounded mb-4" />

                {/* RSVPs Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-12 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                  <Skeleton className="w-full h-1.5 rounded-full" />
                </div>
              </div>

              {/* Organizer Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <Skeleton className="h-3 w-14 rounded" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-3.5 w-16 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. MANAGE EVENTS DATA TABLE SKELETON */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <Skeleton className="h-6 w-36 rounded-lg" />
            <div className="flex items-center gap-2 mt-2.5">
              <Skeleton className="h-8 w-24 rounded-xl" />
              <Skeleton className="h-8 w-28 rounded-xl" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-8 w-24 rounded-xl" />
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-48 rounded" />
                  <Skeleton className="h-3 w-32 rounded" />
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
