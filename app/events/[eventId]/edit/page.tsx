import { auth } from "@/auth";
import EditEventForm from "@/components/EditEventForm";
import { getEventById } from "@/lib/data/events";
import { notFound, redirect } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/events/${eventId}/edit`);
  }

  const event = await getEventById(eventId);

  if (!event) {
    notFound();
  }

  // Ensure only the event organizer can access the edit screen
  if (event.userId !== session.user.id) {
    redirect(`/events/${eventId}`);
  }

  return <EditEventForm event={event} />;
}
