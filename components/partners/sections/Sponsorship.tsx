import SectionHeader from "@/components/layout/sectionHeader";
import { TicketCard } from "@/components/layout/TicketCard";
import { sponsorshipData } from "@/lib/data";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbTicket } from "react-icons/tb";

export default function Sponsorship() {
  return (
    <section className="bg-[#0f0f0f] py-10 px-4 lg:px-16">
      <SectionHeader
        label="INVESTMENT PACKAGES"
        title="Sponsorship Tiers"
        icon={TbTicket}
        iconColor="#0854a7"
        labelColor="#0854a7"
        description="Flexible partnership options designed to meet your marketing objectives and budgets"
      />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-[#2a2a2a]">
        {sponsorshipData.map((item) => (
          <TicketCard
            key={item.id}
            price={item.price}
            title={item.title}
            description={item.description}
            features={item.features}
            buttonText={item.buttonText}
            isPopular={item.isPopular}
          />
        ))}
      </div>

      <div className="bg-[#4b3808] mt-10 mx-auto max-w-xl border border-[#fff7e4] p-4 rounded-xl flex gap-4">
        <RiErrorWarningLine size={24} className="shrink-0" />
        <p>
          We collaborate with brands across beverage, fashion, lifestyle, tech,
          media, hospitality, and university spaces. Partnerships can range from
          a single edition to long-term multi-event integrations
        </p>
      </div>

    </section>
  );
}
