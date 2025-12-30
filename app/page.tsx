import HeroSection from '@/components/home/heroSection'
import ScrollContent from '@/components/home/scrollContent'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import WhatWeStandFor from '@/components/home/WhatWeStandFor'
import React from 'react'

const page = () => {
 
  return (
    <div className=''>
              <HeroSection/>
              <ScrollContent/>
              <UpcomingEvents/>
              <WhatWeStandFor/>

    </div>
  )
}

export default page