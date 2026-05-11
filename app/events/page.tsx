// app/events/page.tsx
import HeaderSection from "@/components/events/sections/HeaderSection";
import MainSection from "@/components/events/sections/MainSection";
import { getPublishedEvents } from "@/app/actions/events";

async function getApprovedEvents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_SERVER}/events/approved`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || data || [];
  } catch {
    return [];
  }
}

export default async function Events() {
  // Fetch both in parallel
  const [response, approvedEvents] = await Promise.all([
    getPublishedEvents(),
    getApprovedEvents(),
  ]);

  return (
    <div>
      <HeaderSection
        title="Events"
        description="Discover immersive experiences hosted by deCave. Culture, music, and community - all in one place"
        label="WHAT WE HAVE FOR YOU"
        backgroundImage="/events/hero-img.jpeg"
      />
      <MainSection
        initialEvents={response.data}
        approvedEvents={approvedEvents}
      />
    </div>
  );
}