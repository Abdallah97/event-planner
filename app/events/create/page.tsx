"use client";

import { createEvent } from "@/lib/event-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function CreateEventPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createEvent, {
    success: false,
    eventId: null,
    error: "",
  });

  useEffect(() => {
    if (state.success && state.eventId) {
      router.push(`/events/${state.eventId}`);
    }
  }, [state.success, state.eventId, router]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb / Back Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link href="/events" className="hover:text-violet-600 transition-colors">
          Events
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Create New Event</span>
      </div>

      {/* Main Elevated Form Card */}
      <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <div className="mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create New Event</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Schedule and launch an unforgettable experience for your community
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6" action={formAction}>
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
            >
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="input-field"
              placeholder="e.g. Next.js & React 19 Full-Stack Summit"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="input-field resize-y"
              placeholder="Provide a detailed agenda, speakers, and topics covered..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="date"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Date & Time *
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                required
                className="input-field"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="input-field"
                placeholder="e.g. San Francisco Tech Center, CA (or Online)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label
                htmlFor="maxAttendees"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Maximum Attendees
              </label>
              <input
                type="number"
                id="maxAttendees"
                name="maxAttendees"
                min="1"
                className="input-field"
                placeholder="Leave blank for unlimited"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label
                htmlFor="isPublic"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Visibility
              </label>
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  defaultChecked
                  className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 border-slate-300 cursor-pointer"
                />
                <label htmlFor="isPublic" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Public event (discoverable in event feed)
                </label>
              </div>
            </div>
          </div>

          {state.error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 text-xs font-medium">
              {state.error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button className="btn-primary" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Publishing...</span>
                </>
              ) : (
                "Publish Event"
              )}
            </button>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
