import React from 'react'
import { PiShootingStarBold } from "react-icons/pi";
import SectionHeader from '../layout/sectionHeader';
import HoverImage from './ui/HoverImage';
import ViewMoreButton from '../layout/ViewMoreButton';

interface ImageArrayType {
    image: string;
    title: string;
    description: string;
}
const Memories = () => {
    const imageArray: ImageArrayType[] = [
        {
            image: "/memory2.png",
            title: "PRODUCTION",
            description: "Stage Production"
        },
        {
            image: "/memory1.png",
            title: "PERFORMANCE",
            description: "Stage Performance"
        },
        {
            image: "/memory3.png",
            title: "PRESENTATION",
            description: "Stage Presentation"
        },
        {
            image: "/memory2.png",
            title: "PRODUCTION",
            description: "Stage Production"
        },
        {
            image: "/memory1.png",
            title: "PERFORMANCE",
            description: "Stage Performance"
        },
        {
            image: "/memory3.png",
            title: "PRESENTATION",
            description: "Stage Presentation"
        }
    ]
    return (
        <div className='flex flex-col items-center py-8 gap-8'>
            <SectionHeader
                title='Memories in Motion'
                icon={PiShootingStarBold}
                iconColor='#7B3FE4'
                label='PAST EVENTS'
                description='Dive into photos and videos from previous editions. Capturing the vibrant energy and stunning moments from deCave'
            />

            <div className='grid grid-cols-3 gap-6  mx-auto'>
                {
                    imageArray?.map((item: ImageArrayType, index: number) => (
                        <HoverImage
                            key={index}
                            title={item.title}
                            description={item?.description}
                            image={item?.image}
                        />
                    ))
                }
            </div>

            <ViewMoreButton text='View More Gallery' />
        </div>
    )
}

export default Memories