// components/events/sections/MainSection.tsx
"use client";

import { useState } from "react";
import { FeaturedEventCard } from "../ui/FeaturedEventCard";
import { FaRegStar } from "react-icons/fa";
import { IoMusicalNotesSharp } from "react-icons/io5";
import ImageCard from "@/components/layout/ImageCard";
import { GoPeople } from "react-icons/go";
import ViewMoreButton from "@/components/layout/ViewMoreButton";
import SectionHeader from "@/components/layout/sectionHeader";
import CallToAction from "@/components/layout/CallToAction";
import { useRouter } from "next/navigation";
import TabNavigation from "@/components/layout/TabNavigation";
import { type Event } from "@/app/actions/events";
import { createSlug } from "@/utils/slugify";

interface MainSectionProps {
  initialEvents: Event[];
  approvedEvents: any[];
}

export default function MainSection({ initialEvents, approvedEvents }: MainSectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [events] = useState<Event[]>(initialEvents);
  const router = useRouter();

  const tabs = [
    { id: "all",      label: "All Events" },
    { id: "upcoming", label: "Upcoming"   },
    { id: "past",     label: "Past"       },
  ];

  const isUpcoming = (event: Event) =>
    new Date(event.eventDetails.startDate) > new Date();

  const filteredEvents = events.filter((event) => {
    if (activeTab === "upcoming") return isUpcoming(event);
    if (activeTab === "past")     return !isUpcoming(event);
    return true;
  });

  const upcomingEvents = events.filter(isUpcoming);
  const pastEvents     = events.filter((e) => !isUpcoming(e));

  const featuredEvent = upcomingEvents.length > 0
    ? [...upcomingEvents].sort(
        (a, b) =>
          new Date(a.eventDetails.startDate).getTime() -
          new Date(b.eventDetails.startDate).getTime()
      )[0]
    : events[0];

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end   = new Date(endDate);
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  const formatExternalDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const calculateAttendees = (event: Event) => {
    const sold = event.tickets.reduce(
      (total, ticket) => total + (ticket.initialQuantity - ticket.availableQuantity),
      0
    );
    return sold > 1000 ? `${(sold / 1000).toFixed(1)}K+` : `${sold}+`;
  };

  function spaceToUnderscore(str: string) {
    return str.replace(/ /g, "_");
  }

  return (
    <div>
      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <p className="text-[#b3b3b3] px-6 lg:px-16 text-xl">
        {filteredEvents.length} Event{filteredEvents.length !== 1 ? "s" : ""} found
      </p>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="bg-[#0f0f0f] mt-10 px-6 lg:px-16 py-14">
          <div className="flex gap-3 items-center mb-8 text-[#0854a7]">
            <FaRegStar />
            <h4>FEATURED EVENT</h4>
          </div>
          <FeaturedEventCard
            image={featuredEvent.eventDetails.eventBanner || "/events/afrospook-event-img.png"}
            attendees={calculateAttendees(featuredEvent)}
            category={featuredEvent.eventDetails.eventType.toUpperCase()}
            label={isUpcoming(featuredEvent) ? "UPCOMING" : "PAST"}
            title={featuredEvent.eventDetails.eventTitle}
            description={featuredEvent.eventDetails.supportingText}
            dateRange={formatDate(featuredEvent.eventDetails.startDate, featuredEvent.eventDetails.endDate)}
            location={`${featuredEvent.eventDetails.venue} - ${featuredEvent.eventDetails.address}`}
            buttonText="View Event Details"
            onViewDetails={() =>
              router.push(`/events/${createSlug(featuredEvent.eventDetails.eventTitle)}`)
            }
          />
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
          <SectionHeader
            title="DeCave Events"
            description="Don't miss out these upcoming experiences"
          />
          <div className="my-14 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
            {upcomingEvents.slice(0, 6).map((event) => {
              const isSoldOut = event.tickets.every((t) => t.availableQuantity === 0);
              return (
                <ImageCard
                  key={event.id}
                  image={event.eventDetails.eventBanner || "/events/afrospook-event-img.png"}
                  title={event.eventDetails.eventTitle}
                  badge={{
                    text:      isSoldOut ? "SOLD OUT" : event.eventDetails.eventType.toUpperCase(),
                    bgColor:   isSoldOut ? "#ef4444"  : "#EEF6FFCC",
                    textColor: isSoldOut ? "#fff"      : "#001D3D",
                  }}
                  peopleCount={calculateAttendees(event)}
                  icon={GoPeople}
                  date={formatDate(event.eventDetails.startDate, event.eventDetails.endDate)}
                  location={event.eventDetails.venue}
                  buttonText={isSoldOut ? "Sold Out" : "View Event"}
                  buttonVariant="outline"
                  onButtonClick={() =>
                    router.push(`/events/${createSlug(event.eventDetails.eventTitle)}`)
                  }
                />
              );
            })}
          </div>
          {upcomingEvents.length > 6 && <ViewMoreButton text="View All Events" />}
        </section>
      )}

 {/* ── Other Organizers' Events ── */}
      {approvedEvents.length > 0 && (
        <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
          <SectionHeader
            // icon={IoMusicalNotesSharp}
            iconColor="#7B3FE4"
            // label="What's Next?"
            title="Discover Events from Other Organizers Approved by Decave"
            description="Explore events created by other organizers and find something new to attend."
          />
          <div className="my-14 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
            {approvedEvents.map((event: any) => (
              <ImageCard
                key={event.id}
                image={event.banner || "/card-image.png"}
                title={event.title}
                badge={{ text: "UPCOMING", bgColor: "#FFD159", textColor: "#0A0A0A" }}
                icon={GoPeople}
                peopleCount={event.attendeesCount || 0}
                date={formatExternalDate(event.eventDate)}
                location={event.venue}
                buttonText="Secure Your Place"
                buttonVariant="outline"
                buttonHref={`https://events.decavemgt.com/events/${spaceToUnderscore(event.title)}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
          <SectionHeader
            title="Past Events"
            description="Relive the moments from our previous experiences"
          />
          <div className="my-14 grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
            {pastEvents.slice(0, 6).map((event) => (
              <ImageCard
                key={event.id}
                image={event.eventDetails.eventBanner || "/events/afrospook-event-img.png"}
                title={event.eventDetails.eventTitle}
                badge={{ text: "PAST EVENT", bgColor: "#6b7280", textColor: "#fff" }}
                peopleCount={calculateAttendees(event)}
                icon={GoPeople}
                date={formatDate(event.eventDetails.startDate, event.eventDetails.endDate)}
                location={event.eventDetails.venue}
                buttonText="View Recap"
                buttonVariant="outline"
                onButtonClick={() =>
                  router.push(`/events/${createSlug(event.eventDetails.eventTitle)}`)
                }
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