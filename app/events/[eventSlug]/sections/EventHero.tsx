// components/events/event/EventHero.tsx
"use client";

import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";

interface EventHeroProps {
  eventTitle: string;
  eventBanner: string;
  eventType: string;
  startDate: Date;
  supportingText: string;
  dateRange: string;
  venue: string;
  address: string;
  brandColor: {
    primaryColor: string;
    secondaryColor: string;
  };
  isEventPast: boolean;
  onBuyTicket: () => void;
}

export default function EventHero({
  eventTitle,
  eventBanner,
  eventType,
  startDate,
  supportingText,
  dateRange,
  venue,
  address,
  brandColor,
  isEventPast,
  onBuyTicket,
}: EventHeroProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-16 pt-24 sm:pt-32 lg:pt-40 flex flex-col gap-4 sm:gap-6 min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-linear-to-r bg-[#56410C] to-[#001D3D] rounded-full opacity-100 blur-[60px]" />
      <div className="absolute top-[30%] right-0 w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-tl from-[#64a9f2] via-[#80682e] to-[#ddad31] rounded-full opacity-100 blur-[100px] transform -translate-y-1/2" />

      <h3 className="text-sm font-semibold sm:text-base z-10">
        Events /{" "}
        <span style={{ color: brandColor.primaryColor }}>
          {eventTitle}
        </span>
      </h3>

      <FeaturedEventCard
        image={eventBanner || "/events/afrospook-event-img.png"}
        category={eventType.toUpperCase()}
        title={eventTitle}
        eventDate={startDate}
        description={supportingText}
        dateRange={dateRange}
        location={`${venue}, ${address}`}
        buttonText={isEventPast ? "Event Has Ended" : "Buy Ticket"}
        onViewDetails={() => {
          if (isEventPast) return;
          onBuyTicket();
        }}
      />
    </section>
  );
}