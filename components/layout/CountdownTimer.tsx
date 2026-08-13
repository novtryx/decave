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
  <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3" style={{ color: "var(--color-accent)" }}>
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--color-accent)" }}></span>
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--color-accent)" }}></span>
    </span>
    Event Starts In
  </div>
  <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
    {timeUnits.map((unit, index) => (
      <React.Fragment key={unit.label}>
        <div className="flex flex-col items-center">
          {/* GLOWING CONTAINER */}
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 mb-1.5 sm:mb-2 rounded-xl sm:rounded-2xl border-2 flex flex-col items-center justify-center overflow-hidden"
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              borderColor: "var(--color-accent)",
              boxShadow: "0 0 18px -2px var(--color-accent)",
            }}
          >
            {/* ANIMATED NUMBER ONLY */}
            <div className="relative h-9 sm:h-11 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute text-3xl sm:text-4xl font-extrabold text-white"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* LABEL (STATIC) */}
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide mt-1" style={{ color: "var(--color-accent)" }}>
              {unit.label}
            </span>
          </div>
        </div>
        {index < timeUnits.length - 1 && (
          <span
            className="text-2xl sm:text-3xl font-bold pb-5 sm:pb-6"
            style={{ color: "var(--color-accent)" }}
          >
            :
          </span>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

);

}