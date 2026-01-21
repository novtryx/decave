"use client";

import { motion, Variants } from "framer-motion";
import OrderConfirmation from "./OrderConfirmation";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
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

      {/* Order Confirmation */}
      <OrderConfirmation />

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
        <button className="border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none">
          <MdOutlineFileDownload className="text-xl" />
          Download Receipt
        </button>
        <button onClick={() => router.push("/ticket")} className="bg-[#CCA33A] hover:bg-[#a88732] cursor-pointer font-semibold  w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none">
          View your Ticket
          <FaArrowRightLong className="text-xl" />
        </button>
      </div>

      {/* What's next section */}
      <section className="mt-10 w-full max-w-3xl mx-auto border border-[#22C55E] bg-[#0F2A1A] p-4 rounded-lg">
        <h3 className="text-[#22C55E] text-xl">What's Next?</h3>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-[#00C950]" />
            <p className="text-[#b3b3b3] text-sm lg:text-md">
              A confirmation email has been sent to{" "}
              <span className="font-semibold text-[#ffffff]">
                your.email@example.com
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
    </div>
  );
}
