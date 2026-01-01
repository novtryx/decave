'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

interface NavType{
    name: string;
    link: string;
}
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks: NavType[] = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Events",
            link: "/events"
        },
        {
            name: "Artists",
            link: "/artists"
        },
        {
            name: "Gallery",
            link: "/gallery"
        },
        {
            name: "Partners",
            link: "/partners"
        },
        {
            name: "Contact",
            link: "/contact"
        },
    ]
  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='backdrop-blur-sm w-full rounded-2xl lg:rounded-full border border-white/20 shadow-lg'>
            <div className='flex justify-between items-center p-4 sm:p-5 lg:p-6'>
                {/* logo */}
                <div className='relative h-8 w-12 sm:h-10 sm:w-16 md:h-12 md:w-18 lg:h-13.5 lg:w-20.5 flex-shrink-0'>
                    <Image src={"/logo.svg"} alt="logo" fill className='object-contain' />
                </div>

                {/* Desktop nav links */}
                <nav className='hidden lg:flex gap-3 xl:gap-6 items-center'>
                    {
                        navLinks?.map((item: NavType, index:number) => (
                            <Link 
                                prefetch={true}
                                key={index} 
                                href={item.link} 
                                className='hover:text-[#CCA33A] transition-colors duration-300 text-sm xl:text-base whitespace-nowrap'
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </nav>

                {/* Mobile menu button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='lg:hidden flex flex-col gap-1.5 z-50 p-2'
                    aria-label="Toggle menu"
                >
                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile menu */}
            <nav className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className='flex flex-col px-4 pb-4 space-y-1'>
                    {
                        navLinks?.map((item: NavType, index:number) => (
                            <Link 
                                prefetch={true}
                                key={index} 
                                href={item.link} 
                                className='hover:text-[#CCA33A] hover:bg-white/5 transition-all duration-300 py-3 px-3 rounded-lg border-b border-white/5 last:border-b-0'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Header