"use client"
import Image from 'next/image'
import { GoPeople } from "react-icons/go";
import { FiCalendar } from "react-icons/fi";
import { SlLocationPin } from 'react-icons/sl';
import Button from './Button';
import { IconType } from 'react-icons';

interface ImageCardProps {
  image: string;
  title: string;
  badge?: {
    text: string;
    bgColor?: string;
    textColor?: string;
  };
  peopleCount?: string | number;
  icon?: IconType;
  iconGradientFrom?: string;
  iconGradientTo?: string;
  date?: string;
  location?: string;
  description?: string;
  
  // Optional button
  buttonText?: string;
  buttonVariant?: 'primary' | 'outline';
  buttonHref?: string;
  buttonExternal?: boolean;
  onButtonClick?: () => void;
  
  // Optional custom styling
  className?: string;
}

const ImageCard = ({
  image,
  title,
  badge,
  peopleCount,
  icon: Icon,
  iconGradientFrom = '[#197BE8]/42',
  iconGradientTo = '[#FFA500]/42',
  date,
  location,
  description,
  buttonText,
  buttonVariant = 'outline',
  buttonHref,
  buttonExternal = false,
  onButtonClick,
  className = ''
}: ImageCardProps) => {
  return (
    <div className={`h-auto w-full border-2 border-[#2A2A2A] hover:border-[#0854A7] rounded-lg sm:rounded-xl transition-all duration-300 ${className}`}>
        {/* Image Section */}
        <div className="relative h-48 xs:h-52 sm:h-56 md:h-64 lg:h-72 w-full">
            <Image 
              src={image} 
              alt={title} 
              fill 
              className='object-cover rounded-t-lg sm:rounded-t-xl' 
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 424px"
            />
            
            {/* Optional Badge (top-left) */}
            {badge && (
              <div 
                className={`absolute top-2 left-2 xs:top-2.5 xs:left-2.5 sm:top-3 sm:left-3 py-1 px-2.5 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4 h-fit w-fit rounded-full text-[10px] xs:text-xs sm:text-sm font-medium`}
                style={{
                  backgroundColor: badge.bgColor || '#EEF6FFCC',
                  color: badge.textColor || '#001D3D'
                }}
              >
                {badge.text}
              </div>
            )}
            
            {/* Optional People Count (bottom-right)
            {peopleCount && (
              <div className='absolute right-2 bottom-2 xs:right-2.5 xs:bottom-2.5 sm:right-3 sm:bottom-3 flex items-center gap-1 xs:gap-1.5 sm:gap-2 w-fit h-fit rounded-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-black/60 text-[10px] xs:text-xs sm:text-sm backdrop-blur-sm'>
                <GoPeople color='#0854A7' size={14} className='xs:w-4 xs:h-4 sm:w-5 sm:h-5' /> 
                <p>{peopleCount}</p>
              </div>
            )} */}
        </div>

        {/* Content Section */}
        {/* <div className='h-fit p-3 xs:p-4 sm:p-5 md:p-6 space-y-2.5 xs:space-y-3 sm:space-y-4'> */}
        <div className='p-3 flex flex-col justify-between gap-8 mb-6'>
          <div>

            {/* Optional Icon (gradient circle) */}
            {Icon && (
              <div className={`bg-linear-to-r from-${iconGradientFrom} to-${iconGradientTo} h-fit w-fit rounded-full p-1.5 xs:p-2 sm:p-2.5`}>
                <Icon color='white' size={16} className='xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5' />
              </div>
            )}
            
            {/* Title */}
            <h2 className='font-semibold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] leading-tight line-clamp-2'>
              {title}
            </h2>
            
            {/* Event Details (Date & Location) OR Description */}
            {(date || location) && (
              <div className='space-y-1.5 xs:space-y-2'>
                {date && (
                  <span className='flex items-center gap-1.5 xs:gap-2'>
                    <FiCalendar size={16} className='xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 shrink-0' color='#0854A7'/>
                    <p className='text-[11px] xs:text-xs sm:text-sm text-[#B3B3B3]'>{date}</p>
                  </span>
                )}
                {location && (
                  <span className='flex items-center gap-1.5 xs:gap-2'>
                    <SlLocationPin size={16} className='xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 shrink-0' color='#0854A7'/>
                    <p className='text-[11px] xs:text-xs sm:text-sm text-[#B3B3B3] line-clamp-1'>{location}</p>
                  </span>
                )}
              </div>
            )}
            
            {/* Description (alternative to date/location) */}
            {description && !date && !location && (
              <p className='text-[11px] xs:text-xs sm:text-sm md:text-base text-[#B3B3B3] line-clamp-3 leading-relaxed'>
                {description}
              </p>
            )}
          </div>

          <div>
            {/* Optional Button */}
            {buttonText && (
              <Button 
                type='button' 
                variant={buttonVariant} 
                href={buttonHref}
                external={buttonExternal}
                className='w-full text-xs xs:text-sm sm:text-base py-2 xs:py-2.5 sm:py-3'
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            )}
            </div>  
        </div>
    </div>
  )
}

export default ImageCard