// "use client";

// import ContactInformation from "@/components/checkout/sections/ContactInformation";
// import OrderSummary from "@/components/checkout/sections/OrderSummary";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { BiLock } from "react-icons/bi";
// import { BsArrowLeft } from "react-icons/bs";
// import { FaCheck } from "react-icons/fa6";
// import { MdOutlineShield } from "react-icons/md";
// import { purchaseTicket, PurchaseRequest } from "@/app/actions/payment";

// export interface TicketData {
//   id: string;
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

// export interface ContactInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// }

// export default function Checkout() {
//   const router = useRouter();
//   const [ticketData, setTicketData] = useState<TicketData | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [contactInfo, setContactInfo] = useState<ContactInfo>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     const loadTicketData = () => {
//       try {
//         const storedTicket = sessionStorage.getItem("selectedTicket");
        
//         if (storedTicket) {
//           const rawTicket = JSON.parse(storedTicket);
          
//           // Create properly formatted ticket data
//           const ticket: TicketData = {
//             id: rawTicket.ticketId || rawTicket.id || "", // Use ticketId from your data
//             price: Number(rawTicket.price) || 0,
//             title: rawTicket.ticketName || rawTicket.title || "Ticket",
//             description: rawTicket.description || "",
//             eventId: rawTicket.eventId || "",
//             eventName: rawTicket.eventName || "",
//             eventDate: rawTicket.eventDate || "",
//             eventLocation: rawTicket.eventLocation || "",
//             features: rawTicket.features || [],
//             originalPrice: rawTicket.originalPrice ? Number(rawTicket.originalPrice) : undefined,
//             personCount: rawTicket.personCount || "1 person"
//           };
          
//           console.log("Loaded ticket:", ticket);
//           setTicketData(ticket);
//         } else {
//           router.push("/events");
//         }
//       } catch (error) {
//         console.error("Error loading ticket:", error);
//         router.push("/events");
//       }
//     };

//     loadTicketData();
//   }, [router]);

//   const handleProceedToPayment = async (qty: number) => {
//     console.log("=== PAYMENT PROCESS STARTED ===");
    
//     if (!ticketData) {
//       alert("Ticket data not loaded. Please select a ticket again.");
//       return;
//     }

//     // Validate ticket data
//     if (!ticketData.id || !ticketData.eventId) {
//       alert("Ticket information is incomplete. Please select a ticket again.");
//       return;
//     }

//     const { firstName, lastName, email, phoneNumber } = contactInfo;
    
//     // Validate contact info
//     if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phoneNumber?.trim()) {
//       alert("Please fill all contact details");
//       return;
//     }

//     const cleanPhone = phoneNumber.trim();
//     if (!/^[0-9]{11}$/.test(cleanPhone)) {
//       alert("Phone number must be exactly 11 digits");
//       return;
//     }

//     if (isProcessing) return;
//     setIsProcessing(true);

//     try {
//       // Calculate amounts (same as in OrderSummary)
//       const subtotal = ticketData.price * qty;
//       const serviceFee = subtotal * 0.05;
//       const total = subtotal + serviceFee;
      
//       console.log("Payment calculations:", {
//         subtotal,
//         serviceFee,
//         total,
//         quantity: qty
//       });

//       // Create purchase request
//       const purchaseRequest: PurchaseRequest = {
//         eventId: ticketData.eventId,
//         ticketId: ticketData.id,
//         amount: total, // Send TOTAL amount including service fee
//         buyers: [
//           {
//             fullName: `${firstName.trim()} ${lastName.trim()}`,
//             email: email.trim(),
//             phoneNumber: cleanPhone,
//           }
//         ]
//       };

//       console.log("Sending purchase request:", purchaseRequest);

//       const response = await purchaseTicket(purchaseRequest);

//       console.log("Payment response:", response);

//       if (!response?.authorization_url) {
//         throw new Error("No payment URL received");
//       }

