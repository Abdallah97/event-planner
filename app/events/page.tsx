import { auth } from "@/auth";
import EventsList from "@/components/EventsList";
import { Event } from "@/lib/models";
import { prisma } from "@/lib/prisma";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;

  const where: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (sp.search) {
    where.OR = [
      { title: { contains: sp.search, mode: "insensitive" } },
      { description: { contains: sp.search, mode: "insensitive" } },
      { location: { contains: sp.search, mode: "insensitive" } },
    ];
  }

  if (sp.filter === "upcoming") {
    where.date = { gte: new Date() };
  } else if (sp.filter === "past") {
    where.date = { lt: new Date() };
  }

  const eventsData = await prisma.event.findMany({
    where,
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { rsvps: true } },
    },
    orderBy: { date: "asc" },
  });

  const events = eventsData as unknown as Event[];

  return (
    <div className="space-y-6">
      <EventsList
        events={events}
        searchParams={sp}
        isAuthenticated={!!session}
      />
    </div>
  );
}
