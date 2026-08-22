"use client";

const STEPS = ["Personal Info", "Category", "Application", "Uploads", "Review"];

export default function ApplyProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i < currentStep
                  ? "bg-[#CCA33A] text-black"
                  : i === currentStep
                  ? "bg-[#CCA33A]/20 border border-[#CCA33A] text-[#CCA33A]"
                  : "bg-[#151515] border border-[#2a2a2a] text-[#6F6F6F]"
              }`}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] mt-1.5 text-center hidden sm:block ${
                i <= currentStep ? "text-[#F9F7F4]" : "text-[#6F6F6F]"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1 bg-[#151515] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#CCA33A] transition-all duration-300"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}