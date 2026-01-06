
import Image from "next/image";
import { ReactNode } from "react";

interface HeaderSectionProps {
  backgroundImage?: string;
  
  // Text content (required)
  title: string;
  
  // Optional props
  label?: string;
  description?: string;
  
  // Styling options
  overlay?: string; // e.g., 'bg-black/50', 'bg-gradient-to-b from-black/60 to-black/30'
  height?: string; // e.g., 'h-[70vh]', 'h-96', 'h-screen'
  showTopLine?: boolean;
  
  // Text alignment
  align?: 'left' | 'center' | 'right';
  
  // Custom classes
  containerClassName?: string;
  titleClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  
  // Children (appears after description)
  children?: ReactNode;
}

export default function HeaderSection({
  backgroundImage="/hero-bg.png",
  title,
  label,
  description,
  overlay = 'bg-black/50',
  height = 'min-h-screen sm:min-h-[70vh] lg:h-[85vh]',
  showTopLine = true,
  align = 'center',
  containerClassName = '',
  titleClassName = '',
  labelClassName = '',
  descriptionClassName = '',
  children
}: HeaderSectionProps) {
  
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  return (
    <section className={`relative w-full ${height} ${containerClassName}`}>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col ${alignmentClasses[align]} justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12`}>
        {/* Top line */}
        {showTopLine && (
          <div className="bg-white h-0.5 w-20 sm:w-32 md:w-40 lg:w-48 xl:w-64 mb-3 sm:mb-4 lg:mb-6" />
        )}
        
        {/* Label */}
        {label && (
          <h5 className={`text-white/90 text-xs sm:text-sm md:text-base tracking-wider mb-2 sm:mb-3 uppercase ${labelClassName}`}>
            {label}
          </h5>
        )}
        
        {/* Title */}
        <h2 className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px] font-medium leading-tight sm:leading-tight md:leading-tight lg:leading-tight mb-4 sm:mb-5 lg:mb-6 w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] wrap-break-word ${titleClassName}`}>
          {title}
        </h2>
        
        {/* Description */}
        {description && (
          <p className={`w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] text-sm sm:text-base md:text-lg text-[#B3B3B3] leading-relaxed sm:leading-relaxed mb-4 sm:mb-6 lg:mb-8 ${descriptionClassName}`}>
            {description}
          </p>
        )}
        
        {/* Children */}
        {children && (
          <div className="mt-2 sm:mt-4 lg:mt-6 w-full max-w-full sm:max-w-4xl">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}