"use client"

import SectionHeader from "@/components/layout/sectionHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiLockLine } from "react-icons/ri";

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

interface OrderSummaryProps {
  ticketData: TicketData;
}

export default function OrderSummary({ ticketData }: OrderSummaryProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const ticketPrice = parseFloat(ticketData.price.replace(/[^0-9.]/g, ""));
  const subtotal = ticketPrice * quantity;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const handleIncreaseQty = () => setQuantity(quantity + 1);
  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate savings if there's an original price
  const calculateSavings = () => {
    if (!ticketData.originalPrice) return null;

    const original = parseFloat(
      ticketData.originalPrice.replace(/[^0-9.]/g, "")
    );
    const current = parseFloat(ticketData.price.replace(/[^0-9.]/g, ""));
    const savings = original - current;

    return savings > 0 ? `₦${savings.toLocaleString()}` : null;
  };

  const savings = calculateSavings();

  const handleProceedToPayment = () => {
  const orderData = {
    ticket: ticketData,
    quantity,
    subtotal,
    serviceFee,
    total,
  };

  sessionStorage.setItem("orderData", JSON.stringify(orderData));
  router.push("/checkout/success");
};

  return (
    <div className="bg-[#151515] p-4 rounded-2xl sticky top-24">
      <SectionHeader title="Order Summary" align="left" />

      <div className="flex justify-between">
        <h4 className="text-[#F9F7F4] text-lg font-semibold">
          {ticketData.title}
        </h4>
        <h4 className="text-[#F9F7F4] text-lg font-semibold">
          {ticketData.price}
        </h4>
      </div>

      <p className="text-[#b3b3b3] text-sm">
        Discounted general admission for {ticketData.personCount}
      </p>

      {/* Ticket Quantity */}
      <div className="mt-6 bg-[#0F0F0F] border rounded-lg border-[#2a2a2a] p-2 flex items-center justify-between">
        <p className="text-[#99A1AF]">Quantity</p>
        <div className="flex items-center gap-3">
          <div
            onClick={handleDecreaseQty}
            className="bg-[#151515] py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center w-fit"
          >
            <button>-</button>
          </div>
          <p>{quantity}</p>
          <button
            className="bg-[#151515] py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center w-fit"
            onClick={handleIncreaseQty}
          >
            +
          </button>
        </div>
      </div>

      {/* costing */}
      <div className="mt-10 py-6 border-y border-[#2a2a2a] flex flex-col gap-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <p className="text-[#b3b3b3]">Subtotal</p>
          <p className="text-[#F9F7F4]">₦{subtotal.toLocaleString()}</p>
        </div>
        {/* Service Fee */}
        <div className="flex justify-between items-center">
          <p className="text-[#b3b3b3]">Service Fee (5%)</p>
          <p className="text-[#F9F7F4]">₦{serviceFee.toLocaleString()}</p>
        </div>
      </div>
      {/* Total */}
      <div className="py-4 border-b border-[#2a2a2a] flex justify-between items-center">
        <p className="text-[#b3b3b3] font-semibold">Total</p>
        <p className="text-[#EFBD3E] font-semibold text-3xl">
          ₦{total.toLocaleString()}
        </p>
      </div>

      <div className="w-full mt-8">
        <button onClick={handleProceedToPayment} className="bg-[#CCA33A] hover:bg-[#92752d] cursor-pointer text-white w-full p-3 flex justify-center items-center gap-3 rounded-lg transition-all duration-300 font-medium text-sm xs:text-base active:scale-95 touch-manipulation select-none">
          <span><RiLockLine /></span>
          Proceed to Payment
        </button>
      </div>

      {/* Paystack */}
      <div className="pt-4 mt-4 border-t border-[#2a2a2a] flex flex-col items-center gap-8">
        <p className="text-[#b3b3b3]">Secured by Paystack</p>
        
        <div className="flex gap-3 items-center">
          <span className="border border-[#2a2a2a] py-2 px-4">Card</span>
          <span className="border border-[#2a2a2a] py-2 px-4">Bank Transfer</span>
          <span className="border border-[#2a2a2a] py-2 px-4">USSD</span>
        </div>
      </div>
    </div>
  );
}
