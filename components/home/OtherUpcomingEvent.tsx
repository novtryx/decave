"use client";

import { useEffect, useState } from "react";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import SectionHeader from "../layout/sectionHeader";
import ImageCard from "../layout/ImageCard";
import ViewMoreButton from "../layout/ViewMoreButton";

const fetchApprovedEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_SERVER}/events/approved`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
};

const OtherUpcomingEventsClient = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchApprovedEvents();
        setEvents(data?.data || data); // supports paginated OR raw response
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Format date
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
 function spaceToUnderscore(str: string): string {
  return str.replace(/ /g, "_");
}
  // LOADING STATE
  if (loading) {
    return (
      <div className="py-12 text-center text-gray-400">
        Loading upcoming events...
      </div>
    );
  }

  // EMPTY STATE
  if (!events.length) {
    return null
  }

  return (
    <div className="pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8 sm:gap-10 lg:gap-12">
      
      {/* HEADER */}
      <SectionHeader
        icon={IoMusicalNotesSharp}
        iconColor="#7B3FE4"
        label="Approved by DeCave"
        title="Discover Events from Other Organizers"
description="Explore events created by other organizers and find something new to attend."
      />

      {/* GRID */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 place-items-center sm:place-items-stretch">
          
          {events.map((event: any) => (
            <ImageCard
              key={event.id}
              image={event.banner || "/card-image.png"}
              title={event.title}
              
              badge={{
                text: "UPCOMING",
                bgColor: "#FFD159",
                textColor: "#0A0A0A",
              }}

              icon={GoPeople}
              peopleCount={event.attendeesCount || 0}

              date={formatDate(event.eventDate)}
              location={event.venue}

              buttonText="Secure Your Place"
              buttonVariant="outline"
              buttonHref={`https://events.decavemgt.com/events/${spaceToUnderscore(event.title)}`}
            />
          ))}
        </div>
      </div>

      {/* VIEW MORE */}
      <ViewMoreButton href="/events" text="View All Events" />
    </div>
  );
};

export default OtherUpcomingEventsClient;
