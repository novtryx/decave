// "use client";

// import { useRouter } from "next/navigation";
// import { FaArrowLeftLong, FaRegClock, FaRegUser, FaQrcode } from "react-icons/fa6";
// import { motion, Variants } from "framer-motion";
// import { FiCheckCircle } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { TbTicket } from "react-icons/tb";
// import { MdOutlineFileDownload, MdOutlineLocationOn, MdOutlineMail, MdOutlineShare } from "react-icons/md";
// import { GoDotFill } from "react-icons/go";
// import { verifyPayment } from "@/app/actions/payment";

// interface TicketData {
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

// export default function Ticket() {
//   const router = useRouter();
//   const [ticketData, setTicketData] = useState<TicketData | null>(null);
//   const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {
//     const loadTicketData = async () => {
//       try {
//         setIsLoading(true);
        
//         // First check sessionStorage for verified order
//         const storedVerifiedOrder = sessionStorage.getItem("verifiedOrder");
        
//         if (storedVerifiedOrder) {
//           const data = JSON.parse(storedVerifiedOrder);
//           setTicketData(data);
//           setIsLoading(false);
//           return;
//         }
        
//         // If no verified order, check for orderData and verify
//         const storedOrder = sessionStorage.getItem("orderData");
        
//         if (!storedOrder) {
//           router.push("/events");
//           return;
//         }

//         const order = JSON.parse(storedOrder);
        
//         // Try to verify the payment using txnId
//         if (order.txnId) {
//           const verifiedData = await verifyPayment(order.txnId);
//           if (verifiedData.success) {
//             setTicketData(verifiedData);
//             sessionStorage.setItem("verifiedOrder", JSON.stringify(verifiedData));
//           } else {
//             // Fallback to stored order if verification fails
//             const fallbackData: TicketData = {
//               success: true,
//               transaction: {
//                 _id: order.txnId || "unknown",
//                 txnId: order.txnId || "TXN-UNKNOWN",
//                 event: order.eventId || order.ticketData?.eventId || "",
//                 paystackId: "unknown",
//                 ticket: order.ticketId || order.ticketData?.id || "",
//                 buyers: [{
//                   fullName: order.contactInfo?.fullName || order.contactInfo?.firstName + " " + order.contactInfo?.lastName || "John Doe",
//                   email: order.contactInfo?.email || "john@example.com",
//                   phoneNumber: order.contactInfo?.phoneNumber || "08012345678",
//                   ticketId: order.ticketId || "TKT-UNKNOWN",
//                   checkedIn: false,
//                   qrCode: "/qrcode.png",
//                   _id: "unknown"
//                 }],
//                 status: "completed",
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//                 totalBuyers: order.quantity || 1,
//                 checkedInCount: 0
//               },
//               event: {
//                 title: order.ticketData?.eventName || "Event",
//                 venue: "Venue TBD",
//                 address: order.ticketData?.eventLocation || "Location TBD",
//                 startDate: order.ticketData?.eventDate || new Date().toISOString(),
//                 endDate: new Date(new Date(order.ticketData?.eventDate || new Date()).getTime() + 3 * 60 * 60 * 1000).toISOString(),
//                 theme: order.ticketData?.title || "Standard Ticket"
//               },
//               ticket: {
//                 ticketName: order.ticketData?.title || "Ticket",
//                 price: order.ticketData?.price || 0,
//                 currency: "NGN"
//               }
//             };
//             setTicketData(fallbackData);
//           }
//         }
        
//       } catch (error) {
//         console.error("Error loading ticket data:", error);
//         router.push("/events");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadTicketData();
//   }, [router]);

//   const handleShareTicket = async (index: number) => {
//   try {
//     if (!ticketData) return;
    
//     const currentTicket = ticketData.transaction.buyers[index];
//     const ticketId = currentTicket?.ticketId || "ticket";
    
//     // Create the ticket image (same canvas code as download)
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
    
//     canvas.width = 800;
//     canvas.height = 1200;
    
//     // Background
//     ctx.fillStyle = "#0A0A0A";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
//     // Header with gradient
//     const gradient = ctx.createLinearGradient(0, 0, canvas.width, 100);
//     gradient.addColorStop(0, "#BA8703");
//     gradient.addColorStop(0.5, "#BC9229");
//     gradient.addColorStop(1, "#DFA91E");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, canvas.width, 180);
    
//     // Event title
//     ctx.fillStyle = "#000000";
//     ctx.font = "bold 18px Arial";
//     ctx.fillText(ticketData.event.title.toUpperCase(), 40, 40);
    
