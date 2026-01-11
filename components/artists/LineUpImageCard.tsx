import Image from 'next/image'
import React from 'react'
import { IconType } from 'react-icons';
import { FaStar } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";
import Link from 'next/link';

interface SocialIconsType {
  icon: IconType;
  link: string;
}

interface LineUpImageCardProps {
  imageSrc: string;
  artistName: string;
  genre: string;
  location: string;
  isHeadliner?: boolean;
  instagramLink?: string;
  twitterLink?: string;
  externalLink?: string;
}

const LineUpImageCard = ({ 
  imageSrc, 
  artistName, 
  genre, 
  location, 
  isHeadliner = false,
  instagramLink = "https://instagram.com",
  twitterLink = "https://twitter.com",
  externalLink = "https://google.com"
}: LineUpImageCardProps) => {

  const socialIcons: SocialIconsType[] = [
    {
      icon: FaInstagram,
      link: instagramLink
    },
    {
      icon: FaXTwitter,
      link: twitterLink
    },
    {
      icon: RxExternalLink,
      link: externalLink
    },
  ]

  return (
    <div className='group/card h-139.25 w-106.75   border-2 border-[#000000] hover:border-[#EFBD3E] relative overflow-hidden'>
      <Image src={imageSrc} alt={artistName} fill className='object-cover' />
      <div className='h-full w-full bg-black/20 absolute top-0'></div>

      {/* headliner button - only shows if isHeadliner is true */}
      {isHeadliner && (
        <button className='cursor-pointer absolute group right-7 top-7 h-10.25 px-4 w-fit overflow-hidden rounded-full bg-white/10 backdrop-blur-md border-1 border-white shadow-lg transition-all duration-300 hover:bg-white/15 hover:border-white/50 hover:scale-[1.02] z-10'>
          {/* Subtle shine on hover */}
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700' />

          {/* Icon + Text */}
          <span className='relative z-10 flex items-center gap-1 text-base font-medium text-white/95'>
            <FaStar size={14} color='white' />
            Headliners
          </span>
        </button>
      )}

      {/* bottom section */}
      <div className='absolute bottom-7 left-7 translate-y-16 group-hover/card:translate-y-0 transition-transform duration-300'>
        <h1 className='font-semibold text-[32px]'>{artistName}</h1>

        <div>
          <p className='text-[#F9F7F4]'>{genre}</p>
          <span className='text-[#B3B3B3] flex items-center gap-2'>
            <SlLocationPin size={20}/>
            <p>{location}</p>
          </span>
          {/* social link - only shows on hover */}
          <div className='flex items-center gap-4 pt-3 opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300'>
            {
              socialIcons.map((item: SocialIconsType, index: number) => (
                <Link 
                  target='_blank' 
                  key={index} 
                  href={item.link} 
                  className='w-12 h-12 rounded-full border-2 border-[#F9F7F4] flex items-center justify-center text-[#F9F7F4] hover:bg-white/10 hover:scale-110 transition-all duration-200'
                >
                  <item.icon size={24}/>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineUpImageCard