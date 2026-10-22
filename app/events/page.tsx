import { auth } from "@/auth";
import EventsList from "@/components/EventsList";
import { getEvents } from "@/lib/data/events";
import { Event } from "@/lib/models";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;

  const eventsData = await getEvents(sp);

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
