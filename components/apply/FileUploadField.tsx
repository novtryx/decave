"use client";

import { useRef, useState } from "react";
import { CategoryField, ApplicationFile, uploadOpenCallFile } from "@/app/actions/openCall";

export default function FileUploadField({
  field,
  resumeToken,
  existingFile,
  onUploaded,
  disabled,
}: {
  field: CategoryField;
  resumeToken: string;
  existingFile?: ApplicationFile;
  onUploaded: (file: ApplicationFile) => void;
  disabled?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Images are capped tighter than other file types because they go
  // through a Vercel serverless function on the way to Cloudinary —
  // Vercel's request body limit means anything much bigger than this
  // fails at the platform level before our own validation ever runs.
  const IMAGE_MAX_BYTES = 1 * 1024 * 1024;
  const OTHER_MAX_BYTES = 15 * 1024 * 1024;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const maxBytes = isImage ? IMAGE_MAX_BYTES : OTHER_MAX_BYTES;

    if (file.size > maxBytes) {
      setError(
        isImage
          ? "Image is too large. Please upload an image under 1MB."
          : "File is too large. Max size is 15MB."
      );
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setError(null);
    setUploading(true);
    const res = await uploadOpenCallFile(resumeToken, field.name, file);
    setUploading(false);

    if (!res.success) {
      setError(res.error);
      return;
    }
    const uploaded = res.data.files.find((f) => f.fieldName === field.name);
    if (uploaded) onUploaded(uploaded);
  };

  return (
    <div>
      <label className="block text-[#F9F7F4] font-medium text-sm mb-1.5">
        {field.label}
        {field.required && <span className="text-[#CCA33A] ml-1">*</span>}
      </label>
      {field.helpText && <p className="text-[#8a8a8a] text-xs mb-2">{field.helpText}</p>}
      <p className="text-[#6F6F6F] text-xs mb-2">
        Images: max 1MB. Videos and PDFs: max 15MB.
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2.5 bg-[#151515] border border-[#2a2a2a] text-[#F9F7F4] text-sm font-medium rounded-lg hover:border-[#CCA33A] transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading..." : existingFile ? "Replace file" : "Choose file"}
        </button>
        {existingFile && !uploading && (
          <a
            href={existingFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#CCA33A] text-sm truncate max-w-[200px] hover:underline"
          >
            {existingFile.originalName}
          </a>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*,video/*,application/pdf"
      />

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}