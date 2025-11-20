
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const data = [
  { label: "Kundenzufriedenheit", value: 98, color: "#FDE047" }, // brand-400 
  { label: "Reaktionszeit (Min)", value: 15, color: "#D4AF37" }, // brand-500
  { label: "Erfolgreiche Einsätze", value: 120, color: "#B59218" }, // brand-600
  { label: "Mitarbeiter", value: 45, color: "#856B12" }, // brand-700
  { label: "Standorte", value: 3, color: "#5C4A0C" }, // brand-800
];

export const StatsChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex flex-col md:flex-row items-center justify-center gap-16 font-['Roboto'] relative overflow-hidden transition-colors duration-500">
      {/* Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-500 dark:via-brand-600 to-transparent"></div>

      <div className="w-full max-w-sm z-10 px-6">
        <h3 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">LEISTUNGS<span className="text-brand-600 dark:text-brand-500">DATEN</span></h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm">Echtzeit-Metriken unserer Operationszentrale.</p>
        <ul className="space-y-4">
          {data.map((item, idx) => (
            <li 
                key={idx} 
                className="transition-all duration-300 p-3 rounded border border-transparent hover:bg-neutral-200 dark:hover:bg-white/5 hover:border-neutral-300 dark:hover:border-brand-500/30 cursor-default"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.3 : 1 }}
            >
              <div className="flex items-center justify-between">
                 <span className="text-neutral-700 dark:text-neutral-300 font-light">{item.label}</span>
                 <div className="flex items-center gap-3">
                    <b className="font-bold font-mono text-xl" style={{ color: item.color }}>{item.value}</b>
                    <div className="h-2 w-2 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
                 </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-10">
        <svg viewBox="0 0 400 400" className="w-full h-full -rotate-90">
           {/* Track Circle */}
           <circle cx="200" cy="200" r="50" className="fill-neutral-200 dark:fill-[#0f172a] stroke-neutral-300 dark:stroke-[#1e293b]" strokeWidth="1" />
           
           {data.map((item, idx) => {
              const radius = 60 + (idx * 15); 
              const strokeDasharray = 2 * Math.PI * radius;
              const strokeDashoffset = strokeDasharray * (1 - 0.75); // 75% circle

              return (
                <motion.circle
                    key={idx}
                    cx="200" 
                    cy="200" 
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={hoveredIndex === idx ? 10 : 6}
                    strokeLinecap="round"
                    strokeOpacity={hoveredIndex === idx ? 1 : 0.5}
                    strokeDasharray={strokeDasharray}
                    initial={{ strokeDashoffset: strokeDasharray }}
                    whileInView={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer transition-all duration-300"
                    style={{ filter: hoveredIndex === idx ? `drop-shadow(0 0 8px ${item.color})` : 'none' }}
                />
              );
           })}
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <span 
                    className="text-4xl font-bold transition-colors duration-300 font-mono block"
                    style={{ color: hoveredIndex !== null ? data[hoveredIndex].color : 'currentColor' }}
                >
                    {hoveredIndex !== null ? data[hoveredIndex].value : '100%'}
                </span>
                <span className="text-xs text-neutral-500 tracking-widest">STATUS</span>
            </div>
        </div>
      </div>
    </section>
  );
};
