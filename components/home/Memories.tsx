"use client"

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
        <div className='flex flex-col items-center py-8 sm:py-12 lg:py-16 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8'>
            <SectionHeader
                title='Memories in Motion'
                icon={PiShootingStarBold}
                iconColor='#7B3FE4'
                label='PAST EVENTS'
                description='Dive into photos and videos from previous editions. Capturing the vibrant energy and stunning moments from deCave'
            />

            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
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
            </div>

            <div className='pt-2 sm:pt-4'>
                <ViewMoreButton href='/gallery' text='View More Gallery' />
            </div>
        </div>
    )
}

export default Memories