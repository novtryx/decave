import { getEventByTitle } from "@/app/actions/events";
import EventDetails from "./EventDetails";
import { notFound } from "next/navigation";
import { slugToTitle } from "@/utils/slugify";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventSlug: string }>;
}) {
  const { eventSlug } = await params; 
  
  // Convert slug back to title
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