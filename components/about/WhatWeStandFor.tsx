import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { BsStars } from 'react-icons/bs'
import { IconType } from 'react-icons';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { IoFlashOutline } from 'react-icons/io5';
import CardWithoutImage from '../layout/CardWithoutImage';

interface ValueType {
    title: string;
    description: string;
    icon: IconType;
}

const WhatWeStandFor = () => {
    const values: ValueType[] = [
            {
                title: "Immersive By Design",
                description: "Every experience is carefully shaped - from atmosphere and sound to emotional flow and audience connection.",
                icon: FaRegHeart
            },
            {
                title: "Culture First",
                description: "We build around identity, creativity, and authenticity - not trends.",
                icon: MdOutlinePeopleAlt
            },
            {
                title: "Community Driven",
                description: "Our spaces are created for belonging, not just attendance.",
                icon: IoFlashOutline
            },
            {
                title: "Evolution Always",
                description: "De Cave continues to expand in scale, reach, and creative direction.",
                icon: IoFlashOutline
            }
        ]
    // const values: ValueType[] = [
    //         {
    //             title: "Community First",
    //             description: "Building a movement of like-minded individuals who value experience, expression, and connection",
    //             icon: FaRegHeart
    //         },
    //         {
    //             title: "Cultural Authenticity",
    //             description: "Rooted in African heritage, elevated through contemporary expression and innovation.",
    //             icon: MdOutlinePeopleAlt
    //         },
    //         {
    //             title: "Curated Excellence",
    //             description: "Every detail matters. From artist selection to production, we obsess over quality.",
    //             icon: IoFlashOutline
    //         },
    //         {
    //             title: "Inclusive Expression",
    //             description: "A judgment-free zone where everyone can be their authentic self and celebrate freely.",
    //             icon: IoFlashOutline
    //         }
    //     ]
  return (
    <div className='px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12'>
        <SectionHeader
            title="Our Approach"
            label='OUR VALUES'
            icon={BsStars}
            iconColor='#AD46FF'
            description='Four principles that guide everything we create'
        />

        {/* Values Section */}
        <div className='w-full grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 sm:mt-10 md:mt-12'>
            {
                values?.map((item: ValueType, index: number) => (
                    <CardWithoutImage 
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default WhatWeStandFor