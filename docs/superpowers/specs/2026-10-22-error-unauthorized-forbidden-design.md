# Design Specification: Error, Unauthorized & Forbidden Handling Suite

- **Status:** Approved
- **Date:** 2026-10-22
- **Topic:** Next.js 15 Auth Interrupts (`unauthorized`, `forbidden`) & Error Boundaries (`error.tsx`, `global-error.tsx`)

## 1. Problem Statement & Goals
When unauthorized users attempt to access protected dashboards, unpermitted event editing pages, or when runtime errors occur during rendering, applications need semantic, helpful, and visually cohesive error pages rather than generic HTTP failures or inconsistent redirects.

### Goals:
1. Enable Next.js 15 `experimental.authInterrupts` in `next.config.ts`.
2. Implement custom UI pages for:
   - `app/error.tsx` (500 Unexpected Runtime Error Boundary)
   - `app/global-error.tsx` (Root Layout Error Boundary)
   - `app/unauthorized.tsx` (401 Authentication Required)
   - `app/forbidden.tsx` (403 Access Forbidden)
3. Integrate `unauthorized()` and `forbidden()` navigation calls inside protected server components:
   - `app/dashboard/page.tsx`
   - `app/events/[eventId]/page.tsx`
   - `app/events/[eventId]/edit/page.tsx`

---

## 2. Configuration (`next.config.ts`)
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
```

---

## 3. UI Error & Status Boundaries

### A. `app/error.tsx` (Client Component)
- **Props:** `{ error: Error & { digest?: string }, reset: () => void }`
- **Design Elements:**
  - Card container: `card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg mx-auto text-center`
  - Icon: Rose shield alert icon in `w-14 h-14 rounded-2xl bg-rose-50 text-rose-600`
  - Title: "Something Went Wrong"
  - Body: Helpful description and optional error digest tag
  - Actions: Primary "Try Again" button (executes `reset()`) and Secondary "Back to Home" button (`/`)

### B. `app/global-error.tsx` (Client Component)
- **Props:** `{ error: Error & { digest?: string }, reset: () => void }`
- **Design Elements:**
  - Root layout wrapper containing `<html>` and `<body>` with Geist font and base classes.
  - Centered error container with retry button to recover from catastrophic root errors.

### C. `app/unauthorized.tsx` (401 Page)
- **Design Elements:**
  - Card container: `card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg mx-auto text-center`
  - Badge & Icon: Amber lock emblem in `w-14 h-14 rounded-2xl bg-amber-50 text-amber-600`
  - Badge pill: `401 Unauthorized`
  - Title: "Authentication Required"
  - Subtitle: "You must be signed in to access this page or manage your events."
  - Actions:
    - Primary button: "Sign In with GitHub" (`/login`)
    - Secondary button: "Browse Public Events" (`/events`)

### D. `app/forbidden.tsx` (403 Page)
- **Design Elements:**
  - Card container: `card p-8 sm:p-12 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-lg mx-auto text-center`
  - Badge & Icon: Purple/Rose hand/shield emblem in `w-14 h-14 rounded-2xl bg-purple-50 text-purple-700`
  - Badge pill: `403 Forbidden`
  - Title: "Access Forbidden"
  - Subtitle: "You do not have permission to view or manage this resource. Only the designated event organizer has access."
  - Actions:
    - Primary button: "Browse Events" (`/events`)
    - Secondary button: "Go to Dashboard" (`/dashboard`)

---

## 4. Protected Route Wiring
1. **`app/dashboard/page.tsx`:**
   - Import `unauthorized` from `next/navigation`.
   - Replace `redirect("/login")` with `unauthorized()` when user session is missing.
2. **`app/events/[eventId]/page.tsx`:**
   - Import `forbidden` from `next/navigation`.
   - Trigger `forbidden()` when an event is private and the current user is not the creator.
3. **`app/events/[eventId]/edit/page.tsx`:**
   - Import `unauthorized, forbidden` from `next/navigation`.
   - Call `unauthorized()` if no active user session.
   - Call `forbidden()` if user is not the event owner (`event.userId !== session.user.id`).

---

## 5. Verification & Testing Strategy
1. **Compilation & Linting:** Run `npm run lint` and `npx tsc --noEmit`.
2. **Next.js Production Build:** Run `npm run build` to verify route generation and experimental config validity.
