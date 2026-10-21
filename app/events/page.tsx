import { auth } from "@/auth";
import EventsList from "@/components/EventsList";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;

  const params = new URLSearchParams();
  if (sp.search) params.set("search", sp.search);
  if (sp.filter) params.set("filter", sp.filter);

  const eventsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/events?${params.toString()}`,
    { next: { tags: ["events"] } }
  );
  const events = eventsResponse.ok ? await eventsResponse.json() : [];

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
