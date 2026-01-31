import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { IoMusicalNotesSharp } from "react-icons/io5";
import ImageFeatureTimeline from '../layout/ImageFeatureTimeline';
import { features } from '@/lib/data';


const OurCulture = () => {
  return (
    <div className='lg:px-16 py-12 px-4'>
        <SectionHeader
            title="Where Culture Lives"
            label='OUR CULTURE'
            icon={IoMusicalNotesSharp}
            iconColor='#7B3FE4'
            description='deCave is built on the pillars of music, community, expression, and celebration. We create spaces where:'
        />

         <ImageFeatureTimeline
            image="/event/dress-code-img.png"
            imageAlt="Afrocentric fashion"
            features={features}
          />
    </div>
  )
}

export default OurCulture