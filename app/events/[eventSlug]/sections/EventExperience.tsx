// components/events/event/EventExperience.tsx
"use client";

import SectionHeader from "@/components/layout/sectionHeader";
import ImageSlider from "@/components/events/event/ImageSlider";
import ViewMoreButton from "@/components/layout/ViewMoreButton";

interface EventExperienceProps {
  eventTitle: string;
  venue: string;
  experienceSlides: Array<{
    id: number;
    image: string;
    tag: string;
    title: string;
    description: string;
  }>;
}

export default function EventExperience({
  eventTitle,
  venue,
  experienceSlides,
}: EventExperienceProps) {
  if (!experienceSlides || experienceSlides.length === 0) return null;

  return (
    <section id="experience" className="px-4 sm:px-6 lg:px-16 py-10 sm:py-12 lg:py-16 bg-[#070606]">
      <SectionHeader
        title="Event Experience"
        label="Venue Experience"
        labelColor="#0854A7"
        description={`Experience ${eventTitle} at ${venue}`}
      />

      <div  className="mt-10 sm:mt-12 lg:mt-16">
        <ImageSlider slides={experienceSlides} />
      </div>
      <ViewMoreButton text="Explore Gallery" href="/gallery"/>
    </section>
  );
}