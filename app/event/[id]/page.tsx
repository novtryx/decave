"use client";

import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";
import Button from "@/components/layout/Button";
import { CountdownTimer } from "@/components/layout/CountdownTimer";
import SectionHeader from "@/components/layout/sectionHeader";
import { TicketCard } from "@/components/layout/TicketCard";
import { afroTicketData } from "@/lib/data";
import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";

const eventDate = new Date("2026-08-15T00:00:00");

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen  bg-black text-white">
      {/* Header Section */}
      <section className="relative px-4 lg:px-32 w-full pt-40 flex flex-col gap-6 justify-center items-start h-auto min-h-screen overflow-hidden">
        {/* Background blur effects */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-linear-to-r bg-[#56410C] to-[#001D3D] rounded-full opacity-100 blur-[60px]"></div>
        <div className="absolute top-[30%] right-0 w-96 h-96 bg-linear-to-tl from-[#64a9f2] via-[#80682e] to-[#ddad31] rounded-full opacity-100 blur-[100px] transform -translate-y-1/2"></div>

        <div className="flex justify-left z-10">
          <h3>
            Events / <span className="text-[#cca33a]">Afrospook 2025</span>
          </h3>
        </div>

        <div className="w-full z-10">
          <FeaturedEventCard
            image="/events/afrospook-event-img.png"
            category="FESTIVAL"
            title="AfroSpook 2025"
            eventDate={eventDate}
            description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
            dateRange="Aug 15 - 17, 2025"
            location="Eko Atlantic City, Lagos - Nigeria"
            onViewDetails={() => console.log("/event/afrospook-2025")}
          />
        </div>
      </section>

      {/* About the Event Section */}
      <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-32 bg-[#151515] py-20">
        {/* about event content */}
        <div>
          <SectionHeader
            title="More than an Event"
            icon={BsStars}
            label="WHAT AFROSPOOK IS"
            align="left"
          />

          <p className="text-[#b3b3b3]">
            AfroSpook is not just a festival — it's a cultural movement and an
            identity. A space where African heritage meets contemporary
            expression. <br />
            <br />
            Born from the desire to create immersive experiences that celebrate
            our roots while embracing innovation, AfroSpook has become a
            pilgrimage for culture enthusiasts, artists, and free spirits across
            the continent. <br />
            <br />
            Each edition is carefully crafted to push boundaries, challenge
            norms, and create unforgettable moments that resonate long after the
            music stops.
          </p>
        </div>

        {/* image */}
        <div className="relative w-full h-125 md:h-150 lg:h-175">
          <Image
            src="/events/afrospook-event-img.png"
            fill
            alt="afrospook event image"
            className="object-cover rounded-lg"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
        </div>
      </section>


      {/* Get your tickets section */}
      <section className="px-4 lg:px-32 py-10 bg-[#151515] border-b border-[#514b4b]">
        {/* header and label */}
        <div className="flex flex-col items-center">
          <SectionHeader 
            title="Get Your Tickets"
            icon={LuTicket}
            label="SECURE YOUR SPOT"
            description="Select the perfect package for an unforgettable journey into Afro-centric culture"
            />

          <div className="mt-6 flex flex-col items-center gap-10">
            <Button 
              icon={FaRegClock} 
              iconPosition="left" 
              variant="outline" 
              className="bg-[#092341] border text-gray-200 border-gray-200 uppercase"
              >
              Event Starts in
            </Button>
            <CountdownTimer targetDate={eventDate} />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {afroTicketData.map((ticket) => (
            <TicketCard 
              key={ticket.id}
              {...ticket}
              onBuyClick={() => console.log("Buy Ticket")}
            />
          ))}
        </div>
      </section>

      {/* Venue Experience */}
      <section className="px-4 lg:px-32 py-10">
        <SectionHeader 
          title="Six Zones. One Unforgettable Journey"
          label="Venue Experience"
          labelColor="#0854a7"
          description="Every corner of AfroSpook offers a different energy. Move freely between zones, discover new sounds, and curate your own experience."
        />
      </section>
    </div>
  );
}
