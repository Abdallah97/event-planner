# Loading Skeletons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement route-specific loading skeletons across EventPlanner using Next.js 15 App Router Suspense conventions to provide instant visual feedback with zero Cumulative Layout Shift (CLS).

**Architecture:** Create an atomic, reusable `Skeleton` primitive in `components/ui/Skeleton.tsx`, then build dedicated `loading.tsx` components for each data-fetching route (`app/dashboard/loading.tsx`, `app/events/loading.tsx`, `app/events/[eventId]/loading.tsx`) plus a root fallback (`app/loading.tsx`).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4.

## Global Constraints
- Framework: Next.js 15 App Router (`loading.tsx` file convention).
- React: React 19 Server/Client Components.
- Styling: Tailwind CSS v4 with existing classes (`.card`, `.btn-primary`, `.badge-pastel-*`, `animate-pulse`, `rounded-2xl`, `rounded-3xl`, `bg-slate-200/80`).
- No changes to existing page data-fetching logic; skeletons purely render during async pending states.

---

### Task 1: Create Atomic Skeleton Primitive

**Files:**
- Create: `components/ui/Skeleton.tsx`

**Interfaces:**
- Produces: `Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element`

- [ ] **Step 1: Create `components/ui/Skeleton.tsx`**

```tsx
import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/Skeleton.tsx
git commit -m "feat(ui): add reusable Skeleton primitive component"
```

---

### Task 2: Create Dashboard Loading Skeleton

**Files:**
- Create: `app/dashboard/loading.tsx`
- Consumes: `components/ui/Skeleton.tsx`

**Interfaces:**
- Produces: `default function DashboardLoading(): JSX.Element`

- [ ] **Step 1: Write `app/dashboard/loading.tsx`**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Top Header Placeholder */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-60 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="w-8 h-8 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-14 rounded-lg" />
            <Skeleton className="h-3 w-28 rounded" />
          </div>
        ))}
      </div>

      {/* Tabs and Events Lists Placeholder */}
      <div className="space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
            </div>
          ))}
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
git add app/dashboard/loading.tsx
git commit -m "feat(dashboard): add loading skeleton for dashboard page"
```

---

### Task 3: Create Events Browse Loading Skeleton

**Files:**
- Create: `app/events/loading.tsx`
- Consumes: `components/ui/Skeleton.tsx`

**Interfaces:**
- Produces: `default function EventsLoading(): JSX.Element`

- [ ] **Step 1: Write `app/events/loading.tsx`**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function EventsLoading() {
  return (
    <div className="space-y-8">
      {/* Search and Filters Header */}
      <div className="card p-6 bg-white border border-slate-100 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Skeleton className="h-11 w-full sm:max-w-md rounded-xl" />
          <div className="flex gap-2 w-full sm:w-auto">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Featured / Top Grid (4 cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-44 rounded-lg" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between h-56"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="w-7 h-7 rounded-lg" />
                </div>
                <Skeleton className="h-5 w-4/5 rounded-lg" />
                <Skeleton className="h-3.5 w-1/2 rounded" />
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Events Feed Placeholder */}
      <div className="space-y-4 pt-2">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="card p-5 bg-white border border-slate-100 rounded-2xl shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
                <Skeleton className="h-6 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-1/3 rounded" />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <Skeleton className="h-8 w-24 rounded-xl" />
                <Skeleton className="h-9 w-28 rounded-xl" />
              </div>
            </div>
          ))}
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
git add app/events/loading.tsx
git commit -m "feat(events): add loading skeleton for events catalog page"
```

---

### Task 4: Create Event Detail Loading Skeleton

**Files:**
- Create: `app/events/[eventId]/loading.tsx`
- Consumes: `components/ui/Skeleton.tsx`

**Interfaces:**
- Produces: `default function EventDetailLoading(): JSX.Element`

- [ ] **Step 1: Write `app/events/[eventId]/loading.tsx`**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function EventDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation Placeholder */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12 rounded" />
        <span className="text-slate-300">/</span>
        <Skeleton className="h-4 w-48 rounded" />
      </div>

      {/* Main Showcase Card */}
      <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-8">
        {/* Title & Badge */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-9 w-3/4 rounded-xl" />
        </div>

        {/* Info Grid (Date, Time, Location, Capacity) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50/70 rounded-2xl border border-slate-100">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-5 w-28 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Organizer & RSVP Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <Skeleton className="w-11 h-11 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-3 w-36 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>

        {/* Attendees List Placeholder */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <div className="flex flex-wrap gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            ))}
          </div>
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
git add "app/events/[eventId]/loading.tsx"
git commit -m "feat(events): add loading skeleton for event detail page"
```

---

### Task 5: Create Global App Fallback Skeleton

**Files:**
- Create: `app/loading.tsx`
- Consumes: `components/ui/Skeleton.tsx`

**Interfaces:**
- Produces: `default function GlobalLoading(): JSX.Element`

- [ ] **Step 1: Write `app/loading.tsx`**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    <div className="space-y-8 py-6">
      <div className="card p-10 bg-white border border-slate-100 rounded-3xl shadow-sm text-center space-y-4">
        <Skeleton className="h-6 w-48 rounded-full mx-auto" />
        <Skeleton className="h-10 w-3/4 max-w-xl rounded-xl mx-auto" />
        <Skeleton className="h-4 w-2/3 max-w-lg rounded mx-auto" />
        <div className="flex justify-center gap-3 pt-4">
          <Skeleton className="h-11 w-36 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="card p-6 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-3"
          >
            <Skeleton className="w-12 h-12 rounded-2xl" />
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation & linting**

Run: `npx tsc --noEmit; npm run lint`
Expected: 0 errors, clean linting

- [ ] **Step 3: Commit**

```bash
git add app/loading.tsx
git commit -m "feat(app): add root loading skeleton fallback"
```
