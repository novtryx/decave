"use client";

import { MdOutlineCameraAlt } from "react-icons/md";
import SectionHeader from "../../layout/sectionHeader";
import { LuFilter } from "react-icons/lu";
import { act, useEffect, useState } from "react";
import TabNavigation from "@/components/layout/TabNavigation";
import Image from "next/image";
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
      />


      {/* Pictures */}
      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {photoData.length === 0 && (
            <div className="flex justify-center items-center py-10">
              <p className="text-[#6b6b6b]">No photos found for this event.</p>
            </div>
          )}
          <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            {photoData.map((item) => (
              <div key={item._id} className="w-full h-100 relative">
                <Image src={item.link} alt="image" fill />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
