"use client"
import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { PiSpiralDuotone } from "react-icons/pi";
import ImageCard from '../layout/ImageCard';
import { IoMusicalNotesSharp } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { IconType } from 'react-icons';
import { SlPeople } from "react-icons/sl";


interface WhatWeDoType{
    title: string;
    image: string;
    icon: IconType;
    description: string

}

const WhatWeDo = () => {
    const whatWedo: WhatWeDoType[] = [
        {
            title:'Signature Events',
            image:'/about/stage.png',
            icon:IoMusicalNotesSharp,
            description:'We create and host large-scale cultural festivals and lifestyle experiences, designed to push boundaries and set new standards.',
        },
         {
            title:'Immersive Experiences',
            image:'/about/stage.png',
            icon:CiStar,
            description:'Multi-sensory journeys across fire, water, sound, and art—each zone crafted to evoke emotion and create unforgettable moments.',
        },
         {
            title:'Community Building',
            image:'/about/stage.png',
            icon:SlPeople,
            description:'Beyond the event, we nurture a vibrant community of culture enthusiasts, artists, and free spirits across the continent.',
        },
    ]
  return (
    <div className='px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12'>
        <SectionHeader
            title="Immersive Experiences"
            label='WHAT WE DO'
            icon={PiSpiralDuotone}
            iconColor='#7B3FE4'
        />
        <div className='flex justify-center w-full mt-8 sm:mt-10 md:mt-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-7xl'>
                {
                    whatWedo?.map((item:WhatWeDoType, index:number) => (
                        <ImageCard
                        key={index}
                        icon={item.icon}
                            title={item.title}
                            image={item.image}
                            iconGradientFrom='#197BE8'
                            iconGradientTo='#FFA5006B'
                            description={item.description}
                        />

                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default WhatWeDo