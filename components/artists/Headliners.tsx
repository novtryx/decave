import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { IoIosMusicalNotes } from "react-icons/io";
import LineUpImageCard from './LineUpImageCard';


const Headliners = () => {
  return (
    <div className='flex flex-col items-center w-full py-10'>
        <SectionHeader
            title="Headliners"
            label='FEATURED'
            icon={IoIosMusicalNotes}
            iconColor='#0854A7'

        />

        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b-2 pb-8 border-b-[#2A2A2A]'>
          
           <LineUpImageCard 
              imageSrc="/artists/lineup1.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              isHeadliner={true}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
             <LineUpImageCard 
              imageSrc="/artists/lineup2.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              isHeadliner={true}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
            <LineUpImageCard 
              imageSrc="/artists/lineup3.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              isHeadliner={true}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
        </div>
    </div>
  )
}

export default Headliners