"use client";

import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import Button from "../layout/Button";

interface EventCardProps {
  image: string;
  title: string;
  badge?: {
    text: string;
    bgColor?: string;
    textColor?: string;
  };
  date?: string;
  location?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonExternal?: boolean;
  className?: string;
}

/**
 * Event card for the homepage's two "upcoming events" sections.
 *
 * ImageCard (components/layout/ImageCard.tsx) boxes its image inside
 * padding with a fixed min-height and object-contain — so any banner
 * that isn't exactly that box's aspect ratio gets letterboxed and
 * visibly shrunk inside empty space. That's fine for the generic
 * contexts ImageCard is also used in (artists, about, lineup), but
 * was the specific complaint here: the event photo should always
 * fill the frame edge-to-edge. This is a dedicated component instead
 * of a rework of ImageCard, so those other call sites are untouched.
 */
const EventCard = ({
  image,
  title,
  badge,
  date,
  location,
  buttonText,
  buttonHref,
  buttonExternal = false,
  className = "",
}: EventCardProps) => {
  return (
    <article
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#111111] border border-[#292929] shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#CCA33A] hover:shadow-[0_18px_45px_rgba(204,163,58,0.14)] ${className}`}
    >
      {/* Full-bleed photo — a real aspect-ratio box the image always
          fills completely (object-cover, no inner padding), instead
          of being framed and shrunk inside a padded box. */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0c0c0c]">
        <Image
          src={image}
          alt={title}
          fill
          priority={false}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 424px"
        />

        {/* Bottom gradient so the title/badge always read clearly
            over any photo, bright or dark. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {badge && (
          <div
            className="absolute left-4 top-4 sm:left-5 sm:top-5 z-10 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-semibold shadow-lg backdrop-blur-xl"
            style={{
              backgroundColor: badge.bgColor || "rgba(204,163,58,0.92)",
              color: badge.textColor || "#111111",
            }}
          >
            {badge.text}
          </div>
        )}

        {/* Title sits on the photo itself, in the gradient's dark
            zone — reads more like an event poster than a form field. */}
        <h2 className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 line-clamp-2 text-lg sm:text-xl md:text-2xl font-semibold leading-snug tracking-[-0.02em] text-white z-10">
          {title}
        </h2>
      </div>

      {/* Details + CTA below the photo, on the card's dark body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {(date || location) && (
          <div className="flex-1 space-y-2.5">
            {date && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#CCA33A]/10">
                  <FiCalendar size={15} className="text-[#CCA33A]" />
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#AFAFAF]">{date}</p>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#CCA33A]/10">
                  <SlLocationPin size={15} className="text-[#CCA33A]" />
                </div>
                <p className="line-clamp-1 text-xs sm:text-sm leading-relaxed text-[#AFAFAF]">{location}</p>
              </div>
            )}
          </div>
        )}

        {buttonText && (
          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              href={buttonHref}
              external={buttonExternal}
              className="w-full rounded-xl py-2.5 sm:py-3 text-sm font-medium transition-all duration-300"
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default EventCard;