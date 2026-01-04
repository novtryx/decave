import SectionHeader from "@/components/layout/sectionHeader";
import Image from "next/image";
import { BsStars } from "react-icons/bs";
import Accordion from "../ui/Accordion";
import { partnerAccordionData } from "@/lib/data";

export default function PartnerWithDeCave() {
    return (
        <div className="bg-[#151515] py-10 px-4 lg:px-16">
            <SectionHeader 
                label="WHY US"
                title="Why Partner With deCave"
                icon={BsStars}
                iconColor="#0854a7"
                description="deCave is not just an event host — it is a culture-driven entertainment ecosystem that connects brands to highly engaged, trend-setting audiences through immersive, measurable experiences."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* image */}
                <div className="relative h-100 lg:h-200 rounded-xl overflow-hidden shrink-0 shadow-lg shadow-[#2a2a2a]">
                    <Image
                        src="/partners/partner-img.png"
                        alt="guitar-man"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Accordion */}
                <div className="flex flex-col gap-4">
                    {partnerAccordionData.map((item) => (
                        <Accordion 
                            key={item.id}
                            accordionTitle={item.accordionTitle}
                            description={item.description}
                        />
                    ))}        
                </div>
            </div>
        </div>
    )
}