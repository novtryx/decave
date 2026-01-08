'use client'
import React from 'react'
import { GoDotFill } from "react-icons/go";
import { motion } from 'framer-motion';

const ScrollContent = () => {
  const items = [
    'CULTURE',
    'RHYTHM',
    'COLOR',
    'CULTURE',
    'RHYTHM',
    'COLOR',
    'CULTURE',
    'RHYTHM',
    'COLOR',
    'CULTURE',
    'RHYTHM',
    'COLOR',
  ];

  return (
    <div className='bg-white py-3 xs:py-4 sm:py-5 md:py-6 overflow-hidden relative'>
      {/* Left fade overlay */}
      <div className='absolute left-0 top-0 bottom-0 w-16 xs:w-20 sm:w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none'></div>
      
      {/* Right fade overlay */}
      <div className='absolute right-0 top-0 bottom-0 w-16 xs:w-20 sm:w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none'></div>

      <motion.div
        className='flex items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 px-4 xs:px-5 sm:px-6 md:px-8'
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* First set */}
        {items.map((item, index) => (
          <React.Fragment key={`first-${index}`}>
            <p className='bg-gradient-to-r w-fit from-[#001D3D] via-[#CCA33A] to-[#004DA3] bg-clip-text text-transparent text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap font-bold'>
              {item}
            </p>
            <GoDotFill size={14} className='xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 shrink-0' color='#CCA33A' />
          </React.Fragment>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {items.map((item, index) => (
          <React.Fragment key={`second-${index}`}>
            <p className='bg-gradient-to-r w-fit from-[#001D3D] via-[#CCA33A] to-[#004DA3] bg-clip-text text-transparent text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap font-bold'>
              {item}
            </p>
            <GoDotFill size={14} className='xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 shrink-0' color='#CCA33A' />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default ScrollContent