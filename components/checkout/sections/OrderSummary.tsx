"use client";

import SectionHeader from "@/components/layout/sectionHeader";
import { RiLockLine } from "react-icons/ri";

export interface TicketData {
  id: string;
  price: number;
  originalPrice?: number;
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
  quantity: number;
  setQuantity: (q: number) => void;
  onProceedToPayment: (quantity: number) => Promise<void>;
  isProcessing: boolean;
}

export default function OrderSummary({ 
  ticketData, 
  onProceedToPayment, 
  quantity, 
  setQuantity,
  isProcessing 
}: OrderSummaryProps) {

  const subtotal = ticketData.price * quantity;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const savings =
    ticketData.originalPrice && ticketData.originalPrice > ticketData.price
      ? `₦${(ticketData.originalPrice - ticketData.price).toLocaleString()}`
      : null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-[#151515] p-6 rounded-2xl sticky top-24">
      <SectionHeader title="Order Summary" align="left" />

      <div className="mt-4">
        {/* Ticket Info */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-[#F9F7F4] font-semibold">{ticketData.title}</h4>
            <p className="text-[#b3b3b3] text-sm mt-1">
              Discounted general admission for {ticketData.personCount ?? "1 person"}
            </p>
          </div>
          <h4 className="text-[#F9F7F4] font-semibold">₦{ticketData.price.toLocaleString()}</h4>
        </div>

        {/* Savings */}
        {savings && (
          <div className="bg-[#1A3A1A] border border-[#22C55E] rounded-lg p-2 mt-2">
            <p className="text-[#22C55E] text-sm font-medium">🎉 You save {savings}!</p>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mt-6 bg-[#0F0F0F] border border-[#2a2a2a] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#F9F7F4] font-medium">Quantity</p>
              <p className="text-[#99A1AF] text-sm">Select number of tickets</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isProcessing}
                className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white text-lg hover:bg-[#3a3a3a] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-[#F9F7F4] font-bold text-xl min-w-10 text-center">
                {quantity}
              </span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isProcessing}
                className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white text-lg hover:bg-[#3a3a3a] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-8 py-6 border-y border-[#2a2a2a] flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-[#b3b3b3]">Subtotal ({quantity} ticket{quantity > 1 ? 's' : ''})</p>
            <p className="text-[#F9F7F4] font-medium">₦{subtotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#b3b3b3]">Service Fee</p>
              <p className="text-[#666] text-sm">5% of subtotal</p>
            </div>
            <p className="text-[#F9F7F4] font-medium">₦{serviceFee.toLocaleString()}</p>
          </div>
        </div>

        {/* Total */}
        <div className="py-6 flex justify-between items-center">
          <div>
            <p className="text-[#b3b3b3] font-medium">Total</p>
            <p className="text-[#666] text-sm">Including all fees</p>
          </div>
          <p className="text-[#EFBD3E] font-bold text-3xl">₦{total.toLocaleString()}</p>
        </div>

        {/* Proceed to Payment Button */}
        <button
          onClick={() => onProceedToPayment(quantity)}
          disabled={isProcessing}
          className={`w-full p-4 mt-4 rounded-xl flex justify-center items-center gap-3 font-semibold text-lg transition-all ${
            isProcessing
              ? 'bg-[#CCA33A] opacity-50 cursor-not-allowed'
              : 'bg-[#CCA33A] hover:bg-[#b89332] active:scale-[0.98]'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <RiLockLine size={20} />
              Pay ₦{total.toLocaleString()}
            </>
          )}
        </button>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-[#666] text-sm">
            🔒 Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}