// "use client";

// import { useState } from "react";
// import { MdOutlineFileDownload } from "react-icons/md";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import TicketReceipt from "./TicketReceipt";

// interface DownloadReceiptButtonProps {
//   transactionData: any;
//   className?: string;
// }

// export default function DownloadReceiptButton({ transactionData, className = "" }: DownloadReceiptButtonProps) {
//   const [isDownloading, setIsDownloading] = useState(false);

//   const handleDownloadPDF = async () => {
//     try {
//       setIsDownloading(true);
      
//       const receiptElement = document.getElementById("ticket-receipt");
//       if (!receiptElement) {
//         throw new Error("Receipt element not found");
//       }

//       // Use html2canvas to capture the receipt
//       const canvas = await html2canvas(receiptElement, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#0A0A0A",
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`receipt-${transactionData.transaction.txnId}.pdf`);
      
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to download receipt. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleDownloadImage = async () => {
//     try {
//       setIsDownloading(true);
      
//       const receiptElement = document.getElementById("ticket-receipt");
//       if (!receiptElement) {
//         throw new Error("Receipt element not found");
//       }

//       const canvas = await html2canvas(receiptElement, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#0A0A0A",
//       });

//       const link = document.createElement("a");
//       link.download = `receipt-${transactionData.transaction.txnId}.png`;
//       link.href = canvas.toDataURL("image/png");
//       link.click();
      
//     } catch (error) {
//       console.error("Error generating image:", error);
//       alert("Failed to download receipt. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <>
//       {/* Hidden receipt for capturing */}
//       <div className="fixed -left-[10000px] top-0">
//         <div id="ticket-receipt">
//           <TicketReceipt
//             transaction={transactionData.transaction}
//             event={transactionData.event}
//             ticket={transactionData.ticket}
//           />
//         </div>
//       </div>

//       {/* Download Button with Dropdown */}
//       <div className={`relative group ${className}`}>
//         <button
//           onClick={handleDownloadPDF}
//           disabled={isDownloading}
//           className="border font-semibold cursor-pointer border-[#F9F7F4] w-full px-6 py-3 flex justify-center gap-2 items-center rounded-lg transition-all duration-300 text-base active:scale-95 touch-manipulation select-none hover:bg-[#151515]"
//         >
//           {isDownloading ? (
//             <>
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               Downloading...
//             </>
//           ) : (
//             <>
//               <MdOutlineFileDownload className="text-xl" />
//               Download Receipt
//             </>
//           )}
//         </button>

//         {/* Dropdown for different formats */}
//         <div className="absolute bottom-full left-0 mb-2 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//           <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-2 shadow-lg">
//             <button
//               onClick={handleDownloadPDF}
//               className="w-full text-left px-4 py-2 text-sm hover:bg-[#0A0A0A] rounded flex items-center gap-2"
//             >
//               📄 Download as PDF
//             </button>
//             <button
//               onClick={handleDownloadImage}
//               className="w-full text-left px-4 py-2 text-sm hover:bg-[#0A0A0A] rounded flex items-center gap-2"
//             >
//               🖼️ Download as Image
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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