import React, { ReactNode } from 'react'
import Image from 'next/image'
import Header from '../layout/header'
import { GiDrippingStar } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";



// interface HeroSectionProps {
//   children?: ReactNode
// }

const HeroSection = () => {
    return (
        <div className='relative  min-h-screen px-6 py-6 flex flex-col items-center '>
            {/* Background Image */}
            <Image
                src="/hero-bg.png"
                alt="Hero background"
                fill
                className='object-cover -z-10'
                priority
            />

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-black/40 -z-10'></div>

            {/* <Header /> */}

            <div className='relative min-h-screen flex flex-col items-center justify-center w-[50%]'>
                <Image
                    src="/hero-line.png"
                    alt="Hero background"
                    fill
                    className='object-cover -z-10'
                    priority
                />

                <div className='bg-[#BC9229]/40 text-[#FFF7E4] border border-[#FFF7E4] w-fit px-6 py-1 rounded-full flex items-center gap-2'> <GiDrippingStar color='#FFF7E4' /><p>CULTURE. RHYTHM. COLOR</p></div>
                <h3 className='text-[120px]'>deCave</h3>
                <div className='text-lg text-center'>
                    <p className='text-[30px] italic'><span className='text-[#B3B3B3]'>Where</span> culture <span className='text-[#B3B3B3]'>meets</span> <span className='text-[#CCA33A]'>experience</span></p>
                    <p className='text-[#B3B3B3]'>We don't just host events — we create movements. Immersive experiences
                        that celebrate African culture, elevate community, and redefine nightlife.</p>
                </div>
                <div className='flex items-center gap-6 pt-6'>
                    <button className='bg-[radial-gradient(circle,var(--tw-gradient-stops))] bg-amber-300 from-[#FFD159] to-[#FFD159] px-8 py-2 rounded-full text-[#FFF7E4] flex items-center gap-4'>
                       <p>View Event</p> 
                       <IoArrowForward size={24} />
                    </button>                
                    <button className='rounded-full px-8 py-2 border border-[#CCA33A] text-[#CCA33A]'>
                        Partner with us
                    </button>

                </div>

                {/* Children content */}
            </div>
        </div>
    )
}

export default HeroSection