"use client";

import { FeaturedEventCard } from "@/components/events/ui/FeaturedEventCard";

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
          {/* Your content goes here */}
          <FeaturedEventCard
            image="/events/afrospook-event-img.png"
            category="FESTIVAL"
            title="AfroSpook 2025"
            description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
            dateRange="Aug 15 - 17, 2025"
            location="Eko Atlantic City, Lagos - Nigeria"
            onViewDetails={() => console.log("/event/afrospook-2025")}
          />
        </div>
      </section>
    </div>
  );
}
