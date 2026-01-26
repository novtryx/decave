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
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const verifyTransaction = async () => {
//       try {
//         setIsLoading(true);
//         const reference = searchParams.get("reference") || searchParams.get("trxref");
        
//         if (!reference) {
//           console.error("No reference found in URL");
//           router.push("/events");
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
//           setError("Payment verification failed");
//         }
//       } catch (err: any) {
//         console.error("Verification error:", err);
//         setError(err.message || "Failed to verify payment");
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
//       <div className="bg-[#0F0F0F] px-4 lg:px-16 py-16 lg:py-10 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
//           <p className="text-white">Verifying payment...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <FiCheckCircle className="text-red-500 text-5xl mx-auto mb-4" />
//           <h1 className="text-3xl font-semibold text-[#F9F7F4]">Payment Verification Failed</h1>
//           <p className="text-[#b3b3b3] mt-2">{error}</p>
//           <button
//             onClick={() => router.push("/events")}
//             className="mt-6 bg-[#CCA33A] hover:bg-[#a88732] text-white px-6 py-3 rounded-lg"
//           >
//             Back to Events
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20">
//       <section className="py-30 flex flex-col justify-center items-center">
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

//       {/* Order Confirmation */}
//       {transactionData && (
//         <OrderConfirmation transactionData={transactionData} />
//       )}

//       {/* Action Buttons */}
//       <div className="mt-10 flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
//         {/* Download Receipt Button - Simplified without PDF */}
//         <button
//           onClick={() => {
//             // Simple download functionality
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

//       {/* What's next section */}
//       {transactionData && transactionData.transaction.buyers.length > 0 && (
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
          
          // Store transaction data in sessionStorage for OrderConfirmation
          sessionStorage.setItem("verifiedOrder", JSON.stringify(data));
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

  return (
    <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20">
      <section className="py-30 flex flex-col justify-center items-center">
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
            Your ticket has been confirmed
          </motion.p>
        </motion.div>
      </section>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
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
          View your Ticket
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
                A confirmation email has been sent to{" "}
                <span className="font-semibold text-[#ffffff]">
                  {transactionData.transaction.buyers[0].email}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                Your digital ticket with QR code is ready to download
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                Present your QR code at the venue entrance for check-in
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