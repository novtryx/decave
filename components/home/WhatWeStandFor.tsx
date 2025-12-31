'use client'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeader from '../layout/sectionHeader'
import { BsStars } from "react-icons/bs";
import Image from 'next/image';
import CardWithoutImage from '../layout/CardWithoutImage';
import { FaRegHeart } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import ViewMoreButton from '../layout/ViewMoreButton';

interface ValueType {
    title: string;
    description: string;
    icon: IconType;
}

interface StatType {
    value: number;
    suffix?: string;
    label: string;
}

const WhatWeStandFor = () => {
    const statsRef = useRef(null)
    const isInView = useInView(statsRef, { once: true, amount: 0.5 })

    const values: ValueType[] = [
        {
            title: "Culture",
            description: "Celebrating African heritage through music, art and community. Every event is a cultural moment",
            icon: FaRegHeart
        },
        {
            title: "Community",
            description: "Building a movement of like-minded individuals who value experience, expression, and connection",
            icon: MdOutlinePeopleAlt
        },
        {
            title: "Expression",
            description: "Creating spaces where authenticity thrives. Where you can be bold, creative and unapologetically yourself.",
            icon: IoFlashOutline
        }
    ]

    const stats: StatType[] = [
        { value: 10, suffix: 'K', label: 'ATTENDEES' },
        { value: 50, suffix: '+', label: 'EVENTS HOSTED' },
        { value: 15, suffix: '+', label: 'CITY LOCATION' },
        { value: 200, suffix: '+', label: 'ARTIST FEATURED' }
    ]

    return (
        <div className='px-15 space-y-8 bg-[#151515] py-8'>
            <SectionHeader
                title='What We Stand For'
                icon={BsStars}
                label='OUR VALUES'
                iconColor='#AD46FF'
                description='We want you to experience AfroSpook with complete peace of mind. Our comprehensive safety measures ensure a secure, well-organized event.'
            />

            <div className='flex gap-6 pt-8'>
                <div className='relative h-181.5 w-191.25'>
                    <Image src={"/man-with-guitar.png"} alt="guitar-man" fill className='object-cover'/>
                </div>
                <div className='space-y-6'>
                    {
                        values?.map((item: ValueType, index: number) => (
                            <CardWithoutImage 
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                            />
                        ))
                    }
                </div>
            </div>

            {/* Animated counts with Framer Motion */}
            <div ref={statsRef} className='flex items-center justify-center gap-8'>
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className='text-center px-4'
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <motion.h2 
                            className='text-[48px] font-medium text-[#CCA33A]'
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                        >
                            <CountUp 
                                end={stat.value} 
                                duration={2}
                                isInView={isInView}
                            />
                            {stat.suffix}
                        </motion.h2>
                        <p className='text-[#B3B3B3] text-lg'>{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <ViewMoreButton text='Learn More About deCave'/>
        </div>
    )
}

// Simple CountUp component
const CountUp = ({ end, duration, isInView }: { end: number, duration: number, isInView: boolean }) => {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!isInView) return

        let startTime: number | null = null
        const durationMs = duration * 1000

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime

            const percentage = Math.min(progress / durationMs, 1)
            const currentCount = Math.floor(percentage * end)

            setCount(currentCount)

            if (percentage < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [isInView, end, duration])

    return <>{count}</>
}

export default WhatWeStandFor