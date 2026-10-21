# Design Specification: SaaS Event Planner Dashboard Redesign

**Date:** 2026-10-21  
**Status:** Approved  
**Topic:** Full Application Visual & Structural Redesign to Match Reference Modern SaaS Look and Feel  

---

## 1. Executive Summary

This specification outlines the visual, stylistic, and architectural transformation of the Event Planner application. The goal is to evolve the user interface from a basic dark-navy theme to a premier, light-themed SaaS event management dashboard inspired by the provided reference design.

The redesign features a persistent left navigation sidebar with clean icons, pastel-accented event cards with progress indicators, an interactive event management table with filtering and sorting, and harmonious styling across all application views (Dashboard, Events, Event Detail, and Create Event).

---

## 2. Design System & Theme Specification

### 2.1 Color Palette & Theme Tokens
- **Canvas / Background:** `#f8f9fc` (very soft cool grey/off-white) with subtle lavender/purple ambient glow (`rgba(124, 58, 237, 0.03)` to `rgba(124, 58, 237, 0.08)`).
- **Cards & Surfaces:** `#ffffff` with hairline border `border-slate-100` and soft ambient elevation `shadow-sm shadow-purple-500/5`.
- **Primary / Brand:** `#7c3aed` (Violet 600) with hover state `#6d28d9` (Violet 700) and focus ring `#8b5cf6`.
- **Text & Content:**
  - Headings: `#0f172a` (Slate 900)
  - Body / Subtext: `#475569` (Slate 600)
  - Muted / Placeholders: `#94a3b8` (Slate 400)
- **Category Accents (Pastel Card System):**
  - **Pink / Celebration & Birthdays:**
    - Background: `#fdf2f8` (Pink 50)
    - Icon & Progress Fill: `#ec4899` (Pink 500)
    - Border: `#fbcfe8` (Pink 200)
  - **Sky Blue / Weddings & Social:**
    - Background: `#eff6ff` (Blue 50)
    - Icon & Progress Fill: `#3b82f6` (Blue 500)
    - Border: `#bfdbfe` (Blue 200)
  - **Warm Amber / Tech, Conferences & Seminars:**
    - Background: `#fff7ed` (Orange 50)
    - Icon & Progress Fill: `#f97316` (Orange 500)
    - Border: `#fed7aa` (Orange 200)
  - **Teal / Charity, Gala & Community:**
    - Background: `#f0fdfa` (Teal 50)
    - Icon & Progress Fill: `#14b8a6` (Teal 500)
    - Border: `#99f6e4` (Teal 200)
  - **Violet / Default:**
    - Background: `#f5f3ff` (Violet 50)
    - Icon & Progress Fill: `#7c3aed` (Violet 600)
    - Border: `#ddd6fe` (Violet 200)

### 2.2 Typography & Elements
- **Border Radius:** Generous pill corners (`rounded-2xl` and `rounded-3xl` for cards, `rounded-full` for badges and tags).
- **Interactive Badges:** Light pastel pill badges with dark matching text (e.g., `Upcoming`, `Completed`, `Past`).
- **Progress Bars:** Smooth animated rounded progress track (`bg-slate-100` or pastel track) filled with matching category gradient.

---

## 3. Architecture & Component Structure

### 3.1 Global Application Shell (`app/layout.tsx`)
- Replaces the standalone top `Navbar` with a **Two-Column SaaS Dashboard Layout**:
  - **Left Sidebar (`components/Sidebar.tsx`):**
    - Logo with calendar sparkle icon.
    - Navigation items with icons:
      - **Dashboard** (`/dashboard`)
      - **Events** (`/events`) — with active pill highlight
      - **Create Event** (`/events/create`)
      - **Calendar** (`#calendar`)
      - **Settings** (`#settings`)
    - "Upgrade to Pro" gradient promotional card at the bottom.
    - User account summary (avatar, name, email) and sign out trigger.
    - Mobile collapsible drawer toggle for smaller screens.
  - **Main Content Container:**
    - Top header (`components/Header.tsx`) with search bar, notification icon, user status, and "Create Event" CTA.
    - Dynamic page content area with fluid max-width.

### 3.2 Events Page (`app/events/page.tsx` & `components/EventsList.tsx`)
Matches the user's reference mockup:
1. **Top Sub-Navigation:**
   - Pill tabs: `[ Overview ]` (active) and `[ Calendar ]`.
2. **"Upcoming Events" Card Grid:**
   - Top horizontal card row (4 columns responsive).
   - Each card displays:
     - Pastel icon badge (matching category).
     - "X days left" countdown badge.
     - Event Title.
     - Capacity / Tasks progress bar with calculated percentage.
     - Organizer / attendee avatar row.
3. **"Manage Events" Section:**
   - Left header: "Manage Events" title with filter pills: `[ Active (X) ]` and `[ Completed (Y) ]`.
   - Right controls: `Sort by` dropdown (Date, Title, Capacity) and `Event type` filter.
   - Comprehensive data table:
     - **Event name** (clickable to event details)
     - **Date** (e.g., "August 19, 2026")
     - **Type** (e.g., "Birthday", "Wedding", "Seminars & Workshops", "Charity")
     - **Assignees / Organizer** (Avatar with online status dot + Name)
     - **Capacity / RSVPs** (fraction e.g., "52/60")
     - **Status** (Pastel `Upcoming` or `Completed` pill badge)
     - **Actions** (Three dots menu with View, Edit, Delete options)

### 3.3 Dashboard Page (`app/dashboard/page.tsx`)
- Redesigned into modern SaaS metrics and tables:
  - Metric summary cards: Total Events Created, Total RSVPs, Upcoming Attendance.
  - "My Created Events" table matching the new table aesthetics.
  - "My RSVPs" list with status indicators.

### 3.4 Create & Edit Event Pages (`app/events/create/page.tsx`)
- Transformed from dark form to clean white elevated card.
- Light inputs with violet focus rings, accessible labels, validation indicators.

### 3.5 Event Details Page (`app/events/[eventId]/page.tsx`)
- Elevated white card showcase with date badge, organizer card, RSVP action buttons (`GOING`, `MAYBE`, `NOT_GOING`), and attendee avatars list.

---

## 4. Data Flow & Integration
- Retains existing Next.js App Router, Prisma ORM, and Auth.js backend pipelines.
- Maps existing Prisma models (`Event`, `User`, `RSVP`) cleanly:
  - `Event.date` -> "X days left" calculation and formatted date string.
  - `Event.rsvps` -> Capacity calculation and attendee avatars.
  - `Event.user` -> Organizer name and avatar.
  - Categorization dynamically derived from event keywords or seeded tags (e.g., Birthday, Wedding, Seminar, Conference, Charity).

---

## 5. Verification & Testing Strategy
1. **TypeScript Validation:** Run `npx tsc --noEmit` to verify type safety.
2. **Build Verification:** Run `npm run build` to ensure static page optimization, server actions, and client components build with zero errors.
3. **Interactive Validation:** Validate routes `/`, `/events`, `/dashboard`, `/events/create`, and `/events/[eventId]` in browser to verify layout responsiveness, navigation, and interactions.
