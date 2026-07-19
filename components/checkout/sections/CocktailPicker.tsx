"use client";

import { Cocktail } from "@/app/actions/events";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { GiMartini } from "react-icons/gi";

interface CocktailPickerProps {
  cocktails: Cocktail[];
  quantities: Record<string, number>;
  onChange: (cocktailId: string, quantity: number) => void;
  disabled?: boolean;
}

const COCKTAIL_DISCOUNT_PERCENT = 20;

export default function CocktailPicker({
  cocktails,
  quantities,
  onChange,
  disabled,
}: CocktailPickerProps) {
  if (!cocktails || cocktails.length === 0) return null;

  return (
    <div className="border border-[#2a2a2a] rounded-lg p-6 mb-6 bg-[#141414]">
      <div className="flex items-center gap-2 mb-1">
        <GiMartini className="text-[#CCA33A]" size={20} />
        <h3 className="text-lg font-semibold text-[#F9F7F4]">Add Cocktails</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] font-medium">
          {COCKTAIL_DISCOUNT_PERCENT}% off
        </span>
      </div>
      <p className="text-sm text-[#b3b3b3] mb-4">
        Pre-order your drinks and skip the bar line — just show your cocktail QR when you get there.
      </p>

      <div className="space-y-3">
        {cocktails.map((cocktail) => {
          const soldOut = cocktail.availableQuantity <= 0;
          const quantity = quantities[cocktail._id] || 0;
          const discountedPrice = cocktail.price * (1 - COCKTAIL_DISCOUNT_PERCENT / 100);

          return (
            <div
              key={cocktail._id}
              className={`flex items-center justify-between gap-4 p-3 rounded-lg border ${
                soldOut ? "border-[#2a2a2a] opacity-50" : "border-[#2a2a2a]"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[#F9F7F4] font-medium truncate">{cocktail.name}</p>
                {cocktail.description && (
                  <p className="text-xs text-[#888] truncate">{cocktail.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#666] line-through">
                    ₦{cocktail.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#22C55E] font-semibold">
                    ₦{discountedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {soldOut ? (
                <span className="text-xs text-[#666] shrink-0">Sold out</span>
              ) : (
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    disabled={disabled || quantity <= 0}
                    onClick={() => onChange(cocktail._id, Math.max(0, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#2a2a2a] text-[#F9F7F4] disabled:opacity-30"
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="w-5 text-center text-[#F9F7F4]">{quantity}</span>
                  <button
                    type="button"
                    disabled={disabled || quantity >= cocktail.availableQuantity}
                    onClick={() => onChange(cocktail._id, Math.min(cocktail.availableQuantity, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#2a2a2a] text-[#F9F7F4] disabled:opacity-30"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}