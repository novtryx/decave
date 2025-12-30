import React from 'react';
import Image from 'next/image';
import { LuUsers } from 'react-icons/lu';
import { FaRegClock } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';

interface FeaturedEventCardProps {
  image: string;
  attendees?: string;
  category?: string;
  title: string;
  description: string;
  dateRange?: string;
  location?: string;
  onViewDetails: () => void;
}

export const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ 
  image, 
  attendees, 
  category, 
  title, 
  description, 
  dateRange, 
  location, 
  onViewDetails 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-zinc-900 rounded-lg overflow-hidden max-w-7xl">
      {/* Image Section */}
      <div className="relative md:w-1/2 min-h-75">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
        />
        {attendees && (
          <div className="absolute bottom-4 right-4 bg-zinc-800/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 z-10">
            <LuUsers className='text-[#0854a7]' />
            <span className="text-white text-sm font-medium">{attendees}</span>
          </div>
        )}

      
          <div className="absolute top-4 left-4 bg-[#0854a7] backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 z-10">
            <FaRegClock className='text-white' />
            <span className="text-white text-sm font-medium">UPCOMING</span>
          </div>
        
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 py-20 px-14 flex flex-col justify-center">
      <div className='bg-[#0854a7] h-0.5 w-15'></div>
        {category && (
          <div className="text-[#0854a7] mt-1 text-sm font-semibold uppercase tracking-wider mb-3">
            {category}
          </div>
        )}
        
        <h2 className="text-4xl italic md:text-5xl font-bold text-white mb-5">
          {title}
        </h2>
        
        <p className="text-zinc-400 w-[96%] text-base leading-relaxed mb-6">
          {description}
        </p>

        <div className="space-y-3 mb-8">
          {dateRange && (
            <div className="flex items-center gap-3 text-zinc-300">
              <MdCalendarMonth className='text-lg text-[#cca33a]' />
              <span>{dateRange}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-start gap-3 text-zinc-300">
              <svg className="w-5 h-5 mt-0.5 text-[#cca33a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
          )}
        </div>

        <button 
          onClick={onViewDetails}
          className="bg-[#cca33a] hover:bg-yellow-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 group"
        >
          View Event Details
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// // Example usage
//       <EventCard
//         image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
//         attendees="10K+"
//         category="FESTIVAL"
//         title="AfroSpook 2025"
//         description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
//         dateRange="Aug 15 - 17, 2025"
//         location="Eko Atlantic City, Lagos - Nigeria"
//         onViewDetails={handleViewDetails}
//       />
