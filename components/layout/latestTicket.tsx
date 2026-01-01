"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5"
import { motion, AnimatePresence } from 'framer-motion'

const LatestTicket = () => {
  const [open, setOpen] = useState<boolean>(true)
    
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: 'auto',
            opacity: 1 
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='bg-linear-to-r from-[#001D3D] via-[#CCA33A] to-[#004DA3] w-full px-4 sm:px-6 lg:px-8 flex overflow-hidden'
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6 w-full justify-center py-3 sm:py-4 md:py-5'
          >
            <p className='font-normal text-sm sm:text-base md:text-lg text-center sm:text-left'>
              AFROSPOOK - 2025
            </p>
            
            <div className="hidden sm:block w-2 h-2 bg-white rounded-full shrink-0"></div>

            <Link 
              href={"#"} 
              className='underline hover:no-underline uppercase transition-all text-sm sm:text-base md:text-lg font-medium'
            >
              Buy Tickets Now
            </Link>
          </motion.div>

          <motion.button
            onClick={() => setOpen(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className='cursor-pointer shrink-0 ml-2 sm:ml-4'
            aria-label="Close announcement"
          >
            <IoCloseOutline size={20} className='sm:w-6 sm:h-6' color='#FAF8FF' />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LatestTicket