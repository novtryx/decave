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
      className='relative w-112.5 h-110 overflow-hidden cursor-pointer'
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
          alt='memory' 
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
            className='absolute inset-0 bg-black/60'
          >
            <div className='h-full w-full flex justify-center items-center'>
              {/* Play button */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.2, backgroundColor: '#F9F7F4', color: '#000' }}
                className='h-12 w-12 flex items-center justify-center rounded-full border-2 border-[#F9F7F4]'
              >
                <LuSearchX size={16} className='ml-0.5' />
              </motion.div>
            </div>

            {/* Bottom info */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className='py-1 absolute bottom-4 left-4 space-y-2 border-t-2 border-t-[#FAF8FF] pt-3'
            >
              <p className='font-semibold text-lg text-white'>{title}</p>
              <p className='text-[#B3B3B3] text-base'>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default HoverImage