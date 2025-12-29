import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface NavType{
    name: string;
    link: string;
}
const Header = () => {
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
    <div className=' backdrop-blur-sm max-w-full rounded-full border border-white/20 px-10  shadow-lg'>
        <div className='flex justify-between items-center p-6'>
            {/* logo */}
            <div className='relative h-13.5 w-20.5 '>
                <Image src={"/logo.svg"} alt="logo" fill className=' object-contain' />
            </div>


            {/* nav links */}
            <div className='flex gap-6'>
                {
                    navLinks?.map((item: NavType, index:number) => (
                        <Link 
                            key={index} 
                            href={item.link} 
                            className='hover:text-[#CCA33A] transition-colors duration-300'
                        >
                            {item.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Header