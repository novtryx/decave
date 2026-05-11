"use client";

import { useState, useTransition } from "react";
import { unsubscribeFromNewsletter } from "../actions/newsletter";
import { RiSendPlaneFill } from "react-icons/ri";
import Spinner from "@/components/layout/Spinner";

export default function UnsubscribePage() {
  const [email, setEmail]            = useState("");
  const [error, setError]            = useState("");
  const [done, setDone]              = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setError("");
    if (!email.trim()) return setError("Email is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");

    startTransition(async () => {
      const res = await unsubscribeFromNewsletter({ email });
      if ("error" in res) setError(res.error);
      else setDone(true);
    });
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-2xl w-full max-w-md p-10 flex flex-col items-center text-center gap-5">

          {/* Success icon */}
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-white">You're unsubscribed</h1>
            <p className="text-sm text-[#555]">
              <span className="text-[#888]">{email}</span> has been removed from our mailing list.
            </p>
          </div>

          <p className="text-xs text-[#444]">You won't receive any more emails from us.</p>

          <button
            onClick={() => { setDone(false); setEmail(""); }}
            className="mt-2 text-xs text-[#c9a84c] border border-[#c9a84c]/30 bg-[#c9a84c]/5 rounded-xl px-4 py-2
              hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]/50 transition-all"
          >
            Unsubscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
      <div className="bg-[#151515] border border-[#2a2a2a] rounded-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#1e1e1e]">
          <div className="w-11 h-11 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#cca33a] tracking-tight">Unsubscribe</h1>
          <p className="text-sm text-[#555] mt-1">Enter your email to stop receiving our newsletter.</p>
        </div>

        {/* Form */}
        <div className="px-8 py-6 flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#888] uppercase tracking-wider">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="you@example.com"
              className={`bg-[#0e0e0e] border rounded-xl px-4 py-3 text-sm text-white outline-none
                placeholder:text-[#333] transition-all
                ${error
                  ? "border-red-500/50 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/20"
                  : "border-[#2a2a2a] focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/20"
                }`}
            />
            {error && (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold
              bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]
              hover:bg-[#c9a84c]/16 hover:border-[#c9a84c]/50
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150 cursor-pointer"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <RiSendPlaneFill className="text-base" />
                Unsubscribe
              </>
            )}
          </button>

          {/* <p className="text-xs text-[#444] text-center">
            Changed your mind?{" "}
            <a href="/newsletter/subscribe" className="text-[#c9a84c] hover:underline transition-all">
              Subscribe again
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}