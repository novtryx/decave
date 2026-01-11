import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { IoIosMusicalNotes } from 'react-icons/io'
import LineUpImageCard from './LineUpImageCard'

const FullLineUp = () => {
  return (
    <div className='flex flex-col items-center w-full py-10'>
         <SectionHeader
            title="Full Lineup"
            label='MORE ARTISTS'
            icon={IoIosMusicalNotes}
            iconColor='#0854A7'

        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           <LineUpImageCard 
              imageSrc="/artists/lineup1.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              location="Nigeria"
              isHeadliner={false}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
             <LineUpImageCard 
              imageSrc="/artists/lineup2.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              location="Nigeria"
              isHeadliner={false}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
            <LineUpImageCard 
              imageSrc="/artists/lineup3.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              location="Nigeria"
              isHeadliner={false}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
            <LineUpImageCard 
              imageSrc="/artists/lineup1.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              location="Nigeria"
              isHeadliner={false}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
             <LineUpImageCard 
              imageSrc="/artists/lineup2.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              location="Nigeria"
              isHeadliner={false}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
            <LineUpImageCard 
              imageSrc="/artists/lineup3.jpg"
              artistName="Burna Boy"
              genre="Afrobeats"
              location="Nigeria"
              isHeadliner={false}
              instagramLink="https://instagram.com/burnaboygram"
              twitterLink="https://twitter.com/burnaboy"
              externalLink="https://burnaboy.com"
            />
        </div>
    </div>
  )
}

export default FullLineUp