// components/events/event/EventTickets.tsx
"use client";

import { FaRegClock } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { MdEventBusy } from "react-icons/md";
import SectionHeader from "@/components/layout/sectionHeader";
import { CountdownTimer } from "@/components/layout/CountdownTimer";
import { TicketCard } from "@/components/layout/TicketCard";

interface EventTicketsProps {
  eventTitle: string;
  tickets: Array<{
    _id: string;
    ticketName: string;
    price: number;
    currency: string;
    initialQuantity: number;
    availableQuantity: number;
    benefits: string[];
  }>;
  startDate: Date;
  dateRange: string;
  isEventPast: boolean;
  onTicketPurchase: (ticketId: string) => void;
}

export default function EventTickets({
  eventTitle,
  tickets,
  startDate,
  dateRange,
  isEventPast,
  onTicketPurchase,
}: EventTicketsProps) {
  if (!tickets || tickets.length === 0) return null;

  return (
    <section
      id="tickets-section"
      className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#070606]"
    >
      <div className="flex flex-col items-center">
        <SectionHeader
          title={isEventPast ? "Event Tickets" : "Get Your Tickets"}
          icon={isEventPast ? MdEventBusy : LuTicket}
          label={isEventPast ? "EVENT ENDED" : "SECURE YOUR SPOT"}
          labelColor="#0854A7"
          iconColor="#0854A7"
          description={
            isEventPast
              ? `This event took place on ${dateRange}. Tickets are no longer available.`
              : `Select the perfect package for ${eventTitle}`
          }
        />

        {!isEventPast && (
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
            <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
              <FaRegClock /> Event Starts in
            </button>
            <CountdownTimer targetDate={startDate} />
          </div>
        )}

        {isEventPast && (
          <div className="mt-6 sm:mt-8 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl px-6 py-4 max-w-2xl">
            <p className="text-[#b3b3b3] text-center text-sm sm:text-base">
              This event has concluded. Check out our upcoming events for more
              amazing experiences!
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
        {tickets.map((ticket) => {
          const soldCount = ticket.initialQuantity - ticket.availableQuantity;
          const isSoldOut = ticket.availableQuantity === 0;

          return (
            <TicketCard
              key={ticket._id}
              id={ticket._id}
              name={ticket.ticketName}
              price={`${ticket.currency} ${ticket.price.toLocaleString()}`}
              features={ticket.benefits}
              badge={
                isEventPast
                  ? "EVENT ENDED"
                  : isSoldOut
                    ? "SOLD OUT"
                    : `${soldCount} sold`
              }
              popular={ticket.ticketName.toLowerCase().includes("vip")}
              onBuyClick={() => onTicketPurchase(ticket._id)}
              disabled={isEventPast}
            />
          );
        })}
      </div>
    </section>
  );
}