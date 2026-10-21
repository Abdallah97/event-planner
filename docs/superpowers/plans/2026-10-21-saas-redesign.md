# Modern SaaS Event Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Event Planner application into a modern, light-themed SaaS dashboard matching the reference screenshot with a left navigation sidebar, pastel category cards, interactive data table, and elevated card styling across all views.

**Architecture:** Update Tailwind design tokens and utility classes in `globals.css`. Introduce persistent `Sidebar` and `Header` shell components in `layout.tsx`. Redesign `EventsList` to feature the top 4-card upcoming carousel/grid and the lower comprehensive event management table. Harmonize the `Dashboard`, `Create Event`, and `Event Details` pages to match the new visual identity.

**Tech Stack:** Next.js 15 (App Router, Turbopack), React 19, Tailwind CSS v4, Prisma ORM, Auth.js (NextAuth v5), TypeScript, Lucide/Heroicons SVG paths.

## Global Constraints
- Canvas background: `#f8f9fc` with soft violet ambient glow.
- Surface cards: Pure white `#ffffff`, rounded-2xl / rounded-3xl with `border-slate-100` and soft elevation shadows.
- Primary brand accent: `#7c3aed` (Violet-600).
- Retain all existing Prisma database interactions, server actions, and Auth.js session handling.

---

### Task 1: Theme & Design System Foundation

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update design tokens and base utility classes in `app/globals.css`**
  - Set light canvas background `--color-background: #f8f9fc`.
  - Set primary brand color `--color-primary: #7c3aed`.
  - Set foreground text `--color-foreground: #0f172a` and muted `--color-muted: #64748b`.
  - Update `.card` styling to white with subtle border and elevation.
  - Update `.input-field` to crisp light inputs with violet focus rings.
  - Add pastel badge and progress utilities (`pastel-pink`, `pastel-blue`, `pastel-amber`, `pastel-teal`).

- [ ] **Step 2: Commit theme changes**
  - Git commit: `style: update design tokens and utility classes for light SaaS theme`

---

### Task 2: Global Shell Architecture (Sidebar, Header, Layout)

**Files:**
- Create: `components/Sidebar.tsx`
- Create: `components/Header.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/Navbar.tsx` (retained as responsive header/mobile component or unified)

- [ ] **Step 1: Create `components/Sidebar.tsx`**
  - Implement left-side persistent navigation with logo and calendar icon.
  - Navigation links: Dashboard (`/dashboard`), Events (`/events`), Create Event (`/events/create`), Calendar (`#calendar`), Settings (`#settings`).
  - Active state indicator with violet pill highlight and text color.
  - "Upgrade to Pro" gradient banner card at the bottom.
  - User session footer with avatar, name, and logout action.
  - Mobile collapse state and responsiveness.

- [ ] **Step 2: Create `components/Header.tsx`**
  - Search bar input.
  - Top tabs: `[ Overview ]` and `[ Calendar ]`.
  - Quick "Create Event" CTA and user avatar/status indicator.

- [ ] **Step 3: Update `app/layout.tsx`**
  - Wrap application content in two-column shell (Sidebar + Main Content Area with Header).
  - Test responsiveness for desktop and mobile.

- [ ] **Step 4: Commit shell components**
  - Git commit: `feat: implement left sidebar navigation and header shell`

---

### Task 3: Redesign Events Page & EventsList Component

**Files:**
- Modify: `components/EventsList.tsx`
- Modify: `app/events/page.tsx`

- [ ] **Step 1: Implement "Upcoming Events" Card Grid in `components/EventsList.tsx`**
  - Calculate "X days left" countdown for each upcoming event.
  - Cycle through pastel theme accents:
    - Pink: Birthday / Celebrations
    - Sky Blue: Weddings / Gatherings
    - Amber: Tech / Workshops / Seminars
    - Teal: Charity / Community
  - Render icon badge, title, capacity progress bar with gradient fill and percentage, and assignee avatar(s).

- [ ] **Step 2: Implement "Manage Events" Data Table in `components/EventsList.tsx`**
  - Render header with `[ Active (X) ]` and `[ Completed (Y) ]` pill filters.
  - Add search input, `Sort by` dropdown, and `Event type` filter.
  - Render modern table with columns:
    - Event name (linking to event details)
    - Date formatted e.g. "August 19, 2026"
    - Event Type / Category tag
    - Assignees / Organizer with online status indicator dot
    - Capacity / Tasks progress fraction (e.g. "52/60")
    - Status pill badge (`Upcoming` / `Past`)
    - Action dropdown (`...`) with View, Edit, and Delete options.

- [ ] **Step 3: Commit Events page redesign**
  - Git commit: `feat: redesign events page with upcoming cards grid and manage events table`

---

### Task 4: Redesign Create Event Form

**Files:**
- Modify: `app/events/create/page.tsx`

- [ ] **Step 1: Update form container and inputs to match light SaaS styling**
  - Pure white elevated container with generous rounded corners.
  - Crisp light input fields with violet focus outlines.
  - Clean date-time picker, category selection, and visibility checkbox.
  - Primary violet submit button and secondary cancel button.

- [ ] **Step 2: Commit create event redesign**
  - Git commit: `style: update create event page with light modern form design`

---

### Task 5: Redesign Dashboard & Event Detail Pages

**Files:**
- Modify: `app/dashboard/page.tsx`
- Modify: `app/events/[eventId]/page.tsx`
- Modify: `components/RSVPButtons.tsx`

- [ ] **Step 1: Update `app/dashboard/page.tsx`**
  - Summary metric cards (Total Events, RSVPs, Upcoming attendance).
  - Modern table of user's organized events.
  - Clean card list of user's RSVP'd events.

- [ ] **Step 2: Update `app/events/[eventId]/page.tsx` and `components/RSVPButtons.tsx`**
  - Redesign event showcase card with category badge, organizer info, and location.
  - Styled RSVP buttons (`GOING`, `MAYBE`, `NOT_GOING`) with active state highlights.
  - List attendee avatars and status badges.

- [ ] **Step 3: Commit dashboard and detail page updates**
  - Git commit: `style: harmonize dashboard and event detail views with modern SaaS design`

---

### Task 6: Verification & Final Polish

**Files:**
- All touched files

- [ ] **Step 1: Run TypeScript check**
  - Run `npx tsc --noEmit` and confirm zero errors.

- [ ] **Step 2: Run Next.js production build**
  - Run `npm run build` and confirm all routes compile cleanly.

- [ ] **Step 3: Test routes in browser**
  - Test `/events`, `/dashboard`, `/events/create`, `/events/[eventId]`.
