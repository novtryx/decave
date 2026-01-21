"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong, FaRegClock, FaRegUser } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { TbTicket } from "react-icons/tb";
import Image from "next/image";
import { MdOutlineFileDownload, MdOutlineLocationOn, MdOutlineMail, MdOutlineShare } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import ShareModal from "@/components/ticket/ShareModal";

interface OrderData {
  ticket: any;
  quantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

export default function Ticket() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const storedOrder = sessionStorage.getItem("orderData");

    if (!storedOrder) {
      router.push("/events");
      return;
    }

    setOrder(JSON.parse(storedOrder));
  }, [router]);

  if (!order) return <p>Loading...</p>;

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
    <div className="px-4 lg:px-16 py-30 lg:py-40">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm"
      >
        <FaArrowLeftLong />
        <h4>Back</h4>
      </div>

      {/* Main Section */}
      <section className="py-20 flex flex-col justify-center items-center">
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
            className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4] text-center leading-18 lg:leading-24 mt-6"
          >
            Your Tickets
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="text-[#b3b3b3] mt-6">
            Present QR Code at venue entrance
          </motion.p>
        </motion.div>

        {/* Theme Title and QR code */}
        <div className="mt-14 h-auto w-full border-2 border-[#27272A] mx-auto max-w-3xl rounded-lg overflow-hidden">
          {/* Event name */}
          <div className="bg-[conic-gradient(from_45deg,#BA8703,#BC9229,#DFA91E)] p-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-black font-semibold">
                  {order.ticket.eventName}
                </p>
                <h2 className="text-3xl text-black font-semibold">
                  Theme Title
                </h2>
                <p className="text-black">Early Bird/Standard Ticket</p>
              </div>
              <div>
                <TbTicket className="text-black" size={27} />
              </div>
            </div>
          </div>
          {/* QR Code */}
          <div className="bg-white py-10 flex flex-col gap-2 items-center">
            <div className="relative h-30 lg:h-40 w-30 lg:w-40">
              <Image src="/qrcode.png" fill alt="Qr code image" />
            </div>
            <p className="text-[#b3b3b3] text-xs font-semibold">
              Ticket ID: AFSP-2025-TKT-002
            </p>
          </div>

          {/* Ticket Owner Details */}
          <div className="mt-6 px-4 pb-6 flex flex-col gap-4">
            {/* Ticket Holder */}
            <div className="flex gap-4">
              <FaRegUser className="text-[#cca33a]" />
              <div className="flex flex-col gap-2">
                <p className="text-[#b3b3b3] text-sm">Ticket Holder</p>
                <p className="text-[#F9F7F4]">John Doe</p>
              </div>
            </div>
            {/* Event Date */}
            <div className="flex gap-4">
              <MdOutlineMail className="text-[#cca33a]" />
              <div className="flex flex-col gap-2">
                <p className="text-[#b3b3b3] text-sm">Event Date</p>
                <p className="text-[#F9F7F4]">
                  {formatDate(order.ticket.eventDate)}
                </p>
              </div>
            </div>
            {/* Entry Time */}
            <div className="flex gap-4">
              <FaRegClock className="text-[#cca33a]" />
              <div className="flex flex-col gap-2">
                <p className="text-[#b3b3b3] text-sm">Entry Time</p>
                <p className="text-[#F9F7F4]">Gates open at 4:00 PM daily</p>
              </div>
            </div>
            {/* Event Venue */}
            <div className="flex gap-4">
              <MdOutlineLocationOn className="text-[#cca33a]" />
              <div className="flex flex-col gap-2">
                <p className="text-[#b3b3b3] text-sm">Venue</p>
                <p className="text-[#F9F7F4]">Landmark Event Centre</p>
                <p className="text-[#b3b3b3]">{order.ticket.eventLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons and Pagination */}
      <div className="w-full flex flex-col lg:flex-row justify-between border-b-2 pb-10 border-[#2a2a2a] lg:max-w-3xl mx-auto">
        {/* Download and Share ticket */}
        <div className="flex gap-2">
            <button className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-6 rounded-lg">
                <MdOutlineFileDownload size={24} />
                Download
            </button>
            <button onClick={() => setOpen(true)} className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-6 rounded-lg">
                Share
                <MdOutlineShare />
            </button>
        </div>

        {/* Pagination? */}
        <div className=" flex gap-3 items-center">
            <button className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-6 rounded-lg">Previous</button>
            <p className="text-[#FFFFFF]">2 of 2</p>
            <button className="border flex cursor-pointer gap-2 items-center border-[#F9F7F4] text-sm py-2 px-6 rounded-lg">Next</button>
        </div>
      </div>

      {/* Important Information */}
      <div className="border-2 border-[#F59E0B] bg-[#2A1F0F] rounded-lg p-4 w-full lg:max-w-3xl mx-auto">   
        <h3 className="text-[#F59E0B] text-2xl mb-4">Important Information</h3>

        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <GoDotFill size={13} className="text-[#F59E0B]" />
                <p className="text-sm text-[#b3b3b3]">Save this ticket to your phone or print it out. You'll need to present the QR code at the venue entrance.</p>
            </div>
            <div className="flex items-center gap-2">
                <GoDotFill size={13} className="text-[#F59E0B]" />
                <p className="text-sm text-[#b3b3b3]">Each QR code is unique and can only be scanned once. Do not share screenshots of your ticket.</p>
            </div>
            <div className="flex items-center gap-2">
                <GoDotFill size={13} className="text-[#F59E0B]" />
                <p className="text-sm text-[#b3b3b3]">Arrive early to avoid queues. Gates open at 4:00 PM daily.</p>
            </div>
            <div className="flex items-center gap-2">
                <GoDotFill size={13} className="text-[#F59E0B]" />
                <p className="text-sm text-[#b3b3b3]">Valid ID required for entry. See our website for the full list of acceptable IDs.</p>
            </div>
            <div className="flex items-center gap-2">
                <GoDotFill size={13} className="text-[#F59E0B]" />
                <p className="text-sm text-[#b3b3b3]">For ticket transfers or issues, contact tickets@afrospook.com</p>
            </div>
        </div>
      </div>

      {/* Share Modal */}
      {open && (
        <ShareModal isOpen={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col justify-center items-center gap-3">
            
            <h3 className="text-[#F9F7F4] text-center font-semibold text-xl lg:text-2xl">Share with Friends</h3>
            <p className="text-[#b3b3b3] font-semibold w-[90%] text-center">
              Send tickets to other members of your group to join event
            </p>
            {/* form */}
            <form className="mt-6 w-full flex flex-col gap-4">
              {/* Name */}
              <div>
                <p className="text-sm text-[#b3b3b3] font-semibold mb-2">Full Name</p>
                <input
                  type="text"
                  className="bg-[#0F0F0F] w-full p-2 font-semibold rounded-xl border border-[#2a2a2a] placeholder:text-[#6F6F6F]"
                  placeholder="e.g, John Doe"
                />
              </div>
              {/* Email Address */}
              <div>
                <p className="text-sm text-[#b3b3b3] font-semibold mb-2">Email Address</p>
                <input
                  type="text"
                  className="bg-[#0F0F0F] w-full p-2 font-semibold rounded-xl border border-[#2a2a2a] placeholder:text-[#6F6F6F]"
                  placeholder="e.g, Johndoe@gmail.com"
                />
              </div>
              <div className="flex justify-end w-full">
              <button className="bg-[#cca33a] py-2 px-8 w-1/2 text-white rounded-xl">Share</button>
              </div>
            </form>
          </div>
        </ShareModal>
      )}
    </div>
  );
}
