"use client";

import SectionHeader from "@/components/layout/sectionHeader";
import Image from "next/image";
import VideoCard from "../ui/VideoCard";
import { galleryVideoData } from "@/lib/data";
import { GalleryData, getGalleryVideo } from "@/app/actions/gallery";
import { useEffect, useState } from "react";
import Spinner from "@/components/layout/Spinner";

export default function VideoArchive() {
  const [videoData, setVideoData] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      const res = await getGalleryVideo();
      console.log("Video res: ", res);
      setVideoData(res);

      setLoading(false);
    };

    fetchVideoData();
  }, []);

  return (
    <div className="mt-10 px-4 lg:px-16 bg-[#121111] py-10">
      <SectionHeader
        label="VIDEO ARCHIVE"
        title="Relive the Experience"
        description="Immersive after-movies and highlights from past editions"
        align="left"
      />

      {/* Main  */}
      {/* <div className="w-full h-100 relative rounded-sm">
                <VideoCard 
                    thumbnail="/gallery/video-thumbnail-1.png"
                    videoUrl="#"
                    runtime="4:15"
                    title="Fire Zone Highlights"
                    year="2026"
                    views="876K"
                    onPlayClick={() => console.log("Video clicked")}
                    imageAlt="video thumbnail"
                />
            </div> */}
      {videoData.length === 0 && (
        <div className="flex justify-center items-center py-10">
          <p className="text-[#6b6b6b]">No photos found for this event.</p>
        </div>
      )}
      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
          {videoData.map((item) => (
            <VideoCard
              key={item._id}
              thumbnail={item.thumbnail ?? "/gallery/gallery-img-3.png"}
              videoUrl={item.link}
              title={item.event.eventDetails?.eventTitle ?? ""}
              year={item.createdAt}
              // views={"12k"}
              // onPlayClick={item?.onPlayClick}
              imageAlt={item.event.eventDetails?.eventTitle ?? "alttext"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
