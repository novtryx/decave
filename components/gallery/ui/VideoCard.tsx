"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";

interface VideoCardProps {
  thumbnail: string;
  videoUrl: string;
  title?: string;
  year?: string | number;
  imageAlt?: string;
  className?: string;
}

const VideoCard = ({
  thumbnail,
  videoUrl,
  title,
  year,
  imageAlt = "Video thumbnail",
  className = "",
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        className={`w-full bg-[#151515] rounded-lg flex flex-col gap-3 ${className}`}
      >
        {/* Thumbnail */}
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setOpen(true)}
        >
          <Image
            src={thumbnail}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`bg-[#cca33a] rounded-full w-14 h-14 flex items-center justify-center transition-all ${
                isHovered ? "scale-110 bg-[#b8922e]" : "scale-100"
              }`}
            >
              <FaPlay className="text-white text-lg ml-1" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-2 pb-3 flex flex-col gap-1">
          {title && (
            <h3 className="text-white text-base font-semibold line-clamp-2">
              {title}
            </h3>
          )}
          {year && (
            <span className="text-sm text-zinc-400">
              {new Date(year).getFullYear()}
            </span>
          )}
        </div>
      </div>

      {/* VIDEO MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-4xl px-4">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-4 text-white text-xl"
            >
              <FaTimes />
            </button>

            {/* Video */}
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full rounded-lg bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
