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
          animate={{ height: '65px', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='bg-linear-to-r from-[#001D3D] via-[#CCA33A] to-[#004DA3] w-full px-6 flex overflow-hidden'
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className='flex items-center gap-6 w-full justify-center'
          >
            <p className='font-normal text-lg'>AFROSPOOK - 2025</p>
            <div className="w-2 h-2 bg-white rounded-full"></div>

            <Link href={"#"} className='underline hover:no-underline uppercase transition-all'>
              Buy Tickets Now
            </Link>
          </motion.div>

          <motion.button
            onClick={() => setOpen(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className='cursor-pointer'
          >
            <IoCloseOutline size={24} color='#FAF8FF' />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LatestTicket