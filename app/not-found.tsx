'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/layout/Button'
import { IoMusicalNotesSharp } from 'react-icons/io5'
import { FiHome, FiCalendar } from 'react-icons/fi'
import { HiOutlineArrowLeft } from 'react-icons/hi'

const NotFound = () => {
  return (
    <div className='relative min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden py-30 lg:py-45 px-4 sm:px-6 lg:px-8'>
      {/* Animated background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#001D3D] via-[#0A0A0A] to-[#56410C] opacity-50'></div>
      
      {/* Animated circles */}
      <motion.div
        className='absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-[#CCA33A]/10 blur-3xl'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className='absolute bottom-20 right-10 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full bg-[#0854A7]/10 blur-3xl'
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto'>
        {/* 404 Number with glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='relative mb-6 sm:mb-8 lg:mb-10'
        >
          <div className='relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl'>
            <h1 className='text-8xl sm:text-9xl md:text-[180px] lg:text-[220px] font-extrabold text-transparent bg-gradient-to-r from-[#CCA33A] via-[#EEF6FF] to-[#0854A7] bg-clip-text leading-none drop-shadow-[0_0_30px_rgba(204,163,58,0.3)]'>
              404
            </h1>
          </div>
          
          {/* Floating musical note icon */}
          <motion.div
            className='absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-br from-[#7B3FE4] to-[#AD46FF] p-3 sm:p-4 rounded-full shadow-lg'
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IoMusicalNotesSharp size={24} className='sm:w-7 sm:h-7 lg:w-8 lg:h-8' color='#FAF8FF' />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-4 sm:mb-6'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9F7F4] mb-3 sm:mb-4'>
            Lost in the <span className='italic text-[#CCA33A]'>Rhythm?</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mb-8 sm:mb-10 lg:mb-12 px-4'
        >
          <p className='text-base sm:text-lg md:text-xl text-[#B3B3B3] max-w-2xl leading-relaxed'>
            Looks like this page went off-beat. The event you're looking for doesn't exist, 
            or the rhythm changed. Let's get you back to the main stage.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto'
        >
          <Link href='/' className='w-full sm:w-auto'>
            <Button 
              variant='primary' 
              icon='arrow'
              iconPosition='right'
              className='w-full sm:w-auto group'
            >
              <span className='flex items-center gap-2'>
                <FiHome className='w-5 h-5' />
                Back to Home
              </span>
            </Button>
          </Link>
          
          <Link href='/events' className='w-full sm:w-auto'>
            <Button 
              variant='outline'
              className='w-full sm:w-auto group'
            >
              <span className='flex items-center gap-2'>
                <FiCalendar className='w-5 h-5' />
                View Events
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-12 sm:mt-16 lg:mt-20'
        >
          <p className='text-sm sm:text-base text-[#6F6F6F] mb-4'>Or explore these sections:</p>
          <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6'>
            <Link 
              href='/about' 
              className='text-sm sm:text-base text-[#EEF6FF] hover:text-[#CCA33A] transition-colors duration-300 flex items-center gap-2'
            >
              About Us
            </Link>
            <span className='text-[#2A2A2A]'>•</span>
            <Link 
              href='/artists' 
              className='text-sm sm:text-base text-[#EEF6FF] hover:text-[#CCA33A] transition-colors duration-300 flex items-center gap-2'
            >
              Artists
            </Link>
            <span className='text-[#2A2A2A]'>•</span>
            <Link 
              href='/gallery' 
              className='text-sm sm:text-base text-[#EEF6FF] hover:text-[#CCA33A] transition-colors duration-300 flex items-center gap-2'
            >
              Gallery
            </Link>
            <span className='text-[#2A2A2A]'>•</span>
            <Link 
              href='/contact' 
              className='text-sm sm:text-base text-[#EEF6FF] hover:text-[#CCA33A] transition-colors duration-300 flex items-center gap-2'
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound