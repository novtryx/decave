// components/events/event/EventContentSections.tsx
"use client";

import Image from "next/image";
import { BsStars } from "react-icons/bs";
import SectionHeader from "@/components/layout/sectionHeader";

interface EventContentSectionsProps {
  sections: Array<{
    subTitle: string;
    sectionContent: string;
    supportingImage: string;
  }>;
  eventTheme: string;
}

export default function EventContentSections({
  sections,
  eventTheme,
}: EventContentSectionsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 space-y-12">
      {sections.map((section, idx) => (
        <section
          key={idx}
          className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 px-4 sm:px-6 lg:px-16 bg-[#070606] py-12 sm:py-16 lg:py-20"
        >
          {/* Image / Right Side */}
          {section.supportingImage && (
            <div className="relative w-full lg:w-[70%] h-64 sm:h-80 md:h-96 lg:h-125">
              <Image
                src={section.supportingImage}
                fill
                alt={section.subTitle || "Event Section Image"}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
            </div>
          )}

          {/* Left Side */}
          <div className="flex flex-col">
            <SectionHeader
              title={section.subTitle || ""}
              icon={BsStars}
              label={eventTheme.toUpperCase()}
              align="left"
              description={section.sectionContent || ""}
            />
          </div>
        </section>
      ))}
    </div>
  );
}