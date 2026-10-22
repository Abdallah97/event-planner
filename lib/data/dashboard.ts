import { Event, EventRSVP } from "@/lib/models";
import { prisma } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
  const [userRSVPsData, userEventsData] = await Promise.all([
    prisma.rSVP.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { event: { date: "asc" } },
    }),
    prisma.event.findMany({
      where: { userId },
      include: {
        _count: {
          select: { rsvps: true },
        },
      },
      orderBy: { date: "asc" },
    }),
  ]);

  return {
    userRSVPs: userRSVPsData as unknown as EventRSVP[],
    userEvents: userEventsData as unknown as Event[],
  };
}
