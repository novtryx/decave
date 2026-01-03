"use client"

import HeaderSection from "@/components/events/sections/HeaderSection";
import PartnersSection from "@/components/gallery/sections/PartnersSection";
import PhotoGallery from "@/components/gallery/sections/PhotoGallery";
import VideoArchive from "@/components/gallery/sections/VideoArchive";
import Button from "@/components/layout/Button";
import CallToAction from "@/components/layout/CallToAction";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";

export default function Gallery() {
  return (
    <div className="bg-[#151515]">
      <HeaderSection
        title="The Pulse of deCave"
        description="Immerse yourself in the moments that define our festival - raw energy, cultural celebration, and unforgettable experiences captured in stunning detail."
        label="MEDIA GALLERY"
        backgroundImage="/events/hero-img.png"
      />

      {/* Main Section */}
      <PhotoGallery />
      <VideoArchive />
      <PartnersSection />
      {/* Call to Action */}
      <CallToAction
        backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
        overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
        title="Interested in partnering with deCave?"
        description="Join a movement that celebrates culture, creativity, and community impact. Let's build something extraordinary together."
        height="h-[500px]"
        containerClassName="w-full p-0"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
          {/* stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col items-center">
                <h3 className="text-[#cca33a] text-xl lg:text-4xl font-semibold">10K</h3>
                <p className="text-[#b3b3b3]">
                    DAILY REACH
                </p>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-[#cca33a] text-xl lg:text-4xl font-semibold">250M+</h3>
                <p className="text-[#b3b3b3]">
                    MEDIA IMPRESSION
                </p>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-[#cca33a] text-xl lg:text-4xl font-semibold">48H</h3>
                <p className="text-[#b3b3b3]">
                    BRAND ACTIVATION
                </p>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-[#cca33a] text-xl lg:text-4xl font-semibold">85%</h3>
                <p className="text-[#b3b3b3]">
                    18 - 35 DEMOGRAPHIC
                </p>
            </div>
          </div>

          <Button
            variant="primary"
            icon={"arrow"}
            onClick={() => console.log("clicked")}
            className="w-fit sm:w-auto mt-2"
          >
            Get in Touch
          </Button>
        </div>
      </CallToAction>

    </div>
  );
}