//     // Theme
//     ctx.font = "bold 42px Arial";
//     const themeName = ticketData.event.theme;
//     ctx.fillText(themeName.length > 20 ? themeName.substring(0, 20) + "..." : themeName, 40, 95);
    
//     // Ticket type
//     ctx.font = "20px Arial";
//     ctx.fillText(ticketData.ticket.ticketName + " Ticket", 40, 140);
    
//     // QR Code section
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect(0, 180, canvas.width, 350);
    
//     // Load and draw QR code
//     if (currentTicket?.qrCode) {
//       const qrImage = new Image();
//       qrImage.crossOrigin = "anonymous";
      
//       await new Promise((resolve, reject) => {
//         qrImage.onload = () => {
//           const qrSize = 280;
//           const qrX = (canvas.width - qrSize) / 2;
//           const qrY = 200;
//           ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
//           resolve(null);
//         };
//         qrImage.onerror = () => {
//           ctx.fillStyle = "#E5E5E5";
//           const qrSize = 280;
//           const qrX = (canvas.width - qrSize) / 2;
//           const qrY = 200;
//           ctx.fillRect(qrX, qrY, qrSize, qrSize);
//           resolve(null);
//         };
//         qrImage.src = currentTicket.qrCode;
//       });
//     }
    
//     // Ticket ID
//     ctx.fillStyle = "#999999";
//     ctx.font = "14px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText(`Ticket ID: ${ticketId}`, canvas.width / 2, 500);
//     ctx.fillText(`Transaction: ${ticketData.transaction.txnId}`, canvas.width / 2, 520);
//     ctx.textAlign = "left";
    
//     // Details section
//     let yPos = 570;
//     const leftMargin = 40;
//     const iconSize = 16;
    
//     const drawDetail = (label: string, value: string, subValue?: string) => {
//       ctx.fillStyle = "#CCA33A";
//       ctx.beginPath();
//       ctx.arc(leftMargin + iconSize/2, yPos + iconSize/2, iconSize/2, 0, Math.PI * 2);
//       ctx.fill();
      
//       ctx.fillStyle = "#999999";
//       ctx.font = "14px Arial";
//       ctx.fillText(label, leftMargin + 50, yPos + 5);
      
//       ctx.fillStyle = "#F9F7F4";
//       ctx.font = "bold 20px Arial";
//       ctx.fillText(value, leftMargin + 50, yPos + 35);
      
//       if (subValue) {
//         ctx.fillStyle = "#999999";
//         ctx.font = "14px Arial";
//         ctx.fillText(subValue, leftMargin + 50, yPos + 55);
//         yPos += 90;
//       } else {
//         yPos += 70;
//       }
//     };
    
//     const formatDate = (isoDate: string) => {
//       return new Date(isoDate).toLocaleDateString("en-US", {
//         weekday: "short",
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       });
//     };
    
//     const formatTime = (isoDate: string) => {
//       return new Date(isoDate).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     };
    
//     drawDetail("Ticket Holder", currentTicket?.fullName || "N/A");
//     drawDetail("Email", currentTicket?.email || "N/A");
    
//     const dateStr = formatDate(ticketData.event.startDate);
//     const timeStr = `${formatTime(ticketData.event.startDate)} - ${formatTime(ticketData.event.endDate)}`;
//     drawDetail("Event Date & Time", dateStr, timeStr);
    
//     drawDetail("Venue", ticketData.event.venue, ticketData.event.address);
//     drawDetail("Phone Number", currentTicket?.phoneNumber || "N/A");
    
//     const checkInStatus = currentTicket?.checkedIn ? "Checked In ✓" : "Not Checked In";
//     drawDetail("Check-in Status", checkInStatus);
    
//     // Convert canvas to blob
//     const blob = await new Promise<Blob>((resolve) => {
//       canvas.toBlob((blob) => {
//         resolve(blob!);
//       }, "image/png");
//     });
    
//     // Create file from blob
//     const file = new File([blob], `ticket-${ticketId}.png`, { type: "image/png" });
    
//     // Check if Web Share API is supported
//     if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
//       try {
//         await navigator.share({
//           title: `${ticketData.event.title} - Ticket`,
//           text: `My ticket for ${ticketData.event.title}\nTicket ID: ${ticketId}`,
//           files: [file],
//         });
//         console.log("Ticket shared successfully");
//       } catch (error: any) {
//         // User cancelled the share or error occurred
//         if (error.name !== 'AbortError') {
//           console.error("Error sharing:", error);
//           // Fallback: download the image instead
//           const link = document.createElement("a");
//           link.download = `ticket-${ticketId}.png`;
//           link.href = canvas.toDataURL("image/png");
//           link.click();
//         }
//       }
//     } else {
//       // Web Share API not supported, show your modal instead
//       setOpen(true);
//       console.log("Web Share API not supported, showing modal");
//     }
    
