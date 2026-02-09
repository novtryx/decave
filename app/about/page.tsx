"use client";
import JustGetStarted from "@/components/about/JustGetStarted";
import OurCulture from "@/components/about/OurCulture";
import OurIdentity from "@/components/about/OurIdentity";
import WhatWeDo from "@/components/about/WhatWeDo";
import WhatWeStandFor from "@/components/about/WhatWeStandFor";
import HeaderSection from "@/components/events/sections/HeaderSection";
import CallToAction from "@/components/layout/CallToAction";
import React from "react";
import { PiHandshake } from "react-icons/pi";

const page = () => {
  return (
    <div>
      <HeaderSection
        title="About deCave"
        description="We don’t just host events - we architect experiences that celebrate African culture, ignite community and push the boundaries of what nightlife can be."
        label="WHO WE ARE"
      />
      <OurIdentity />
      <WhatWeStandFor />
      <WhatWeDo />
      <OurCulture />
      <JustGetStarted />
      <CallToAction
        containerClassName="lg:p-15 p-4 bg-[#151515]"
        backgroundImage="/dancers.jpg"
        overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/90"
        icon={PiHandshake}
        iconColor="#EEF6FF"
        label="Join the Movement"
        title="Be Part of the Movement"
        description="Whether you're attending or partnering, there's a place for you at deCave"
        primaryButton={{
          text: "Explore events",
          icon: "arrow",
          onClick: () => console.log("Explore clicked"),
        }}
        secondaryButton={{
          text: "Partner with Us",
          onClick: () => console.log("Partner clicked"),
        }}
      />
    </div>
  );
};

export default page;
