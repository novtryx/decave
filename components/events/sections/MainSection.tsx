"use client";

import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { FeaturedEventCard } from "../ui/FeaturedEventCard";
import { FaRegStar } from "react-icons/fa";
import { pastEventsData, upcomingEventsData } from "@/lib/data";
import ImageCard from "@/components/layout/ImageCard";
import { GoPeople } from "react-icons/go";
import ViewMoreButton from "@/components/layout/ViewMoreButton";
import SectionHeader from "@/components/layout/sectionHeader";
import CallToAction from "@/components/layout/CallToAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TabNavigation from "@/components/layout/TabNavigation";

export default function MainSection() {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  const tabs = [
    {id: "all", label: "All Events"},
    {id: "upcoming", label: "Upcoming"},
    {id: "past", label: "Past"},
  ]
  
  return (
    <div className="">
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Event filter count */}
      <p className="text-[#b3b3b3] px-6 lg:px-16 text-xl">10 Events found</p>

      {/* Featured Event */}
      <section className="bg-[#0f0f0f] mt-10 px-6 lg:px-16 py-14">
        <div className="flex gap-3 items-center mb-8 text-[#0854a7]">
          <FaRegStar />
          <h4>FEATURED EVENT</h4>
        </div>

        <FeaturedEventCard
          image="/events/afrospook-event-img.png"
          attendees="10K+"
          category="FESTIVAL"
          label="UPCOMING"
          title="AfroSpook 2025"
          description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
          dateRange="Aug 15 - 17, 2025"
          location="Eko Atlantic City, Lagos - Nigeria"
          onViewDetails={() => router.push('/event/afrospook-2025')}
        />
      </section>

      {/* Upcoming events */}
      <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
        <SectionHeader
          title="Upcoming Events"
          description="Don't miss out these upcoming experiences"
        />

        <div className="my-14 grid grid-cols 1 lg:grid-cols-3 gap-6">
          {upcomingEventsData.map((item) => (
            <ImageCard
              key={item.id}
              image={item.image}
              title="Afro Pulse Sessions"
              badge={{
                text: item.category,
                bgColor: item.category === "SOLD OUT" ? "#ef4444" : "#EEF6FFCC",
                textColor: item.category === "SOLD OUT" ? "#fff" : "#001D3D",
              }}
              peopleCount={item.peopleCount}
              icon={GoPeople}
              date={item.date}
              location={item.location}
              buttonText={item.buttonText}
              buttonVariant="outline"
              onButtonClick={() => console.log("View event")}
            />
          ))}
        </div>

        {/* View All Events */}
        <ViewMoreButton text="View All Events" />
      </section>

      {/* Past events */}
      <section className="bg-[#0f0f0f] mt-0 border-t border-[#656161] px-6 lg:px-16 py-14">
        <SectionHeader
          title="Past Events"
          description="Relive the moments from our previous experiences"
        />

        <div className="my-14 grid grid-cols 1 lg:grid-cols-3 gap-6">
          {pastEventsData.map((item) => (
            <ImageCard
              key={item.id}
              image={item.image}
              title="Afro Pulse Sessions"
              badge={{
                text: item.category,
                bgColor: item.category === "SOLD OUT" ? "#ef4444" : "#EEF6FFCC",
                textColor: item.category === "SOLD OUT" ? "#fff" : "#001D3D",
              }}
              peopleCount={item.peopleCount}
              icon={GoPeople}
              date={item.date}
              location={item.location}
              buttonText={item.buttonText}
              buttonVariant="outline"
              onButtonClick={() => console.log("View event")}
            />
          ))}
        </div>

        {/* View All Events */}
        <ViewMoreButton text="View All Events" />
      </section>

      {/* Call To Action */}
      <section className="w-full">
        <CallToAction
          backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
          overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
          title="Want to host your event with deCave?"
          description="Partner with us to create unforgettable cultural experiences"
          primaryButton={{
            text: "Partner With Us",
            icon: "arrow",
            onClick: () => console.log("Partner button clicked"),
          }}
          height="h-[500px]"
          containerClassName="w-full"
        />
      </section>

      {/* deCave image
      <div className="relative w-[90%] mx-auto mt-10 h-50">
        <Image 
            src="/events/deCaveBoldImg.png"
            fill
            alt="deCave image"
        />
      </div> */}
    </div>
  );
}
