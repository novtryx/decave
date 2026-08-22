"use client";

import { CategoryField } from "@/app/actions/openCall";

const inputClass =
  "w-full bg-[#0f0f0f] border border-[#2a2a2a] text-[#F9F7F4] rounded-lg px-4 py-3 text-sm placeholder-[#555] focus:outline-none focus:border-[#CCA33A] transition-colors";

/**
 * Renders one form control for one category field, based purely on
 * `field.type`. This is the whole trick behind "one form system, 8
 * categories" — there is no per-category switch statement anywhere;
 * a new category just needs a new set of field configs on the
 * backend, and this component already knows how to render every
 * type it could contain.
 */
export default function DynamicField({
  field,
  value,
  onChange,
  disabled,
}: {
  field: CategoryField;
  value: any;
  onChange: (name: string, value: any) => void;
  disabled?: boolean;
}) {
  const commonProps = {
    disabled,
    id: field.name,
    name: field.name,
  };

  return (
    <div>
      <label htmlFor={field.name} className="block text-[#F9F7F4] font-medium text-sm mb-1.5">
        {field.label}
        {field.required && <span className="text-[#CCA33A] ml-1">*</span>}
      </label>
      {field.helpText && <p className="text-[#8a8a8a] text-xs mb-2">{field.helpText}</p>}

      {field.type === "text" && (
        <input
          {...commonProps}
          type="text"
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        />
      )}

      {field.type === "url" && (
        <input
          {...commonProps}
          type="url"
          value={value || ""}
          placeholder={field.placeholder || "https://"}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        />
      )}

      {field.type === "number" && (
        <input
          {...commonProps}
          type="number"
          min={0}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value === "" ? "" : Number(e.target.value))}
          className={inputClass}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          {...commonProps}
          rows={4}
          value={value || ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${inputClass} resize-none`}
        />
      )}

      {field.type === "select" && (
        <select
          {...commonProps}
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Select an option
          </option>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === "multiselect" && (
        <div className="flex flex-wrap gap-2">
          {(field.options || []).map((opt) => {
            const selected: string[] = Array.isArray(value) ? value : [];
            const isChecked = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                disabled={disabled}
                onClick={() =>
                  onChange(
                    field.name,
                    isChecked ? selected.filter((v) => v !== opt) : [...selected, opt]
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isChecked
                    ? "bg-[#CCA33A] text-black border-[#CCA33A]"
                    : "bg-[#0f0f0f] text-[#B3B3B3] border-[#2a2a2a]"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* type "file" is intentionally NOT rendered here — file
          fields are handled by FileUploadField, which needs the
          resumeToken to actually perform the upload. Keeping it out
          of this component keeps DynamicField free of any
          network/upload concerns. */}
    </div>
  );
}