//       // Store order data
//       sessionStorage.setItem(
//         "orderData",
//         JSON.stringify({
//           ...purchaseRequest,
//           txnId: response.txnId,
//           quantity: qty,
//           subtotal: subtotal,
//           serviceFee: serviceFee,
//           total: total,
//           contactInfo,
//           ticketData
//         })
//       );

//       // Redirect to payment
//       window.location.href = response.authorization_url;
      
//     } catch (err: any) {
//       console.error("Payment error:", err);
//       alert(`Payment Error: ${err.message || "Failed to process payment. Please try again."}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (!ticketData) {
//     return (
//       <div className="bg-[#0f0f0f] px-4 py-20 lg:px-16 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
//           <p className="text-white">Loading ticket information...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0f0f0f] px-4 py-20 lg:px-16">
//       <div
//         onClick={() => router.back()}
//         className="cursor-pointer mt-20 mb-6 flex gap-2 items-center text-white hover:text-[#cca33a] transition-colors"
//       >
//         <BsArrowLeft />
//         Back to Tickets
//       </div>

//       <div className="flex flex-col lg:flex-row gap-4 w-full">
//         {/* Left Section */}
//         <div className="w-full lg:w-4/7">
//           <div className="border-b border-[#2a2a2a] pb-6 mb-10">
//             <h1 className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4]">Checkout</h1>
//             <p className="text-[#b3b3b3] my-2 text-md">Complete your purchase securely</p>

//             <div className="flex gap-3 items-center flex-wrap">
//               <div className="flex gap-2 items-center">
//                 <BiLock className="text-[#22C55E]" size={22} />
//                 <p className="text-[#b3b3b3] my-2 text-sm">Secure Payment</p>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <MdOutlineShield className="text-[#22C55E]" size={22} />
//                 <p className="text-[#b3b3b3] my-2 text-sm">256-bit Encryption</p>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <FaCheck className="text-[#22C55E]" size={22} />
//                 <p className="text-[#b3b3b3] my-2 text-sm">Instant Delivery</p>
//               </div>
//             </div>
//           </div>

//           <ContactInformation 
//             contactInfo={contactInfo} 
//             setContactInfo={setContactInfo}
//             isProcessing={isProcessing}
//           />
//         </div>

