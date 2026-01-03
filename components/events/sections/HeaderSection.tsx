// import Image from "next/image";
// import { ReactNode } from "react";

// interface HeaderSectionProps {
//   backgroundImage?: string;
  
//   // Text content (required)
//   title: string;
  
//   // Optional props
//   label?: string;
//   description?: string;
  
//   // Styling options
//   overlay?: string; // e.g., 'bg-black/50', 'bg-gradient-to-b from-black/60 to-black/30'
//   height?: string; // e.g., 'h-[70vh]', 'h-96', 'h-screen'
//   showTopLine?: boolean;
  
//   // Text alignment
//   align?: 'left' | 'center' | 'right';
  
//   // Custom classes
//   containerClassName?: string;
//   titleClassName?: string;
//   labelClassName?: string;
//   descriptionClassName?: string;
  
//   // Children (appears after description)
//   children?: ReactNode;
// }

// export default function HeaderSection({
//   backgroundImage="/hero-bg.png",
//   title,
//   label,
//   description,
//   overlay = 'bg-black/50',
//   height = 'lg:h-[85vh] h-[70vh]',
//   showTopLine = true,
//   align = 'center',
//   containerClassName = '',
//   titleClassName = '',
//   labelClassName = '',
//   descriptionClassName = '',
//   children
// }: HeaderSectionProps) {
  
//   const alignmentClasses = {
//     left: 'items-start text-left',
//     center: 'items-center text-center',
//     right: 'items-end text-right'
//   };

//   return (
//     <section className={`relative w-full  ${height} ${containerClassName}`}>
//       {/* Background Image */}
//       <Image
//         src={backgroundImage}
//         alt={title}
//         fill
//         priority
//         className="object-cover"
//       />

//       {/* Overlay */}
//       <div className={`absolute inset-0 ${overlay}`} />

//       {/* Content */}
//       <div className={`absolute inset-0 flex flex-col ${alignmentClasses[align]} justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16`}>
//         {/* Top line */}
//         {showTopLine && (
//           <div className="bg-white h-0.5 w-32 sm:w-40 md:w-46.25 mb-1 sm:mb-1 mt-4" />
//         )}
        
//         {/* Label */}
//         {label && (
//           <h5 className={`text-xs sm:text-sm md:text-base tracking-wider mb-2 sm:mb-3 ${labelClassName}`}>
//             {label}
//           </h5>
//         )}
        
//         {/* Title */}
//         <h2 className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px] font-medium leading-tight mb-4 sm:mb-6 ${titleClassName}`}>
//           {title}
//         </h2>
        
//         {/* Description */}
//         {description && (
//           <p className={`w-full sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[30%] text-sm sm:text-base md:text-lg text-[#B3B3B3] leading-relaxed mb-6 sm:mb-8 ${descriptionClassName}`}>
//             {description}
//           </p>
//         )}
        
//         {/* Children */}
//         {children && (
//           <div className="mt-4 sm:mt-6 w-full max-w-4xl">
//             {children}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



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
  height = 'lg:h-[85vh] h-[70vh]',
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
    <section className={`relative w-full  ${height} ${containerClassName}`}>
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
      <div className={`absolute inset-0 flex flex-col ${alignmentClasses[align]} justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 pt-28 sm:pt-32 lg:pt-36`}>
        {/* Top line */}
        {showTopLine && (
          <div className="bg-white h-0.5 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 mb-3 sm:mb-4 md:mb-5 lg:mb-6 mt-4" />
        )}
        
        {/* Label */}
        {label && (
          <h5 className={`text-xs sm:text-sm md:text-base tracking-wider mb-2 sm:mb-3 ${labelClassName}`}>
            {label}
          </h5>
        )}
        
        {/* Title */}
        <h2 className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px] font-medium leading-tight mb-4 sm:mb-6 w-full max-w-[90%] lg:max-w-[80%] break-words ${titleClassName}`}>
          {title}
        </h2>
        
        {/* Description */}
        {description && (
          <p className={`w-full sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[30%] text-sm sm:text-base md:text-lg text-[#B3B3B3] leading-relaxed mb-6 sm:mb-8 ${descriptionClassName}`}>
            {description}
          </p>
        )}
        
        {/* Children */}
        {children && (
          <div className="mt-4 sm:mt-6 w-full max-w-4xl">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}