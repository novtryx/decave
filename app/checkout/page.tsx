"use client";

import ContactInformation from "@/components/checkout/sections/ContactInformation";
import OrderSummary from "@/components/checkout/sections/OrderSummary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineShield } from "react-icons/md";

interface TicketData {
  id: number;
  price: string;
  originalPrice?: string;
  title: string;
  description: string;
  personCount?: string;
  features: string[];
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
}

export default function Checkout() {
  const router = useRouter();
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  useEffect(() => {
    // Retrieve ticket data from sessionStorage
    const storedTicket = sessionStorage.getItem('selectedTicket');
    
    if (storedTicket) {
      setTicketData(JSON.parse(storedTicket));
    } else {
      // If no ticket data, redirect back to events
      router.push('/events');
    }
  }, [router]);

  if (!ticketData) {
    return (
      <div className="bg-[#0f0f0f] px-4 py-20 lg:px-16 min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] px-4 py-20 lg:px-16">
      <div
        onClick={() => router.back()}
        className="cursor-pointer mt-20 mb-6 flex gap-2 items-center text-white hover:text-[#cca33a] transition-colors"
      >
        <BsArrowLeft />
        Back to Tickets
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* left section */}
        <div className="w-full lg:w-4/7">
          {/* Heading */}
          <div className="border-b border-[#2a2a2a] pb-6 mb-10">
            <h1 className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4]">
              Checkout
            </h1>
            <p className="text-[#b3b3b3] my-2 text-md">
              Complete your purchase securely
            </p>

            <div className="flex gap-3 items-center flex-wrap">
              <div className="flex gap-2 items-center">
                <BiLock className="text-[#22C55E]" size={22} />
                <p className="text-[#b3b3b3] my-2 text-sm">Secure Payment</p>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineShield className="text-[#22C55E]" size={22} />
                <p className="text-[#b3b3b3] my-2 text-sm">256-bit Encryption</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaCheck className="text-[#22C55E]" size={22} />
                <p className="text-[#b3b3b3] my-2 text-sm">Instant Delivery</p>
              </div>
            </div>
          </div>

          {/* Contact Information Form */}
          <ContactInformation />
        </div>

        {/* right section */}
        <div className="w-full lg:w-3/7">
          <OrderSummary ticketData={ticketData} />
        </div>
      </div>
    </div>
  );
}