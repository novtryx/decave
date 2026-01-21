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
}

export const TicketCard: React.FC<TicketCardProps> = ({
  name,
  price,
  features,
  badge,
  popular = false,
  isPrimary = false,
  onBuyClick,
}) => {
  return (
    <div className="relative">
      {/* Most Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <FaRegStar /> Most Popular
          </div>
        </div>
      )}

      {/* Sold Out / Badge */}
      {badge && (
        <div className="absolute top-4 right-4 bg-[#cca33a] text-black text-xs px-3 py-1 rounded-full">
          {badge}
        </div>
      )}

      {/* Card */}
      <div
        className={`
          relative bg-[#1a1a1a] rounded-2xl p-6 
          transition-all duration-300 hover:scale-105 hover:shadow-2xl
          border border-[#2a2a2a] hover:border-yellow-500
          flex flex-col justify-between min-h-75
        `}
      >
        {/* Ticket Name */}
        <h3 className="text-2xl font-semibold text-white mb-4">{name}</h3>

        {/* Price */}
        <span className="text-3xl font-bold text-[#cca33a]">{price}</span>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <LuCheck className="text-blue-500" size={18} />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Buy Button */}
        <button
          onClick={onBuyClick}
          className={`
            w-full mt-6 py-3 rounded-full font-semibold
            transition-all duration-300 hover:scale-105
            ${isPrimary
              ? "bg-yellow-500 text-black hover:bg-yellow-600"
              : "bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800"}
          `}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};