//   } catch (error) {
//     console.error("Error sharing ticket:", error);
//     alert("Failed to share ticket. Please try again.");
//   }
// };

//   const handleDownloadTicket = async (index: number) => {
//   try {
//     setIsDownloading(true);
    
//     if (!ticketData) return;
    
//     const currentTicket = ticketData.transaction.buyers[index];
//     const ticketId = currentTicket?.ticketId || "ticket";
    
//     if (currentTicket?.qrCode) {
//       // Download the QR code directly
//       const link = document.createElement("a");
//       link.download = `ticket-${ticketId}.png`;
//       link.href = currentTicket.qrCode;
//       link.click();
//     } else {
//       // Create a simple ticket download
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;
      
//       canvas.width = 600;
//       canvas.height = 400;
      
//       // Simple design
//       ctx.fillStyle = "#0A0A0A";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
      
//       // Ticket text
//       ctx.fillStyle = "#CCA33A";
//       ctx.font = "bold 24px Arial";
//       ctx.fillText("DIGITAL TICKET", 50, 50);
      
//       ctx.fillStyle = "#FFFFFF";
//       ctx.font = "18px Arial";
//       ctx.fillText(`Event: ${ticketData.event.title}`, 50, 100);
//       ctx.fillText(`Ticket: ${ticketData.ticket.ticketName}`, 50, 130);
//       ctx.fillText(`Holder: ${currentTicket?.fullName || "N/A"}`, 50, 160);
//       ctx.fillText(`ID: ${ticketId}`, 50, 190);
//       ctx.fillText(`Date: ${formatDate(ticketData.event.startDate)}`, 50, 220);
      
//       // Convert and download
//       const link = document.createElement("a");
//       link.download = `ticket-${ticketId}.png`;
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     }
    
//   } catch (error) {
//     console.error("Error downloading ticket:", error);
//     alert("Failed to download ticket. Please try again.");
//   } finally {
//     setIsDownloading(false);
//   }
// };
//   const formatDate = (isoDate: string) => {
//     return new Date(isoDate).toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatTime = (isoDate: string) => {
//     return new Date(isoDate).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

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
//       <div className="px-4 lg:px-16 py-30 lg:py-40 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
//           <p className="text-white">Loading your ticket...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!ticketData) {
//     return (
//       <div className="px-4 lg:px-16 py-30 lg:py-40 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl text-white mb-4">No Ticket Found</h1>
//           <button
//             onClick={() => router.push("/events")}
//             className="bg-[#CCA33A] hover:bg-[#a88732] text-white px-6 py-3 rounded-lg"
//           >
//             Browse Events
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const currentTicket = ticketData.transaction.buyers[currentTicketIndex];

//   return (
//     <div className="px-4 lg:px-16 py-30 lg:py-40">
//       <div
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#CCA33A] transition-colors"
//       >
//         <FaArrowLeftLong />
//         <h4>Back</h4>
//       </div>

//       {/* Main Section */}
//       <section className="py-20 flex flex-col justify-center items-center">
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
//             className="text-[50px] lg:text-[100px] font-semibold text-[#F9F7F4] text-center leading-18 lg:leading-24 mt-6"
//           >
//             Your Tickets
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p variants={item} className="text-[#b3b3b3] mt-6">
//             Present QR Code at venue entrance
//           </motion.p>
//         </motion.div>

//         {/* Theme Title and QR code */}
//         <div className="mt-14 h-auto w-full border-2 border-[#27272A] mx-auto max-w-3xl rounded-lg overflow-hidden bg-[#0A0A0A]">
//           {/* Event name */}
//           <div className="bg-[conic-gradient(from_45deg,#BA8703,#BC9229,#DFA91E)] p-6">
//             <div className="flex justify-between">
//               <div className="flex flex-col gap-2">
//                 <p className="text-sm text-black font-semibold">
//                   {ticketData.event.title}
//                 </p>
//                 <h2 className="text-3xl text-black font-semibold">
//                   {ticketData.event.theme}
//                 </h2>
//                 <p className="text-black">{ticketData.ticket.ticketName} Ticket</p>
//               </div>
//               <div>
//                 <TbTicket className="text-black" size={27} />
//               </div>
//             </div>
//           </div>
          
//           {/* QR Code */}
//           <div className="bg-white py-10 flex flex-col gap-2 items-center">
//             {currentTicket?.qrCode ? (
//               <div className="relative h-60 w-60">
//                 <img 
//                   src={currentTicket.qrCode} 
//                   alt="Ticket QR Code"
//                   className="w-full h-full"
//                 />
//               </div>
//             ) : (
//               <div className="relative h-60 w-60 flex items-center justify-center bg-gray-100">
//                 <FaQrcode className="text-gray-400 text-6xl" />
//               </div>
//             )}
//             <p className="text-[#b3b3b3] text-xs font-semibold">
//               Ticket ID: {currentTicket?.ticketId || "N/A"}
//             </p>
//             <p className="text-[#b3b3b3] text-xs">
//               Transaction: {ticketData.transaction.txnId}
//             </p>
//           </div>

//           {/* Ticket Owner Details */}
//           <div className="mt-6 px-6 pb-8 flex flex-col gap-6">
//             {/* Ticket Holder */}
//             <div className="flex gap-4 items-start">
//               <div className="p-2 bg-[#151515] rounded-lg mt-1">
//                 <FaRegUser className="text-[#cca33a]" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#b3b3b3] text-sm">Ticket Holder</p>
//                 <p className="text-[#F9F7F4] text-lg font-medium">{currentTicket?.fullName || "N/A"}</p>
//               </div>
//             </div>
            
//             {/* Email */}
//             <div className="flex gap-4 items-start">
//               <div className="p-2 bg-[#151515] rounded-lg mt-1">
//                 <MdOutlineMail className="text-[#cca33a]" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#b3b3b3] text-sm">Email</p>
//                 <p className="text-[#F9F7F4] text-lg font-medium">{currentTicket?.email || "N/A"}</p>
//               </div>
//             </div>
            
//             {/* Event Date & Time */}
//             <div className="flex gap-4 items-start">
//               <div className="p-2 bg-[#151515] rounded-lg mt-1">
//                 <FaRegClock className="text-[#cca33a]" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#b3b3b3] text-sm">Event Date & Time</p>
//                 <p className="text-[#F9F7F4] text-lg font-medium">
//                   {formatDate(ticketData.event.startDate)}
//                 </p>
//                 <p className="text-[#b3b3b3] text-sm">
//                   {formatTime(ticketData.event.startDate)} - {formatTime(ticketData.event.endDate)}
//                 </p>
//               </div>
//             </div>
            
//             {/* Event Venue */}
//             <div className="flex gap-4 items-start">
//               <div className="p-2 bg-[#151515] rounded-lg mt-1">
//                 <MdOutlineLocationOn className="text-[#cca33a]" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#b3b3b3] text-sm">Venue</p>
//                 <p className="text-[#F9F7F4] text-lg font-medium">{ticketData.event.venue}</p>
//                 <p className="text-[#b3b3b3] text-sm">{ticketData.event.address}</p>
//               </div>
//             </div>
            
//             {/* Phone Number */}
//             <div className="flex gap-4 items-start">
//               <div className="p-2 bg-[#151515] rounded-lg mt-1">
//                 <div className="w-5 h-5 flex items-center justify-center">
//                   <div className="w-3 h-3 rounded-full bg-[#cca33a]"></div>
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#b3b3b3] text-sm">Phone Number</p>
//                 <p className="text-[#F9F7F4] text-lg font-medium">{currentTicket?.phoneNumber || "N/A"}</p>
//               </div>
//             </div>
            
//             {/* Check-in Status */}
//             <div className="flex gap-4 items-start">
//               <div className="p-2 bg-[#151515] rounded-lg mt-1">
//                 <FiCheckCircle className={currentTicket?.checkedIn ? "text-[#22C55E]" : "text-[#CCA33A]"} />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#b3b3b3] text-sm">Check-in Status</p>
//                 <p className={`text-lg font-medium ${currentTicket?.checkedIn ? "text-[#22C55E]" : "text-[#F9F7F4]"}`}>
//                   {currentTicket?.checkedIn ? "Checked In ✓" : "Not Checked In"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Action Buttons and Pagination */}
//       <div className="w-full flex flex-col lg:flex-row justify-between items-center border-b-2 pb-10 border-[#2a2a2a] lg:max-w-3xl mx-auto mt-10 gap-4">
//         {/* Download and Share ticket */}
//         <div className="flex gap-3">
//           <button 
//             onClick={() => handleDownloadTicket(currentTicketIndex)}
//             disabled={isDownloading}
//             className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-3 px-6 rounded-lg hover:bg-[#151515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isDownloading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 Downloading...
//               </>
//             ) : (
//               <>
//                 <MdOutlineFileDownload size={20} />
//                 Download Ticket
//               </>
//             )}
//           </button>
          
