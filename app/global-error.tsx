"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-4">
        <div className="p-8 sm:p-12 bg-white border border-slate-200 rounded-3xl shadow-md max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Application Error</h1>
            <p className="text-xs text-slate-500">
              A critical error occurred in the root layout. Please refresh or try again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-violet-600 text-white text-xs px-5 py-2.5 rounded-xl font-medium cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
