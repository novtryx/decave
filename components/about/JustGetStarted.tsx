import SectionHeader from '../layout/sectionHeader'
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import Image from 'next/image'
import { IconType } from 'react-icons';
import { RiGlobeLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";


interface TheFutureArrayType{
    icon: IconType;
    title: string;
}
const JustGetStarted = () => {

const theFutureArray: TheFutureArrayType[] =[
    {
        icon: RiGlobeLine,
        title: "Expanding to 10+ cities across Africa by 2027"
    },
     {
        icon: IoCalendarOutline,
        title: "Launching 5+ new event formats in 2025"
    },
     {
        icon: MdOutlinePeopleAlt,
        title: "Building a community of 500K+ culture enthusiasts"
    }
]

    const text = `What started with one vision—AfroSpook—is expanding into a cultural empire.

We're launching new event formats, expanding to new cities across Africa and beyond, and building a global network of culture enthusiasts who share our vision.

The goal? To become the leading platform for world-class African cultural experiences—setting standards, exporting culture, and proving that the future of nightlife and lifestyle events is being written on the continent.`
  return (
    <div className='flex items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12'>
        <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl'>
            <div className='w-full lg:w-[55%] xl:w-[50%] space-y-6 sm:space-y-8'>
                <SectionHeader
                title="Just Getting Started"
                label='THE FUTURE'
                icon={HiOutlineRocketLaunch}
                iconColor='#AD46FF'
                align='left'
                description={text}
                descriptionColor='#B3B3B3'
                />
                
            <div className='space-y-4 sm:space-y-5'>
                {
                    theFutureArray?.map((item:TheFutureArrayType, index:number) => (
                        <span className='flex items-start sm:items-center gap-3 sm:gap-4' key={index}>
                            <item.icon size={24} color='#AD46FF' className='flex-shrink-0 mt-1 sm:mt-0'/>
                            <p className='text-[#B3B3B3] text-sm sm:text-base'>{item.title}</p>
                        </span>
                    ))
                }
            </div>
              
            </div>

            <div className='relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[726px] w-full lg:w-[45%] xl:w-[50%]'>
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

export default JustGetStarted