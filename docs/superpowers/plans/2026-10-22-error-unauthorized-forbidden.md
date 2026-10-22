# Error, Unauthorized & Forbidden Handling Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Next.js 15 auth interrupts (`unauthorized.tsx`, `forbidden.tsx`) and error boundaries (`error.tsx`, `global-error.tsx`), enabled via `experimental.authInterrupts`, and wire them into protected event routes.

**Architecture:** Update `next.config.ts` to enable `authInterrupts: true`. Create styled error boundary pages matching the app's clean card design. Update server routes to throw `unauthorized()` and `forbidden()` when permission or session requirements are violated.

**Tech Stack:** Next.js 15.3+, React 19, TypeScript 5, Tailwind CSS v4.

## Global Constraints
- Framework: Next.js 15 App Router (`authInterrupts` feature).
- Styling: Tailwind CSS v4 classes (`.card`, `.btn-primary`, `.btn-secondary`, `.badge-pastel-*`, `rounded-3xl`, `border-slate-100`).
- Strict TypeScript & ESLint: No empty interfaces, full typing for Error & reset props.

---

### Task 1: Enable `authInterrupts` in `next.config.ts`

**Files:**
- Modify: `next.config.ts`

**Interfaces:**
- Produces: `nextConfig.experimental.authInterrupts = true`

- [ ] **Step 1: Update `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "config: enable experimental.authInterrupts in next.config.ts"
```

---

### Task 2: Create `app/error.tsx` and `app/global-error.tsx`

**Files:**
- Create: `app/error.tsx`
- Create: `app/global-error.tsx`

**Interfaces:**
- Produces:
  - `default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): JSX.Element`
  - `default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): JSX.Element`

- [ ] **Step 1: Write `app/error.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client/server error details for debugging
    console.error("Caught error in App Router boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg w-full text-center space-y-6">
        {/* Error Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
            Runtime Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
        </div>

        {error.digest && (
          <p className="text-[11px] font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-block">
            Digest: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-primary text-xs py-2.5 px-5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Again</span>
          </button>
          <Link href="/" className="btn-secondary text-xs py-2.5 px-5">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `app/global-error.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add app/error.tsx app/global-error.tsx
git commit -m "feat(errors): add error.tsx and global-error.tsx error boundaries"
```

---

### Task 3: Create `app/unauthorized.tsx` (HTTP 401 Page)

**Files:**
- Create: `app/unauthorized.tsx`

**Interfaces:**
- Produces: `default function Unauthorized(): JSX.Element`

- [ ] **Step 1: Write `app/unauthorized.tsx`**

```tsx
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg w-full text-center space-y-6">
        {/* Lock Security Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            401 Unauthorized
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Authentication Required
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            You must be signed in to access this page, manage events, or view your personal dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/login" className="btn-primary text-xs py-2.5 px-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Sign In with GitHub</span>
          </Link>
          <Link href="/events" className="btn-secondary text-xs py-2.5 px-5">
            Explore Public Events
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add app/unauthorized.tsx
git commit -m "feat(auth): add unauthorized.tsx 401 page"
```

---

### Task 4: Create `app/forbidden.tsx` (HTTP 403 Page)

**Files:**
- Create: `app/forbidden.tsx`

**Interfaces:**
- Produces: `default function Forbidden(): JSX.Element`

- [ ] **Step 1: Write `app/forbidden.tsx`**

```tsx
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg w-full text-center space-y-6">
        {/* Shield Stop Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-100">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
            403 Forbidden
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Access Forbidden
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            You do not have permission to view or manage this event. Only the authorized event organizer has access.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/events" className="btn-primary text-xs py-2.5 px-5">
            Browse All Events
          </Link>
          <Link href="/dashboard" className="btn-secondary text-xs py-2.5 px-5">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add app/forbidden.tsx
git commit -m "feat(auth): add forbidden.tsx 403 page"
```

---

### Task 5: Wire `unauthorized()` & `forbidden()` in Protected Routes

**Files:**
- Modify: `app/dashboard/page.tsx`
- Modify: `app/events/[eventId]/page.tsx`
- Modify: `app/events/[eventId]/edit/page.tsx`

- [ ] **Step 1: Update `app/dashboard/page.tsx`**
Import `unauthorized` from `next/navigation`:
```tsx
if (!session?.user?.id) {
  unauthorized();
}
```

- [ ] **Step 2: Update `app/events/[eventId]/page.tsx`**
Import `forbidden` from `next/navigation`:
```tsx
if (!eventData.isPublic && eventData.userId !== session?.user?.id) {
  forbidden();
}
```

- [ ] **Step 3: Update `app/events/[eventId]/edit/page.tsx`**
Import `unauthorized, forbidden` from `next/navigation`:
```tsx
if (!session?.user?.id) {
  unauthorized();
}
// Ensure only the event organizer can access the edit screen
if (event.userId !== session.user.id) {
  forbidden();
}
```

- [ ] **Step 4: Verify TypeScript compilation & ESLint**

Run: `npx tsc --noEmit; npm run lint`
Expected: 0 errors, clean linting

- [ ] **Step 5: Commit**

```bash
git add app/dashboard/page.tsx app/events/[eventId]/page.tsx app/events/[eventId]/edit/page.tsx
git commit -m "feat(routes): trigger unauthorized() and forbidden() on protected routes"
```