//           <button 
//             onClick={() => handleShareTicket(currentTicketIndex)} 
//             className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-3 px-6 rounded-lg hover:bg-[#151515] transition-colors"
//           >
//             Share
//             <MdOutlineShare size={20} />
//           </button>
//         </div>

//         {/* Pagination */}
//         {ticketData.transaction.buyers.length > 1 && (
//           <div className="flex gap-4 items-center">
//             <button 
//               onClick={() => setCurrentTicketIndex(prev => Math.max(0, prev - 1))}
//               disabled={currentTicketIndex === 0}
//               className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-4 rounded-lg hover:bg-[#151515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
            
//             <p className="text-[#FFFFFF]">
//               {currentTicketIndex + 1} of {ticketData.transaction.buyers.length}
//             </p>
            
//             <button 
//               onClick={() => setCurrentTicketIndex(prev => Math.min(ticketData.transaction.buyers.length - 1, prev + 1))}
//               disabled={currentTicketIndex === ticketData.transaction.buyers.length - 1}
//               className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-4 rounded-lg hover:bg-[#151515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Important Information */}
//       <div className="border-2 border-[#F59E0B] bg-[#2A1F0F] rounded-lg p-6 w-full lg:max-w-3xl mx-auto mt-10">   
//         <h3 className="text-[#F59E0B] text-2xl mb-6 font-semibold">Important Information</h3>

//         <div className="flex flex-col gap-4">
//           <div className="flex items-start gap-3">
//             <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
//             <p className="text-sm text-[#b3b3b3]">
//               Save this ticket to your phone or print it out. You'll need to present the QR code at the venue entrance.
//             </p>
//           </div>
          
//           <div className="flex items-start gap-3">
//             <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
//             <p className="text-sm text-[#b3b3b3]">
//               Each QR code is unique and can only be scanned once. Do not share screenshots of your ticket.
//             </p>
//           </div>
          
//           <div className="flex items-start gap-3">
//             <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
//             <p className="text-sm text-[#b3b3b3]">
//               Arrive early to avoid queues. Gates open at {formatTime(ticketData.event.startDate)}.
//             </p>
//           </div>
          
//           <div className="flex items-start gap-3">
//             <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
//             <p className="text-sm text-[#b3b3b3]">
//               Valid ID required for entry. The name on your ID must match the ticket holder's name.
//             </p>
//           </div>
          
//           <div className="flex items-start gap-3">
//             <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
//             <p className="text-sm text-[#b3b3b3]">
//               For ticket transfers or issues, contact support@dcave.com or call +234 800 000 0000.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong, FaRegClock, FaRegUser, FaQrcode } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { TbTicket } from "react-icons/tb";
import { MdOutlineFileDownload, MdOutlineLocationOn, MdOutlineMail, MdOutlineShare } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { verifyPayment } from "@/app/actions/payment";

