import { auth } from "@/auth";
import { getDashboardData } from "@/lib/data/dashboard";
import { Event, EventRSVP } from "@/lib/models";
import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [userRSVPsData, userEventsData] = await getDashboardData(session.user.id);

  const userRSVPs = userRSVPsData as unknown as EventRSVP[];
  const userEvents = userEventsData as unknown as Event[];

  const now = new Date();
  const upcomingEvents = userEvents.filter(
    (event: Event) => new Date(event.date) >= now
  );
  const pastEvents = userEvents.filter(
    (event: Event) => new Date(event.date) < now
  );

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-800">{session.user.name || session.user.email}</span>! Here is your event activity summary.
          </p>
        </div>
        <Link href="/events/create" className="btn-primary text-xs py-2 px-4 self-start sm:self-auto">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Event</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Events */}
        <div className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Events</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{userEvents.length}</p>
          <span className="text-[11px] text-slate-400 font-medium">Created by you</span>
        </div>

        {/* Upcoming */}
        <div className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Upcoming</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{upcomingEvents.length}</p>
          <span className="text-[11px] text-blue-600 font-medium">Active & scheduled</span>
        </div>

        {/* Past */}
        <div className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Past</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{pastEvents.length}</p>
          <span className="text-[11px] text-slate-400 font-medium">Successfully completed</span>
        </div>

        {/* My RSVPs */}
        <div className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">My RSVPs</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{userRSVPs.length}</p>
          <span className="text-[11px] text-pink-600 font-medium">Events joined</span>
        </div>
      </div>

      {/* My Created Events Section */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Events Organized by You</h2>
            <p className="text-xs text-slate-400">Manage and monitor attendance for your events</p>
          </div>
          <Link
            href="/events/create"
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline"
          >
            + Create New Event
          </Link>
        </div>

        {userEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userEvents.map((event) => {
              const isPast = new Date(event.date) < now;
              return (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-violet-100 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          isPast
                            ? "bg-slate-100 text-slate-600 border border-slate-200/60"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        }`}
                      >
                        {isPast ? "Past" : "Upcoming"}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {event._count?.rsvps || 0} RSVPs
                      </span>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="font-bold text-slate-900 group-hover:text-violet-600 text-sm leading-snug line-clamp-1 transition-colors mb-1.5"
                    >
                      {event.title}
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">{event.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                    <Link
                      href={`/events/${event.id}`}
                      className="text-xs font-semibold text-violet-600 hover:underline"
                    >
                      Manage →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-xs text-slate-400">You haven&apos;t created any events yet.</p>
            <Link href="/events/create" className="btn-primary text-xs py-2 px-4 mt-3 inline-flex">
              Create Your First Event
            </Link>
          </div>
        )}
      </section>

      {/* My RSVPs Section */}
      <section className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Events You Are Attending</h2>
          <p className="text-xs text-slate-400">Keep track of upcoming dates and venue locations</p>
        </div>

        {userRSVPs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userRSVPs.map((rsvp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        rsvp.status === "GOING"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : rsvp.status === "MAYBE"
                          ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                          : "bg-rose-50 text-rose-700 border border-rose-200/60"
                      }`}
                    >
                      {rsvp.status}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      by {rsvp.event?.user?.name || "Organizer"}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 mb-1">
                    {rsvp.event?.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {rsvp.event?.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {rsvp.event?.date ? format(new Date(rsvp.event.date), "MMM d, yyyy") : ""}
                  </span>
                  <Link
                    href={`/events/${rsvp.event?.id}`}
                    className="text-xs font-semibold text-violet-600 hover:underline"
                  >
                    View Event →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-xs text-slate-400">You haven&apos;t RSVP&apos;d to any events yet.</p>
            <Link href="/events" className="btn-secondary text-xs py-2 px-4 mt-3 inline-flex">
              Explore Community Events
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
