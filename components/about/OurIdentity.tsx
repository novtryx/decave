import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { BsStars } from 'react-icons/bs'
import Image from 'next/image'
import { AnimatedCounter } from './AnimatedCounter'

const OurIdentity = () => {
    const text = `De Cave is a cultural and creative platform dedicated to building immersive experiences rooted in sound, expression, and human connection.
We do not simply organize events. We design environments where people, energy, and creativity converge — spaces that are felt, remembered, and lived beyond the moment.
Our work exists at the intersection of music, culture, and experience. From intimate sound-driven gatherings to large-scale cultural movements, every project under De Cave is built with intention, atmosphere, and emotional depth.
`
  return (
    <div className='flex items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12'>
        <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl'>
            <div className='w-full lg:w-1/2 space-y-6 sm:space-y-8'>
                <SectionHeader
                title="Creators of Culture"
                label='OUR IDENTITY'
                icon={BsStars}
                iconColor='#AD46FF'
                align='left'
                description={text}
                descriptionColor='#B3B3B3'
                />
                
                {/* <div className='grid grid-cols-2 gap-3 sm:gap-4 md:gap-5'>
                    <AnimatedCounter end={10} suffix="K" label="ATTENDEES" />
                    <AnimatedCounter end={50} suffix="+" label="EVENTS HOSTED" />
                    <AnimatedCounter end={15} suffix="+" label="CITY LOCATION" />
                    <AnimatedCounter end={200} suffix="+" label="ARTIST FEATURED" />
                </div> */}
            </div>

            <div className='relative h-75 sm:h-100 md:h-125 lg:h-150 xl:h-181.5 w-full lg:w-1/2'>
                <Image 
                    src={"/about/guiter-man.png"} 
                    alt="guiter-man" 
                    fill 
                    className='object-cover rounded-lg'
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    priority
                />
            </div>
        </div>
    </div>
  )
}

export default OurIdentity