// "use client";

// import { motion, Variants } from "framer-motion";
// import { MdOutlineFileDownload, MdOutlineMail } from "react-icons/md";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// import { FiCheckCircle, FiRefreshCcw } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import OrderConfirmation from "../success/OrderConfirmation";
// import { TiDeleteOutline } from "react-icons/ti";
// import ErrorDetails from "./ErrorDetails";


// export default function PaymentError() {
//     const router = useRouter();
//       const container: Variants = {
//         hidden: {},
//         visible: {
//           transition: {
//             staggerChildren: 0.15,
//           },
//         },
//       };
    
//       const item: Variants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//           opacity: 1,
//           y: 0,
//           transition: {
//             duration: 0.5,
//             ease: "easeOut",
//           },
//         },
//       };
//     return (
//         <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20">
//               <section className="py-24 flex flex-col justify-center items-center">
//                 <motion.div
//                   variants={container}
//                   initial="hidden"
//                   animate="visible"
//                   className="flex flex-col items-center"
//                 >
//                   {/* Green Check Mark */}
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 200, damping: 15 }}
//                     className="border border-[#EF4444] bg-[#2A0F0F] h-14 lg:h-20 w-14 lg:w-20 flex justify-center items-center rounded-full"
//                   >
//                     <TiDeleteOutline className="text-[#EF4444] text-2xl lg:text-3xl" />
//                   </motion.div>
        
//                   {/* Title */}
//                   <motion.h1
//                     variants={item}
//                     className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4] w-full lg:w-1/2 text-center leading-18 lg:leading-24 mt-6"
//                   >
//                     Payment Unsuccessful!
//                   </motion.h1>
        
//                   {/* Subtitle */}
//                   <motion.p variants={item} className="text-[#b3b3b3] mt-4 text-center">
//                     We couldn't process your payment!
//                     <br />Don't worry, no charges were made to your account.
//                   </motion.p>
//                 </motion.div>
//               </section>
        
//               {/* Error Details */}
//               <ErrorDetails />
        
//               {/* Action Buttons */}
//               <div className="mt-10 flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
//                 <button onClick={() => router.back()} className="border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg">
//                   <FaArrowLeftLong className="text-xl" />
//                   Back to Ticket
//                 </button>
//                 <button onClick={() => router.push("/ticket")} className="bg-[#CCA33A] hover:bg-[#a88732] cursor-pointer font-semibold  w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg">
//                   <FiRefreshCcw className="text-xl" />
//                   Try Again
//                 </button>
//               </div>

//               <div className="mt-10 border-y border-[#2a2a2a] w-full lg:max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 py-10">
//                 <h3 className="text-3xl font-semibold text-[#F9F7F4]">Need Help?</h3>
//                 <p className="text-[#b3b3b3] text-center">
//                     If you continue to experience issues, our support team is here to assist you.
//                 </p>

//                 <div className="flex items-center gap-3"> 
//                     <MdOutlineMail className="text-[#cca33a]" />
//                     <p className="text-[#cca33a]">support@decave.com</p>
//                 </div>
//               </div>
        
//               {/* What's next section */}
//               <section className="mt-10 w-full max-w-3xl mx-auto border border-[#EF4444] bg-[#2A0F0F] p-4 rounded-lg">
//                 <h3 className="text-[#EF4444] text-xl">What's Next?</h3>
        
//                 <div className="mt-6 flex flex-col gap-3">
//                   <div className="flex items-center gap-3">
//                     <FiCheckCircle className="text-[#EF4444]" />
//                     <p className="text-[#b3b3b3] text-sm lg:text-md">
//                       Verify your card details are correct
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <FiCheckCircle className="text-[#EF4444]" />
//                     <p className="text-[#b3b3b3] text-sm lg:text-md">
//                       Check that your card has sufficient balance
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <FiCheckCircle className="text-[#EF4444]" />
//                     <p className="text-[#b3b3b3] text-sm lg:text-md">
//                       Ensure your internet connection is stable
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <FiCheckCircle className="text-[#EF4444]" />
//                     <p className="text-[#b3b3b3] text-sm lg:text-md">
//                       Try a different payment method if available
//                     </p>
//                   </div>
//                 </div>
//               </section>
//             </div>
//     )
// }


"use client";

