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
    <div className='flex flex-col items-center'>
      {/* decave image */}
      <div className='flex items-center w-full justify-center relative -mb-[174.5px] z-0'>
    <h1 className='font-extrabold leading-tight text-[369px] text-[#121112] text-center drop-shadow-[0_-7px_0_rgba(255,255,255,0.08)]'>
      deCAVE
    </h1>      
  </div>
      {/* main section */}
      <div className='w-full px-16 bg-[#151515] border-t-3 border-t-[#2A2A2A] relative z-10'>
        <div className='  py-10 w-full h-fit  flex gap-16'>
            <div className='space-y-3'> 
                <div className='relative w-23 h-17.25 px-16'>
                  <Image src="/logo.svg" alt='logo' fill className='object-contain' />
                </div>
                <p className='text-lg text-[#D1D5DB]'>An immersive celebration of African heritage, culture, and innovation.</p>
            </div>


            <div className='flex gap-22.5 w-[75%] px-16'>
                <div className='w-fit'>
                  <h3 className='text-center p-2 border-t-2 border-t-[#EEF6FF]'>CONNECT</h3>
                  <div className='flex flex-col gap-3 pt-2'>
                      {
                        socials.map((item: linkType, index: number) => (
                          <Link className='hover:text-[#CCA33A]' key={index} href={item.link}>{item.name}</Link>
                        ))
                      }
                  </div>
                </div>

                <div className='w-fit'>
                  <h3 className='text-center p-2 border-t-2 border-t-[#EEF6FF]'>EXPLORE</h3>
                  <div className='flex flex-col gap-3 pt-2'>
                      {
                        navLinks.map((item: linkType, index: number) => (
                          <Link className='hover:text-[#CCA33A]' key={index} href={item.link}>{item.name}</Link>
                        ))
                      }
                  </div>
                </div>

                <div className='w-fit '>
                  <h3 className=' py-2 border-t-2 w-fit border-t-[#EEF6FF]'>STAY CONNECTED</h3>
                  <div className='space-y-3 pt-2'>
                  <p className='text-[#B3B3B3]'>Get exclusive updates, early bird tickets, and behind-the-scenes content</p>

                  <div className='flex gap-2'>
                    <input
                    placeholder='Your Email'
                    className='w-72.25 h-fit p-3 rounded-full bg-[#0F0F0F] text-[#6F6F6F] placeholder:text-[#6F6F6F] outline-none '
                    />
                    <Button variant='primary'>Subscribe</Button>
                  </div>

                  </div>
                </div>
            </div>


        </div>
        <div className='text-[#FFFFFF]/40 py-4 flex justify-between  border-t-2 border-t-[#2A2A2A] w-full'>
          <p>© 2026 deCave Festival. All rights reserved.</p>

          <div className='space-x-4 '>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer