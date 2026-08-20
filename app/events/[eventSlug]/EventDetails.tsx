"use client";

import { useRouter } from "next/navigation";
import ImageFeatureTimeline from "@/components/layout/ImageFeatureTimeline";
import SectionHeader from "@/components/layout/sectionHeader";
import RecommendedList from "@/components/events/event/RecommendList";
import EventHero from "./sections/EventHero";
import EventAbout from "./sections/EventAbout";
import EventContentSections from "./sections/EventContentSections";
import EventTickets from "./sections/EventTickets";
import EventExperience from "./sections/EventExperience";
import EventSafetyAndContact from "./sections/EventSafetyAndContact";
import EventCallToAction from "./sections/EventCallToAction";
import { features } from "@/lib/data";
import { recommendedItems, notAllowedItems } from "@/lib/data";
import { type Event } from "@/app/actions/events";
import EventFAQ from "./sections/EventFAQ";
import LineUpImageCard from "@/components/artists/LineUpImageCard";
import Lineup from "./sections/Lineup";
import VideoFeatureTimeline from "@/components/layout/VideoFeatureTimeline";
import { color } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/layout/Button";
import { getTicketAvailability } from "@/lib/ticketAvailability";
import { useTrackVisit } from "@/lib/useTrackVisit";

const AFROSPOOK_WHATSAPP_LINK =
  "https://chat.whatsapp.com/F4lSwC5tUOu6KStqUkz19Y?mode=gi_t";

interface EventDetailsProps {
  event: Event;
  referral?: string;
}

