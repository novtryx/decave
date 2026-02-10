// components/events/event/EventSafetyAndContact.tsx
"use client";

import CardWithoutImage from "@/components/layout/CardWithoutImage";
import ContactCard from "@/components/events/event/ContactCard";
import { safetyData } from "@/lib/data";

interface EventSafetyAndContactProps {
  emergencyContact: {
    security: string;
    medical: string;
    lostButFound: string;
    supportingInfo: string;
  };
}

export default function EventSafetyAndContact({
  emergencyContact,
}: EventSafetyAndContactProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-16 bg-[#151515] py-10 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Safety & Security
          </h2>
          <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
            {emergencyContact.supportingInfo}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {safetyData.map((item) => (
              <CardWithoutImage
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Emergency Contacts
          </h2>
          <p className="text-[#b3b3b3] text-sm sm:text-base mt-3 sm:mt-4 mb-6 sm:mb-8">
            If you need assistance during the event:
          </p>
          <div className="mt-4 flex flex-col gap-4 border-b pb-4 border-[#2a2a2a]">
            <ContactCard
              title="Security"
              content={emergencyContact.security}
              subtext="24/7 Security Support"
            />
            <ContactCard
              title="Medical"
              content={emergencyContact.medical}
              subtext="Emergency Medical Services"
            />
            <ContactCard
              title="Lost & Found"
              content={emergencyContact.lostButFound}
              subtext="Lost Items Assistance"
            />
          </div>
        </div>
      </div>
    </section>
  );
}