import React from "react";
import { LuCheck } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";

interface TicketCardProps {
  id?: string;
  name: string;
  price: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  isPrimary?: boolean;
  onBuyClick?: () => void;
  disabled?: boolean;
  color?: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  name,
  price,
  features,
  badge,
  popular = false,
  isPrimary = false,
  onBuyClick,
  disabled = false,
  color = "#cca33a",
}) => {
  return (
    <div
      className="relative"
      style={{ "--color-accent": color } as React.CSSProperties}
    >
      {/* Most Popular Badge - Hide if disabled */}
      {popular && !disabled && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="text-black text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-2 shadow-lg"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <FaRegStar /> Most Popular
          </div>
        </div>
      )}

      {/* Sold Out / Badge */}
      {badge && (
        <div
          className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${
            badge === "SOLD OUT" || badge === "EVENT ENDED"
              ? "bg-red-500 text-white"
              : "text-black"
          }`}
          style={
            badge !== "SOLD OUT" && badge !== "EVENT ENDED"
              ? { backgroundColor: "var(--color-accent)" }
              : undefined
          }
        >
          {badge}
        </div>
      )}

      {/* Card - Add opacity when disabled */}
      <div
        className={`
          relative bg-[#1a1a1a] rounded-2xl p-6 
          transition-all duration-300 
          border border-[#2a2a2a]
          flex flex-col justify-between min-h-75
          ${disabled
            ? "opacity-70"
            : "hover:scale-105 hover:shadow-2xl hover:border-[--color-accent]"
          }
        `}
      >
        {/* Ticket Name */}
        <h3 className="text-2xl font-semibold text-white mb-4">{name}</h3>

        {/* Price */}
        <span
          className={`text-3xl font-bold ${disabled ? "text-gray-500" : ""}`}
          style={!disabled ? { color: "var(--color-accent)" } : undefined}
        >
          {price}
        </span>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <LuCheck className={`${disabled ? "text-gray-600" : "text-blue-500"}`} size={18} />
              <span className={`text-sm ${disabled ? "text-gray-500" : "text-gray-300"}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Buy Button - Disabled state */}
        <button
          onClick={disabled ? undefined : onBuyClick}
          disabled={disabled}
          className={`
            w-full mt-6 py-3 rounded-full font-semibold
            transition-all duration-300
            ${disabled
              ? "bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700"
              : isPrimary
                ? "text-black hover:scale-105"
                : "bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:scale-105"
            }
          `}
          style={
            !disabled && isPrimary
              ? { backgroundColor: "var(--color-accent)" }
              : undefined
          }
          onMouseEnter={
            !disabled && isPrimary
              ? (e) => (e.currentTarget.style.filter = "brightness(0.85)")
              : undefined
          }
          onMouseLeave={
            !disabled && isPrimary
              ? (e) => (e.currentTarget.style.filter = "brightness(1)")
              : undefined
          }
        >
          {disabled ? "No Longer Available" : "Buy Ticket"}
        </button>
      </div>
    </div>
  );
};