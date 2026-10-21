"use client";

import DeleteEventModal from "@/components/DeleteEventModal";
import { deleteEvent } from "@/lib/event-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EventActionProps {
  eventId: string;
  eventTitle?: string;
}

export default function EventActions({ eventId, eventTitle }: EventActionProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const result = await deleteEvent(eventId);
      if (result.success) {
        setIsModalOpen(false);
        router.push("/dashboard");
      } else {
        setDeleteError(result.error || "Failed to delete event");
      }
    } catch (err) {
      console.error(err);
      setDeleteError("An error occurred while deleting the event");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleOpenModal() {
    setDeleteError(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    if (!isDeleting) {
      setIsModalOpen(false);
      setDeleteError(null);
    }
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          className="btn-secondary"
          onClick={() => router.push(`/events/${eventId}/edit`)}
        >
          Edit Event
        </button>
        <button
          className="btn-danger"
          onClick={handleOpenModal}
          disabled={isDeleting}
        >
          Delete Event
        </button>
      </div>

      <DeleteEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        eventTitle={eventTitle}
        error={deleteError}
      />
    </>
  );
}

