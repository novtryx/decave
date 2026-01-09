"use client";

import { use } from "react";
import ImageSlider from "@/components/event/ImageSlider";
import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";
import Button from "@/components/layout/Button";
import CardWithoutImage from "@/components/layout/CardWithoutImage";
import { CountdownTimer } from "@/components/layout/CountdownTimer";
import ImageFeatureTimeline from "@/components/layout/ImageFeatureTimeline";
import SectionHeader from "@/components/layout/sectionHeader";
import { TicketCard } from "@/components/layout/TicketCard";
import {
  afroTicketData,
  contactData,
  encouragedItems,
  entryRequirements,
  features,
  notAllowedItems,
  notToleratedItems,
  recommendedItems,
  safetyData,
  slides,
} from "@/lib/data";
import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import RecommendedList from "@/components/event/RecommendList";
import ContactCard from "@/components/event/ContactCard";
import CallToAction from "@/components/layout/CallToAction";
import { GoDotFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { useRouter } from "next/navigation";

const eventDate = new Date("2026-08-15T00:00:00");

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = use(params);


   const handleTicketPurchase = (ticket: typeof afroTicketData[0]) => {
    // Store ticket data in sessionStorage before navigation
    sessionStorage.setItem('selectedTicket', JSON.stringify({
      ...ticket,
      eventId: id, // Now using the unwrapped id
      eventName: 'AfroSpook 2025',
      eventDate: eventDate.toISOString(),
      eventLocation: 'Eko Atlantic City, Lagos - Nigeria'
    }));
  };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="relative px-4 sm:px-6 lg:px-16 w-full pt-24 sm:pt-32 lg:pt-40 flex flex-col gap-4 sm:gap-6 justify-center items-start h-auto min-h-screen overflow-hidden">
        {/* Background blur effects - adjusted for mobile */}
        <div className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-linear-to-r bg-[#56410C] to-[#001D3D] rounded-full opacity-100 blur-[60px]"></div>
        <div className="absolute top-[30%] right-0 w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-tl from-[#64a9f2] via-[#80682e] to-[#ddad31] rounded-full opacity-100 blur-[100px] transform -translate-y-1/2"></div>

        <div className="flex justify-left z-10">
          <h3 className="text-sm sm:text-base">
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
      <section className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-16 bg-[#151515] py-12 sm:py-16 lg:py-20">
        {/* about event content */}
        <div>
          <SectionHeader
            title="More than an Event"
            icon={BsStars}
            label="WHAT AFROSPOOK IS"
            align="left"
          />

          <p className="text-[#b3b3b3] text-sm sm:text-base leading-relaxed">
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
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125">
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
      <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
        {/* header and label */}
        <div className="flex flex-col items-center">
          <SectionHeader
            title="Get Your Tickets"
            icon={LuTicket}
            label="SECURE YOUR SPOT"
            description="Select the perfect package for an unforgettable journey into Afro-centric culture"
          />

          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
            <div>
              <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
                <FaRegClock />
                Event Starts in
              </button>
            </div>
            <CountdownTimer targetDate={eventDate} />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
          {afroTicketData.map((ticket) => (
            <TicketCard
              key={ticket.id}
              {...ticket}
              onBuyClick={() => handleTicketPurchase(ticket)}
              ticketId={ticket.id}
              eventId={id}
            />
          ))}
        </div>
      </section>

      {/* Venue Experience */}
      <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#121111]">
        <SectionHeader
          title={
            <>
              Six Zones. One Unforgettable{" "}
              <span className="text-[#0854a7]">Journey</span>
            </>
          }
          label="Venue Experience"
          labelColor="#0854a7"
          description="Every corner of AfroSpook offers a different energy. Move freely between zones, discover new sounds, and curate your own experience."
        />

        <div className="mt-10 sm:mt-12 lg:mt-16">
          <ImageSlider slides={slides} />
        </div>
      </section>

      {/* Dress Code & Vibe */}
      <section className="bg-[#151515] px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16">
        <SectionHeader
          label="Dress code & Vibe"
          labelColor="#0854a7"
          title={
            <>
              Come As You Are.{" "}
              <span className="text-[#cca33a]">Be Yourself Fully.</span>
            </>
          }
          description="There's no strict dress code at AfrroSpook. We celebrate individuality, creativity, and cultural expression. Dress for comfort, confidence and freedom"
        />

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <ImageFeatureTimeline
            image="/event/dress-code-img.png"
            imageAlt="Afrocentric fashion"
            features={features}
          />
        </div>
      </section>

      {/* Safety & Security */}
      <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#151515]">
        <SectionHeader
          label="Safety & Security"
          labelColor="#0854a7"
          title="Your Safety is Our Priority"
          description="We want you to experience AfroSpook with complete peace of mind. Our comprehensive safety measures ensure a secure, well-organized event."
        />

        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-b border-[#2a2a2a] pb-8 sm:pb-10">
          {safetyData.map((item) => (
            <CardWithoutImage
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* What to Bring */}
      <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
        <SectionHeader title="What to Bring" />

        <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
          <RecommendedList
            recommendedItems={recommendedItems}
            notAllowedItems={notAllowedItems}
          />
        </div>

        <p className="text-[#b3b3b3] text-sm sm:text-base w-full sm:w-[80%] lg:w-[60%] xl:w-[40%] text-center mx-auto pt-8 sm:pt-10 px-4">
          All attendees and bags are subject to search at entry. Thank you for
          your cooperation in keeping AfroSpook safe and enjoyable for everyone
        </p>
      </section>

      {/* Community Code of Conduct */}
      <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
        <SectionHeader
          title="Community Code of Conduct"
          description="AfroSpook is a space for celebration, respect and unity. We ask all attendees to honor the following principles:"
        />

        <div className="mt-8 sm:mt-10 lg:mt-12 border-b border-[#2a2a2a] pb-8 sm:pb-10">
          <RecommendedList
            recommendedItems={encouragedItems}
            notAllowedItems={notToleratedItems}
            recommendedTitle="WE ENCOURAGE"
            notAllowedTitle="ZERO TOLERANCE FOR"
            notAllowedColor="#6f6f6f"
            notAllowedIconColor="#6f6f6f"
          />
        </div>

        <p className="text-[#b3b3b3] text-sm sm:text-base w-full sm:w-[85%] lg:w-[70%] xl:w-[60%] text-center mx-auto pt-8 sm:pt-10 px-4">
          Violations of our code of conduct may result in immediate removal from
          the event without refund. If you witness or experience any concerning
          behaviour, please report it to security immediately. We're commitedd
          to maintaining a saafe, inclusive space for everyone
        </p>
      </section>

      {/* Entry Requirements & Emergency Contacts */}
      <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Entry Requirements */}
          <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Entry Requirements
            </h2>
            <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
              To ensure a smooth entry process, please have the following ready:
            </p>

            <RecommendedList
              recommendedItems={entryRequirements}
              recommendedTitle=" "
              notAllowedTitle=" "
              align="left"
            />

            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <p className="text-[#b3b3b3] text-sm sm:text-base">
                <b>Note:</b> AfroSpook is an 18+ event. Anyone appearing under
                25 may be asked to show ID.
              </p>
            </div>
          </div>
          {/* Emergency Contacts */}
          <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Emergency Contacts
            </h2>
            <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
              If you need assistance during the event:
            </p>

            <div className="mt-4 flex flex-col gap-4 border-b pb-4 border-[#2a2a2a]">
              {contactData.map((item) => (
                <ContactCard
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  subtext={item.subtext}
                />
              ))}
            </div>

            <p className="text-[#b3b3b3] text-sm pt-4 w-full lg:w-[80%]">
              First aid stations are located in each zone, marked with clear
              signage. Security personnel can direct you to the nearest station.
            </p>
          </div>
        </div>
      </section>

      {/* Get your tickets section */}
      <section className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#0f0f0f]">
        {/* header and label */}
        <div className="flex flex-col items-center">
          <SectionHeader
            title="Get Your Tickets"
            icon={LuTicket}
            label="SECURE YOUR SPOT"
            description="Select the perfect package for an unforgettable journey into Afro-centric culture"
          />

          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
            <div>
              <button className="bg-[#092341] border text-gray-200 border-gray-200 uppercase rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
                <FaRegClock />
                Event Starts in
              </button>
            </div>
            <CountdownTimer targetDate={eventDate} />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 pt-8 sm:pt-10 border-t border-[#2a2a2a] lg:grid-cols-3 gap-4 sm:gap-6">
          {afroTicketData.map((ticket) => (
            <TicketCard
              key={ticket.id}
              {...ticket}
              onBuyClick={() => console.log("Buy Ticket")}
            />
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="w-full">
        <CallToAction
          backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
          overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
          title="Your Presence is the Art"
          description=" "
          // height="h-[500px]"
          containerClassName="w-full p-0"
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
            {/* date and location */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-sm sm:text-base">
              <div className="flex items-center gap-2 sm:gap-3">
                <FaRegCalendarAlt className="text-[#cca33a] text-base sm:text-lg shrink-0" />
                <p className="text-[#b3b3b3]">Aug 15 - 17, 2026</p>
              </div>

              <GoDotFill className="text-[#b3b3b3] hidden sm:block" />

              <div className="flex items-center gap-2 sm:gap-3">
                <GrLocation className="text-[#cca33a] text-base sm:text-lg shrink-0" />
                <p className="text-[#b3b3b3] text-center sm:text-left">
                  Eko Atlantic City - Lagos - Nigeria
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              icon={"arrow"}
              onClick={() => console.log("clicked")}
              className="w-fit sm:w-auto mt-2"
            >
              Secure your spot now
            </Button>

            <p className="text-[#b3b3b3] text-center text-sm sm:text-base px-4 sm:px-0">
              Prices increase as we get closer to the event
            </p>
          </div>
        </CallToAction>
      </section>
    </div>
  );
}
