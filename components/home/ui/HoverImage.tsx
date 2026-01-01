'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuSearchX } from "react-icons/lu";

interface HoverImageType{
     image: string;
    title: string;
    description: string
}

const HoverImage = ({image, title, description}:HoverImageType) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className='relative w-full aspect-square sm:aspect-[4/3] md:aspect-square overflow-hidden cursor-pointer rounded-lg sm:rounded-xl'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <motion.div
        className='relative w-full h-full'
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image 
          src={image} 
          alt={title || 'memory'} 
          fill 
          className='object-cover'
        />
      </motion.div>
      
      {/* Overlay - appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          >
            <div className='h-full w-full flex justify-center items-center'>
              {/* Play/Search button */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.2, backgroundColor: '#F9F7F4', color: '#000' }}
                className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full border-2 border-[#F9F7F4] text-white'
              >
                <LuSearchX size={16} className='sm:w-5 sm:h-5 md:w-6 md:h-6 ml-0.5' />
              </motion.div>
            </div>

            {/* Bottom info */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className='absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 space-y-1 sm:space-y-2 border-t-2 border-t-[#FAF8FF] pt-2 sm:pt-3'
            >
              <p className='font-semibold text-sm sm:text-base md:text-lg text-white line-clamp-1'>
                {title}
              </p>
              <p className='text-[#B3B3B3] text-xs sm:text-sm md:text-base line-clamp-2'>
                {description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default HoverImage