"use client";

import { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import html2canvas from "html2canvas";
import TicketReceipt from "./TicketReceipt";

interface DownloadReceiptButtonProps {
  transactionData: any;
  className?: string;
}

export default function DownloadReceiptButton({ transactionData, className = "" }: DownloadReceiptButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      
      const receiptElement = document.getElementById("ticket-receipt");
      if (!receiptElement) {
        throw new Error("Receipt element not found");
      }

      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0A0A0A",
        logging: false, // Disable logging for performance
        removeContainer: true, // Optimize performance
      });

      const link = document.createElement("a");
      link.download = `receipt-${transactionData.transaction.txnId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to download receipt. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Hidden receipt for capturing */}
      <div className="fixed -left-2500 top-0">
        <div id="ticket-receipt">
          <TicketReceipt
            transaction={transactionData.transaction}
            event={transactionData.event}
            ticket={transactionData.ticket}
          />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadImage}
        disabled={isDownloading}
        className={`border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none hover:bg-[#151515] ${className}`}
      >
        {isDownloading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Downloading...
          </>
        ) : (
          <>
            <MdOutlineFileDownload className="text-xl" />
            Download Receipt (PNG)
          </>
        )}
      </button>
    </>
  );
}