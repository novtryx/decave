import CardWithoutImage from "@/components/layout/CardWithoutImage";
import SectionHeader from "@/components/layout/sectionHeader";
import { audienceInsightData } from "@/lib/data";
import { BsStars } from "react-icons/bs";

export default function AudienceInsight() {
    return (
        <div className="bg-[#151515] px-4 lg:px-16 py-10">
            <SectionHeader 
                label="BY THE NUMBERS"
                title="Audience Insight"
                description="Four principles that guide everything we create"
                icon={BsStars}
                iconColor="#0854a7"
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {audienceInsightData.map((item) => (
                    <CardWithoutImage 
                        key={item.id}
                        icon={item.icon}
                        title={item.value}
                        titleColor="#cca33a"
                        titleSize="xl"
                        description={item.caption}
                    />
                ))}
            </div>
        </div>
    )
}