"use client";

import { MdOutlineCameraAlt } from "react-icons/md";
import SectionHeader from "../../layout/sectionHeader";
import { useEffect, useState } from "react";
import TabNavigation from "@/components/layout/TabNavigation";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import {
  GalleryData,
  GalleryEventType,
  getGalleryByEvent,
  getGalleryEvent,
} from "@/app/actions/gallery";
import Spinner from "@/components/layout/Spinner";

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState("");
  const [galleryEvents, setGalleryEvents] = useState<GalleryEventType[]>([]);
  const [photoData, setPhotoData] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(false);

  // Lightbox — which photo (by index into photoData) is open, if any.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      const res = await getGalleryEvent();
      setGalleryEvents(res);

      setActiveTab(res[0]._id);
    };

    getEvent();
  }, []);

  useEffect(() => {
    const fetchGalleryByEvent = async () => {
      setLoading(true);
      const res = await getGalleryByEvent(activeTab);
      setPhotoData(res);

      setLoading(false);
    };

    if (activeTab) {
      fetchGalleryByEvent();
    }
  }, [activeTab]);

  // Reset the lightbox whenever the event tab changes, so it never
  // points at a photo from a different event's data.
  useEffect(() => {
    setOpenIndex(null);
  }, [activeTab]);

  // Keyboard nav for the lightbox — Escape closes, arrows move
  // between photos, which is what people expect from any gallery.
  useEffect(() => {
    if (openIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photoData.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photoData.length) % photoData.length));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, photoData.length]);

  return (
    <div className="px-4 lg:px-16">
      <SectionHeader
        title="Captured Moments"
        align="left"
        label="PHOTO GALLERY"
        icon={MdOutlineCameraAlt}
        description="Experience the energy, culture, and community that defines deCave"
      />

      {/* Tab Navigation */}
      <TabNavigation
        tabs={galleryEvents}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showFilter={false}
        activeTabColor="#cca33a"
        inactiveTabColor="#9F9F9F"
        borderColor="#2a2a2a"
      />

      {/* Pictures */}
      {loading ? (
        <div className="w-full flex justify-center py-16">
          <Spinner />
        </div>
      ) : (
        <>
          {photoData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <MdOutlineCameraAlt className="text-4xl text-[#3a3a3a]" />
              <p className="text-[#6b6b6b] text-sm">No photos yet for this event.</p>
            </div>
          )}

          {/* Masonry-style columns rather than a rigid grid — photos
              from different cameras/crops sit unevenly, and forcing
              them into equal-height boxes was what made the old grid
              look flat and templated. break-inside-avoid keeps each
              photo from being split across columns. */}
          <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photoData.map((item, index) => (
              <button
                key={item._id}
                onClick={() => setOpenIndex(index)}
                className="group relative w-full break-inside-avoid overflow-hidden rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] block"
              >
                <Image
                  src={item.link}
                  alt={item.event?.eventDetails?.eventTitle || "Gallery photo"}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay — matches VideoCard's darken-on-hover
                    treatment so photos and videos feel like one family
                    of components rather than two different systems. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 rounded-full w-11 h-11 flex items-center justify-center backdrop-blur-sm">
                    <FaExpand className="text-white text-sm" />
                  </div>
                </div>
                {item.event?.eventDetails?.eventTitle && (
                  <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white/90 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate text-left">
                    {item.event.eventDetails.eventTitle}
                  </p>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      {openIndex !== null && photoData[openIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            onClick={() => setOpenIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white text-xl p-2"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          {photoData.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + photoData.length) % photoData.length));
                }}
                className="absolute left-3 sm:left-6 text-white/70 hover:text-white text-2xl p-2"
                aria-label="Previous photo"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % photoData.length));
                }}
                className="absolute right-3 sm:right-6 text-white/70 hover:text-white text-2xl p-2"
                aria-label="Next photo"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <div className="relative max-w-4xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photoData[openIndex].link}
              alt={photoData[openIndex].event?.eventDetails?.eventTitle || "Gallery photo"}
              width={1600}
              height={1200}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            {photoData[openIndex].event?.eventDetails?.eventTitle && (
              <p className="text-center text-white/70 text-sm mt-3">
                {photoData[openIndex].event.eventDetails.eventTitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}