"use client";

import { useState } from "react";
import { FaRegCalendarAlt, FaQrcode } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { MdOutlineConfirmationNumber } from "react-icons/md";

interface TicketReceiptProps {
  transaction: {
    txnId: string;
    paystackId: string;
    buyers: {
      fullName: string;
      email: string;
      phoneNumber: string;
      ticketId: string;
      qrCode: string;
    }[];
    createdAt: string;
    status: string;
    totalBuyers: number;
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
}

export default function TicketReceipt({ transaction, event, ticket }: TicketReceiptProps) {
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (isoDate: string) => {
    return new Date(isoDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalAmount = ticket.price * transaction.totalBuyers;
  const serviceFee = totalAmount * 0.05;
  const grandTotal = totalAmount + serviceFee;

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0A0A0A] text-white p-6 lg:p-8 rounded-2xl border border-[#2a2a2a]">
      {/* Header - Logo and Title */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#2a2a2a]">
        <div>
          <h1 className="text-3xl font-bold text-[#CCA33A]">dCAVE</h1>
          <p className="text-[#b3b3b3] text-sm mt-1">Event Tickets & Experiences</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-white">PAYMENT RECEIPT</h2>
          <p className="text-[#b3b3b3] text-sm">Transaction #{transaction.txnId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Order Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-[#151515] p-5 rounded-xl">
            <h3 className="text-xl font-semibold text-[#CCA33A] mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#b3b3b3]">Order ID</span>
                <span className="font-mono text-white">{transaction.txnId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#b3b3b3]">Date</span>
                <span className="text-white">{formatDateTime(transaction.createdAt)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#b3b3b3]">Status</span>
                <span className="text-[#22C55E] font-semibold capitalize">{transaction.status}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#b3b3b3]">Payment ID</span>
                <span className="font-mono text-white">{transaction.paystackId || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="bg-[#151515] p-5 rounded-xl">
            <h3 className="text-xl font-semibold text-[#CCA33A] mb-4">Buyer Information</h3>
            
            {transaction.buyers.map((buyer, index) => (
              <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-[#2a2a2a]">
                <div className="flex justify-between mb-2">
                  <span className="text-[#b3b3b3]">Full Name</span>
                  <span className="text-white">{buyer.fullName}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-[#b3b3b3]">Email</span>
                  <span className="text-white">{buyer.email}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-[#b3b3b3]">Phone</span>
                  <span className="text-white">{buyer.phoneNumber}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#b3b3b3]">Ticket ID</span>
                  <span className="font-mono text-[#CCA33A]">{buyer.ticketId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Ticket Details */}
        <div className="space-y-6">
          {/* Event Details */}
          <div className="bg-[#151515] p-5 rounded-xl">
            <h3 className="text-xl font-semibold text-[#CCA33A] mb-4">Event Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0A0A0A] rounded-lg">
                  <FaRegCalendarAlt className="text-[#CCA33A]" />
                </div>
                <div>
                  <p className="text-[#b3b3b3] text-sm">Date & Time</p>
                  <p className="text-white font-semibold">{formatDate(event.startDate)}</p>
                  <p className="text-[#b3b3b3] text-sm">{formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0A0A0A] rounded-lg">
                  <GrLocation className="text-[#CCA33A]" />
                </div>
                <div>
                  <p className="text-[#b3b3b3] text-sm">Venue</p>
                  <p className="text-white font-semibold">{event.venue}</p>
                  <p className="text-[#b3b3b3] text-sm">{event.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0A0A0A] rounded-lg">
                  <MdOutlineConfirmationNumber className="text-[#CCA33A]" />
                </div>
                <div>
                  <p className="text-[#b3b3b3] text-sm">Ticket Type</p>
                  <p className="text-white font-semibold">{ticket.ticketName}</p>
                  <p className="text-[#b3b3b3] text-sm">{event.theme}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-[#151515] p-5 rounded-xl">
            <h3 className="text-xl font-semibold text-[#CCA33A] mb-4">Payment Breakdown</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-white">{ticket.ticketName} Ticket</p>
                  <p className="text-[#b3b3b3] text-sm">Quantity: {transaction.totalBuyers}</p>
                </div>
                <p className="text-white">₦{ticket.price.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-between text-[#b3b3b3]">
                <p>Subtotal</p>
                <p>₦{totalAmount.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-between text-[#b3b3b3]">
                <p>Service Fee (5%)</p>
                <p>₦{serviceFee.toLocaleString()}</p>
              </div>
              
              <div className="pt-4 border-t border-[#2a2a2a]">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold text-white">Total Amount</p>
                  <p className="text-2xl font-bold text-[#CCA33A]">₦{grandTotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          {transaction.buyers[0]?.qrCode && (
            <div className="bg-[#151515] p-5 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-[#CCA33A] mb-4">Your QR Code</h3>
              
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-xl mb-3">
                  <img 
                    src={transaction.buyers[0].qrCode} 
                    alt="Ticket QR Code"
                    className="w-48 h-48"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-[#b3b3b3]">
                  <FaQrcode className="text-[#CCA33A]" />
                  <p className="text-sm">Scan this QR code at the venue entrance</p>
                </div>
                
                <p className="mt-2 font-mono text-sm text-white">
                  {transaction.buyers[0].ticketId}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-center text-[#b3b3b3] text-sm">
        <p>Thank you for your purchase! This receipt is proof of payment.</p>
        <p className="mt-1">For support, contact: support@dcave.com • +234 800 000 0000</p>
        <p className="mt-2 text-xs">Receipt generated on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}