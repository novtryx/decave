// components/events/event/EventCallToAction.tsx
"use client";

import { FaRegCalendarAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import CallToAction from "@/components/layout/CallToAction";
import Button from "@/components/layout/Button";

interface EventCallToActionProps {
  eventTitle: string;
  dateRange: string;
  venue: string;
  address: string;
  brandColor: {
    primaryColor: string;
    secondaryColor: string;
  };
  hasTickets: boolean;
  onScrollToTickets: () => void;
}

export default function EventCallToAction({
  eventTitle,
  dateRange,
  venue,
  address,
  brandColor,
  hasTickets,
  onScrollToTickets,
}: EventCallToActionProps) {
  return (
    <section className="w-full">
      <CallToAction
        backgroundGradient={`linear-gradient(90deg, ${brandColor.primaryColor} 0%, ${brandColor.secondaryColor} 50%, ${brandColor.primaryColor} 100%)`}
        overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
        title={`Join us at ${eventTitle}`}
        description=" "
        containerClassName="w-full p-0"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-sm sm:text-base">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaRegCalendarAlt
                className="text-base sm:text-lg shrink-0"
                style={{
                  color: brandColor.primaryColor,
                }}
              />
              <p className="text-[#b3b3b3]">{dateRange}</p>
            </div>
            <GoDotFill className="text-[#b3b3b3] hidden sm:block" />
            <div className="flex items-center gap-2 sm:gap-3">
              <GrLocation
                className="text-base sm:text-lg shrink-0"
                style={{
                  color: brandColor.primaryColor,
                }}
              />
              <p className="text-[#b3b3b3] text-center sm:text-left">
                {venue} - {address}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            icon="arrow"
            onClick={onScrollToTickets}
            className="w-fit sm:w-auto mt-2"
          >
            Secure your spot now
          </Button>
          {hasTickets && (
            <p className="text-[#b3b3b3] text-center text-sm sm:text-base px-4 sm:px-0">
              Limited tickets available
            </p>
          )}
        </div>
      </CallToAction>
    </section>
  );
}