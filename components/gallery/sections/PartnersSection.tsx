import PartnerLogos from "@/components/layout/PartnerLogos";
import SectionHeader from "@/components/layout/sectionHeader";
import { LuHandshake } from "react-icons/lu";

export default function PartnersSection() {
    return (
        <div className="bg-[#eef6ff] py-10 px-4 lg:px-16">
            <SectionHeader
            icon={LuHandshake}
            iconColor='#0854a7'
            label='PARTNERS'
            title='Powered by Visionaries'
            description='deCave is made possible through partnerships with brands that believe in culture, community, and the power of collective experience.'
            labelColor='#151515'
            titleColor='#001D3D'
            descriptionColor='#6F6F6F'
        />
        {/* <PartnerLogos /> */}
        </div>
    )
}