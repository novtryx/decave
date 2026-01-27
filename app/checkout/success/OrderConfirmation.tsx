"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

interface TransactionData {
  transaction: {
    _id: string;
    txnId: string;
    event: string;
    paystackId: string;
    ticket: string;
    buyers: {
      fullName: string;
      email: string;
      phoneNumber: string;
      ticketId: string;
      checkedIn: boolean;
      qrCode: string;
      _id: string;
    }[];
    status: string;
    createdAt: string;
    updatedAt: string;
    totalBuyers: number;
    checkedInCount: number;
  };
  event: {
    title: string;
    venue: string;
    address: string;
    startDate: string;
    endDate: string;
    theme: string;
  };
  ticket: {
    ticketName: string;
    price: number;
    currency: string;
  };
  success: boolean;
}

interface OrderConfirmationProps {
  transactionData?: TransactionData;
}

export default function OrderConfirmation({ transactionData }: OrderConfirmationProps) {
  const router = useRouter();
  const [order, setOrder] = useState<TransactionData | null>(null);
  
  useEffect(() => {
    if (transactionData) {
      setOrder(transactionData);
    } else {
      const storedOrder = sessionStorage.getItem("verifiedOrder");
      
      if (!storedOrder) {
        router.push("/events");
        return;
      }

      setOrder(JSON.parse(storedOrder));
    }
  }, [transactionData, router]);

  if (!order) {
    return (
      <div className="bg-[#151515] w-full max-w-3xl mx-auto p-4">
        <p className="text-white">Loading order details...</p>
      </div>
    );
  }

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalAmount = order.ticket.price * order.transaction.totalBuyers;
  const serviceFee = totalAmount * 0.05;
  const grandTotal = totalAmount + serviceFee;

  return (
    <div className="bg-[#151515] w-full max-w-3xl mx-auto p-4 lg:p-6 rounded-xl">
      <h3 className="text-[#F9F7F4] text-xl lg:text-3xl font-semibold">Order Confirmation</h3>

      <div className="mt-10 flex flex-col gap-3">
        {/* Order ID */}
        <div className="flex items-center text-sm lg:text-md justify-between">
          <p className="text-[#b3b3b3]">Order ID</p>
          <p className="text-[#F9F7F4] font-mono">#{order.transaction.txnId}</p>
        </div>
        
        {/* Order date */}
        <div className="flex items-center text-sm lg:text-md justify-between">
          <p className="text-[#b3b3b3]">Order date</p>
          <p className="text-[#F9F7F4]">{formatDateTime(order.transaction.createdAt)}</p>
        </div>
        
        {/* Email */}
        <div className="flex items-center text-sm lg:text-md justify-between">
          <p className="text-[#b3b3b3]">Email</p>
          <p className="text-[#F9F7F4]">{order.transaction.buyers[0]?.email || "N/A"}</p>
        </div>
        
        {/* Payment method */}
        <div className="flex items-center text-sm lg:text-md justify-between">
          <p className="text-[#b3b3b3]">Payment method</p>
          <p className="text-[#F9F7F4]">Card •••• {order.transaction.paystackId?.slice(-4) || "4242"}</p>
        </div>
        
        {/* Payment Status */}
        <div className="flex items-center text-sm lg:text-md justify-between">
          <p className="text-[#b3b3b3]">Payment Status</p>
          <p className="text-[#22C55E] font-semibold capitalize">{order.transaction.status}</p>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="mt-10 border-y-2 py-6 border-[#2a2a2a]">
        <p className="text-[#b3b3b3] mb-4">Ticket Details</p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold text-[#F9F7F4]">{order.ticket.ticketName}</p>
            <p className="text-[#b3b3b3] text-sm mt-1">{order.event.title}</p>
          </div>
          <p className="text-xl font-semibold text-[#F9F7F4]">
            ₦{order.ticket.price.toLocaleString()}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#b3b3b3] mb-2">Quantity</p>
            <p className="text-[#F9F7F4] font-semibold text-lg">{order.transaction.totalBuyers}</p>
          </div>
          <div>
            <p className="text-[#b3b3b3] mb-2">Total Buyers</p>
            <p className="text-[#F9F7F4] font-semibold text-lg">{order.transaction.buyers.length}</p>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mt-6 py-4 border-b border-[#2a2a2a]">
        <div className="flex justify-between mb-2">
          <p className="text-[#b3b3b3]">Subtotal</p>
          <p className="text-[#F9F7F4]">₦{totalAmount.toLocaleString()}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-[#b3b3b3]">Service Fee (5%)</p>
          <p className="text-[#F9F7F4]">₦{serviceFee.toLocaleString()}</p>
        </div>
        <div className="flex justify-between pt-4 border-t border-[#2a2a2a]">
          <p className="text-[#b3b3b3] font-semibold">Total Paid</p>
          <p className="text-[#EFBD3E] text-2xl font-semibold">₦{grandTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Event Date and Venue */}
      <div className="mt-8 bg-[#0F0F0F] px-4 py-6 rounded-lg flex flex-col gap-6">
        {/* Event Date */}
        <div className="flex gap-4 items-center">
          <FaRegCalendarAlt className="text-[#CCA33A] text-xl" />
          <div className="flex flex-col gap-1">
            <p className="text-[#b3b3b3] text-sm">Event Date</p>
            <p className="text-white font-semibold">{formatDate(order.event.startDate)}</p>
            <p className="text-[#b3b3b3] text-xs">
              {new Date(order.event.startDate).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
        
        {/* Event Venue */}
        <div className="flex gap-4 items-center">
          <GrLocation className="text-[#CCA33A] text-xl" />
          <div className="flex flex-col gap-1">
            <p className="text-[#b3b3b3] text-sm">Event Venue</p>
            <p className="text-white font-semibold">{order.event.venue}</p>
            <p className="text-[#b3b3b3] text-xs">{order.event.address}</p>
          </div>
        </div>
        
        {/* Event Theme
        <div className="flex gap-4 items-center">
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#CCA33A]"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#b3b3b3] text-sm">Event Theme</p>
            <p className="text-white font-semibold">{order.event.theme}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}