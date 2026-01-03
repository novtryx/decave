"use client";

import { MdOutlineCameraAlt } from "react-icons/md";
import SectionHeader from "../../layout/sectionHeader";
import { LuFilter } from "react-icons/lu";
import { act, useState } from "react";
import TabNavigation from "@/components/layout/TabNavigation";
import Image from "next/image";

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState("all");

  const images = [
    {id: 1, name: "gallery-img-1.png"}, 
    {id: 2, name: "gallery-img-2.png"}, 
    {id: 3, name: "gallery-img-3.png"}, 
    {id: 4, name: "gallery-img-4.png"}, 
    {id: 5, name: "gallery-img-5.png"}, 
    {id: 6, name: "gallery-img-6.png"}
    ]

  const tabs = [
    {id: "all", label: "All"},
    {id: "crowd", label: "Crowd"},
    {id: "production", label: "Production"},
    {id: "performance", label: "Performance"},
    {id: "artists", label: "Artists"},
    {id: "atmosphere", label: "Atmosphere"},
  ]
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
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showFilter={false}
      />

      {/* Pictures */}
      <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        {images.map((item) => (
            <div key={item.id} className="w-full h-100 relative">
                <Image 
                    src={`/gallery/${item.name}`}
                    alt="image"
                    fill
                />
            </div>
        ))}
      </div>
    </div>
  );
}