export default function EventDetails({ event, referral }: EventDetailsProps) {
  const router = useRouter();

  // Fires once per page load and reports where this visitor came
  // from (utm_source, or the referrer if untagged). The returned id
  // gets carried into checkout so a resulting sale can be traced
  // back to its traffic source.
  const sessionRef = useTrackVisit(event.id);

  const startDate = new Date(event.eventDetails.startDate);
  const endDate = new Date(event.eventDetails.endDate);
  console.log("Event details: ",  event.eventDetails);

  // Check if event has passed
  const isEventPast = endDate < new Date();

  const formatDateRange = () => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  // Ticket purchase
  const handleTicketPurchase = (ticketId: string) => {
    // Prevent purchase for past events
    if (isEventPast) return;

    const ticket = event.tickets.find((t) => t._id === ticketId);
    if (!ticket) return;

      if (getTicketAvailability(ticket) !== "available") return;


    sessionStorage.setItem(
      "selectedTicket",
      JSON.stringify({
        ticketId: ticket._id,
        ticketName: ticket.ticketName,
        price: ticket.price,
        currency: ticket.currency,
        eventId: event.id,
        eventName: event.eventDetails.eventTitle,
        eventDate: event.eventDetails.startDate,
        eventLocation: `${event.eventDetails.venue}, ${event.eventDetails.address}`,
        sessionRef,
      }),
    );

router.push(`/checkout?ticket=${ticket._id}${referral ? `&referral=${referral}` : ""}`);
  };

  const handleScrollToTickets = (path: string) => {
    const section = document.getElementById(path);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const isAfroSpookEvent = event.eventDetails.eventTitle
    ?.toLowerCase()
    .includes("afrospook");

  const experienceSlides =
    event.aboutEvent?.content?.map((item, index) => ({
      id: index,
      image: item.supportingImage,
      tag: "Event Experience",
      title: item.subTitle,
      description: item.sectionContent,
    })) ?? [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <EventHero
        eventTitle={event.eventDetails.eventTitle}
        eventBanner={event.eventDetails.eventBanner}
        eventType={event.eventDetails.eventType}
        startDate={startDate}
        supportingText={event.eventDetails.supportingText}
        dateRange={formatDateRange()}
        venue={event.eventDetails.venue}
        address={event.eventDetails.address}
        brandColor={event.eventDetails.brandColor}
        isEventPast={isEventPast}
        onBuyTicket={handleScrollToTickets}
      />

    {/* AfroSpook WhatsApp Community */}
{isAfroSpookEvent && (
  <section className="px-4 sm:px-6 lg:px-16 py-8 sm:py-10 bg-[#151515] border-b border-[#2a2a2a]">
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 rounded-2xl px-5 sm:px-8 py-6 sm:py-7"
      style={{
        background: `linear-gradient(90deg, ${event.eventDetails.brandColor.primaryColor} 0%, ${event.eventDetails.brandColor.secondaryColor} 100%)`,
      }}
    >
      <div className="flex items-center gap-4 text-center sm:text-left">
        <FaWhatsapp className="text-white text-4xl sm:text-5xl shrink-0" />
        <div>
          <p className="text-white font-bold text-lg sm:text-xl">
            Join the AfroSpook WhatsApp Community
          </p>
          <p className="text-white/85 text-sm sm:text-base">
            Get updates, connect with other attendees, and stay in the loop.
          </p>
        </div>
      </div>
      <Button
        variant="primary"
        icon={FaWhatsapp}
        iconPosition="left"
        color={event.eventDetails.brandColor.primaryColor}
        href={AFROSPOOK_WHATSAPP_LINK}
        external
        className="w-full sm:w-auto shadow-lg shadow-black/20 whitespace-nowrap"
      >
        Join WhatsApp Community
      </Button>
    </div>
  </section>
)}

      {/* About Section */}
      <EventAbout
        eventTitle={event.eventDetails.eventTitle}
        eventTheme={event?.aboutEvent?.heading ?? ""}
        supportingText={event.aboutEvent?.description ?? ""}
        eventBanner={event.eventDetails.eventBanner}
        brandColor={event.eventDetails.brandColor}
        artistLineUp={event.artistLineUp}
      />

      

      {/* Tickets Section */}
      <EventTickets
        eventTitle={event.eventDetails.eventTitle}
        tickets={event.tickets}
        startDate={startDate}
        dateRange={formatDateRange()}
        isEventPast={isEventPast}
        onTicketPurchase={handleTicketPurchase}
        color={event.eventDetails.brandColor.primaryColor}
      />

      <Lineup Lineup={event.artistLineUp} />

      {/* Event Experience */}
      <EventExperience
      color={event.eventDetails.brandColor.primaryColor}
        eventTitle={event.eventDetails.eventTitle}
        venue={event.eventDetails.venue}
        experienceSlides={experienceSlides}
      />

      {/* Vibes & Sound */}
      {event.eventDetails.eventTitle === "Loud Room" && (
      <div className="lg:px-16 py-12 bg-[#151515] px-4">
        <SectionHeader
          title="Sound Before Status."
          label="Vibes & Sound"
          labelColor="#0854A7"
          description="Loud Room is built for those who move when the bass hits - not when the camera turns."
        />

        <VideoFeatureTimeline
          videoUrl="https://res.cloudinary.com/djy70g2ox/video/upload/v1771586314/decave/videos/sxtrmaq54zw8aozjoxmd.mp4"
          poster="https://example.com/thumbnail.jpg"
          features={event.code}
        />
      </div>
      )}

      {/* Safety & Contacts */}
      {event.emergencyContact && (
        <EventSafetyAndContact color={event.eventDetails.brandColor.primaryColor} emergencyContact={event.emergencyContact} />
      )}

      {/* Frequently asked questions */}
      <EventFAQ  faqData={event.faq} color={event.eventDetails.brandColor.primaryColor} />

      {/* What to Bring */}
      <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
        <SectionHeader title="What to Bring" />
        <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
          <RecommendedList
            recommendedItems={recommendedItems}
            notAllowedItems={notAllowedItems}
          />
        </div>
      </section>

      {/* Call to Action */}
      {!isEventPast && (
        <EventCallToAction
          eventTitle={event.eventDetails.eventTitle}
          dateRange={formatDateRange()}
          venue={event.eventDetails.venue}
          address={event.eventDetails.address}
          brandColor={event.eventDetails.brandColor}
          hasTickets={event.tickets.length > 0}
          onScrollToTickets={handleScrollToTickets}
        />
      )}
    </div>
  );
}