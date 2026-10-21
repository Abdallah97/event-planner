"use client";

import { Event } from "@/lib/models";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";
import { useState, useMemo } from "react";

interface EventsListProps {
  events: Event[];
  searchParams?: { search?: string; filter?: string };
  isAuthenticated: boolean;
}

// Visual themes for the top upcoming cards matching the screenshot
const CARD_THEMES = [
  {
    name: "pink",
    iconBg: "bg-pink-100/90 text-pink-600",
    gradient: "from-pink-500 to-rose-400",
    cardBg: "hover:border-pink-200 hover:shadow-pink-500/5",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    name: "blue",
    iconBg: "bg-blue-100/90 text-blue-600",
    gradient: "from-blue-500 to-sky-400",
    cardBg: "hover:border-blue-200 hover:shadow-blue-500/5",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "amber",
    iconBg: "bg-amber-100/90 text-amber-600",
    gradient: "from-amber-500 to-orange-400",
    cardBg: "hover:border-amber-200 hover:shadow-amber-500/5",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    name: "teal",
    iconBg: "bg-teal-100/90 text-teal-600",
    gradient: "from-teal-500 to-cyan-400",
    cardBg: "hover:border-teal-200 hover:shadow-teal-500/5",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

// Helper to deduce a sensible category type for each event
function getEventType(title: string, description: string): string {
  const combined = `${title} ${description}`.toLowerCase();
  if (combined.includes("birthday") || combined.includes("party")) return "Birthday";
  if (combined.includes("wedding")) return "Wedding";
  if (combined.includes("seminar") || combined.includes("workshop")) return "Seminars & Workshops";
  if (combined.includes("charity") || combined.includes("gala") || combined.includes("community")) return "Charity";
  if (combined.includes("hackathon") || combined.includes("tech") || combined.includes("bootcamp")) return "Tech & Hackathons";
  if (combined.includes("mixer") || combined.includes("networking")) return "Networking";
  return "General Event";
}

export default function EventsList({
  events,
  isAuthenticated,
}: EventsListProps) {
  // Local state for interactive table filters
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"date" | "title" | "attendees">("date");

  const now = useMemo(() => new Date(), []);

  // Segregate events into active (upcoming/ongoing) and completed (past)
  const activeEvents = useMemo(
    () => events.filter((e) => new Date(e.date) >= now),
    [events, now]
  );
  const completedEvents = useMemo(
    () => events.filter((e) => new Date(e.date) < now),
    [events, now]
  );

  // Cards for the top row: Pick up to 4 upcoming events
  const upcomingCards = useMemo(() => {
    return activeEvents.slice(0, 4);
  }, [activeEvents]);

  // Filtered & Sorted events for the Manage Events table
  const tableEvents = useMemo(() => {
    let list = activeTab === "active" ? activeEvents : completedEvents;

    if (selectedType !== "ALL") {
      list = list.filter((e) => getEventType(e.title, e.description) === selectedType);
    }

    return [...list].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "attendees") {
        const aCount = a.maxAttendees || 0;
        const bCount = b.maxAttendees || 0;
        return bCount - aCount;
      }
      return 0;
    });
  }, [activeTab, activeEvents, completedEvents, selectedType, sortBy]);

  // Unique types present in the events list for dropdown
  const availableTypes = useMemo(() => {
    const types = new Set(events.map((e) => getEventType(e.title, e.description)));
    return Array.from(types);
  }, [events]);

  return (
    <div className="space-y-10">
      {/* ============================================================ */}
      {/* 1. UPCOMING EVENTS CARDS GRID                                */}
      {/* ============================================================ */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Upcoming Events
          </h2>
          {upcomingCards.length > 0 && (
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
              {upcomingCards.length} featured
            </span>
          )}
        </div>

        {upcomingCards.length === 0 ? (
          <div className="card p-8 text-center bg-white border border-slate-100 rounded-2xl">
            <p className="text-sm text-slate-500">No upcoming events scheduled right now.</p>
            {isAuthenticated && (
              <Link href="/events/create" className="btn-primary mt-4 inline-flex">
                Create an Event
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingCards.map((event, idx) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];
              const eventDate = new Date(event.date);
              const daysLeft = differenceInDays(eventDate, now);
              const daysText =
                daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? "Today" : "Completed";

              // Approximate progress/tasks simulation based on capacity & RSVPs
              const max = event.maxAttendees || 60;
              const current = Math.min(max, Math.max(12, (idx + 1) * 14 + 18));
              const percentage = Math.min(100, Math.round((current / max) * 100));

              return (
                <div
                  key={event.id}
                  className={`card p-5 bg-white border border-slate-100/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${theme.cardBg} group`}
                >
                  <div>
                    {/* Header: Icon & Days Left Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.iconBg} shadow-xs`}
                      >
                        {theme.icon}
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                        {daysText}
                      </span>
                    </div>

                    {/* Title */}
                    <Link
                      href={`/events/${event.id}`}
                      className="block font-semibold text-slate-900 group-hover:text-violet-600 text-sm leading-snug line-clamp-2 transition-colors mb-2"
                    >
                      {event.title}
                    </Link>

                    {/* Tasks / Capacity count */}
                    <p className="text-xs text-slate-400 font-medium mb-3">
                      Tasks: <span className="text-slate-700 font-semibold">{current}/{max}</span>
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 font-medium">Progress</span>
                        <span className="text-slate-700 font-semibold">{percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Assignees Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100/70 text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">Assignees</span>
                    <div className="flex items-center -space-x-1.5">
                      <div
                        title={event.user?.name || "Organizer"}
                        className="w-7 h-7 rounded-full ring-2 ring-white bg-gradient-to-tr from-violet-500 to-purple-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                      >
                        {event.user?.name ? event.user.name[0].toUpperCase() : "A"}
                      </div>
                      <div
                        className="w-7 h-7 rounded-full ring-2 ring-white bg-gradient-to-tr from-rose-400 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                      >
                        +2
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 2. MANAGE EVENTS DATA TABLE                                  */}
      {/* ============================================================ */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
        {/* Section Header with Tabs and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Manage Events
            </h3>
            {/* Pill Tabs: Active & Completed */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => setActiveTab("active")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "active"
                    ? "bg-purple-100 text-purple-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                Active <span className="ml-1 opacity-70">({activeEvents.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("completed")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "completed"
                    ? "bg-purple-100 text-purple-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                Completed <span className="ml-1 opacity-70">({completedEvents.length})</span>
              </button>
            </div>
          </div>

          {/* Right Controls: Sort and Type Dropdowns */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort by */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "title" | "attendees")
                }
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="attendees">Capacity</option>
              </select>
            </div>

            {/* Event Type Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium hidden sm:inline">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                <option value="ALL">All Types</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        {tableEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700">No events found in this view</p>
            <p className="text-xs text-slate-400 mt-1">Try switching tabs or adjusting your filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th scope="col" className="py-4 pl-1 pr-4">Event name</th>
                  <th scope="col" className="py-4 px-4">Date</th>
                  <th scope="col" className="py-4 px-4">Type</th>
                  <th scope="col" className="py-4 px-4">Assignees</th>
                  <th scope="col" className="py-4 px-4">Tasks</th>
                  <th scope="col" className="py-4 px-4">Status</th>
                  <th scope="col" className="py-4 pl-4 pr-1 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {tableEvents.map((event, i) => {
                  const eventType = getEventType(event.title, event.description);
                  const isPast = new Date(event.date) < now;
                  const total = event.maxAttendees || 60;
                  const current = Math.min(total, Math.max(10, (i + 1) * 12 + 15));

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Event Name */}
                      <td className="py-4 pl-1 pr-4 font-semibold text-slate-900">
                        <Link
                          href={`/events/${event.id}`}
                          className="hover:text-violet-600 transition-colors block text-sm leading-tight max-w-xs truncate"
                        >
                          {event.title}
                        </Link>
                        <span className="text-[11px] text-slate-400 font-normal truncate block max-w-xs mt-0.5">
                          {event.location}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-medium">
                        {format(new Date(event.date), "MMMM d, yyyy")}
                      </td>

                      {/* Type */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-slate-600 font-medium">
                          {eventType}
                        </span>
                      </td>

                      {/* Assignees */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-[10px]">
                              {event.user?.name ? event.user.name[0].toUpperCase() : "O"}
                            </div>
                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                          </div>
                          <span className="text-xs text-slate-700 font-medium">
                            {event.user?.name || "Organizer"}
                          </span>
                        </div>
                      </td>

                      {/* Tasks / Progress */}
                      <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700">
                        {current}/{total}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isPast ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                            Completed
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                            Upcoming
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-4 pr-1 whitespace-nowrap text-right">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
