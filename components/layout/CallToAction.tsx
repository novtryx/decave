// "use client"
// import Image from 'next/image'
// import React, { ReactNode } from 'react'
// import SectionHeader from './sectionHeader'
// import Button from './Button'
// import { IconType } from 'react-icons'

// interface CallToActionProps {
//   // Background (either image OR gradient)
//   backgroundImage?: string
//   backgroundGradient?: string // e.g., 'radial-gradient(circle,#001D3D,#56410C,#001D3D)'
  
//   // Overlay
//   overlay?: string // e.g., 'bg-gradient-to-r from-black/30 to-[#2A2A2A]/90'
  
//   // Section Header (required)
//   icon?: IconType
//   iconColor?: string
//   label?: string
//   title: string
//   description: string
  
//   // Buttons (optional)
//   primaryButton?: {
//     text: string
//     icon?: 'arrow' 
//     onClick?: () => void
//     href?: string
//   }
//   secondaryButton?: {
//     text: string
//     onClick?: () => void
//     href?: string
//   }
  
//   // Styling
//   height?: string // e.g., 'h-92.25' or 'h-96'
//   containerClassName?: string
//   contentClassName?: string
  
//   // Children (appears after buttons)
//   children?: ReactNode
// }

// const CallToAction = ({
//   backgroundImage,
//   backgroundGradient,
//   overlay = 'bg-gradient-to-r from-black/30 to-[#2A2A2A]/90',
//   icon,
//   iconColor,
//   label,
//   title,
//   description,
//   primaryButton,
//   secondaryButton,
//   height = 'h-92.25',
//   containerClassName = 'p-4 sm:p-6 md:p-10 lg:p-15',
//   contentClassName = '',
//   children
// }: CallToActionProps) => {
//   return (
//     <div className={containerClassName}>
//         <div className={`relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:${height} rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden`}>
//             {/* Background Image OR Gradient */}
//             {backgroundImage && !backgroundGradient && (
//               <Image 
//                 src={backgroundImage} 
//                 alt={title} 
//                 fill 
//                 className='object-cover' 
//                 priority
//               />
//             )}
            
//             {backgroundGradient && !backgroundImage && (
//               <div 
//                 className='absolute inset-0 w-full h-full'
//                 style={{ background: backgroundGradient }}
//               ></div>
//             )}
            
//             {/* Overlay with Content */}
//             <div className={`absolute inset-0 ${overlay} z-10 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 ${contentClassName}`}>
//                 {/* Section Header */}
//                 <div className='w-full max-w-4xl'>
//                   <SectionHeader
//                       icon={icon}
//                       iconColor={iconColor}
//                       label={label}
//                       title={title}
//                       description={description}
//                   />
//                 </div>

//                 {/* Buttons */}
//                 {(primaryButton || secondaryButton) && (
//                   <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full sm:w-auto justify-center mt-2 sm:mt-4'>
//                       {primaryButton && (
//                         <Button 
//                           variant='primary' 
//                           icon={"arrow"}
//                           onClick={primaryButton.onClick}
//                           className='w-full sm:w-auto'
//                         >
//                           {primaryButton.text}
//                         </Button>
//                       )}
                      
//                       {secondaryButton && (
//                         <Button 
//                           variant='outline'
//                           onClick={secondaryButton.onClick}
//                           className='w-full sm:w-auto'
//                         >
//                           {secondaryButton.text}
//                         </Button>
//                       )}
//                   </div>
//                 )}

//                 {/* Children (after buttons) */}
//                 {children && (
//                   <div className='w-full max-w-4xl mt-4 sm:mt-6'>
//                     {children}
//                   </div>
//                 )}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CallToAction


"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import SectionHeader from "./sectionHeader";
import Button from "./Button";
import { IconType } from "react-icons";

interface CallToActionProps {
  backgroundImage?: string;
  backgroundGradient?: string;
  overlay?: string;

  icon?: IconType;
  iconColor?: string;
  label?: string;
  title: string;
  description: string;

  primaryButton?: {
    text: string
    icon?: 'arrow' 
    onClick?: () => void
    href?: string
    external?: boolean
  }
  secondaryButton?: {
    text: string
    onClick?: () => void
    href?: string
    external?: boolean
  }
  
  // Styling
  height?: string // e.g., 'h-92.25' or 'h-96'
  containerClassName?: string
  contentClassName?: string
  
  // Children (appears after buttons)
  children?: ReactNode
}

const CallToAction = ({
  backgroundImage,
  backgroundGradient,
  overlay = "bg-gradient-to-r from-black/40 to-[#2A2A2A]/80",
  icon,
  iconColor,
  label,
  title,
  description,
  primaryButton,
  secondaryButton,
  containerClassName = "w-full",
  contentClassName = "",
  children,
}: CallToActionProps) => {
  return (
    <section className={containerClassName}>
      <div className="relative w-full rounded-xl lg:rounded-2xl overflow-hidden">
        {/* Background */}
        {backgroundImage && !backgroundGradient && (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}

        {backgroundGradient && (
          <div
            className="absolute inset-0"
            style={{ background: backgroundGradient }}
          />
        )}

        {/* Content */}
        <div
          className={`
            relative z-10
            flex flex-col items-center
            text-center
            gap-6 sm:gap-8
            px-4 sm:px-6 md:px-10
            py-10 sm:py-14 md:py-20
            ${overlay}
            ${contentClassName}
          `}
        >
          {/* Header */}
          <div className="w-full max-w-4xl">
            <SectionHeader
              icon={icon}
              iconColor={iconColor}
              label={label}
              title={title}
              description={description}
            />
          </div>

                {/* Buttons */}
                {(primaryButton || secondaryButton) && (
                  <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full sm:w-auto justify-center mt-2 sm:mt-4'>
                      {primaryButton && (
                        <Button 
                          variant='primary' 
                          icon={primaryButton.icon || "arrow"}
                          href={primaryButton.href}
                          external={primaryButton.external}
                          onClick={primaryButton.onClick}
                          className='w-full sm:w-auto'
                        >
                          {primaryButton.text}
                        </Button>
                      )}
                      
                      {secondaryButton && (
                        <Button 
                          variant='outline'
                          href={secondaryButton.href}
                          external={secondaryButton.external}
                          onClick={secondaryButton.onClick}
                          className='w-full sm:w-auto'
                        >
                          {secondaryButton.text}
                        </Button>
                      )}
                  </div>
                )}

          {/* Children */}
          {children && (
            <div className="w-full max-w-5xl pt-2 sm:pt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
