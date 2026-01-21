"use client";

import { useState, useEffect } from "react";
import { FeaturedEventCard } from "../ui/FeaturedEventCard";
import { FaRegStar } from "react-icons/fa";
import ImageCard from "@/components/layout/ImageCard";
import { GoPeople } from "react-icons/go";
import ViewMoreButton from "@/components/layout/ViewMoreButton";
import SectionHeader from "@/components/layout/sectionHeader";
import CallToAction from "@/components/layout/CallToAction";
import { useRouter } from "next/navigation";
import TabNavigation from "@/components/layout/TabNavigation";
import { getPublishedEvents, type Event } from "@/app/actions/events";

export default function MainSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const tabs = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
  ];

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await getPublishedEvents();
        console.log("Events fetched successfully:", response);
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Helper function to determine if event is past or upcoming
  const isUpcoming = (event: Event) => {
    const eventDate = new Date(event.eventDetails.startDate);
    return eventDate > new Date();
  };

  // Filter events based on active tab
  const filteredEvents = events.filter((event) => {
    if (activeTab === "upcoming") return isUpcoming(event);
    if (activeTab === "past") return !isUpcoming(event);
    return true; // "all" tab
  });

  const upcomingEvents = events.filter(isUpcoming);
  const pastEvents = events.filter((event) => !isUpcoming(event));

  // Get featured event (first published event or first upcoming event)
  const featuredEvent = upcomingEvents[0] || events[0];

  // Format date for display
  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  // Calculate total attendees (sold tickets)
  const calculateAttendees = (event: Event) => {
    const soldTickets = event.tickets.reduce(
      (total, ticket) =>
        total + (ticket.initialQuantity - ticket.availableQuantity),
      0,
    );
    return soldTickets > 1000
      ? `${(soldTickets / 1000).toFixed(1)}K+`
      : `${soldTickets}+`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Event filter count */}
      <p className="text-[#b3b3b3] px-6 lg:px-16 text-xl">
        {filteredEvents.length} Event{filteredEvents.length !== 1 ? "s" : ""}{" "}
        found
      </p>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="bg-[#0f0f0f] mt-10 px-6 lg:px-16 py-14">
          <div className="flex gap-3 items-center mb-8 text-[#0854a7]">
            <FaRegStar />
            <h4>FEATURED EVENT</h4>
          </div>

          <FeaturedEventCard
            image={
              featuredEvent.eventDetails.eventBanner ||
              "/events/afrospook-event-img.png"
            }
            attendees={calculateAttendees(featuredEvent)}
            category={featuredEvent.eventDetails.eventType.toUpperCase()}
            label={isUpcoming(featuredEvent) ? "UPCOMING" : "PAST"}
            title={featuredEvent.eventDetails.eventTitle}
            description={featuredEvent.eventDetails.supportingText}
            dateRange={formatDate(
              featuredEvent.eventDetails.startDate,
              featuredEvent.eventDetails.endDate,
            )}
            location={`${featuredEvent.eventDetails.venue} - ${featuredEvent.eventDetails.address}`}
            // onViewDetails={() => `/events/eventTitle/${encodeURIComponent(featuredEvent.eventDetails.eventTitle)}`}
            onViewDetails={() =>
              router.push(
                `/events/eventTitle/${encodeURIComponent(
                  featuredEvent.eventDetails.eventTitle,
                )}`,
              )
            }
          />
        </section>
      )}

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
          <SectionHeader
            title="Upcoming Events"
            description="Don't miss out these upcoming experiences"
          />

          <div className="my-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingEvents.slice(0, 6).map((event) => {
              const isSoldOut = event.tickets.every(
                (ticket) => ticket.availableQuantity === 0,
              );

              return (
                <ImageCard
                  key={event.id}
                  image={
                    event.eventDetails.eventBanner ||
                    "/events/afrospook-event-img.png"
                  }
                  title={event.eventDetails.eventTitle}
                  badge={{
                    text: isSoldOut
                      ? "SOLD OUT"
                      : event.eventDetails.eventType.toUpperCase(),
                    bgColor: isSoldOut ? "#ef4444" : "#EEF6FFCC",
                    textColor: isSoldOut ? "#fff" : "#001D3D",
                  }}
                  peopleCount={calculateAttendees(event)}
                  icon={GoPeople}
                  date={formatDate(
                    event.eventDetails.startDate,
                    event.eventDetails.endDate,
                  )}
                  location={event.eventDetails.venue}
                  buttonText={isSoldOut ? "Sold Out" : "View Event"}
                  buttonVariant="outline"
                  onButtonClick={() => router.push(`/events/${event.id}`)}
                />
              );
            })}
          </div>

          {upcomingEvents.length > 6 && (
            <ViewMoreButton text="View All Events" />
          )}
        </section>
      )}

      {/* Past events */}
      {pastEvents.length > 0 && (
        <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
          <SectionHeader
            title="Past Events"
            description="Relive the moments from our previous experiences"
          />

          <div className="my-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pastEvents.slice(0, 6).map((event) => (
              <ImageCard
                key={event.id}
                image={
                  event.eventDetails.eventBanner ||
                  "/events/afrospook-event-img.png"
                }
                title={event.eventDetails.eventTitle}
                badge={{
                  text: "PAST EVENT",
                  bgColor: "#6b7280",
                  textColor: "#fff",
                }}
                peopleCount={calculateAttendees(event)}
                icon={GoPeople}
                date={formatDate(
                  event.eventDetails.startDate,
                  event.eventDetails.endDate,
                )}
                location={event.eventDetails.venue}
                buttonText="View Recap"
                buttonVariant="outline"
                onButtonClick={() => router.push(`/events/${event.id}`)}
              />
            ))}
          </div>

          {pastEvents.length > 6 && <ViewMoreButton text="View All Events" />}
        </section>
      )}

      {/* Call To Action */}
      <section className="w-full">
        <CallToAction
          backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
          overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
          title="Want to host your event with deCave?"
          description="Partner with us to create unforgettable cultural experiences"
          primaryButton={{
            text: "Partner With Us",
            icon: "arrow",
            onClick: () => console.log("Partner button clicked"),
          }}
          containerClassName="w-full"
        />
      </section>
    </div>
  );
}
