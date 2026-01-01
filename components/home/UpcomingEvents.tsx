"use client"
import React from 'react'
import { IoMusicalNotesSharp } from 'react-icons/io5'
import SectionHeader from '../layout/sectionHeader'
import ImageCard from '../layout/ImageCard'
import { GoPeople } from 'react-icons/go'
import ViewMoreButton from '../layout/ViewMoreButton'

const UpcomingEvents = () => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 place-items-center sm:place-items-stretch">
                <ImageCard 
                    image="/card-image.png"
                    title="Afro Pulse Sessions"
                    badge={{ text: "EARLY BIRD", bgColor: "#EEF6FFCC", textColor: "#001D3D" }}
                    peopleCount="1.8K"
                    icon={GoPeople}
                    date="Mar 22, 2025"
                    location="Victoria Island, Lagos"
                    buttonText="View Event"
                    buttonVariant="outline"
                    onButtonClick={() => console.log('View event')}
                />
                <ImageCard 
                    image="/card-image.png"
                    title="Afro Pulse Sessions"
                    badge={{ text: "EARLY BIRD", bgColor: "#EEF6FFCC", textColor: "#001D3D" }}
                    peopleCount="1.8K"
                    icon={GoPeople}
                    date="Mar 22, 2025"
                    location="Victoria Island, Lagos"
                    buttonText="View Event"
                    buttonVariant="outline"
                    onButtonClick={() => console.log('View event')}
                />
                <ImageCard 
                    image="/card-image.png"
                    title="Afro Pulse Sessions"
                    badge={{ text: "EARLY BIRD", bgColor: "#EEF6FFCC", textColor: "#001D3D" }}
                    peopleCount="1.8K"
                    icon={GoPeople}
                    date="Mar 22, 2025"
                    location="Victoria Island, Lagos"
                    buttonText="View Event"
                    buttonVariant="outline"
                    onButtonClick={() => console.log('View event')}
                />
            </div>
        </div>
        
        <ViewMoreButton text='View All Events'/>
    </div>
  )
}

export default UpcomingEvents