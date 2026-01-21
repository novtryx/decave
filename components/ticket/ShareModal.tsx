"use client";

import React from "react";
import { MdClose } from "react-icons/md";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ShareModal({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-sm shadow-md shadow-[#EFBD3E40] rounded-4xl bg-[#151515] p-6 ">
        <div className="flex justify-end">
          <div
            onClick={onClose}
            className="cursor-pointer bg-transparent h-11 w-11 rounded-full mb-6 flex justify-center items-center text-sm border border-gray-200"
          >
            <MdClose size={23} />
          </div>
        </div>
        
        <div className="mb-6">{children}</div>

      </div>
    </div>
  );
}
