"use client";


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

return (
  <div className="bg-transparent">
  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
    {timeUnits.map((unit) => (
      <div key={unit.label} className="flex flex-col items-center">
        {/* STATIC CONTAINER */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 bg-[#2b2929] rounded-xl sm:rounded-2xl border border-gray-700 flex flex-col items-center justify-center overflow-hidden">
          
          {/* ANIMATED NUMBER ONLY */}
          <div className="relative h-8 sm:h-10 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute text-2xl sm:text-3xl font-bold text-gray-200"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* LABEL (STATIC) */}
          <span className="text-xs sm:text-sm font-medium text-gray-200 mt-1">
            {unit.label}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

);

}