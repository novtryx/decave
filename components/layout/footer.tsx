import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import Button from './Button';

interface linkType{
  name: string;
  link: string;
}
const Footer = () => {

  const socials: linkType[] = [
    {
      name: "Instagram",
      link : "https://instagram.com"
    },
    {
      name: "Twitter",
      link : "https://twitter.com"
    },
    {
      name: "Tiktok",
      link : "https://tiktok.com"
    },
  ]

    const navLinks: linkType[] = [
    {
      name: "Home",
      link : "/"
    },
    {
      name: "About",
      link : "/about"
    },
    {
      name: "Events",
      link : "/events"
    },
     {
      name: "Artists",
      link : "/artists"
    },
    {
      name: "Gallery",
      link : "/gallery"
    },
    {
      name: "Partner",
      link : "/partner"
    },
     {
      name: "Contact",
      link : "/contact"
    },
  ]
  
  return (
    <div className='flex flex-col items-center overflow-hidden'>
      {/* decave image */}
      <div className='hidden md:flex items-center w-full justify-center relative -mb-[80px] sm:-mb-[120px] md:-mb-[140px] lg:-mb-[174.5px] z-0'>
        <h1 className='font-extrabold leading-tight text-[180px] sm:text-[240px] md:text-[280px] lg:text-[369px] text-[#121112] text-center drop-shadow-[0_-7px_0_rgba(255,255,255,0.08)]'>
          deCAVE
        </h1>      
      </div>

      {/* main section */}
      <div className='w-full px-4 sm:px-6 md:px-10 lg:px-16 bg-[#151515] border-t-3 border-t-[#2A2A2A] relative z-10'>
        <div className='py-8 sm:py-10 lg:py-12 w-full h-fit flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16'>
            {/* Logo and tagline */}
            <div className='space-y-3 sm:space-y-4 w-full lg:w-auto lg:max-w-xs'> 
                <div className='relative w-20 h-16 sm:w-23 sm:h-17.25'>
                  <Image src="/logo.svg" alt='logo' fill className='object-contain' />
                </div>
                <p className='text-sm sm:text-base lg:text-lg text-[#D1D5DB] leading-relaxed'>
                  An immersive celebration of African heritage, culture, and innovation.
                </p>
            </div>

            {/* Links sections */}
            <div className='flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-16 lg:gap-22.5 w-full lg:w-[75%]'>
                {/* Connect */}
                <div className='w-full sm:w-auto'>
                  <h3 className='text-sm sm:text-base p-2 border-t-2 border-t-[#EEF6FF] w-fit'>CONNECT</h3>
                  <div className='flex flex-col gap-2 sm:gap-3 pt-2'>
                      {
                        socials.map((item: linkType, index: number) => (
                          <Link 
                            className='hover:text-[#CCA33A] transition-colors text-sm sm:text-base' 
                            key={index} 
                            href={item.link}
                          >
                            {item.name}
                          </Link>
                        ))
                      }
                  </div>
                </div>

                {/* Explore */}
                <div className='w-full sm:w-auto'>
                  <h3 className='text-sm sm:text-base p-2 border-t-2 border-t-[#EEF6FF] w-fit'>EXPLORE</h3>
                  <div className='flex flex-col gap-2 sm:gap-3 pt-2'>
                      {
                        navLinks.map((item: linkType, index: number) => (
                          <Link 
                            className='hover:text-[#CCA33A] transition-colors text-sm sm:text-base' 
                            key={index} 
                            href={item.link}
                          >
                            {item.name}
                          </Link>
                        ))
                      }
                  </div>
                </div>

                {/* Stay Connected */}
                <div className='w-full sm:w-auto sm:flex-1 lg:max-w-md'>
                  <h3 className='text-sm sm:text-base py-2 border-t-2 w-fit border-t-[#EEF6FF]'>STAY CONNECTED</h3>
                  <div className='space-y-3 sm:space-y-4 pt-2'>
                    <p className='text-xs sm:text-sm lg:text-base text-[#B3B3B3] leading-relaxed'>
                      Get exclusive updates, early bird tickets, and behind-the-scenes content
                    </p>

                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
                      <input
                        placeholder='Your Email'
                        className='w-full sm:flex-1 h-fit p-3 text-sm sm:text-base rounded-full bg-[#0F0F0F] text-[#6F6F6F] placeholder:text-[#6F6F6F] outline-none border border-[#2A2A2A] focus:border-[#CCA33A] transition-colors'
                      />
                      <Button variant='primary' className='w-full sm:w-auto'>Subscribe</Button>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className='text-[#FFFFFF]/40 py-4 sm:py-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center border-t-2 border-t-[#2A2A2A] w-full text-xs sm:text-sm'>
          <p className='text-center sm:text-left'>© 2026 deCave Festival. All rights reserved.</p>

          <div className='flex gap-4 sm:gap-6'>
            <Link href="/privacy" className='hover:text-[#CCA33A] transition-colors'>Privacy Policy</Link>
            <Link href="/terms" className='hover:text-[#CCA33A] transition-colors'>Terms of Use</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer