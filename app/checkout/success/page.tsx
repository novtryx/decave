// "use client";

// import { motion, Variants } from "framer-motion";
// import OrderConfirmation from "./OrderConfirmation";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { FiCheckCircle } from "react-icons/fi";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState, Suspense } from "react";
// import { verifyPayment } from "@/app/actions/payment";

// interface TransactionData {
//   transaction: {
//     _id: string;
//     txnId: string;
//     event: string;
//     paystackId: string;
//     ticket: string;
//     buyers: {
//       fullName: string;
//       email: string;
//       phoneNumber: string;
//       ticketId: string;
//       checkedIn: boolean;
//       qrCode: string;
//       _id: string;
//     }[];
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//     totalBuyers: number;
//     checkedInCount: number;
//   };
//   event: {
//     title: string;
//     venue: string;
//     address: string;
//     startDate: string;
//     endDate: string;
//     theme: string;
//   };
//   ticket: {
//     ticketName: string;
//     price: number;
//     currency: string;
//   };
//   success: boolean;
// }

// // Create a separate component that uses useSearchParams
// function PaymentSuccessContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [transactionData, setTransactionData] = useState<TransactionData | null>(null);

//   useEffect(() => {
//     const verifyTransaction = async () => {
//       try {
//         setIsLoading(true);
//         const reference = searchParams.get("reference") || searchParams.get("trxref");
        
//         if (!reference) {
//           console.error("No reference found in URL");
//           // Redirect to error page with error message
//           router.push("/checkout/error?reason=no-reference");
//           return;
//         }

//         console.log("Verifying payment with reference:", reference);
        
//         const data = await verifyPayment(reference);
//         console.log("Verification response:", data);
        
//         if (data.success) {
//           setTransactionData(data);
          
//           // Store transaction data in sessionStorage for OrderConfirmation
//           sessionStorage.setItem("verifiedOrder", JSON.stringify(data));
//         } else {
//           // Redirect to error page with error message
//           const errorReason = encodeURIComponent(data.message || "Payment verification failed");
//           router.push(`/checkout/error?reason=${errorReason}`);
//         }
//       } catch (err: any) {
//         console.error("Verification error:", err);
//         // Redirect to error page with error message
//         const errorReason = encodeURIComponent(err.message || "Failed to verify payment");
//         router.push(`/checkout/error?reason=${errorReason}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     verifyTransaction();
//   }, [searchParams, router]);

//   const container: Variants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const item: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
//           <p className="text-white">Verifying payment...</p>
//         </div>
//       </div>
//     );
//   }

//   // Only render success UI if we have transaction data
//   if (!transactionData) {
//     return (
//       <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
//           <p className="text-white">Redirecting...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20">
//       <section className="pt-24 pb-14 flex flex-col justify-center items-center">
//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="visible"
//           className="flex flex-col items-center"
//         >
//           {/* Green Check Mark */}
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15 }}
//             className="border border-[#22C55E] h-14 lg:h-20 w-14 lg:w-20 flex justify-center items-center rounded-full"
//           >
//             <FiCheckCircle className="text-[#00C950] text-2xl lg:text-3xl" />
//           </motion.div>

//           {/* Title */}
//           <motion.h1
//             variants={item}
//             className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4] w-full lg:w-1/2 text-center leading-18 lg:leading-24 mt-6"
//           >
//             Payment Successful!
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p variants={item} className="text-[#b3b3b3] mt-4">
//             Your ticket has been confirmed
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* Action Buttons */}
//       <div className="flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
//         {/* Download Receipt Button */}
//         <button
//           onClick={() => {
//             if (transactionData) {
//               const dataStr = JSON.stringify(transactionData, null, 2);
//               const dataBlob = new Blob([dataStr], { type: 'application/json' });
//               const url = URL.createObjectURL(dataBlob);
//               const link = document.createElement('a');
//               link.href = url;
//               link.download = `receipt-${transactionData.transaction.txnId}.json`;
//               link.click();
//             }
//           }}
//           className="border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none hover:bg-[#151515]"
//         >
//           <MdOutlineFileDownload className="text-xl" />
//           Download Receipt
//         </button>
        
//         <button 
//           onClick={() => router.push("/ticket")}
//           className="bg-[#CCA33A] hover:bg-[#a88732] cursor-pointer font-semibold w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none"
//         >
//           View your Ticket
//           <FaArrowRightLong className="text-xl" />
//         </button>
//       </div>

//       {/* Order Confirmation */}
//       <OrderConfirmation transactionData={transactionData} />
      
//       {/* What's next section */}
//       {transactionData.transaction.buyers.length > 0 && (
//         <section className="mt-10 w-full max-w-3xl mx-auto border border-[#22C55E] bg-[#0F2A1A] p-4 rounded-lg">
//           <h3 className="text-[#22C55E] text-xl">What's Next?</h3>

//           <div className="mt-6 flex flex-col gap-3">
//             <div className="flex items-center gap-3">
//               <FiCheckCircle className="text-[#00C950]" />
//               <p className="text-[#b3b3b3] text-sm lg:text-md">
//                 A confirmation email has been sent to{" "}
//                 <span className="font-semibold text-[#ffffff]">
//                   {transactionData.transaction.buyers[0].email}
//                 </span>
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <FiCheckCircle className="text-[#00C950]" />
//               <p className="text-[#b3b3b3] text-sm lg:text-md">
//                 Your digital ticket with QR code is ready to download
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <FiCheckCircle className="text-[#00C950]" />
//               <p className="text-[#b3b3b3] text-sm lg:text-md">
//                 Present your QR code at the venue entrance for check-in
//               </p>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

// // Main component with Suspense boundary
// export default function PaymentSuccess() {
//   return (
//     <Suspense fallback={
//       <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-[70vh] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
//           <p className="text-white">Loading payment details...</p>
//         </div>
//       </div>
//     }>
//       <PaymentSuccessContent />
//     </Suspense>
//   );
// }

"use client";

import { motion, Variants } from "framer-motion";
import OrderConfirmation from "./OrderConfirmation";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { verifyPayment } from "@/app/actions/payment";
import { FaQrcode } from "react-icons/fa6";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

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

// Create a separate component that uses useSearchParams
function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        setIsLoading(true);
        const reference = searchParams.get("reference") || searchParams.get("trxref");
        
        if (!reference) {
          console.error("No reference found in URL");
          // Redirect to error page with error message
          router.push("/checkout/error?reason=no-reference");
          return;
        }

        console.log("Verifying payment with reference:", reference);
        
        const data = await verifyPayment(reference);
        console.log("Verification response:", data);
        
        if (data.success) {
          setTransactionData(data);
          
          // Store transaction data in sessionStorage for OrderConfirmation and Ticket page
          sessionStorage.setItem("verifiedOrder", JSON.stringify(data));
          
          // Mark that payment has been verified to prevent re-verification
          sessionStorage.setItem("paymentVerified", "true");
        } else {
          // Redirect to error page with error message
          const errorReason = encodeURIComponent(data.message || "Payment verification failed");
          router.push(`/checkout/error?reason=${errorReason}`);
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        // Redirect to error page with error message
        const errorReason = encodeURIComponent(err.message || "Failed to verify payment");
        router.push(`/checkout/error?reason=${errorReason}`);
      } finally {
        setIsLoading(false);
      }
    };

    verifyTransaction();
  }, [searchParams, router]);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
          <p className="text-white">Verifying payment...</p>
        </div>
      </div>
    );
  }

  // Only render success UI if we have transaction data
  if (!transactionData) {
    return (
      <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
          <p className="text-white">Redirecting...</p>
        </div>
      </div>
    );
  }

  const totalTickets = transactionData.transaction.buyers.length;
  const currentTicket = transactionData.transaction.buyers[currentTicketIndex];

  const handlePrevTicket = () => {
    setCurrentTicketIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextTicket = () => {
    setCurrentTicketIndex(prev => Math.min(totalTickets - 1, prev + 1));
  };

  return (
    <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20">
      <section className="pt-24 pb-8 lg:pb-14 flex flex-col justify-center items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Green Check Mark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="border border-[#22C55E] h-14 lg:h-20 w-14 lg:w-20 flex justify-center items-center rounded-full"
          >
            <FiCheckCircle className="text-[#00C950] text-2xl lg:text-3xl" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4] w-full lg:w-1/2 text-center leading-18 lg:leading-24 mt-6"
          >
            Payment Successful!
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="text-[#b3b3b3] mt-4">
            Your {totalTickets > 1 ? 'tickets have' : 'ticket has'} been confirmed
          </motion.p>
        </motion.div>
      </section>

      {/* FIX #3: Ticket Slider - Show all purchased tickets
      {totalTickets > 0 && (
        <div className="w-full max-w-3xl mx-auto mb-10">
          <div className="bg-[#151515] p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#F9F7F4] text-xl font-semibold">
                {totalTickets > 1 ? 'Your Tickets' : 'Your Ticket'}
              </h3>
              {totalTickets > 1 && (
                <p className="text-[#b3b3b3] text-sm">
                  Ticket {currentTicketIndex + 1} of {totalTickets}
                </p>
              )}
            </div>

      
            <div className="bg-[#0F0F0F] border border-[#2a2a2a] rounded-xl overflow-hidden">
            
              <div className="bg-[conic-gradient(from_45deg,#BA8703,#BC9229,#DFA91E)] p-4">
                <p className="text-sm text-black font-semibold">
                  {transactionData.event.title}
                </p>
                <h3 className="text-2xl text-black font-semibold mt-1">
                  {transactionData.ticket.ticketName}
                </h3>
              </div>

  
              <div className="bg-white py-6 flex flex-col items-center">
                {currentTicket?.qrCode ? (
                  <div className="relative h-40 w-40">
                    <img 
                      src={currentTicket.qrCode} 
                      alt="Ticket QR Code"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative h-40 w-40 flex items-center justify-center bg-gray-100">
                    <FaQrcode className="text-gray-400 text-4xl" />
                  </div>
                )}
                <p className="text-[#999999] text-xs font-semibold mt-3">
                  Ticket ID: {currentTicket?.ticketId || "N/A"}
                </p>
              </div>

      
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#b3b3b3] text-sm">Ticket Holder</p>
                    <p className="text-[#F9F7F4] font-semibold mt-1">
                      {currentTicket?.fullName || "N/A"}
                    </p>
                    <p className="text-[#b3b3b3] text-xs mt-1">
                      {currentTicket?.email || "N/A"}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentTicket?.checkedIn 
                      ? 'bg-[#1A3A1A] text-[#22C55E]' 
                      : 'bg-[#2A2A1A] text-[#CCA33A]'
                  }`}>
                    {currentTicket?.checkedIn ? 'Checked In' : 'Not Checked In'}
                  </div>
                </div>
              </div>
            </div>

           
            {totalTickets > 1 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handlePrevTicket}
                  disabled={currentTicketIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#2a2a2a] rounded-lg hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <BiChevronLeft size={20} />
                  Previous
                </button>

     
                <div className="flex gap-2">
                  {transactionData.transaction.buyers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTicketIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentTicketIndex 
                          ? 'bg-[#CCA33A] w-6' 
                          : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextTicket}
                  disabled={currentTicketIndex === totalTickets - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] border border-[#2a2a2a] rounded-lg hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                  <BiChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* Action Buttons */}
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
        {/* Download Receipt Button */}
        <button
          onClick={() => {
            if (transactionData) {
              const dataStr = JSON.stringify(transactionData, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `receipt-${transactionData.transaction.txnId}.json`;
              link.click();
            }
          }}
          className="border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none hover:bg-[#151515]"
        >
          <MdOutlineFileDownload className="text-xl" />
          Download Receipt
        </button>
        
        <button 
          onClick={() => router.push("/ticket")}
          className="bg-[#CCA33A] hover:bg-[#a88732] cursor-pointer font-semibold w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none"
        >
          View All Tickets
          <FaArrowRightLong className="text-xl" />
        </button>
      </div>

      {/* Order Confirmation */}
      <OrderConfirmation transactionData={transactionData} />
      
      {/* What's next section */}
      {transactionData.transaction.buyers.length > 0 && (
        <section className="mt-10 w-full max-w-3xl mx-auto border border-[#22C55E] bg-[#0F2A1A] p-4 rounded-lg">
          <h3 className="text-[#22C55E] text-xl">What's Next?</h3>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                Confirmation emails have been sent to all ticket holders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                {totalTickets > 1 ? 'All digital tickets' : 'Your digital ticket'} with QR {totalTickets > 1 ? 'codes are' : 'code is'} ready to download
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                Present {totalTickets > 1 ? 'each' : 'your'} QR code at the venue entrance for check-in
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Main component with Suspense boundary
export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
          <p className="text-white">Loading payment details...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}