interface TicketData {
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

export default function Ticket() {
  const router = useRouter();
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadTicketData = async () => {
      try {
        setIsLoading(true);
        
        // FIX #5: First check if we already have verified order data
        const storedVerifiedOrder = sessionStorage.getItem("verifiedOrder");
        const paymentAlreadyVerified = sessionStorage.getItem("paymentVerified");
        
        if (storedVerifiedOrder && paymentAlreadyVerified === "true") {
          // Use the already verified data - don't re-verify
          const data = JSON.parse(storedVerifiedOrder);
          setTicketData(data);
          setIsLoading(false);
          return;
        }
        
        // If no verified order exists, redirect to events
        // Don't attempt to verify payment here as it may have already been done
        if (!storedVerifiedOrder) {
          console.log("No verified order found, redirecting to events");
          router.push("/events");
          return;
        }

        // If we have verified order but no verification flag, set the flag and use the data
        const data = JSON.parse(storedVerifiedOrder);
        setTicketData(data);
        sessionStorage.setItem("paymentVerified", "true");
        
      } catch (error) {
        console.error("Error loading ticket data:", error);
        router.push("/events");
      } finally {
        setIsLoading(false);
      }
    };

    loadTicketData();
  }, [router]);

  const handleShareTicket = async (index: number) => {
    try {
      if (!ticketData) return;
      
      const currentTicket = ticketData.transaction.buyers[index];
      const ticketId = currentTicket?.ticketId || "ticket";
      
      // Create the ticket image (same canvas code as download)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      canvas.width = 800;
      canvas.height = 1200;
      
      // Background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Header with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 100);
      gradient.addColorStop(0, "#BA8703");
      gradient.addColorStop(0.5, "#BC9229");
      gradient.addColorStop(1, "#DFA91E");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 180);
      
      // Event title
      ctx.fillStyle = "#000000";
      ctx.font = "bold 18px Arial";
      ctx.fillText(ticketData.event.title.toUpperCase(), 40, 40);
      
      // Theme
      ctx.font = "bold 42px Arial";
      const themeName = ticketData.event.theme;
      ctx.fillText(themeName.length > 20 ? themeName.substring(0, 20) + "..." : themeName, 40, 95);
      
      // Ticket type
      ctx.font = "20px Arial";
      ctx.fillText(ticketData.ticket.ticketName + " Ticket", 40, 140);
      
      // QR Code section
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 180, canvas.width, 350);
      
      // Load and draw QR code
      if (currentTicket?.qrCode) {
        const qrImage = new Image();
        qrImage.crossOrigin = "anonymous";
        
        await new Promise((resolve, reject) => {
          qrImage.onload = () => {
            const qrSize = 280;
            const qrX = (canvas.width - qrSize) / 2;
            const qrY = 200;
            ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
            resolve(null);
          };
          qrImage.onerror = () => {
            ctx.fillStyle = "#E5E5E5";
            const qrSize = 280;
            const qrX = (canvas.width - qrSize) / 2;
            const qrY = 200;
            ctx.fillRect(qrX, qrY, qrSize, qrSize);
            resolve(null);
          };
          qrImage.src = currentTicket.qrCode;
        });
      }
      
      // Ticket ID
      ctx.fillStyle = "#999999";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Ticket ID: ${ticketId}`, canvas.width / 2, 500);
      ctx.fillText(`Transaction: ${ticketData.transaction.txnId}`, canvas.width / 2, 520);
      ctx.textAlign = "left";
      
      // Details section
      let yPos = 570;
      const leftMargin = 40;
      const iconSize = 16;
      
      const drawDetail = (label: string, value: string, subValue?: string) => {
        ctx.fillStyle = "#CCA33A";
        ctx.beginPath();
        ctx.arc(leftMargin + iconSize/2, yPos + iconSize/2, iconSize/2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#999999";
        ctx.font = "14px Arial";
        ctx.fillText(label, leftMargin + 50, yPos + 5);
        
        ctx.fillStyle = "#F9F7F4";
        ctx.font = "bold 20px Arial";
        ctx.fillText(value, leftMargin + 50, yPos + 35);
        
        if (subValue) {
          ctx.fillStyle = "#999999";
          ctx.font = "14px Arial";
          ctx.fillText(subValue, leftMargin + 50, yPos + 55);
          yPos += 90;
        } else {
          yPos += 70;
        }
      };
      
      const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      };
      
      const formatTime = (isoDate: string) => {
        return new Date(isoDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };
      
      drawDetail("Ticket Holder", currentTicket?.fullName || "N/A");
      drawDetail("Email", currentTicket?.email || "N/A");
      
      const dateStr = formatDate(ticketData.event.startDate);
      const timeStr = `${formatTime(ticketData.event.startDate)} - ${formatTime(ticketData.event.endDate)}`;
      drawDetail("Event Date & Time", dateStr, timeStr);
      
      drawDetail("Venue", ticketData.event.venue, ticketData.event.address);
      drawDetail("Phone Number", currentTicket?.phoneNumber || "N/A");
      
      const checkInStatus = currentTicket?.checkedIn ? "Checked In ✓" : "Not Checked In";
      drawDetail("Check-in Status", checkInStatus);
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, "image/png");
      });
      
      // Create file from blob
      const file = new File([blob], `ticket-${ticketId}.png`, { type: "image/png" });
      
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `${ticketData.event.title} - Ticket`,
            text: `My ticket for ${ticketData.event.title}\nTicket ID: ${ticketId}`,
            files: [file],
          });
          console.log("Ticket shared successfully");
        } catch (error: any) {
          // User cancelled the share or error occurred
          if (error.name !== 'AbortError') {
            console.error("Error sharing:", error);
            // Fallback: download the image instead
            const link = document.createElement("a");
            link.download = `ticket-${ticketId}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
          }
        }
      } else {
        // Web Share API not supported, show your modal instead
        setOpen(true);
        console.log("Web Share API not supported, showing modal");
      }
      
    } catch (error) {
      console.error("Error sharing ticket:", error);
      alert("Failed to share ticket. Please try again.");
    }
  };

  const handleDownloadTicket = async (index: number) => {
    try {
      setIsDownloading(true);
      
      if (!ticketData) return;
      
      const currentTicket = ticketData.transaction.buyers[index];
      const ticketId = currentTicket?.ticketId || "ticket";
      
      if (currentTicket?.qrCode) {
        // Download the QR code directly
        const link = document.createElement("a");
        link.download = `ticket-${ticketId}.png`;
        link.href = currentTicket.qrCode;
        link.click();
      } else {
        // Create a simple ticket download
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        canvas.width = 600;
        canvas.height = 400;
        
        // Simple design
        ctx.fillStyle = "#0A0A0A";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Ticket text
        ctx.fillStyle = "#CCA33A";
        ctx.font = "bold 24px Arial";
        ctx.fillText("DIGITAL TICKET", 50, 50);
        
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "18px Arial";
        ctx.fillText(`Event: ${ticketData.event.title}`, 50, 100);
        ctx.fillText(`Ticket: ${ticketData.ticket.ticketName}`, 50, 130);
        ctx.fillText(`Holder: ${currentTicket?.fullName || "N/A"}`, 50, 160);
        ctx.fillText(`ID: ${ticketId}`, 50, 190);
        ctx.fillText(`Date: ${formatDate(ticketData.event.startDate)}`, 50, 220);
        
        // Convert and download
        const link = document.createElement("a");
        link.download = `ticket-${ticketId}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
      
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (isoDate: string) => {
    return new Date(isoDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
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

  // FIX #5: Better back navigation
  const handleBack = () => {
    // Navigate to events page instead of router.back() to avoid payment re-verification
    router.push("/events");
  };

  if (isLoading) {
    return (
      <div className="px-4 lg:px-16 py-30 lg:py-40 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
          <p className="text-white">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="px-4 lg:px-16 py-30 lg:py-40 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">No Ticket Found</h1>
          <button
            onClick={() => router.push("/events")}
            className="bg-[#CCA33A] hover:bg-[#a88732] text-white px-6 py-3 rounded-lg"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const currentTicket = ticketData.transaction.buyers[currentTicketIndex];

  return (
    <div className="px-4 lg:px-16 py-30 lg:py-40">
      <div
        onClick={handleBack}
        className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#CCA33A] transition-colors"
      >
        <FaArrowLeftLong />
        <h4>Back to Events</h4>
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

        {/* Download and Share ticket */}
        <div className="mt-10 flex flex-col lg:flex-row justify-center gap-4 w-full max-w-3xl">
          <button 
            onClick={() => handleDownloadTicket(currentTicketIndex)}
            disabled={isDownloading}
            className="border flex  justify-center gap-2 w-full cursor-pointer items-center border-[#F9F7F4] text-sm py-3 px-6 rounded-lg hover:bg-[#151515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Downloading...
              </>
            ) : (
              <>
                <MdOutlineFileDownload size={20} />
                Download Ticket
              </>
            )}
          </button>
          
          <button 
            onClick={() => handleShareTicket(currentTicketIndex)} 
            className="border flex justify-center gap-2 w-full cursor-pointer items-center border-[#F9F7F4] text-sm py-3 px-6 rounded-lg hover:bg-[#151515] transition-colors"
          >
            Share
            <MdOutlineShare size={20} />
          </button>
        </div>


        {/* Theme Title and QR code */}
        <div className="mt-14 h-auto w-full border-2 border-[#27272A] mx-auto max-w-3xl rounded-lg overflow-hidden bg-[#0A0A0A]">
          {/* Event name */}
          <div className="bg-[conic-gradient(from_45deg,#BA8703,#BC9229,#DFA91E)] p-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-black font-semibold">
                  {ticketData.event.title}
                </p>
                <h2 className="text-3xl text-black font-semibold">
                  {ticketData.event.theme}
                </h2>
                <p className="text-black">{ticketData.ticket.ticketName} Ticket</p>
              </div>
              <div>
                <TbTicket className="text-black" size={27} />
              </div>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="bg-white py-10 flex flex-col gap-2 items-center">
            {currentTicket?.qrCode ? (
              <div className="relative h-60 w-60">
                <img 
                  src={currentTicket.qrCode} 
                  alt="Ticket QR Code"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="relative h-60 w-60 flex items-center justify-center bg-gray-100">
                <FaQrcode className="text-gray-400 text-6xl" />
              </div>
            )}
            <p className="text-[#b3b3b3] text-xs font-semibold">
              Ticket ID: {currentTicket?.ticketId || "N/A"}
            </p>
            <p className="text-[#b3b3b3] text-xs">
              Transaction: {ticketData.transaction.txnId}
            </p>
          </div>

          {/* Ticket Owner Details */}
          <div className="mt-6 px-6 pb-8 flex flex-col gap-6">
            {/* Ticket Holder */}
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-[#151515] rounded-lg mt-1">
                <FaRegUser className="text-[#cca33a]" />
              </div>
              <div className="flex-1">
                <p className="text-[#b3b3b3] text-sm">Ticket Holder</p>
                <p className="text-[#F9F7F4] text-lg font-medium">{currentTicket?.fullName || "N/A"}</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-[#151515] rounded-lg mt-1">
                <MdOutlineMail className="text-[#cca33a]" />
              </div>
              <div className="flex-1">
                <p className="text-[#b3b3b3] text-sm">Email</p>
                <p className="text-[#F9F7F4] text-lg font-medium">{currentTicket?.email || "N/A"}</p>
              </div>
            </div>
            
            {/* Event Date & Time */}
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-[#151515] rounded-lg mt-1">
                <FaRegClock className="text-[#cca33a]" />
              </div>
              <div className="flex-1">
                <p className="text-[#b3b3b3] text-sm">Event Date & Time</p>
                <p className="text-[#F9F7F4] text-lg font-medium">
                  {formatDate(ticketData.event.startDate)}
                </p>
                <p className="text-[#b3b3b3] text-sm">
                  {formatTime(ticketData.event.startDate)} - {formatTime(ticketData.event.endDate)}
                </p>
              </div>
            </div>
            
            {/* Event Venue */}
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-[#151515] rounded-lg mt-1">
                <MdOutlineLocationOn className="text-[#cca33a]" />
              </div>
              <div className="flex-1">
                <p className="text-[#b3b3b3] text-sm">Venue</p>
                <p className="text-[#F9F7F4] text-lg font-medium">{ticketData.event.venue}</p>
                <p className="text-[#b3b3b3] text-sm">{ticketData.event.address}</p>
              </div>
            </div>
            
            {/* Phone Number */}
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-[#151515] rounded-lg mt-1">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#cca33a]"></div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[#b3b3b3] text-sm">Phone Number</p>
                <p className="text-[#F9F7F4] text-lg font-medium">{currentTicket?.phoneNumber || "N/A"}</p>
              </div>
            </div>
            
            {/* Check-in Status */}
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-[#151515] rounded-lg mt-1">
                <FiCheckCircle className={currentTicket?.checkedIn ? "text-[#22C55E]" : "text-[#CCA33A]"} />
              </div>
              <div className="flex-1">
                <p className="text-[#b3b3b3] text-sm">Check-in Status</p>
                <p className={`text-lg font-medium ${currentTicket?.checkedIn ? "text-[#22C55E]" : "text-[#F9F7F4]"}`}>
                  {currentTicket?.checkedIn ? "Checked In ✓" : "Not Checked In"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      {ticketData.transaction.buyers.length > 1 && (
      <div className="w-full flex flex-col lg:flex-row justify-end items-center border-b-2 pb-10 border-[#2a2a2a] lg:max-w-3xl mx-auto mt-10 gap-4">
        
        {/* Pagination */}
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setCurrentTicketIndex(prev => Math.max(0, prev - 1))}
              disabled={currentTicketIndex === 0}
              className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-4 rounded-lg hover:bg-[#151515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <p className="text-[#FFFFFF]">
              {currentTicketIndex + 1} of {ticketData.transaction.buyers.length}
            </p>
            
            <button 
              onClick={() => setCurrentTicketIndex(prev => Math.min(ticketData.transaction.buyers.length - 1, prev + 1))}
              disabled={currentTicketIndex === ticketData.transaction.buyers.length - 1}
              className="border flex gap-2 cursor-pointer items-center border-[#F9F7F4] text-sm py-2 px-4 rounded-lg hover:bg-[#151515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
      </div>
      )}

      {/* Important Information */}
      <div className="border-2 border-[#F59E0B] bg-[#2A1F0F] rounded-lg p-6 w-full lg:max-w-3xl mx-auto mt-10">   
        <h3 className="text-[#F59E0B] text-2xl mb-6 font-semibold">Important Information</h3>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
            <p className="text-sm text-[#b3b3b3]">
              Save this ticket to your phone or print it out. You'll need to present the QR code at the venue entrance.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
            <p className="text-sm text-[#b3b3b3]">
              Each QR code is unique and can only be scanned once. Do not share screenshots of your ticket.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
            <p className="text-sm text-[#b3b3b3]">
              Arrive early to avoid queues. Gates open at {formatTime(ticketData.event.startDate)}.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
            <p className="text-sm text-[#b3b3b3]">
              Valid ID required for entry. The name on your ID must match the ticket holder's name.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <GoDotFill size={13} className="text-[#F59E0B] mt-1 shrink-0" />
            <p className="text-sm text-[#b3b3b3]">
              For ticket transfers or issues, contact support@dcave.com or call +234 800 000 0000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}