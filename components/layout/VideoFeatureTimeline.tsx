import { IconType } from "react-icons";
import { LuGift, LuHeart, LuSparkles, LuSun, LuTarget, LuZap } from "react-icons/lu";
import { useRef } from "react";

export interface FeatureItem {
  _id: string;
  title: string;
  body: string;
}

interface VideoFeatureTimelineProps {
  videoUrl: string;
  videoType?: string; // e.g. "video/mp4", "video/webm"
  features: FeatureItem[];
  poster?: string; // optional thumbnail shown before autoplay kicks in
}

const VideoFeatureTimeline = ({
  videoUrl,
  videoType = "video/mp4",
  features,
  poster,
}: VideoFeatureTimelineProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconMapping: IconType[] = [LuSparkles, LuHeart, LuZap, LuSun, LuTarget, LuGift];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* VIDEO */}
      <div className="w-full h-130 lg:h-200 overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type={videoType} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* FEATURES */}
      <div className="relative flex flex-col">
        {features.map((item, index) => {
          const Icon = iconMapping[index] || LuSparkles;
          const isLast = index === features.length - 1;

          return (
            <div key={item._id} className="flex gap-6 relative">
              <div className="relative flex flex-col items-center">
                {/* Icon */}
                <div className="z-10 flex items-center justify-center w-9 h-9 rounded-full border border-gray-500 bg-[#151515] text-white shrink-0">
                  <Icon size={18} />
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 w-0.5 bg-[#2a2a2a] h-full" />
                )}
              </div>

              {/* Text */}
              <div className="pb-10">
                <h1 className="bg-linear-to-r mb-2 from-[#ACCBEE] text-lg font-bold via-[#fbc575] to-[#CCA33A] bg-clip-text text-transparent">
                  {item.title}
                </h1>
                <p className="text-[#b3b3b3] leading-relaxed max-w-md">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoFeatureTimeline;