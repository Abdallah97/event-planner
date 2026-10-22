import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg w-full text-center space-y-6">
        {/* Shield Stop Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-100">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
            403 Forbidden
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Access Forbidden
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            You do not have permission to view or manage this event. Only the authorized event organizer has access.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/events" className="btn-primary text-xs py-2.5 px-5">
            Browse All Events
          </Link>
          <Link href="/dashboard" className="btn-secondary text-xs py-2.5 px-5">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
