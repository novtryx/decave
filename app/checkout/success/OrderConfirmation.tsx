"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";


interface OrderData {
  ticket: any;
  quantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

export default function OrderConfirmation() {
    const router = useRouter();
    const [order, setOrder] = useState<OrderData | null>(null);
      useEffect(() => {
    const storedOrder = sessionStorage.getItem("orderData");

    if (!storedOrder) {
      router.push("/events");
      return;
    }

    setOrder(JSON.parse(storedOrder));
  }, [router]);

  if (!order) return <p>Loading...</p>;

  const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "short",  
    month: "short",     
    day: "numeric",     
    year: "numeric",    
  });
};

    return (
        <div className="bg-[#151515] w-full max-w-3xl mx-auto p-4">
            <h3 className="text-[#F9F7F4] text-xl lg:text-3xl font-semibold">Order Confirmation</h3>

            <div className="mt-10 flex flex-col gap-3">
                {/* Order ID */}
                <div className="flex items-center text-sm lg:text-md justify-between">
                    <p className="text-[#b3b3b3]">Order ID</p>
                    <p className="text-[#F9F7F4]">#dCAVE-2025-5XM3G6SFQ</p>
                </div>
                {/* Order date */}
                <div className="flex items-center text-sm lg:text-md justify-between">
                    <p className="text-[#b3b3b3]">Order date</p>
                    <p className="text-[#F9F7F4]">December 28, 2025</p>
                </div>
                {/* Email */}
                <div className="flex items-center text-sm lg:text-md justify-between">
                    <p className="text-[#b3b3b3]">Email</p>
                    <p className="text-[#F9F7F4]">your.email@gmail.com</p>
                </div>
                {/* Payment method */}
                <div className="flex items-center text-sm lg:text-md justify-between">
                    <p className="text-[#b3b3b3]">Payment method</p>
                    <p className="text-[#F9F7F4]">Card •••• 4242</p>
                </div>
            </div>


            {/* Ticket Details */}
            <div className="mt-10 border-y-2 py-6 border-[#2a2a2a]">
                <p className="text-[#b3b3b3]">Ticket</p>

                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold mt-2">{order.ticket.title}</p>
                    <p className="text-xl font-semibold mt-2">{order.ticket.price}</p>
                </div>

                <div className="mt-4">
                    <p className="text-[#b3b3b3] mb-3">Quantity</p>
                    <p className="text-[#F9F7F4] font-semibold text-lg">{order.quantity}</p>
                </div>
            </div>


            <div className="flex items-center justify-between my-8">
                <p className="text-[#b3b3b3]">Total Paid</p>
                <p className="text-[#EFBD3E] text-2xl lg:text-3xl font-semibold">₦{order.total}</p>
            </div>


            {/* Event Date and Venue */}
            <div className="bg-[#0F0F0F] px-4 py-6 flex flex-col gap-6">
                {/* Event Date */}
                <div className="flex gap-4 items-center">
                    <FaRegCalendarAlt className="text-[#CCA33A]" />
                    <div className="flex flex-col gap-2">
                        <p className="text-[#ffffff] text-sm">Event Date</p>
                        <p className="text-white font-semibold">{formatDate(order.ticket.eventDate)}</p>
                    </div>
                </div>
                {/* Event Venue */}
                <div className="flex gap-4 items-center">
                    <GrLocation className="text-[#CCA33A]" />
                    <div className="flex flex-col gap-2">
                        <p className="text-[#ffffff] text-sm">Event Venue</p>
                        <p className="text-white font-semibold">{order.ticket.eventLocation}</p>
                    </div>
                </div>
            </div>

           
        </div>
    )
}