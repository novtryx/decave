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
    // 2 columns on mobile, 3 on small tablets, 4 from md up — with 8
    // categories that's always exactly 2 or fewer rows, so the whole
    // grid fits in view without scrolling. Cards are compact (short
    // fixed height, no long description) specifically so density
    // doesn't force a scroll even on shorter phone screens.
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
      {categories.map((cat) => {
        const isSelected = cat.slug === selectedSlug;
        return (
          <button
            key={cat._id}
            type="button"
            onClick={() => onSelect(cat)}
            title={cat.description}
            className={`text-left p-3 sm:p-4 rounded-xl border transition-colors flex flex-col justify-center min-h-[72px] sm:min-h-[84px] ${
              isSelected
                ? "bg-[#CCA33A]/10 border-[#CCA33A]"
                : "bg-[#151515] border-[#2a2a2a] hover:border-[#CCA33A]/50"
            }`}
          >
            <h3
              className={`font-semibold text-xs sm:text-sm leading-snug ${
                isSelected ? "text-[#CCA33A]" : "text-[#F9F7F4]"
              }`}
            >
              {cat.name}
            </h3>
          </button>
        );
      })}
    </div>
  );
}