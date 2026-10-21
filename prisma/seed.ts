import { PrismaClient, RVSPStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Create or get demo users
  const organizer1 = await prisma.user.upsert({
    where: { email: "alex.johnson@eventplanner.com" },
    update: {},
    create: {
      name: "Alex Johnson",
      email: "alex.johnson@eventplanner.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
  });

  const organizer2 = await prisma.user.upsert({
    where: { email: "sarah.chen@eventplanner.com" },
    update: {},
    create: {
      name: "Sarah Chen",
      email: "sarah.chen@eventplanner.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
  });

  const attendee = await prisma.user.upsert({
    where: { email: "michael.dev@eventplanner.com" },
    update: {},
    create: {
      name: "Michael Brown",
      email: "michael.dev@eventplanner.com",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    },
  });

  console.log("👤 Created / verified seed users.");

  // 2. Define events
  const now = new Date();

  const eventsData = [
    {
      title: "Next.js & React 19 Full-Stack Summit",
      description:
        "Join fellow developers for a deep dive into the latest App Router features, Server Actions, Server Components, and Turbopack performance optimization.",
      location: "San Francisco Tech Center, CA (Hybrid)",
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
      maxAttendees: 250,
      isPublic: true,
      userId: organizer1.id,
    },
    {
      title: "AI & Machine Learning Builders Meetup",
      description:
        "Connect with AI engineers and founders building practical generative AI applications, agent workflows, and vector search systems.",
      location: "Capital Factory, Austin, TX",
      date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // +14 days
      maxAttendees: 120,
      isPublic: true,
      userId: organizer2.id,
    },
    {
      title: "Indie Hackers & Founders Networking Mixer",
      description:
        "An informal evening of drinks, networking, and lightning pitches for solo founders, bootstrapped developers, and creators.",
      location: "WeWork Lounge, Brooklyn, NY",
      date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // +21 days
      maxAttendees: 80,
      isPublic: true,
      userId: organizer1.id,
    },
    {
      title: "Modern UI/UX Design System Workshop",
      description:
        "Learn how to build scalable Tailwind design tokens, accessible components, and micro-interactions in modern web applications.",
      location: "Virtual Event (Zoom)",
      date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // +30 days
      maxAttendees: 300,
      isPublic: true,
      userId: organizer2.id,
    },
    {
      title: "Cloud Architecture & DevOps Day 2026",
      description:
        "Explore serverless infrastructure, containerization, edge functions, and real-time database management at scale.",
      location: "Convention Pavilion, Seattle, WA",
      date: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000), // +45 days
      maxAttendees: 175,
      isPublic: true,
      userId: organizer1.id,
    },
    {
      title: "Global Open Source Hackathon 2026",
      description:
        "A 48-hour collaborative hackathon building open source developer tooling, documentation, and web accessibility improvements.",
      location: "Innovation Hub, Chicago, IL",
      date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), // +60 days
      maxAttendees: 200,
      isPublic: true,
      userId: organizer2.id,
    },
    {
      title: "Startup Pitch & Demo Day 2026",
      description:
        "Watch 10 innovative tech startups pitch live to leading angel investors and venture capital firms.",
      location: "District Hall, Boston, MA",
      date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago (past)
      maxAttendees: 150,
      isPublic: true,
      userId: organizer1.id,
    },
    {
      title: "Web Performance & Turbopack Deep Dive",
      description:
        "Case studies on cutting build times by 80% and diagnosing memory and bundle size bottlenecks.",
      location: "Virtual Event",
      date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago (past)
      maxAttendees: 500,
      isPublic: true,
      userId: organizer2.id,
    },
  ];

  // 3. Insert events if they don't already exist
  console.log("📅 Seeding events...");
  const createdEvents = [];

  for (const eventData of eventsData) {
    const existing = await prisma.event.findFirst({
      where: {
        title: eventData.title,
        userId: eventData.userId,
      },
    });

    if (!existing) {
      const event = await prisma.event.create({
        data: eventData,
      });
      createdEvents.push(event);
      console.log(`   + Created: "${event.title}"`);
    } else {
      createdEvents.push(existing);
      console.log(`   ~ Already exists: "${existing.title}"`);
    }
  }

  // 4. Create sample RSVPs
  console.log("🤝 Creating sample RSVPs...");
  if (createdEvents.length > 0) {
    // Organizer 2 attends Organizer 1's summit
    await prisma.rSVP.upsert({
      where: {
        userId_eventId: {
          userId: organizer2.id,
          eventId: createdEvents[0].id,
        },
      },
      update: {},
      create: {
        userId: organizer2.id,
        eventId: createdEvents[0].id,
        status: RVSPStatus.GOING,
      },
    });

    // Attendee attends Summit and AI meetup
    await prisma.rSVP.upsert({
      where: {
        userId_eventId: {
          userId: attendee.id,
          eventId: createdEvents[0].id,
        },
      },
      update: {},
      create: {
        userId: attendee.id,
        eventId: createdEvents[0].id,
        status: RVSPStatus.GOING,
      },
    });

    if (createdEvents.length > 1) {
      await prisma.rSVP.upsert({
        where: {
          userId_eventId: {
            userId: attendee.id,
            eventId: createdEvents[1].id,
          },
        },
        update: {},
        create: {
          userId: attendee.id,
          eventId: createdEvents[1].id,
          status: RVSPStatus.MAYBE,
        },
      });
    }
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
