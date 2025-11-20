
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 1500); // Allow exit animation to finish
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-100 flex pointer-events-none`}>
      
      {/* Left Curtain */}
      <motion.div
        initial={{ x: "0%" }}
        animate={isComplete ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="w-1/2 h-full bg-neutral-950 flex items-center justify-end border-r border-brand-500/20 relative z-50"
      >
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        initial={{ x: "0%" }}
        animate={isComplete ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="w-1/2 h-full bg-neutral-950 flex items-center justify-start border-l border-brand-500/20 relative z-50"
      >
      </motion.div>

      {/* Counter (Absolute Center) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-60"
        animate={isComplete ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
         <div className="flex flex-col items-center">
            <div className="text-6xl md:text-9xl font-bold text-brand-500 font-['Host_Grotesk'] tabular-nums leading-none">
                {counter}%
            </div>
            <div className="w-64 h-0.5 bg-neutral-800 mt-4 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-brand-500" 
                    style={{ width: `${counter}%` }}
                />
            </div>
            <h1 className="mt-4 text-white tracking-[0.5em] text-xs font-bold uppercase">A.S.S Security loading</h1>
         </div>
      </motion.div>
    </div>
  );
};
