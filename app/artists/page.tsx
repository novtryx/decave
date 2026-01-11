import FullLineUp from '@/components/artists/FullLineUp'
import Headliners from '@/components/artists/Headliners'
import HeaderSection from '@/components/events/sections/HeaderSection'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeaderSection 
            title="Artist Lineup"
            description="Celebrating the continent's most influential voices across Afrobeats, Amapiano, Hip-Hop, and traditional sounds."
            label="deCAVE LINE-UPS"
            backgroundImage="/events/hero-img.jpg"
        />
        <Headliners/>
        <FullLineUp/>
    </div>
  )
}

export default page