"use client"
import React from 'react'
import Image from 'next/image'
import Button from '../layout/Button'
import { GiDrippingStar } from "react-icons/gi"
import BottomCards from './BottomCards'

const HeroSection = () => {
    return (
        <div className='relative min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 flex flex-col items-center'>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className='absolute inset-0 w-full h-full object-cover -z-10'
            >
                <source src="/hero-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-black/40 -z-10'></div>

            <div className='relative min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] px-4'>
                {/* Hero Line Image */}
                <Image
                    src="/hero-line.png"
                    alt="Hero background"
                    fill
                    className='object-contain -z-10 opacity-80'
                    priority
                />

                {/* Badge */}
                <div className='bg-[#BC9229]/40 text-[#FFF7E4] border border-[#FFF7E4] w-fit px-4 sm:px-6 py-1 sm:py-1.5 rounded-full flex items-center gap-2 mb-4 sm:mb-6'>
                    <GiDrippingStar color='#FFF7E4' className='w-4 h-4 sm:w-5 sm:h-5' />
                    <p className='text-xs sm:text-sm md:text-base'>CULTURE. COMMUNITY. EXPERIENCE</p>
                </div>

                {/* Title */}
                <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-bold text-center mb-4 sm:mb-6'>
                    deCave
                </h1>

                {/* Subtitle & Description */}
                <div className='text-base sm:text-lg md:text-xl text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-3xl'>
                    <p className='text-xl sm:text-2xl md:text-[30px] italic leading-relaxed'>
                        <span className='text-[#B3B3B3]'>Where</span> culture <span className='text-[#B3B3B3]'>meets</span> <span className='text-[#CCA33A]'>experience</span>
                    </p>
                    <p className='text-[#B3B3B3] text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0'>
                       We do not simply organize events. We design environments where people, energy, and creativity converge — spaces that are felt, remembered, and lived beyond the moment.
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6 w-full sm:w-auto'>
                    <Button
                        href='/events'
                        variant="primary" 
                        icon="arrow"
                        iconPosition="right"
                        className="w-full sm:w-auto"
                    >
                        Enter The Experience
                    </Button>
               
                    <Button 
                    href='/partners'
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        Join The Movement
                    </Button>
                </div>
            </div>

            {/* Bottom Cards */}
            <BottomCards />
        </div>
    )
}

export default HeroSection