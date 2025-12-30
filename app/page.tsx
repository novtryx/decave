import HeroSection from '@/components/home/heroSection'
import ScrollContent from '@/components/home/scrollContent'
import SectionHeader from '@/components/layout/sectionHeader'
import React from 'react'
import { IoMusicalNotesSharp } from 'react-icons/io5'

const page = () => {
 
  return (
    <div className=''>
              <HeroSection/>
              <ScrollContent/>
              <SectionHeader 
                icon={IoMusicalNotesSharp}
                iconColor="#7B3FE4"
                label="What's Next?"
                title="Upcoming Events"
                description="Join thousands experiencing the best of Afro-centric culture and nightlife."
              />
    </div>
  )
}

export default page