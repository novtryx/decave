"use client";

import React from 'react'
import CallToAction from "@/components/layout/CallToAction";
import { PiHandshake } from "react-icons/pi";

const CallToActionWrapper = () => {
  return (
    <CallToAction
      containerClassName="lg:p-15 p-4 bg-[#151515]"
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
        href: "/events",
      }}
      secondaryButton={{
        text: "Partner with Us",
        href: "/partners",
      }}
    />
  )
}

export default CallToActionWrapper