import Link from "next/link";
import { auth } from "../auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="card p-10 sm:p-14 bg-white border border-slate-100 rounded-3xl shadow-sm text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
          Modern SaaS Event Management
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight mb-4">
          Plan, Organize & Track Events with Confidence
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          The all-in-one platform for modern organizers. Schedule meetups, manage RSVP lists, coordinate attendee capacity, and monitor community engagement effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
          {session ? (
            <>
              <Link href="/events/create" className="btn-primary text-sm px-6 py-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create New Event</span>
              </Link>
              <Link href="/events" className="btn-secondary text-sm px-6 py-3">
                Browse Events Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-primary text-sm px-6 py-3">
                Get Started with GitHub
              </Link>
              <Link href="/events" className="btn-secondary text-sm px-6 py-3">
                Explore Public Events
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card p-6 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Intuitive Event Creation
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Easily set dates, venue details, attendee caps, and public or private visibility in seconds.
          </p>
        </div>

        <div className="card p-6 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Instant RSVP System
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Seamless one-click attendance tracking with Going, Maybe, and Not Going feedback channels.
          </p>
        </div>

        <div className="card p-6 bg-white border border-slate-100 rounded-2xl shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Real-Time Analytics
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Keep tabs on capacity thresholds, upcoming commitments, and past event archives at a glance.
          </p>
        </div>
      </section>
    </div>
  );
}
