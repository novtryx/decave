'use client'

import Image from 'next/image'
import React, { useState } from 'react'
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
  isHeadliner?: boolean;
  instagramLink?: string;
  twitterLink?: string;
  externalLink?: string;
}

const LineUpImageCard = ({ 
  imageSrc, 
  artistName, 
  genre, 
  isHeadliner = false,
  instagramLink = "https://instagram.com",
  twitterLink = "https://twitter.com",
  externalLink = "https://google.com"
}: LineUpImageCardProps) => {

  const [isActive, setIsActive] = useState(false);

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

  const handleCardClick = () => {
    setIsActive(!isActive);
  }

  return (
    <div 
      className={`group/card h-[400px] sm:h-[450px] md:h-[500px] lg:h-139.25 w-full sm:w-[280px] md:w-[320px] lg:w-106.75 border-2 border-[#000000] hover:border-[#EFBD3E] relative overflow-hidden cursor-pointer ${isActive ? 'border-[#EFBD3E]' : ''}`}
      onClick={handleCardClick}
    >
      <Image src={imageSrc} alt={artistName} fill className='object-cover' />
      <div className='h-full w-full bg-black/20 absolute top-0'></div>

      {/* headliner button - only shows if isHeadliner is true */}
      {isHeadliner && (
        <button 
          className='cursor-pointer absolute group right-4 sm:right-7 top-4 sm:top-7 h-9 sm:h-10.25 px-3 sm:px-4 w-fit overflow-hidden rounded-full bg-white/10 backdrop-blur-md border-1 border-white shadow-lg transition-all duration-300 hover:bg-white/15 hover:border-white/50 hover:scale-[1.02] z-10'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle shine on hover */}
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700' />

          {/* Icon + Text */}
          <span className='relative z-10 flex items-center gap-1 text-sm sm:text-base font-medium text-white/95'>
            <FaStar size={14} color='white' />
            Headliners
          </span>
        </button>
      )}

      {/* bottom section */}
      <div className={`absolute bottom-4 sm:bottom-7 left-4 sm:left-7 right-4 sm:right-7 transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-16 lg:translate-y-16 lg:group-hover/card:translate-y-0'}`}>
        <h1 className='font-semibold text-2xl sm:text-[28px] md:text-[32px] line-clamp-1'>{artistName}</h1>

        <div>
          <p className='text-[#F9F7F4] text-sm sm:text-base line-clamp-1'>{genre}</p>
          {/* <span className='text-[#B3B3B3] flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base'>
            <SlLocationPin size={18} className='sm:w-5 sm:h-5 flex-shrink-0'/>
            <p className='line-clamp-1'>{location}</p>
          </span> */}
          {/* social link - shows on tap (mobile) or hover (desktop) */}
          <div className={`flex items-center gap-3 sm:gap-4 pt-2 sm:pt-3 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 lg:opacity-0 lg:translate-y-2 lg:group-hover/card:opacity-100 lg:group-hover/card:translate-y-0'}`}>
            {
              socialIcons.map((item: SocialIconsType, index: number) => (
                <Link 
                  target='_blank' 
                  key={index} 
                  href={item.link} 
                  className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#F9F7F4] flex items-center justify-center text-[#F9F7F4] hover:bg-white/10 hover:scale-110 transition-all duration-200'
                  onClick={(e) => e.stopPropagation()}
                >
                  <item.icon size={20} className='sm:w-6 sm:h-6'/>
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