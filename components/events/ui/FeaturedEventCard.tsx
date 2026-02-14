import { CountdownTimer } from "@/components/layout/CountdownTimer";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdCalendarMonth } from "react-icons/md";


// // // Example usage
// //       <EventCard
// //         image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
// //         attendees="10K+"
// //         category="FESTIVAL"
// //         title="AfroSpook 2025"
// //         eventDate?: Date;
// //         label?: string;
// //         description="A 3-day celebration of African culture, music, and heritage. Experience the fire, water, rave arena and parade zones."
// //         dateRange="Aug 15 - 17, 2025"
// //         location="Eko Atlantic City, Lagos - Nigeria"
// //         onViewDetails={handleViewDetails}
// //       />


interface FeaturedEventCardProps {
  image: string;
  attendees?: string;
  label?: string;
  category?: string;
  title: string;
  description: string;
  dateRange?: string;
  location?: string;
  eventDate?: Date;
  buttonText?: string;
  onViewDetails: () => void;
}

export const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ 
  image, 
  attendees, 
  category, 
  title, 
  label,
  eventDate,
  description, 
  dateRange, 
  location, 
  buttonText,
  onViewDetails 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 bg-zinc-900 rounded-lg overflow-hidden max-w-8xl">
      {/* Image Section */}
      <div className="relative md:w-1/2 h-64 sm:h-80 md:h-auto md:min-h-100 lg:min-h-125">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-contain"
        />
        {attendees && (
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-zinc-800/60 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 z-10">
            <LuUsers className='text-[#0854a7] text-sm sm:text-base' />
            <span className="text-white text-xs sm:text-sm font-medium">{attendees}</span>
          </div>
        )}

        {label && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#0854a7] backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 z-10">
            <FaRegClock className='text-white text-sm sm:text-base' />
            <span className="text-white text-xs sm:text-sm font-medium">{label}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 py-6 px-4 sm:py-10 sm:px-8 lg:py-20 lg:px-14 flex flex-col justify-center">
        <div className='bg-[#0854a7] h-0.5 w-12 sm:w-16'></div>
        {category && (
          <div className="text-[#0854a7] mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">
            {category}
          </div>
        )}
        
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl italic font-bold text-white mb-3 sm:mb-4 lg:mb-5">
          {title}
        </h2>
        
        <p className="text-zinc-400 w-full sm:w-[96%] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
          {description}
        </p>

        <div className="mb-4 sm:mb-6">
          {eventDate && (
            <CountdownTimer targetDate={eventDate} />
          )}
        </div>

        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {dateRange && (
            <div className="flex items-center gap-2 sm:gap-3 text-zinc-300 text-sm sm:text-base">
              <MdCalendarMonth className='text-base sm:text-lg text-[#cca33a]' />
              <span>{dateRange}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-start gap-2 sm:gap-3 text-zinc-300 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[#cca33a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="wrap-break-word">{location}</span>
            </div>
          )}
        </div>

        <button 
          onClick={onViewDetails}
          className="bg-[#cca33a] cursor-pointer hover:bg-yellow-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 group text-sm sm:text-base w-full sm:w-auto xs:text-base active:scale-95 touch-manipulation select-none"
        >
          {buttonText}
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};