// "use client"

// import HeaderSection from "@/components/events/sections/HeaderSection";
// import PartnersSection from "@/components/gallery/sections/PartnersSection";
// import PhotoGallery from "@/components/gallery/sections/PhotoGallery";
// import VideoArchive from "@/components/gallery/sections/VideoArchive";
// import Button from "@/components/layout/Button";
// import CallToAction from "@/components/layout/CallToAction";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { GoDotFill } from "react-icons/go";
// import { GrLocation } from "react-icons/gr";
// import { useEffect, useRef } from "react";
// import { useInView, useMotionValue, animate } from "framer-motion";

// interface AnimatedStatProps {
//   value: number;
//   label: string;
//   suffix?: string;
// }

// export default function Gallery() {
  
//   function AnimatedStat({ value, suffix = "", label }: AnimatedStatProps) {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true });
  
//     const count = useMotionValue(0);
  
//     useEffect(() => {
//       if (isInView) {
//         animate(count, value, {
//           duration: 1.6,
//           ease: "easeOut",
//         });
//       }
//     }, [isInView, value, count]);
  
//   return (
//     <div className="bg-[#151515]">
//       <HeaderSection
//         title="The Pulse of deCave"
//         description="Immerse yourself in the moments that define our festival - raw energy, cultural celebration, and unforgettable experiences captured in stunning detail."
//         label="MEDIA GALLERY"
//         backgroundImage="/events/hero-img.png"
//       />

//       {/* Main Section */}
//       <PhotoGallery />
//       <VideoArchive />
//       <PartnersSection />
//       <CallToAction
//   backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
//   overlay="bg-gradient-to-r from-black/40 to-[#2A2A2A]/70"
//   title="Interested in partnering with deCave?"
//   description="Join a movement that celebrates culture, creativity, and community impact. Let's build something extraordinary together."
//   height="min-h-[420px] sm:min-h-[500px]"
//   containerClassName="w-full px-4 sm:px-8"
// >
//   <div className="flex flex-col items-center text-center gap-6 sm:gap-8">

//     {/* Stats */}
//     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
//       {[
//         { value: "10K", label: "DAILY REACH" },
//         { value: "250M+", label: "MEDIA IMPRESSION" },
//         { value: "48H", label: "BRAND ACTIVATION" },
//         { value: "85%", label: "18 – 35 DEMOGRAPHIC" },
//       ].map((item, i) => (
//         <div
//           key={i}
//           className="flex flex-col items-center bg-black/30 rounded-xl py-4 sm:py-6"
//         >
//           <h3 className="text-[#cca33a] text-2xl sm:text-3xl lg:text-4xl font-semibold">
//             {item.value}
//           </h3>
//           <p className="text-[#b3b3b3] text-xs sm:text-sm mt-1">
//             {item.label}
//           </p>
//         </div>
//       ))}
//     </div>

//     {/* CTA Button */}
//     <Button
//       variant="primary"
//       icon="arrow"
//       onClick={() => console.log("clicked")}
//       className="w-full sm:w-auto mt-4"
//     >
//       Get in Touch
//     </Button>

//   </div>
// </CallToAction>

//     </div>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

import HeaderSection from "@/components/events/sections/HeaderSection";
import PartnersSection from "@/components/gallery/sections/PartnersSection";
import PhotoGallery from "@/components/gallery/sections/PhotoGallery";
import VideoArchive from "@/components/gallery/sections/VideoArchive";
import Button from "@/components/layout/Button";
import CallToAction from "@/components/layout/CallToAction";


interface AnimatedStatProps {
  value: number;
  label: string;
  suffix?: string;
}

function AnimatedStat({ value, label, suffix = "" }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  // 🔑 Subscribe to motion value updates
  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.6,
        ease: "easeOut",
      });
    }
  }, [isInView, value, motionValue]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center bg-black/30 rounded-xl py-4 sm:py-6"
    >
      <h3 className="text-[#cca33a] text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {displayValue}
        {suffix}
      </h3>

      <p className="text-[#b3b3b3] text-xs sm:text-sm mt-1 text-center">
        {label}
      </p>
    </div>
  );
}


export default function Gallery() {
  return (
    <div className="bg-[#151515] overflow-x-hidden">
      <HeaderSection
        title="The Pulse of deCave"
        description="Immerse yourself in the moments that define our festival - raw energy, cultural celebration, and unforgettable experiences captured in stunning detail."
        label="MEDIA GALLERY"
        backgroundImage="/events/hero-img.png"
      />

      {/* Main Content */}
      <PhotoGallery />
      <VideoArchive />
      <PartnersSection />

      {/* Call to Action */}
      <CallToAction
        backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
        overlay="bg-gradient-to-r from-black/40 to-[#2A2A2A]/70"
        title="Interested in partnering with deCave?"
        description="Join a movement that celebrates culture, creativity, and community impact. Let's build something extraordinary together."
        // height="min-h-[420px] sm:min-h-[500px]"
        containerClassName="w-full"
      >
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
            <AnimatedStat value={10} suffix="K" label="DAILY REACH" />
            <AnimatedStat value={250} suffix="M+" label="MEDIA IMPRESSION" />
            <AnimatedStat value={48} suffix="H" label="BRAND ACTIVATION" />
            <AnimatedStat value={85} suffix="%" label="18 – 35 DEMOGRAPHIC" />
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            icon="arrow"
            onClick={() => console.log("clicked")}
            className="w-full sm:w-auto mt-4"
          >
            Get in Touch
          </Button>
        </div>
      </CallToAction>
    </div>
  );
}
