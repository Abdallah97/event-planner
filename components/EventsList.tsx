"use client";

import { Event } from "@/lib/models";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";
import { useState, useMemo } from "react";

interface EventsListProps {
  events: Event[];
  isAuthenticated: boolean;
  searchParams?: { search?: string; filter?: string };
}

const CARD_ACCENTS = [
  {
    iconBg: "bg-purple-100 text-purple-700",
    gradient: "from-violet-600 to-purple-500",
    hoverBorder: "hover:border-purple-200",
  },
  {
    iconBg: "bg-blue-100 text-blue-700",
    gradient: "from-blue-600 to-sky-500",
    hoverBorder: "hover:border-blue-200",
  },
  {
    iconBg: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-600 to-teal-500",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    iconBg: "bg-amber-100 text-amber-700",
    gradient: "from-amber-600 to-orange-500",
    hoverBorder: "hover:border-amber-200",
  },
];

export default function EventsList({
  events,
  isAuthenticated,
}: EventsListProps) {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [sortBy, setSortBy] = useState<"date" | "title" | "rsvps">("date");

  const now = useMemo(() => new Date(), []);

  // Segregate into active (upcoming) and completed (past)
  const activeEvents = useMemo(
    () => events.filter((e) => new Date(e.date) >= now),
    [events, now]
  );
  const completedEvents = useMemo(
    () => events.filter((e) => new Date(e.date) < now),
    [events, now]
  );

  // Top cards: Up to 4 upcoming events
  const upcomingCards = useMemo(() => {
    return activeEvents.slice(0, 4);
  }, [activeEvents]);

  // Filtered & sorted events for table
  const tableEvents = useMemo(() => {
    const list = activeTab === "active" ? activeEvents : completedEvents;

    return [...list].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "rsvps") {
        const aCount = a._count?.rsvps || 0;
        const bCount = b._count?.rsvps || 0;
        return bCount - aCount;
      }
      return 0;
    });
  }, [activeTab, activeEvents, completedEvents, sortBy]);

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. UPCOMING EVENTS CARDS GRID                                */}
      {/* ============================================================ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Upcoming Events
          </h2>
          {upcomingCards.length > 0 && (
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
              {upcomingCards.length} scheduled
            </span>
          )}
        </div>

        {upcomingCards.length === 0 ? (
          <div className="card p-8 text-center bg-white border border-slate-100 rounded-2xl">
            <p className="text-sm text-slate-500">No upcoming events scheduled.</p>
            {isAuthenticated && (
              <Link href="/events/create" className="btn-primary mt-4 inline-flex">
                Create Event
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingCards.map((event, idx) => {
              const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
              const eventDate = new Date(event.date);
              const daysLeft = differenceInDays(eventDate, now);
              const daysText =
                daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? "Today" : "Completed";

              const rsvpCount = event._count?.rsvps || 0;
              const maxCap = event.maxAttendees;
              const percent = maxCap ? Math.min(100, Math.round((rsvpCount / maxCap) * 100)) : 100;

              return (
                <div
                  key={event.id}
                  className={`card p-5 bg-white border border-slate-100/90 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${accent.hoverBorder} group`}
                >
                  <div>
                    {/* Header: Icon & Days Left Badge */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent.iconBg}`}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                        {daysText}
                      </span>
                    </div>

                    {/* Title */}
                    <Link
                      href={`/events/${event.id}`}
                      className="block font-bold text-slate-900 group-hover:text-violet-600 text-sm leading-snug line-clamp-1 transition-colors mb-1"
                    >
                      {event.title}
                    </Link>

                    {/* Location */}
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-4 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </p>

                    {/* RSVPs Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 font-medium">RSVPs</span>
                        <span className="text-slate-700 font-semibold">
                          {rsvpCount} {maxCap ? `/ ${maxCap}` : "(Unlimited)"}
                        </span>
                      </div>
                      {maxCap ? (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${accent.gradient} rounded-full transition-all duration-500`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Organizer Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">Organizer</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 font-bold text-[10px] flex items-center justify-center">
                        {event.user?.name ? event.user.name[0].toUpperCase() : "O"}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[100px]">
                        {event.user?.name || "Organizer"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 2. MANAGE EVENTS DATA TABLE (DATABASE STRUCTURE)            */}
      {/* ============================================================ */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Manage Events
            </h3>
            {/* Pill Tabs: Active & Completed */}
            <div className="flex items-center gap-2 mt-2.5">
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

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "date" | "title" | "rsvps")
              }
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="rsvps">RSVPs</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        {tableEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm font-semibold text-slate-700">No events found in this tab.</p>
            <p className="text-xs text-slate-400 mt-1">Check back later or create a new event.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th scope="col" className="py-3.5 pl-1 pr-4">Event Name</th>
                  <th scope="col" className="py-3.5 px-4">Date & Time</th>
                  <th scope="col" className="py-3.5 px-4">Location</th>
                  <th scope="col" className="py-3.5 px-4">Organizer</th>
                  <th scope="col" className="py-3.5 px-4">RSVPs</th>
                  <th scope="col" className="py-3.5 px-4">Status</th>
                  <th scope="col" className="py-3.5 pl-4 pr-1 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {tableEvents.map((event) => {
                  const isPast = new Date(event.date) < now;
                  const rsvpsCount = event._count?.rsvps || 0;

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
                          {event.description}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-600 font-medium">
                        {format(new Date(event.date), "PPP 'at' p")}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                        {event.location}
                      </td>

                      {/* Organizer */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-[10px]">
                            {event.user?.name ? event.user.name[0].toUpperCase() : "O"}
                          </div>
                          <span className="text-xs text-slate-700 font-medium">
                            {event.user?.name || "Organizer"}
                          </span>
                        </div>
                      </td>

                      {/* RSVPs / Capacity */}
                      <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700">
                        {rsvpsCount} {event.maxAttendees ? `/ ${event.maxAttendees}` : "(Unlimited)"}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isPast ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                            Past
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Upcoming
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 pl-4 pr-1 whitespace-nowrap text-right">
                        <Link
                          href={`/events/${event.id}`}
                          className="text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                        >
                          View Details →
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
