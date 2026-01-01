"use client"
import Image from 'next/image'
import { GoPeople } from "react-icons/go";
import { FiCalendar } from "react-icons/fi";
import { SlLocationPin } from 'react-icons/sl';
import Button from './Button';
import { IconType } from 'react-icons';

interface ImageCardProps {
  // Required
  image: string;
  title: string;
  
  // Optional badges/tags
  badge?: {
    text: string;
    bgColor?: string;
    textColor?: string;
  };
  
  // Optional people count
  peopleCount?: string | number;
  
  // Optional icon (top-left gradient circle)
  icon?: IconType;
  iconGradientFrom?: string;
  iconGradientTo?: string;
  
  // Event details (date, location) - can show either or both
  date?: string;
  location?: string;
  
  // Or description instead of date/location
  description?: string;
  
  // Optional button
  buttonText?: string;
  buttonVariant?: 'primary' | 'outline';
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
  onButtonClick,
  className = ''
}: ImageCardProps) => {
  return (
    <div className={`h-fit w-full sm:w-[340px] md:w-[380px] lg:w-106 border-2 border-[#2A2A2A] hover:border-[#0854A7] rounded-xl transition-all duration-300 ${className}`}>
        {/* Image Section */}
        <div className="relative h-56 sm:h-64 md:h-72 w-full">
            <Image 
              src={image} 
              alt={title} 
              fill 
              className='object-cover rounded-t-xl' 
            />
            
            {/* Optional Badge (top-left) */}
            {badge && (
              <div 
                className={`absolute top-2 left-2 sm:top-3 sm:left-3 py-1.5 sm:py-2 px-3 sm:px-4 h-fit w-fit rounded-full text-xs sm:text-sm font-medium`}
                style={{
                  backgroundColor: badge.bgColor || '#EEF6FFCC',
                  color: badge.textColor || '#001D3D'
                }}
              >
                {badge.text}
              </div>
            )}
            
            {/* Optional People Count (bottom-right) */}
            {peopleCount && (
              <div className='absolute right-2 bottom-2 sm:right-3 sm:bottom-3 flex items-center gap-1.5 sm:gap-2 w-fit h-fit rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-black/60 text-xs sm:text-sm backdrop-blur-sm'>
                <GoPeople color='#0854A7' size={16} className='sm:w-5 sm:h-5' /> 
                <p>{peopleCount}</p>
              </div>
            )}
        </div>

        {/* Content Section */}
        <div className='h-fit p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4'>
            {/* Optional Icon (gradient circle) */}
            {Icon && (
              <div className={`bg-gradient-to-r from-${iconGradientFrom} to-${iconGradientTo} h-fit w-fit rounded-full p-2`}>
                <Icon color='white' size={18} className='sm:w-5 sm:h-5' />
              </div>
            )}
            
            {/* Title */}
            <h2 className='font-semibold text-xl sm:text-2xl md:text-[28px] lg:text-[32px] leading-tight line-clamp-2'>
              {title}
            </h2>
            
            {/* Event Details (Date & Location) OR Description */}
            {(date || location) && (
              <div className='space-y-2'>
                {date && (
                  <span className='flex items-center gap-2'>
                    <FiCalendar size={18} className='sm:w-5 sm:h-5 flex-shrink-0' color='#0854A7'/>
                    <p className='text-xs sm:text-sm text-[#B3B3B3]'>{date}</p>
                  </span>
                )}
                {location && (
                  <span className='flex items-center gap-2'>
                    <SlLocationPin size={18} className='sm:w-5 sm:h-5 flex-shrink-0' color='#0854A7'/>
                    <p className='text-xs sm:text-sm text-[#B3B3B3] line-clamp-1'>{location}</p>
                  </span>
                )}
              </div>
            )}
            
            {/* Description (alternative to date/location) */}
            {description && !date && !location && (
              <p className='text-xs sm:text-sm text-[#B3B3B3] line-clamp-3 leading-relaxed'>
                {description}
              </p>
            )}
            
            {/* Optional Button */}
            {buttonText && (
              <Button 
                type='button' 
                variant={buttonVariant} 
                className='w-full text-sm sm:text-base'
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            )}
        </div>
    </div>
  )
}

export default ImageCard