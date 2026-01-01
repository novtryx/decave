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

//   return (
//     <div className="bg-transparent rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
//       <div className="flex justify-between items-center gap-2">
//         {timeUnits.map((unit, index) => (
//           <React.Fragment key={unit.label}>
//             <div className="flex flex-col items-center">
//               <div className="relative w-20 h-20 mb-2">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={unit.value}
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     exit={{ y: 20, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute inset-0 bg-[#2b2929] rounded-2xl border border-gray-700 flex flex-col items-center justify-center"
//                   >
//                     <span className="text-3xl font-bold text-gray-200">
//                       {String(unit.value).padStart(2, '0')}
//                     </span>

//                     <span className="text-sm font-medium text-gray-200">
//                         {unit.label}
//                     </span>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );

return (
  <div className="bg-transparent">
    <div className="flex items-center gap-6">
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-[#2b2929] rounded-2xl border border-gray-700 flex flex-col items-center justify-center"
                >
                  <span className="text-3xl font-bold text-gray-200">
                    {String(unit.value).padStart(2, '0')}
                  </span>

                  <span className="text-sm font-medium text-gray-200">
                      {unit.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);
};