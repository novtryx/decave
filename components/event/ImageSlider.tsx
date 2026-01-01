import { useEffect, useState } from "react";
import { IoMusicalNotes } from "react-icons/io5";

interface ImageSliderProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  interval?: number;
}

// types/slider.ts
export interface SlideItem {
  id: number;
  image: string;
  tag: string; // "The Heartbeat"
  title: string; // "Main Stage"
  description: string;
}

const ImageSlider = ({
  slides,
  autoPlay = true,
  interval = 5000,
}: ImageSliderProps) => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        {/* IMAGE */}
        <div className="relative w-full h-105 overflow-hidden rounded-xl">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              className={`
                absolute inset-0 w-full h-full object-cover transition-opacity duration-700
              ${index === current ? "opacity-100" : "opacity-0"}
            `}
            />
          ))}
        </div>

        {/* DOTS */}
        <div className="flex gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                h-2 rounded-full transition-all
                ${index === current ? "w-6 bg-yellow-400" : "w-2 bg-gray-500"}
                `}
            />
          ))}
        </div>
      </div>


      {/* TEXT */}
      <div className="flex flex-col gap-4 max-w-lg">
        <div className="flex flex-col gap-2 text-[#ff4d00] text-sm">
          <IoMusicalNotes size={20} />
          <span className="text-[#b3b3b3]">{slides[current].tag}</span>
        </div>

        <h2 className="text-4xl font-bold text-white">
          {slides[current].title}
        </h2>

        <p className="text-gray-400 mt-4 leading-relaxed">
          {slides[current].description}
        </p>
      </div>
    </div>
  );
};

export default ImageSlider;
