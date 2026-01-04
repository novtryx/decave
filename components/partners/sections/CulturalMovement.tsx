import SectionHeader from "@/components/layout/sectionHeader";
import Image from "next/image";
import { BsStars } from "react-icons/bs";

export default function CulturalMovement() {
  return (
    <section className="py-10 grid bg-[#151515] grid-cols-1 lg:grid-cols-2 gap-4  px-4 lg:px-16">
      <div>
        <SectionHeader
          align="left"
          label="ABOUT US"
          icon={BsStars}
          iconColor="#0854a7"
          title="A Cultural Movement"
        />
        <div className="flex flex-col gap-4 w-full lg:w-[90%]">
          <p className="text-[#b3b3b3]">
            <span className="text-[#F9F7F4]">deCave</span> has emerged as West
            Africa's most influential Afro-cultural gathering, bringing together
            music, art, fashion, and heritage in an immersive 48-hour
            experience.
          </p>
          <p className="text-[#b3b3b3]">
            Our attendees are tastemakers, early adopters, and cultural leaders
            with significant purchasing power and brand influence. They don't
            just attend - they participate, share, and amplify.
          </p>
          <p className="text-[#b3b3b3]">
            By partnering with <span className="text-[#F9F7F4]">deCave</span>,
            your brand gains authentic access to Africa's most engaged cultural
            demographic at the moment of peak receptivity.
          </p>
        </div>
      </div>

      {/* image */}
      <div className="relative h-100 lg:h-200 rounded-xl overflow-hidden shrink-0 shadow-lg shadow-[#2a2a2a]">
        <Image
          src="/partners/partner-img.png"
          alt="guitar-man"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
