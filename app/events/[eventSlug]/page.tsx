// import { getEventByTitle } from "@/app/actions/events";
// import EventDetails from "./EventDetails";
// import { notFound } from "next/navigation";

// export default async function EventPage({
//   params,
// }: {
//   params: Promise<{ eventTitle: string }>;
// }) {
//   const { eventTitle } = await params;
//   const decodedTitle = decodeURIComponent(eventTitle);

//   try {
//     const event = await getEventByTitle(decodedTitle);

//     if (!event) {
//       notFound();
//     }

//     return <EventDetails event={event} />;
//   } catch (error) {
//     console.error("Failed to fetch event:", error);
//     notFound();
//   }
// }

import { getEventByTitle } from "@/app/actions/events";
import EventDetails from "./EventDetails";
import { notFound } from "next/navigation";
import { slugToTitle } from "@/utils/slugify";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventSlug: string }>; // Changed from eventTitle to eventSlug
}) {
  const { eventSlug } = await params; // Changed from eventTitle to eventSlug
  
  // Convert slug back to title (e.g., "demo-event" -> "Demo Event")
  const eventTitle = slugToTitle(eventSlug);

  try {
    const event = await getEventByTitle(eventTitle);

    if (!event) {
      notFound();
    }

    return <EventDetails event={event} />;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    notFound();
  }
}