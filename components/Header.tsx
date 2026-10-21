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

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Left: Sub-Navigation Pills (Overview & Calendar) */}
        <div className="flex items-center gap-2">
          <Link
            href="/events"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/events"
                ? "bg-purple-100 text-purple-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            Overview
          </Link>
          <Link
            href="#calendar"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
          >
            Calendar
          </Link>
        </div>

        {/* Center/Right: Search Bar & Actions */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              name="q"
              placeholder="Search events..."
              defaultValue={searchParams?.get("search") || ""}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />
          </form>

          {/* Notifications Button */}
          <button
            type="button"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-600 rounded-full" />
          </button>

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
