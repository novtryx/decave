import { getEventByTitle } from "@/app/actions/events";
import EventDetails from "./EventDetails";
import { notFound } from "next/navigation";
import { slugToTitle } from "@/utils/slugify";

export default async function EventPage({
  params,
  searchParams
}: {
  params: Promise<{ eventSlug: string }>;
    searchParams: Promise<{ ref?: string }>;

}) {
  const { eventSlug } = await params; 
    const { ref } = await searchParams;  // your referral code

  
  // Convert slug back to title
  const eventTitle = slugToTitle(eventSlug);

  try {
    const event = await getEventByTitle(eventTitle);
    // console.log("full event is", event)

    if (!event) {
      notFound();
    }

    return <EventDetails event={event} referral={ref}/>;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    notFound();
  }
}