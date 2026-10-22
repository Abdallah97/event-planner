import { auth } from "@/auth";
import EventActions from "@/components/EventActions";
import RSVPButtons from "@/components/RSVPButtons";
import { getEventWithDetails } from "@/lib/data/events";
import { Event, RSVPStatus } from "@/lib/models";
import { format } from "date-fns";
import Link from "next/link";
import { forbidden, notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const session = await auth();

  const eventData = await getEventWithDetails(eventId);

  if (!eventData) {
    notFound();
  }

  if (!eventData.isPublic && eventData.userId !== session?.user?.id) {
    forbidden();
  }

  const event = eventData as unknown as Event;

  let currentRSVP: RSVPStatus | undefined;
  if (session?.user?.id) {
    const userRSVP = event.rsvps.find(
      (rsvp) => rsvp.userId === session.user?.id
    );
    currentRSVP = userRSVP?.status;
  }

  const isOwner = session?.user?.id === event.userId;
  const isPast = new Date(event.date) < new Date();

  const goingRSVPs = event.rsvps.filter((rsvp) => rsvp.status === "GOING");
  const maybeRSVPs = event.rsvps.filter((rsvp) => rsvp.status === "MAYBE");
  const notGoingRSVPs = event.rsvps.filter(
    (rsvp) => rsvp.status === "NOT_GOING"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link href="/events" className="hover:text-violet-600 transition-colors">
          Events
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-sm">{event.title}</span>
      </div>

      {/* Main Showcase Card */}
      <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-8">
        {/* Header & Owner Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                {isPast ? "Past Event" : "Active Event"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {event.isPublic ? "Public Event" : "Private Event"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              {event.title}
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              {event.description}
            </p>
          </div>

          {isOwner && (
            <div className="self-start">
              <EventActions eventId={event.id} eventTitle={event.title} />
            </div>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date & Time */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">
                {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {format(new Date(event.date), "h:mm a")}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{event.location}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">In-Person & Virtual Attendance</p>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">
              {event.user?.name ? event.user.name[0].toUpperCase() : "O"}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Organizer</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{event.user.name || "Event Organizer"}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{event.user.email}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Capacity & RSVPs</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">
                {event._count?.rsvps || 0} attending {event.maxAttendees ? `/ ${event.maxAttendees} max` : "(Unlimited)"}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Spots available</p>
            </div>
          </div>
        </div>

        {/* RSVP Section */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Your Attendance Status</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Let the organizers and community know if you will be attending.
            </p>
          </div>

          {!isPast && event.isPublic && session && (
            <RSVPButtons eventId={event.id} currentRSVP={currentRSVP} />
          )}

          {!session && (
            <Link href="/login" className="btn-primary text-xs py-2 px-4">
              Sign In to RSVP
            </Link>
          )}

          {isPast && (
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
              This event has concluded
            </span>
          )}
        </div>
      </div>

      {/* Attendees Breakdown */}
      {event.isPublic && event.rsvps.length > 0 && (
        <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Confirmed Attendees</h2>
              <p className="text-xs text-slate-400">{event.rsvps.length} guests responded</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Going */}
            {goingRSVPs.length > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Going ({goingRSVPs.length})
                </h3>
                <div className="space-y-2">
                  {goingRSVPs.map((rsvp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                        {rsvp.user.name ? rsvp.user.name[0].toUpperCase() : "G"}
                      </div>
                      <span className="truncate">{rsvp.user.name || "Guest"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maybe */}
            {maybeRSVPs.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Maybe ({maybeRSVPs.length})
                </h3>
                <div className="space-y-2">
                  {maybeRSVPs.map((rsvp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                        {rsvp.user.name ? rsvp.user.name[0].toUpperCase() : "M"}
                      </div>
                      <span className="truncate">{rsvp.user.name || "Guest"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Not Going */}
            {notGoingRSVPs.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Not Going ({notGoingRSVPs.length})
                </h3>
                <div className="space-y-2">
                  {notGoingRSVPs.map((rsvp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-bold flex items-center justify-center">
                        {rsvp.user.name ? rsvp.user.name[0].toUpperCase() : "N"}
                      </div>
                      <span className="truncate">{rsvp.user.name || "Guest"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="pt-2">
        <Link href="/events" className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5">
          ← Back to All Events
        </Link>
      </div>
    </div>
  );
}
