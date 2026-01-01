import { IconType } from "react-icons";

interface ImageFeatureTimelineProps {
  image: string;
  imageAlt?: string;
  features: FeatureItem[];
}

export interface FeatureItem {
  id: number;
  icon: IconType;
  title: string;
  description: string;
}

// example usage
//  <ImageFeatureTimeline
//       image="/images/style-model.jpg"
//       imageAlt="Afrocentric fashion"
//       features={features}
//     />

const ImageFeatureTimeline = ({
  image,
  imageAlt = "",
  features,
}: ImageFeatureTimelineProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* IMAGE */}
      <div className="w-full h-130 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* FEATURES */}
      <div className="relative flex flex-col">
        {features.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === features.length - 1;

          return (
            <div key={item.id} className="flex gap-6 relative">
              <div className="relative flex flex-col items-center">
                {/* Icon */}
                <div className="z-10 flex items-center justify-center w-9 h-9 rounded-full border border-gray-500 bg-[#151515] text-white shrink-0">
                  <Icon size={18} />
                </div>

                {/* Connector - now with absolute positioning */}
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
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageFeatureTimeline;
