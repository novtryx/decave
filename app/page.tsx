"use client";
import HeroSection from "@/components/home/heroSection";
import Memories from "@/components/home/Memories";
import OurPartners from "@/components/home/OurPartners";
import ScrollContent from "@/components/home/scrollContent";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import WhatWeStandFor from "@/components/home/WhatWeStandFor";
import CallToAction from "@/components/layout/CallToAction";
import React from "react";
import { PiHandshake } from "react-icons/pi";

const page = () => {
  return (
    <div className=''>
              <HeroSection/>
              <ScrollContent/>
              <UpcomingEvents/>
              <WhatWeStandFor/>
              <Memories/>
              <OurPartners/>
              <CallToAction
              containerClassName='lg:p-15 p-4 bg-[#151515]'
  backgroundImage="/dancers.jpg"
  overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/90"
  icon={PiHandshake}
  iconColor="#EEF6FF"
  label="Join the Movement"
  title="Ready to Experience the culture?"
  description="Join the movement. Explore our upcoming events or partner with us to create unforgettable movements"
  primaryButton={{
    text: "Explore events",
    icon: "arrow",
    onClick: () => console.log('Explore clicked'),
    href:"/events",
  }}
  secondaryButton={{
    text: "Partner with Us",
    onClick: () => console.log('Partner clicked'),
    href:"/partners",
  }}
/>

    </div>
  );
};

export default page;