import { motion, Variants } from "framer-motion";
import { MdOutlineMail } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiCheckCircle, FiRefreshCcw } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorDetails from "./ErrorDetails";
import { TiDeleteOutline } from "react-icons/ti";
import { Suspense, useEffect, useState } from "react";

function PaymentErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorReason, setErrorReason] = useState<string>("");
  const [storedEventId, setStoredEventId] = useState<string | null>(null);

  useEffect(() => {
    // Get error reason from URL
    const reason = searchParams.get("reason");
    if (reason) {
      setErrorReason(decodeURIComponent(reason));
    }

    // Get stored order data to enable retry
    const orderData = sessionStorage.getItem("orderData");
    if (orderData) {
      try {
        const order = JSON.parse(orderData);
        setStoredEventId(order.eventId || order.ticketData?.eventId);
      } catch (err) {
        console.error("Error parsing order data:", err);
      }
    }
  }, [searchParams]);

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

  // FIX #4: Proper retry logic
  const handleTryAgain = () => {
    // Clear the failed payment verification flag
    sessionStorage.removeItem("paymentVerified");
    
    // Try to redirect back to the event detail page if we have the eventId
    if (storedEventId) {
      router.push(`/events/${storedEventId}`);
    } else {
      // Fallback to events page if we don't have event ID
      router.push("/events");
    }
  };

  const handleBackToEvents = () => {
    // Clear payment-related session data
    sessionStorage.removeItem("paymentVerified");
    sessionStorage.removeItem("orderData");
    router.push("/events");
  };

  return (
    <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20">
      <section className="py-24 flex flex-col justify-center items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Red X Mark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="border border-[#EF4444] bg-[#2A0F0F] h-14 lg:h-20 w-14 lg:w-20 flex justify-center items-center rounded-full"
          >
            <TiDeleteOutline className="text-[#EF4444] text-2xl lg:text-3xl" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4] w-full lg:w-1/2 text-center leading-18 lg:leading-24 mt-6"
          >
            Payment Unsuccessful!
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="text-[#b3b3b3] mt-4 text-center">
            We couldn't process your payment!
            <br />Don't worry, no charges were made to your account.
          </motion.p>

          {/* Show error reason if available */}
          {errorReason && (
            <motion.div 
              variants={item}
              className="mt-6 bg-[#2A0F0F] border border-[#EF4444] rounded-lg p-4 max-w-md"
            >
              <p className="text-[#EF4444] text-sm">
                <span className="font-semibold">Error:</span> {errorReason}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Error Details */}
      <ErrorDetails />

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
        <button 
          onClick={handleBackToEvents}
          className="border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 hover:bg-[#151515] active:scale-95"
        >
          <FaArrowLeftLong className="text-xl" />
          Back to Events
        </button>
        
        <button 
          onClick={handleTryAgain}
          className="bg-[#CCA33A] hover:bg-[#a88732] cursor-pointer font-semibold w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 active:scale-95"
        >
          <FiRefreshCcw className="text-xl" />
          Try Again
        </button>
      </div>

      <div className="mt-10 border-y border-[#2a2a2a] w-full lg:max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 py-10">
        <h3 className="text-3xl font-semibold text-[#F9F7F4]">Need Help?</h3>
        <p className="text-[#b3b3b3] text-center">
          If you continue to experience issues, our support team is here to assist you.
        </p>

        <div className="flex items-center gap-3">
          <MdOutlineMail className="text-[#cca33a]" />
          <p className="text-[#cca33a]">support@decave.com</p>
        </div>
      </div>

      {/* What's next section */}
      <section className="mt-10 w-full max-w-3xl mx-auto border border-[#EF4444] bg-[#2A0F0F] p-4 rounded-lg">
        <h3 className="text-[#EF4444] text-xl">What's Next?</h3>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-[#EF4444]" />
            <p className="text-[#b3b3b3] text-sm lg:text-md">
              Verify your card details are correct
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-[#EF4444]" />
            <p className="text-[#b3b3b3] text-sm lg:text-md">
              Check that your card has sufficient balance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-[#EF4444]" />
            <p className="text-[#b3b3b3] text-sm lg:text-md">
              Ensure your internet connection is stable
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-[#EF4444]" />
            <p className="text-[#b3b3b3] text-sm lg:text-md">
              Try a different payment method if available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PaymentError() {
  return (
    <Suspense fallback={
      <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <PaymentErrorContent />
    </Suspense>
  );
}