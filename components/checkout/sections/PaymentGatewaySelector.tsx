"use client";

import { IoCheckmarkCircle } from "react-icons/io5";

export type PaymentGateway = "monnify" | "paystack";

interface PaymentGatewaySelectorProps {
  selected: PaymentGateway;
  onSelect: (gateway: PaymentGateway) => void;
  disabled?: boolean;
}

/**
 * Side-by-side gateway cards, Monnify first and badged as our
 * recommended option — matches the "both cards, Monnify recommended"
 * layout decision. Purely a UI choice: the backend defaults to
 * paystack if no gateway is sent at all, so this component picking
 * monnify by default (see checkout/page.tsx) is what actually makes
 * Monnify the practical default, not anything server-side.
 */
export default function PaymentGatewaySelector({
  selected,
  onSelect,
  disabled = false,
}: PaymentGatewaySelectorProps) {
  return (
    <div className="mb-4">
      <p className="text-[#b3b3b3] text-sm font-medium mb-2.5">Choose payment method</p>
      <div className="grid grid-cols-2 gap-3">
        <GatewayCard
          gateway="monnify"
          label="Monnify"
          recommended
          selected={selected === "monnify"}
          onSelect={onSelect}
          disabled={disabled}
        />
        <GatewayCard
          gateway="paystack"
          label="Paystack"
          selected={selected === "paystack"}
          onSelect={onSelect}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function GatewayCard({
  gateway,
  label,
  recommended = false,
  selected,
  onSelect,
  disabled,
}: {
  gateway: PaymentGateway;
  label: string;
  recommended?: boolean;
  selected: boolean;
  onSelect: (gateway: PaymentGateway) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        // Debug log lives INSIDE the click handler now, not the
        // component body — the old placement logged this card's
        // fixed `gateway` prop on every render (both cards, every
        // re-render), which looked like "monnify then paystack"
        // firing back to back on every click, when actually nothing
        // was flipping at all. This only logs the one card actually
        // clicked, and only when it's clicked.
        console.log("Gateway selected:", gateway);
        onSelect(gateway);
      }}
      className={`relative text-left p-4 rounded-xl border transition-colors disabled:opacity-60 ${
        selected
          ? "bg-[#CCA33A]/10 border-[#CCA33A]"
          : "bg-[#0f0f0f] border-[#2a2a2a] hover:border-[#CCA33A]/50"
      }`}
    >
      {recommended && (
        <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#CCA33A] text-black">
          Recommended
        </span>
      )}
      <div className="flex items-center justify-between mt-1">
        <span className={`font-semibold ${selected ? "text-[#CCA33A]" : "text-[#F9F7F4]"}`}>
          {label}
        </span>
        {selected && <IoCheckmarkCircle className="text-[#CCA33A]" size={18} />}
      </div>
    </button>
  );
}