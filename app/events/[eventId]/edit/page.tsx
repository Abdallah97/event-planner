import { auth } from "@/auth";
import EditEventForm from "@/components/EditEventForm";
import { getEventById } from "@/lib/data/events";
import { forbidden, notFound, unauthorized } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    unauthorized();
  }

  const event = await getEventById(eventId);

  if (!event) {
    notFound();
  }

  // Ensure only the event organizer can access the edit screen
  if (event.userId !== session.user.id) {
    forbidden();
  }

  return <EditEventForm event={event} />;
}
