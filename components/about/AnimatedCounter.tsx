'use client'
import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
  label?: string
  labelClassName?: string
}

export const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  suffix = '', 
  className = 'text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-medium text-[#CCA33A]',
  label,
  labelClassName = 'text-[#B3B3B3] text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2'
}: CountUpProps) => {
  const counterRef = useRef(null)
  const isInView = useInView(counterRef, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
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

  return (
    <motion.div
      ref={counterRef}
      className='text-center px-2 sm:px-4'
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {count}{suffix}
      </motion.h2>
      {label && (
        <p className={labelClassName}>
          {label}
        </p>
      )}
    </motion.div>
  )
}

// If you need just the count logic without motion/styling
export const useCountUp = (end: number, duration: number = 2, isInView: boolean) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
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

  return count
}