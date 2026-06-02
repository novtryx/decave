import { getEventByTitle } from "@/app/actions/events";
import EventDetails from "./EventDetails";
import { notFound } from "next/navigation";
import { slugToTitle } from "@/utils/slugify";
import type { Metadata } from "next";
import type { Event } from "@/app/actions/events";

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventSlug: string }>;
}): Promise<Metadata> {
  const { eventSlug } = await params;
  const eventTitle = slugToTitle(eventSlug);

  let event: Event | null = null;

  try {
    event = await getEventByTitle(eventTitle);
  } catch {
    // fall through to defaults
  }

  if (!event) {
    return {
      title: "Event Not Found",
      description: "This event could not be found.",
    };
  }

  const { eventDetails } = event;

  const title = eventDetails.eventTitle;
  const description =
    event.aboutEvent?.description ??
    `Join us for ${title} — ${eventDetails.eventType} at ${eventDetails.venue}, ${eventDetails.address}.`;

  const image = eventDetails.eventBanner ?? eventDetails.eventBanner ?? null;

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/events/${eventSlug}`;

  return {
    title,
    description,

    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "deCave",        // ← change to your site name
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },

    alternates: {
      canonical: url,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventSlug: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { eventSlug } = await params;
  const { ref } = await searchParams;

  const eventTitle = slugToTitle(eventSlug);

  try {
    const event = await getEventByTitle(eventTitle);
    if (!event) notFound();
    return <EventDetails event={event} referral={ref} />;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    notFound();
  }
}