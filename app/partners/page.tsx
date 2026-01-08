"use client";

import HeaderSection from "@/components/events/sections/HeaderSection";
import Button from "@/components/layout/Button";
import CallToAction from "@/components/layout/CallToAction";
import AudienceInsight from "@/components/partners/sections/AudienceInsight";
import CulturalMovement from "@/components/partners/sections/CulturalMovement";
import PartnerWithDeCave from "@/components/partners/sections/PartnerWithDeCave";
import Sponsorship from "@/components/partners/sections/Sponsorship";
import { BiEnvelope } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { MdOutlineFileDownload, MdOutlineMail } from "react-icons/md";

export default function Partners() {
  return (
    <div>
      <HeaderSection
        label="PARTNERSHIP OPPORTUNITIES"
        title="Invest in Culture. Amplify your Brand"
        description="Partner with West Africa's premier Afro-cultural festival and connect with 10,000+ culturally-engaged millenials and Gen Z consumers."
        showTopLine={true}
        backgroundImage="/events/hero-img.png"
      >
        <div className="flex flex-col lg:flex-row justify-center gap-2">
          <Button icon={MdOutlineFileDownload} iconPosition="left">
            Download Partnership Deck
          </Button>
          <Button icon={BiEnvelope} variant="outline">
            Become a Partner
          </Button>
        </div>
      </HeaderSection>

      {/* Cultural Movement Section */}
      <CulturalMovement />
      {/* Audience Insight Section */}
      <AudienceInsight />
      {/* Why partner with deCave */}
      <PartnerWithDeCave />
      {/* Sponsorship Tiers */}
      <Sponsorship />

      {/* Call to Action */}
      <CallToAction
        backgroundGradient="linear-gradient(90deg, #56410C 0%, #001D3D 35%, #56410C 65%, #001D3D 100%)"
        overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/60"
        title="Contact Information"
        description="For sponsorship inquiries"
        // height="h-[500px]"
        containerClassName="w-full p-0"
      >
        <div className="flex flex-col items-center">
          <h3 className="text-white font-semibold text-center text-xl">Samuel Adrian Orobosa</h3>
          <p className="text-[#b3b3b3] text-center">Founder, deCave</p>
          <div className="my-4 flex items-center gap-3">
            <div className="bg-[#EEF6FF33] p-4 rounded-lg">
                <a href="#">
                    <MdOutlineMail size={24} />
                </a>
            </div>
            <div className="bg-[#EEF6FF33] p-4 rounded-lg">
                <a href="#">
                    <ImWhatsapp size={23} />
                </a>
            </div>
          </div>
          <p className="text-center text-[#b3b3b3]">We look forward to building a meaningful and powerful brand partnership with you</p>
        </div>
      </CallToAction>
    </div>
  );
}
