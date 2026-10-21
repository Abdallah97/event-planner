"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (q) {
      params.set("search", q);
    } else {
      params.delete("search");
    }
    router.push(`/events?${params.toString()}`);
  }

  // Determine current page label
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/events/create") return "Create Event";
    if (pathname.startsWith("/events/")) return "Event Details";
    return "Events Directory";
  };

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Left: Active Page Title */}
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            {getPageTitle()}
          </h2>
        </div>

        {/* Right: Search Bar & Primary Actions */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative flex-1 sm:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              name="q"
              placeholder="Search events by title, description or location..."
              defaultValue={searchParams?.get("search") || ""}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />
          </form>

          {/* Primary Create Event CTA */}
          <Link
            href="/events/create"
            className="btn-primary text-xs py-2 px-3.5 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Create Event</span>
          </Link>

          {!session && (
            <Link
              href="/login"
              className="btn-secondary text-xs py-2 px-3 whitespace-nowrap"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
