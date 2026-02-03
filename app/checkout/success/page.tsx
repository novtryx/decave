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
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        setIsLoading(true);
        const reference =
          searchParams.get("reference") || searchParams.get("trxref");

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
          const errorReason = encodeURIComponent(
            data.message || "Payment verification failed",
          );
          router.push(`/checkout/error?reason=${errorReason}`);
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        // Redirect to error page with error message
        const errorReason = encodeURIComponent(
          err.message || "Failed to verify payment",
        );
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
            Your {totalTickets > 1 ? "tickets have" : "ticket has"} been
            confirmed
          </motion.p>
        </motion.div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-3xl mx-auto">
        {/* Download Receipt Button */}
        <button
          onClick={() => {
            if (!transactionData) return;

            // Calculate amounts
            const totalBuyers = transactionData.transaction.buyers.length;
            const pricePerTicket = transactionData.ticket.price;
            const subtotal = pricePerTicket * totalBuyers;
            const serviceFee = subtotal * 0.00;
            const total = subtotal + serviceFee;

            
            const formatCurrency = (amount: number) => {
              return amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            };

            // Create a formatted receipt canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = 800;
            canvas.height = 1000;

            // Background
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Header
            ctx.fillStyle = "#0A0A0A";
            ctx.font = "bold 32px Arial";
            ctx.fillText("PAYMENT RECEIPT", 40, 60);

            // Transaction ID
            ctx.font = "14px Arial";
            ctx.fillStyle = "#666666";
            ctx.fillText(
              `Transaction ID: ${transactionData.transaction.txnId}`,
              40,
              90,
            );
            ctx.fillText(
              `Date: ${new Date(transactionData.transaction.createdAt).toLocaleDateString()}`,
              40,
              110,
            );

            // Divider
            ctx.strokeStyle = "#E5E5E5";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(40, 130);
            ctx.lineTo(760, 130);
            ctx.stroke();

            let yPos = 170;

            // Event Details Section
            ctx.fillStyle = "#0A0A0A";
            ctx.font = "bold 20px Arial";
            ctx.fillText("Event Details", 40, yPos);
            yPos += 35;

            ctx.font = "16px Arial";
            ctx.fillStyle = "#333333";
            ctx.fillText(`Event: ${transactionData.event.title}`, 40, yPos);
            yPos += 30;
            ctx.fillText(`Theme: ${transactionData.event.theme}`, 40, yPos);
            yPos += 30;
            ctx.fillText(`Venue: ${transactionData.event.venue}`, 40, yPos);
            yPos += 30;
            ctx.fillText(`Address: ${transactionData.event.address}`, 40, yPos);
            yPos += 30;
            ctx.fillText(
              `Date: ${new Date(
                transactionData.event.startDate,
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`,
              40,
              yPos,
            );
            yPos += 50;

            // Ticket Details Section
            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "#0A0A0A";
            ctx.fillText("Ticket Details", 40, yPos);
            yPos += 35;

            ctx.font = "16px Arial";
            ctx.fillStyle = "#333333";
            ctx.fillText(
              `Ticket Type: ${transactionData.ticket.ticketName}`,
              40,
              yPos,
            );
            yPos += 30;
            ctx.fillText(
              `Price per Ticket: ${transactionData.ticket.currency} ${formatCurrency(pricePerTicket)}`,
              40,
              yPos,
            );
            yPos += 30;
            ctx.fillText(`Quantity: ${totalBuyers}`, 40, yPos);
            yPos += 50;

            // Buyers Section
            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "#0A0A0A";
            ctx.fillText("Ticket Holders", 40, yPos);
            yPos += 35;

            ctx.font = "14px Arial";
            transactionData.transaction.buyers.forEach((buyer, index) => {
              ctx.fillStyle = "#333333";
              ctx.fillText(`${index + 1}. ${buyer.fullName}`, 40, yPos);
              yPos += 25;
              ctx.fillStyle = "#666666";
              ctx.fillText(`   Email: ${buyer.email}`, 40, yPos);
              yPos += 20;
              ctx.fillText(`   Phone: ${buyer.phoneNumber}`, 40, yPos);
              yPos += 30;
            });

            yPos += 20;

            // Divider
            ctx.strokeStyle = "#E5E5E5";
            ctx.beginPath();
            ctx.moveTo(40, yPos);
            ctx.lineTo(760, yPos);
            ctx.stroke();
            yPos += 30;

            // Payment Summary
            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "#0A0A0A";
            ctx.fillText("Payment Summary", 40, yPos);
            yPos += 35;

            ctx.font = "16px Arial";
            ctx.fillStyle = "#333333";
            ctx.fillText(`Subtotal:`, 40, yPos);
            ctx.fillText(
              `${transactionData.ticket.currency} ${formatCurrency(subtotal)}`,
              600,
              yPos,
            );
            yPos += 30;

            ctx.fillText(`Service Fee (0%):`, 40, yPos);
            ctx.fillText(
              `${transactionData.ticket.currency} ${formatCurrency(serviceFee)}`,
              600,
              yPos,
            );
            yPos += 40;

            // Total with background
            ctx.fillStyle = "#CCA33A";
            ctx.fillRect(30, yPos - 25, 740, 45);

            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText("TOTAL PAID:", 40, yPos);
            ctx.fillText(
              `${transactionData.ticket.currency} ${formatCurrency(total)}`,
              600,
              yPos,
            );
            yPos += 50;

            // Status
            ctx.font = "14px Arial";
            ctx.fillStyle = "#22C55E";
            ctx.fillText(
              `✓ Payment Status: ${transactionData.transaction.status.toUpperCase()}`,
              40,
              yPos,
            );

            // Footer
            yPos = canvas.height - 40;
            ctx.font = "12px Arial";
            ctx.fillStyle = "#999999";
            ctx.fillText(
              "Thank you for your purchase! For support, contact support@ocave.com",
              40,
              yPos,
            );

            // Download the canvas as PNG
            const link = document.createElement("a");
            link.download = `receipt-${transactionData.transaction.txnId}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
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
          {totalTickets > 1 ? "View All Tickets" : "View Ticket"}
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
                {totalTickets > 1
                  ? "Confirmation emails have been sent to all ticket holders"
                  : `A Confirmation email has been sent to ${transactionData.transaction.buyers[0].email}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                {totalTickets > 1
                  ? "All digital tickets"
                  : "Your digital ticket"}{" "}
                with QR {totalTickets > 1 ? "codes are" : "code is"} ready to
                download
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#00C950]" />
              <p className="text-[#b3b3b3] text-sm lg:text-md">
                Present {totalTickets > 1 ? "each" : "your"} QR code at the
                venue entrance for check-in
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
    <Suspense
      fallback={
        <div className="bg-[#0F0F0F] px-4 lg:px-16 py-20 min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CCA33A] mx-auto mb-4"></div>
            <p className="text-white">Loading payment details...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}