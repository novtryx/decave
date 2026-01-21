"use client";

import ContactInformation from "@/components/checkout/sections/ContactInformation";
import OrderSummary from "@/components/checkout/sections/OrderSummary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineShield } from "react-icons/md";
import { purchaseTicket, PurchaseRequest } from "@/app/actions/payment";

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

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export default function Checkout() {
  const router = useRouter();
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadTicketData = () => {
      try {
        const storedTicket = sessionStorage.getItem("selectedTicket");
        
        if (storedTicket) {
          const rawTicket = JSON.parse(storedTicket);
          
          // Create properly formatted ticket data
          const ticket: TicketData = {
            id: rawTicket.ticketId || rawTicket.id || "", // Use ticketId from your data
            price: Number(rawTicket.price) || 0,
            title: rawTicket.ticketName || rawTicket.title || "Ticket",
            description: rawTicket.description || "",
            eventId: rawTicket.eventId || "",
            eventName: rawTicket.eventName || "",
            eventDate: rawTicket.eventDate || "",
            eventLocation: rawTicket.eventLocation || "",
            features: rawTicket.features || [],
            originalPrice: rawTicket.originalPrice ? Number(rawTicket.originalPrice) : undefined,
            personCount: rawTicket.personCount || "1 person"
          };
          
          console.log("Loaded ticket:", ticket);
          setTicketData(ticket);
        } else {
          router.push("/events");
        }
      } catch (error) {
        console.error("Error loading ticket:", error);
        router.push("/events");
      }
    };

    loadTicketData();
  }, [router]);

  const handleProceedToPayment = async (qty: number) => {
    console.log("=== PAYMENT PROCESS STARTED ===");
    
    if (!ticketData) {
      alert("Ticket data not loaded. Please select a ticket again.");
      return;
    }

    // Validate ticket data
    if (!ticketData.id || !ticketData.eventId) {
      alert("Ticket information is incomplete. Please select a ticket again.");
      return;
    }

    const { firstName, lastName, email, phoneNumber } = contactInfo;
    
    // Validate contact info
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phoneNumber?.trim()) {
      alert("Please fill all contact details");
      return;
    }

    const cleanPhone = phoneNumber.trim();
    if (!/^[0-9]{11}$/.test(cleanPhone)) {
      alert("Phone number must be exactly 11 digits");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Calculate amounts (same as in OrderSummary)
      const subtotal = ticketData.price * qty;
      const serviceFee = subtotal * 0.05;
      const total = subtotal + serviceFee;
      
      console.log("Payment calculations:", {
        subtotal,
        serviceFee,
        total,
        quantity: qty
      });

      // Create purchase request
      const purchaseRequest: PurchaseRequest = {
        eventId: ticketData.eventId,
        ticketId: ticketData.id,
        amount: total, // Send TOTAL amount including service fee
        buyers: [
          {
            fullName: `${firstName.trim()} ${lastName.trim()}`,
            email: email.trim(),
            phoneNumber: cleanPhone,
          }
        ]
      };

      console.log("Sending purchase request:", purchaseRequest);

      const response = await purchaseTicket(purchaseRequest);

      console.log("Payment response:", response);

      if (!response?.authorization_url) {
        throw new Error("No payment URL received");
      }

      // Store order data
      sessionStorage.setItem(
        "orderData",
        JSON.stringify({
          ...purchaseRequest,
          txnId: response.txnId,
          quantity: qty,
          subtotal: subtotal,
          serviceFee: serviceFee,
          total: total,
          contactInfo,
          ticketData
        })
      );

      // Redirect to payment
      window.location.href = response.authorization_url;
      
    } catch (err: any) {
      console.error("Payment error:", err);
      alert(`Payment Error: ${err.message || "Failed to process payment. Please try again."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!ticketData) {
    return (
      <div className="bg-[#0f0f0f] px-4 py-20 lg:px-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
          <p className="text-white">Loading ticket information...</p>
        </div>
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
        {/* Left Section */}
        <div className="w-full lg:w-4/7">
          <div className="border-b border-[#2a2a2a] pb-6 mb-10">
            <h1 className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4]">Checkout</h1>
            <p className="text-[#b3b3b3] my-2 text-md">Complete your purchase securely</p>

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

          <ContactInformation 
            contactInfo={contactInfo} 
            setContactInfo={setContactInfo}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-3/7">
          <OrderSummary
            ticketData={ticketData}
            quantity={quantity}
            setQuantity={setQuantity}
            onProceedToPayment={handleProceedToPayment}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}