import OurIdentity from '@/components/about/OurIdentity'
import HeaderSection from '@/components/events/sections/HeaderSection'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeaderSection 
            title="About deCave"
            description="We don’t just host events - we architect expriences that celebrate African culture, ignite community and push the boundaries of what nightlife can be."
            label="WHO WE ARE"
        />
        <OurIdentity/>
    </div>
  )
}

export default page