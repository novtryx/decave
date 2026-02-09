"use client"

import { IoMusicalNotesSharp } from 'react-icons/io5'
import { GoPeople } from 'react-icons/go'
import SectionHeader from '../layout/sectionHeader'
import ImageCard from '../layout/ImageCard'
import ViewMoreButton from '../layout/ViewMoreButton'
import type { Event } from '@/app/actions/events'
import { createSlug } from '@/utils/slugify'

interface UpcomingEventsClientProps {
  events: Event[]
}

const UpcomingEventsClient = ({ events }: UpcomingEventsClientProps) => {

  // Format date for display
  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  return (
    <div className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8 sm:gap-10 lg:gap-12'>
        <SectionHeader 
            icon={IoMusicalNotesSharp}
            iconColor="#7B3FE4"
            label="What's Next?"
            title="Upcoming Events"
            description="Join thousands experiencing the best of Afro-centric culture and nightlife."
        />
        
        {/* Centered grid container */}
        <div className="w-full max-w-7xl mx-auto">
            {events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 place-items-center sm:place-items-stretch">
                    {events.map((event) => (
                        <ImageCard 
                            key={event._id}
                            image={event.eventDetails.eventBanner || "/card-image.png"}
                            title={event.eventDetails.eventTitle}
                            badge={{ 
                                text: "UPCOMING", 
                                bgColor: event.eventDetails.brandColor?.primaryColor || "#EEF6FFCC", 
                                textColor: event.eventDetails.brandColor?.secondaryColor || "#001D3D" 
                            }}
                            peopleCount="1.8K"
                            icon={GoPeople}
                            date={formatDate(
                                event.eventDetails.startDate,
                                event.eventDetails.endDate,
                            )}
                            location={event.eventDetails.venue}
                            buttonText="Secure Your Place"
                            buttonVariant="outline"
                            buttonHref={`/events/${createSlug(event.eventDetails.eventTitle)}`}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No upcoming events at the moment. Check back soon!</p>
                </div>
            )}
        </div>
        
        <ViewMoreButton href='/events' text='View All Events'/>
    </div>
  )
}

export default UpcomingEventsClient