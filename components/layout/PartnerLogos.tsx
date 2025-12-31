'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const PartnerLogos = () => {
    const logo1: string[] = [
        "/Vector.png", "/Chase.png", "/Charter.png", "/Vector.png", "/Chase.png", "/Charter.png"
    ]
    const logo2: string[] = [
        "/Tesla.png", "/Microsoft.png", "/Samsung.png", "/Tesla.png", "/Microsoft.png", "/Samsung.png"
    ]

    return (
        <div className='relative space-y-14 py-10 bg-white max-w-full overflow-hidden'>
            {/* White fade overlays with stronger fade */}
            <div className='absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none'></div>
            <div className='absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none'></div>

            {/* First logos - scroll left */}
            <div className='overflow-hidden'>
                <motion.div
                    className='flex gap-14 items-center'
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {[...logo1, ...logo1, ...logo1, ...logo1].map((item: string, index: number) => (
                        <div key={index} className='relative h-8.75 w-68.75 shrink-0'>
                            <Image src={item} alt={item} fill className='object-contain' />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Second logos - scroll right */}
            <div className='overflow-hidden'>
                <motion.div
                    className='flex gap-14 items-center'
                    animate={{
                        x: [-1000, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {[...logo2, ...logo2, ...logo2, ...logo2].map((item: string, index: number) => (
                        <div key={index} className='relative h-8.75 w-68.75 shrink-0'>
                            <Image src={item} alt={item} fill className='object-contain' />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default PartnerLogos