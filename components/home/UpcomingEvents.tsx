"use client"
import React from 'react'
import { IoMusicalNotesSharp } from 'react-icons/io5'
import SectionHeader from '../layout/sectionHeader'
import ImageCard from '../layout/ImageCard'
import { GoPeople } from 'react-icons/go'
import ViewMoreButton from '../layout/ViewMoreButton'

const UpcomingEvents = () => {
  return (
    <div className='py-16 px-6 w-full flex flex-col gap-12'>
        <SectionHeader 
            icon={IoMusicalNotesSharp}
            iconColor="#7B3FE4"
            label="What's Next?"
            title="Upcoming Events"
            description="Join thousands experiencing the best of Afro-centric culture and nightlife."
        />
        
        {/* Centered grid container */}
        <div className=" max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
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