import LineUpImageCard from '@/components/artists/LineUpImageCard'
import SectionHeader from '@/components/layout/sectionHeader'
import React from 'react'
import { BsStars } from 'react-icons/bs'
import { IoIosMusicalNotes } from 'react-icons/io'

interface LineupType{
    _id:string;
    artistImage: string;
    artistName: string;
    artistGenre: string;
    headliner: boolean;
    socials: {
        instagram?: string;
        twitter?: string;
        website?: string;
    }
}

const Lineup = ({Lineup}: {Lineup: LineupType[]}) => {


    if(Lineup?.length === 0){
        return null
    }


  return (
    <div className='flex flex-col items-center justify-center w-full py-10 lg:px-16 px-4'>
        <SectionHeader
            title="Headliners"
            label='LINE UP'
            icon={IoIosMusicalNotes}
            iconColor='#0854A7'
        />

        <div className='w-full max-w-7xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b-2 pb-8 border-b-[#2A2A2A] justify-items-center'>
            {
                Lineup.map((item) => (


                    <LineUpImageCard 
                    
                      imageSrc={item.artistImage}
                      artistName={item.artistName}
                      genre={item.artistGenre}
                      isHeadliner={item.headliner}
                      instagramLink={item.socials.instagram}
                      twitterLink={item.socials.twitter}
                      externalLink={item.socials.website}
                    />


                ))
            }
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
    </div>
  )
  
}

export default Lineup