//         {/* Right Section - Order Summary */}
//         <div className="w-full lg:w-3/7">
//           <OrderSummary
//             ticketData={ticketData}
//             quantity={quantity}
//             setQuantity={setQuantity}
//             onProceedToPayment={handleProceedToPayment}
//             isProcessing={isProcessing}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


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
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  
  // New states for multiple attendees
  const [addAttendees, setAddAttendees] = useState(false);
  const [additionalAttendees, setAdditionalAttendees] = useState<ContactInfo[]>([]);
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Update additional attendees array when quantity changes
  useEffect(() => {
    if (quantity > 1) {
      const attendeesNeeded = quantity - 1; // -1 because main buyer is separate
      setAdditionalAttendees(prev => {
        const newAttendees = [...prev];
        
        // Add empty forms if we need more
        while (newAttendees.length < attendeesNeeded) {
          newAttendees.push({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          });
        }
        
        // Remove excess forms if quantity decreased
        if (newAttendees.length > attendeesNeeded) {
          newAttendees.splice(attendeesNeeded);
        }
        
        return newAttendees;
      });
    } else {
      setAdditionalAttendees([]);
      setAddAttendees(false);
    }
  }, [quantity]);

  useEffect(() => {
    const loadTicketData = async() => {
      const startTime = Date.now();
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

          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 3000 - elapsedTime); // 3 seconds minimum
          
          // Wait for remaining time before hiding spinner
          await new Promise(resolve => setTimeout(resolve, remainingTime));

          setTicketData(ticket);
          setIsLoading(false);
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
    
    // Validate main buyer contact info
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phoneNumber?.trim()) {
      alert("Please fill all contact details for the main buyer");
      return;
    }

    const cleanPhone = phoneNumber.trim();
    if (!/^[0-9]{11}$/.test(cleanPhone)) {
      alert("Phone number must be exactly 11 digits");
      return;
    }

    // Validate additional attendees if toggle is ON
    if (addAttendees && qty > 1) {
      for (let i = 0; i < additionalAttendees.length; i++) {
        const attendee = additionalAttendees[i];
        if (!attendee.firstName?.trim() || !attendee.lastName?.trim() || 
            !attendee.email?.trim() || !attendee.phoneNumber?.trim()) {
          alert(`Please fill all details for Attendee ${i + 2}`);
          return;
        }
        
        const cleanAttendeePhone = attendee.phoneNumber.trim();
        if (!/^[0-9]{11}$/.test(cleanAttendeePhone)) {
          alert(`Phone number for Attendee ${i + 2} must be exactly 11 digits`);
          return;
        }
      }
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

      // Build buyers array
      const buyers = [];
      
      // Add main buyer
      buyers.push({
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phoneNumber: cleanPhone,
        quantity: 1
      });

      // Add additional attendees or repeat main buyer
      if (addAttendees && qty > 1) {
        // Add each additional attendee
        for (const attendee of additionalAttendees) {
          buyers.push({
            fullName: `${attendee.firstName.trim()} ${attendee.lastName.trim()}`,
            email: attendee.email.trim(),
            phoneNumber: attendee.phoneNumber.trim(),
            quantity: 1
          });
        }
      } else if (qty > 1) {
        // Repeat main buyer info for remaining tickets
        for (let i = 1; i < qty; i++) {
          buyers.push({
            fullName: `${firstName.trim()} ${lastName.trim()}`,
            email: email.trim(),
            phoneNumber: cleanPhone,
            quantity: 1
          });
        }
      }

      // Create purchase request
      const purchaseRequest: PurchaseRequest = {
        eventId: ticketData.eventId,
        ticketId: ticketData.id,
        amount: total, // Send TOTAL amount including service fee
        buyers: buyers
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
          additionalAttendees: addAttendees ? additionalAttendees : [],
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

          {/* Main Buyer Contact Information */}
          <ContactInformation 
            contactInfo={contactInfo} 
            setContactInfo={setContactInfo}
            isProcessing={isProcessing}
            title="Buyer Information"
            description="Fill out your contact details"
          />

          {/* Add Attendees Toggle - Only show if quantity > 1 */}
          {quantity > 1 && (
            <div className="mt-6 bg-[#151515] px-4 py-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#F9F7F4] font-semibold text-lg">
                    Send tickets to different people?
                  </h3>
                  <p className="text-[#b3b3b3] text-sm mt-1">
                    Add contact details for each attendee
                  </p>
                </div>
                <button
                  onClick={() => setAddAttendees(!addAttendees)}
                  disabled={isProcessing}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    addAttendees ? 'bg-[#CCA33A]' : 'bg-[#2a2a2a]'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      addAttendees ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {!addAttendees && (
                <div className="mt-3 p-3 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg">
                  <p className="text-[#b3b3b3] text-sm">
                    ℹ️ All {quantity} tickets will be sent to: <span className="text-[#F9F7F4] font-medium">{contactInfo.email || 'your email'}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Additional Attendees Forms */}
          {addAttendees && quantity > 1 && (
            <div className="mt-6 space-y-4">
              {additionalAttendees.map((attendee, index) => (
                <ContactInformation
                  key={index}
                  contactInfo={attendee}
                  setContactInfo={(newInfo) => {
                    const updated = [...additionalAttendees];
                    updated[index] = newInfo;
                    setAdditionalAttendees(updated);
                  }}
                  isProcessing={isProcessing}
                  title={`Attendee ${index + 2} Information`}
                  description={`Fill out details for ticket recipient ${index + 2}`}
                />
              ))}
            </div>
          )}
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