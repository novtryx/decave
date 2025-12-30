"use client"
import React, { ReactNode } from 'react'
import Image from 'next/image'
import Header from '../layout/header'
import { GiDrippingStar } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";
import Button from '../layout/Button';



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
                    <Button
                        variant="primary" 
                        icon="arrow"
                        iconPosition="right"
                        >
                        View Event
                        </Button>
               
                    <Button variant="outline">
                            Partner with us
                    </Button>

                </div>

                {/* Children content */}
            </div>
        </div>
    )
}

export default HeroSection