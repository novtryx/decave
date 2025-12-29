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
    <div className='bg-white py-6 overflow-hidden relative'>
      {/* Left fade overlay */}
      <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none'></div>
      
      {/* Right fade overlay */}
      <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none'></div>

      <motion.div
        className='flex items-center gap-6 px-8'
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
            <p className='bg-gradient-to-r w-fit from-[#001D3D] via-[#CCA33A] to-[#004DA3] bg-clip-text text-transparent text-xl whitespace-nowrap font-bold'>
              {item}
            </p>
            <GoDotFill size={20} color='#CCA33A' className='flex-shrink-0' />
          </React.Fragment>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {items.map((item, index) => (
          <React.Fragment key={`second-${index}`}>
            <p className='bg-gradient-to-r w-fit from-[#001D3D] via-[#CCA33A] to-[#004DA3] bg-clip-text text-transparent text-xl whitespace-nowrap font-bold'>
              {item}
            </p>
            <GoDotFill size={20} color='#CCA33A' className='flex-shrink-0' />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default ScrollContent