# Design Specification: Loading Skeletons for EventPlanner

- **Status:** Approved
- **Date:** 2026-10-22
- **Topic:** Route-Specific Loading Skeletons with Next.js 15 App Router

## 1. Problem Statement & Goals
When users navigate between pages or initial server data fetching occurs (e.g. fetching events from Prisma/PostgreSQL, user dashboard metrics, or detailed event data), the application can experience brief delays. Without proper loading states, the user encounters a blank main view or abrupt content layout shifts (CLS).

### Goals:
1. Provide instant visual feedback with zero Cumulative Layout Shift (CLS) on all data-fetching routes.
2. Align skeleton design aesthetics with the existing design system (rounded corners, soft slate borders, pastel tones, and subtle shimmer animations).
3. Utilize Next.js 15 App Router standard `loading.tsx` convention for native React Suspense boundary integration.

---

## 2. Component Architecture

### A. Primitive Skeleton Component
- **File:** `components/ui/Skeleton.tsx`
- **Purpose:** Reusable atomic skeleton element supporting variable width, height, border-radius, and custom classes.
- **Implementation:**
  ```tsx
  import React from "react";

  export function Skeleton({
    className = "",
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`}
        {...props}
      />
    );
  }
  ```

### B. Route-Specific Loading Skeletons
1. **Global Fallback:** `app/loading.tsx`
   - Purpose: Catches root route and unexpected transition boundaries.
   - Layout: Standard header placeholder, hero/card placeholder, and text lines.

2. **Dashboard:** `app/dashboard/loading.tsx`
   - **Header Section:** Title skeleton (`h-8 w-64`) and "Create Event" button outline skeleton (`h-10 w-36`).
   - **Metrics Row (4 cards):** Matches the 2-column (mobile) / 4-column (desktop) grid:
     - Card container: `p-5 bg-white border border-slate-100 rounded-2xl`
     - Header icon placeholder + label skeleton
     - Metric counter skeleton (`h-8 w-16`)
     - Subtitle skeleton (`h-3 w-24`)
   - **Content Section:** Upcoming and past event tab outlines and placeholder cards.

3. **Events Browse:** `app/events/loading.tsx`
   - **Filter & Search Bar:** Mimics search input (`h-11 rounded-xl`) and category/status filter buttons.
   - **Featured Events Grid:** 4 cards matching the top carousel/grid (`card p-5 bg-white rounded-2xl`):
     - Accent bar / icon placeholder
     - Title skeleton (`h-5 w-3/4`)
     - Date & venue chip skeletons
     - Attendee counter & RSVP badge outline
   - **Main Event List:** Vertical list of card placeholders mirroring `EventsList.tsx`.

4. **Event Details:** `app/events/[eventId]/loading.tsx`
   - **Breadcrumb:** Small navigation crumbs (`h-4 w-40 rounded`).
   - **Main Showcase Card (`card p-8 bg-white rounded-3xl`):**
     - Status tag + Title skeleton (`h-9 w-2/3`)
     - Metadata grid: 4 pill chips for date, time, location, and visibility.
     - Organizer identity chip with circular avatar placeholder (`w-10 h-10 rounded-full`).
     - RSVP action bar: 3 pill buttons representing `GOING`, `MAYBE`, and `NOT_GOING` actions.
     - Description paragraph lines (`h-4 w-full`, `h-4 w-5/6`, `h-4 w-4/6`).
     - Attendees list section placeholder.

---

## 3. Styling & Polish
- Base background: `bg-slate-200/80` with smooth CSS `animate-pulse` for fluid breathing motion.
- Card wrapper styles match existing component classes:
  - `.card` = `bg-white border border-slate-100 rounded-2xl shadow-xs`
  - `.card-elevated` = `bg-white border border-slate-100/80 rounded-3xl shadow-md`
- Responsive grids and flex wrappers mirror their respective `page.tsx` counterparts to maintain identical height, width, padding, and margin.

---

## 4. Verification & Testing Strategy
1. **Compilation & Linting:** Run `npm run lint` and TypeScript check to ensure clean builds without errors.
2. **Visual Inspection:** Verify rendering of each skeleton in development mode.
3. **Layout Consistency:** Confirm dimensions match target pages to guarantee zero CLS.
