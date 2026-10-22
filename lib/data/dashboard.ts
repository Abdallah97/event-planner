import { prisma } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
  return Promise.all([
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
}
