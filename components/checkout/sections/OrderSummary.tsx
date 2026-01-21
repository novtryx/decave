// "use client"

// import SectionHeader from "@/components/layout/sectionHeader";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { RiLockLine } from "react-icons/ri";

// interface TicketData {
//   id: number;
//   price: number;
//   originalPrice?: number;
//   title: string;
//   description: string;
//   personCount?: string;
//   features: string[];
//   eventId: string;
//   eventName: string;
//   eventDate: string;
//   eventLocation: string;
// }

// interface OrderSummaryProps {
//   ticketData: TicketData;
// }

// export default function OrderSummary({ ticketData }: OrderSummaryProps) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);

//   // const ticketPrice = parseFloat(ticketData.price.replace(/[^0-9.]/g, ""));
//   const ticketPrice = ticketData.price;

//   const subtotal = ticketPrice * quantity;
//   const serviceFee = subtotal * 0.05;
//   const total = subtotal + serviceFee;

//   const handleIncreaseQty = () => setQuantity(quantity + 1);
//   const handleDecreaseQty = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
//   // Format the date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // Calculate savings if there's an original price
//   const calculateSavings = () => {
//     if (!ticketData.originalPrice) return null;

//     const original = parseFloat(
//       ticketData.originalPrice.replace(/[^0-9.]/g, "")
//     );
//     const current = parseFloat(ticketData.price.replace(/[^0-9.]/g, ""));
//     const savings = original - current;

//     return savings > 0 ? `₦${savings.toLocaleString()}` : null;
//   };

//   const savings = calculateSavings();

//   const handleProceedToPayment = () => {
//   const orderData = {
//     ticket: ticketData,
//     quantity,
//     subtotal,
//     serviceFee,
//     total,
//   };

//   sessionStorage.setItem("orderData", JSON.stringify(orderData));
//   router.push("/checkout/success");
// };

//   return (
//     <div className="bg-[#151515] p-4 rounded-2xl sticky top-24">
//       <SectionHeader title="Order Summary" align="left" />

//       <div className="flex justify-between">
//         <h4 className="text-[#F9F7F4] text-lg font-semibold">
//           {ticketData.title}
//         </h4>
//         <h4 className="text-[#F9F7F4] text-lg font-semibold">
//           {ticketData.price}
//         </h4>
//       </div>

//       <p className="text-[#b3b3b3] text-sm">
//         Discounted general admission for {ticketData.personCount}
//       </p>

//       {/* Ticket Quantity */}
//       <div className="mt-6 bg-[#0F0F0F] border rounded-lg border-[#2a2a2a] p-2 flex items-center justify-between">
//         <p className="text-[#99A1AF]">Quantity</p>
//         <div className="flex items-center gap-3">
//           <div
//             onClick={handleDecreaseQty}
//             className="bg-[#151515] py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center w-fit"
//           >
//             <button>-</button>
//           </div>
//           <p>{quantity}</p>
//           <button
//             className="bg-[#151515] py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center w-fit"
//             onClick={handleIncreaseQty}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       {/* costing */}
//       <div className="mt-10 py-6 border-y border-[#2a2a2a] flex flex-col gap-3">
//         {/* Subtotal */}
//         <div className="flex justify-between items-center">
//           <p className="text-[#b3b3b3]">Subtotal</p>
//           <p className="text-[#F9F7F4]">₦{subtotal.toLocaleString()}</p>
//         </div>
//         {/* Service Fee */}
//         <div className="flex justify-between items-center">
//           <p className="text-[#b3b3b3]">Service Fee (5%)</p>
//           <p className="text-[#F9F7F4]">₦{serviceFee.toLocaleString()}</p>
//         </div>
//       </div>
//       {/* Total */}
//       <div className="py-4 border-b border-[#2a2a2a] flex justify-between items-center">
//         <p className="text-[#b3b3b3] font-semibold">Total</p>
//         <p className="text-[#EFBD3E] font-semibold text-3xl">
//           ₦{total.toLocaleString()}
//         </p>
//       </div>

//       <div className="w-full mt-8">
//         <button onClick={handleProceedToPayment} className="bg-[#CCA33A] hover:bg-[#92752d] cursor-pointer text-white w-full p-3 flex justify-center items-center gap-3 rounded-lg transition-all duration-300 font-medium text-sm xs:text-base active:scale-95 touch-manipulation select-none">
//           <span><RiLockLine /></span>
//           Proceed to Payment
//         </button>
//       </div>

//       {/* Paystack */}
//       <div className="pt-4 mt-4 border-t border-[#2a2a2a] flex flex-col items-center gap-8">
//         <p className="text-[#b3b3b3]">Secured by Paystack</p>
        
