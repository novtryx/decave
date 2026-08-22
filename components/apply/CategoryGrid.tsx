"use client";

import { OpenCallCategory } from "@/app/actions/openCall";

export default function CategoryGrid({
  categories,
  selectedSlug,
  onSelect,
}: {
  categories: OpenCallCategory[];
  selectedSlug?: string;
  onSelect: (category: OpenCallCategory) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((cat) => {
        const isSelected = cat.slug === selectedSlug;
        return (
          <button
            key={cat._id}
            type="button"
            onClick={() => onSelect(cat)}
            className={`text-left p-5 rounded-2xl border transition-colors ${
              isSelected
                ? "bg-[#CCA33A]/10 border-[#CCA33A]"
                : "bg-[#151515] border-[#2a2a2a] hover:border-[#CCA33A]/50"
            }`}
          >
            <h3 className={`font-semibold text-base mb-1 ${isSelected ? "text-[#CCA33A]" : "text-[#F9F7F4]"}`}>
              {cat.name}
            </h3>
            <p className="text-[#8a8a8a] text-sm">{cat.description}</p>
          </button>
        );
      })}
    </div>
  );
}