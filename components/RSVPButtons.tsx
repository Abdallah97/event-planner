"use client";

import { rsvpToEvent } from "@/lib/event-actions";
import { RSVPStatus } from "@/lib/models";
import { RVSPStatus } from "@prisma/client";
import { useState } from "react";

interface RSVPButtonsProps {
  eventId: string;
  currentRSVP?: RSVPStatus;
}

export default function RSVPButtons({
  eventId,
  currentRSVP,
}: RSVPButtonsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function getButtonClass(status: RSVPStatus) {
    const baseClass =
      "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-1.5";

    const isActive = currentRSVP === status;

    switch (status) {
      case "GOING":
        return `${baseClass} ${
          isActive
            ? "bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600/30"
            : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
        }`;
      case "NOT_GOING":
        return `${baseClass} ${
          isActive
            ? "bg-rose-600 text-white shadow-xs ring-2 ring-rose-600/30"
            : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
        }`;
      case "MAYBE":
        return `${baseClass} ${
          isActive
            ? "bg-amber-600 text-white shadow-xs ring-2 ring-amber-600/30"
            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
        }`;
      default:
        return baseClass;
    }
  }

  async function handleRSVP(status: RVSPStatus) {
    setIsLoading(true);
    try {
      const result = await rsvpToEvent(eventId, status);
      if (!result.success) {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        onClick={() => handleRSVP("GOING")}
        disabled={isLoading}
        className={getButtonClass("GOING")}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        <span>Going</span>
      </button>

      <button
        onClick={() => handleRSVP("MAYBE")}
        disabled={isLoading}
        className={getButtonClass("MAYBE")}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
        </svg>
        <span>Maybe</span>
      </button>

      <button
        onClick={() => handleRSVP("NOT_GOING")}
        disabled={isLoading}
        className={getButtonClass("NOT_GOING")}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Not Going</span>
      </button>
    </div>
  );
}