//         <div className="flex gap-3 items-center">
//           <span className="border border-[#2a2a2a] py-2 px-4">Card</span>
//           <span className="border border-[#2a2a2a] py-2 px-4">Bank Transfer</span>
//           <span className="border border-[#2a2a2a] py-2 px-4">USSD</span>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import SectionHeader from "@/components/layout/sectionHeader";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { RiLockLine } from "react-icons/ri";

// interface TicketData {
//   id: number;
//   price: number; // number, not string
//   originalPrice?: number; // number, optional
//   title: string;
//   description: string;
//   personCount?: string;
//   features: string[];
//   eventId: string;
//   eventName: string;
//   eventDate: string;
//   eventLocation: string;
// }

// interface OrderSummaryProps {
//   ticketData: TicketData;
// }

// export default function OrderSummary({ ticketData }: OrderSummaryProps) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);

//   const ticketPrice = ticketData.price;

//   const subtotal = ticketPrice * quantity;
//   const serviceFee = subtotal * 0.05;
//   const total = subtotal + serviceFee;

//   const handleIncreaseQty = () => setQuantity(quantity + 1);
//   const handleDecreaseQty = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const calculateSavings = (): string | null => {
//     if (!ticketData.originalPrice) return null;

//     const savings = ticketData.originalPrice - ticketData.price;
//     return savings > 0 ? `₦${savings.toLocaleString()}` : null;
//   };

//   const savings = calculateSavings();

//   const handleProceedToPayment = () => {
//     const orderData = {
//       ticket: ticketData,
//       quantity,
//       subtotal,
//       serviceFee,
//       total,
//     };

//     sessionStorage.setItem("orderData", JSON.stringify(orderData));
//     router.push("/checkout/success");
//   };

//   return (
//     <div className="bg-[#151515] p-4 rounded-2xl sticky top-24">
//       <SectionHeader title="Order Summary" align="left" />

//       {/* Ticket info */}
//       <div className="flex justify-between">
//         <h4 className="text-[#F9F7F4] text-lg font-semibold">{ticketData.title}</h4>
//         <h4 className="text-[#F9F7F4] text-lg font-semibold">₦{ticketData.price.toLocaleString()}</h4>
//       </div>

//       {/* Person count */}
//       <p className="text-[#b3b3b3] text-sm">
//         Discounted general admission for {ticketData.personCount ?? "1 person"}
//       </p>

//       {savings && (
//         <p className="text-[#EFBD3E] text-sm mt-1">
//           You save {savings}!
//         </p>
//       )}

//       {/* Ticket Quantity */}
//       <div className="mt-6 bg-[#0F0F0F] border rounded-lg border-[#2a2a2a] p-2 flex items-center justify-between">
//         <p className="text-[#99A1AF]">Quantity</p>
//         <div className="flex items-center gap-3">
//           <div
//             onClick={handleDecreaseQty}
//             className="bg-[#151515] py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center w-fit"
//           >
//             -
//           </div>
//           <p>{quantity}</p>
//           <div
//             onClick={handleIncreaseQty}
//             className="bg-[#151515] py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center w-fit"
//           >
//             +
//           </div>
//         </div>
//       </div>

//       {/* Costing */}
//       <div className="mt-10 py-6 border-y border-[#2a2a2a] flex flex-col gap-3">
//         <div className="flex justify-between items-center">
//           <p className="text-[#b3b3b3]">Subtotal</p>
//           <p className="text-[#F9F7F4]">₦{subtotal.toLocaleString()}</p>
//         </div>
//         <div className="flex justify-between items-center">
//           <p className="text-[#b3b3b3]">Service Fee (5%)</p>
//           <p className="text-[#F9F7F4]">₦{serviceFee.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Total */}
//       <div className="py-4 border-b border-[#2a2a2a] flex justify-between items-center">
//         <p className="text-[#b3b3b3] font-semibold">Total</p>
//         <p className="text-[#EFBD3E] font-semibold text-3xl">₦{total.toLocaleString()}</p>
//       </div>

//       {/* Proceed button */}
//       <div className="w-full mt-8">
//         <button
//           onClick={handleProceedToPayment}
//           className="bg-[#CCA33A] hover:bg-[#92752d] cursor-pointer text-white w-full p-3 flex justify-center items-center gap-3 rounded-lg transition-all duration-300 font-medium text-sm xs:text-base active:scale-95"
//         >
//           <RiLockLine />
//           Proceed to Payment
//         </button>
//       </div>

//       {/* Paystack info */}
//       <div className="pt-4 mt-4 border-t border-[#2a2a2a] flex flex-col items-center gap-8">
//         <p className="text-[#b3b3b3]">Secured by Paystack</p>
//         <div className="flex gap-3 items-center">
//           <span className="border border-[#2a2a2a] py-2 px-4">Card</span>
//           <span className="border border-[#2a2a2a] py-2 px-4">Bank Transfer</span>
//           <span className="border border-[#2a2a2a] py-2 px-4">USSD</span>
//         </div>
//       </div>
//     </div>
//   );
// }
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