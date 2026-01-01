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
        <div className='relative space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 py-6 sm:py-8 md:py-10 bg-white w-full overflow-hidden'>
            {/* White fade overlays - responsive widths */}
            <div className='absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none'></div>
            <div className='absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none'></div>

            {/* First logos - scroll left */}
            <div className='overflow-hidden'>
                <motion.div
                    className='flex gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center'
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
                        <div 
                            key={index} 
                            className='relative h-6 w-20 sm:h-7 sm:w-32 md:h-8 md:w-48 lg:h-8.75 lg:w-68.75 shrink-0'
                        >
                            <Image 
                                src={item} 
                                alt={`Partner logo ${index + 1}`} 
                                fill 
                                className='object-contain'
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Second logos - scroll right */}
            <div className='overflow-hidden'>
                <motion.div
                    className='flex gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center'
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
                        <div 
                            key={index} 
                            className='relative h-6 w-20 sm:h-7 sm:w-32 md:h-8 md:w-48 lg:h-8.75 lg:w-68.75 shrink-0'
                        >
                            <Image 
                                src={item} 
                                alt={`Partner logo ${index + 1}`} 
                                fill 
                                className='object-contain'
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default PartnerLogos