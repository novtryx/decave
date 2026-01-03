"use client"

import SectionHeader from "@/components/layout/sectionHeader";
import Image from "next/image";
import VideoCard from "../ui/VideoCard";
import { galleryVideoData } from "@/lib/data";

export default function VideoArchive() {
    return (
        <div className="mt-10 px-4 lg:px-16 bg-[#121111] py-10">
            <SectionHeader 
                label="VIDEO ARCHIVE"
                title="Relive the Experience"
                description="Immersive after-movies and highlights from past editions"
                align="left"
            />

            {/* Main  */}
            <div className="w-full h-100 relative rounded-sm">
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
            </div>

            <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
                {galleryVideoData.map((item) => (
                    <VideoCard 
                        key={item.id}
                        thumbnail={item.thumbnail}
                        videoUrl={item.videoUrl}
                        runtime={item.runtime}
                        title={item.title}
                        year={item.year}
                        views={item.views}
                        onPlayClick={item.onPlayClick}
                        imageAlt={item.imageAlt}
                    />
                ))}
            </div>
        </div>
    )
}