// components/events/event/EventAbout.tsx
"use client";

import Image from "next/image";
import { BsStars } from "react-icons/bs";
import SectionHeader from "@/components/layout/sectionHeader";

interface EventAboutProps {
  eventTitle: string;
  eventTheme: string;
  supportingText: string;
  eventBanner: string;
  brandColor: {
    primaryColor: string;
    secondaryColor: string;
  };
  artistLineUp?: Array<{
    _id: string;
    artistName: string;
    artistImage: string;
    artistGenre: string;
    headliner: boolean;
  }>;
}

export default function EventAbout({
  eventTitle,
  eventTheme,
  supportingText,
  eventBanner,
  brandColor,
  artistLineUp = [],
}: EventAboutProps) {
  return (
    <section className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-16 bg-[#070606] py-12 sm:py-16 lg:py-20">
      <div>
        <SectionHeader
          title={`About ${eventTitle}`}
          icon={BsStars}
          label={eventTheme.toUpperCase()}
          align="left"
        />
        <p className="text-[#b3b3b3] text-sm sm:text-base leading-relaxed">
          {supportingText}
        </p>
{/* 
        {artistLineUp.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Featured Artists</h3>
            <div className="flex flex-col gap-3">
              {artistLineUp.map((artist) => (
                <div
                  key={artist._id}
                  className="flex items-center gap-4 p-3 bg-[#0f0f0f] rounded-lg"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={artist.artistImage || "/placeholder-artist.png"}
                      fill
                      alt={artist.artistName}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{artist.artistName}</h4>
                    <p className="text-sm text-[#b3b3b3]">
                      {artist.artistGenre}
                    </p>
                    {artist.headliner && (
                      <span className="text-xs bg-[#cca33a] text-black px-2 py-0.5 rounded-full">
                        Headliner
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>

      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125">
        <Image
          src={eventBanner || "/events/afrospook-event-img.png"}
          fill
          alt={eventTitle}
          className="object-cover rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
      </div>
    </section>
  );
}