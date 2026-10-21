import { auth } from "@/auth";
import EditEventForm from "@/components/EditEventForm";
import { prisma } from "@/lib/prisma";
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

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    notFound();
  }

  // Ensure only the event organizer can access the edit screen
  if (event.userId !== session.user.id) {
    redirect(`/events/${eventId}`);
  }

  return <EditEventForm event={event} />;
}
