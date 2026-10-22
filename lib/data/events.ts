import { prisma } from "@/lib/prisma";

export async function getEvents(params?: { search?: string; filter?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (params?.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
      { location: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params?.filter === "upcoming") {
    where.date = { gte: new Date() };
  } else if (params?.filter === "past") {
    where.date = { lt: new Date() };
  }

  return prisma.event.findMany({
    where,
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { rsvps: true } },
    },
    orderBy: { date: "asc" },
  });
}

export async function getEventWithDetails(eventId: string) {
  return prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: { select: { name: true, email: true } },
      rsvps: {
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      },
      _count: {
        select: { rsvps: true },
      },
    },
  });
}

export async function getEventById(eventId: string) {
  return prisma.event.findUnique({
    where: { id: eventId },
  });
}
