"use client";

import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";


export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem("newsletter-modal-seen");
    if (hasSeenModal) return;

    // Show modal after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem("newsletter-modal-seen", "true");
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitting(true);
    // setMessage(null);

    // try {
    //   // Replace this with your actual API endpoint
    //   const response = await fetch("/api/newsletter/subscribe", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to subscribe");
    //   }

    //   setMessage({
    //     type: "success",
    //     text: "Thanks for subscribing! Check your email for confirmation.",
    //   });
    //   setEmail("");

    //   // Close modal after 2 seconds on success
    //   setTimeout(() => {
    //     setIsOpen(false);
    //   }, 2000);
    // } catch (error) {
    //   setMessage({
    //     type: "error",
    //     text: "Something went wrong. Please try again.",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
    console.log("User email: ", email);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-[#151515] border-2 border-[#CCA33A] rounded-lg shadow-2xl mx-4">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-3 right-0 bg-[#CCA33A] hover:bg-[#b8922e] text-[#151515] rounded-full p-1.5 transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <IoCloseOutline size={23} strokeWidth={2.5} className="font-semibold" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Logo/Brand */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#CCA33A] mb-2">
                deCave
              </h2>
              <div className="w-16 h-1 bg-[#CCA33A] mx-auto rounded-full" />
            </div>

            {/* Heading */}
            <h3 className="text-2xl font-semibold text-white text-center mb-3">
              Stay in the Loop
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Join our newsletter for exclusive updates, tips, and special
              offers delivered straight to your inbox.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#CCA33A]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#CCA33A] focus:ring-2 focus:ring-[#CCA33A]/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#CCA33A] hover:bg-[#b8922e] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>

            {/* Message */}
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm text-center ${
                  message.type === "success"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Privacy note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}