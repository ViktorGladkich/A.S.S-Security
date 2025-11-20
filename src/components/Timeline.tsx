
import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Target, Shield, Zap, CheckCircle } from 'lucide-react';

// Import Lottie JSONs
import searchAnim from '../assets/lottie/search.json';
import documentAnim from '../assets/lottie/document.json';
import securedealAnim from '../assets/lottie/securedeal.json';
import cybersecurityAnim from '../assets/lottie/cybersecurity.json';

const events = [
  { 
    lottie: searchAnim, 
    title: 'Analyse & Beratung', 
    desc: 'Detaillierte Risikoanalyse Ihrer Situation und Erstellung eines maßgeschneiderten Sicherheitskonzepts.', 
    sub: 'Assessment', 
    icon: <Target size={20} /> 
  },
  { 
    lottie: documentAnim, 
    title: 'Planung & Strategie', 
    desc: 'Auswahl der passenden Sicherheitsmaßnahmen, Technologie und des qualifizierten Personals.', 
    sub: 'Strategy', 
    icon: <Shield size={20} /> 
  },
  { 
    lottie: securedealAnim, 
    title: 'Operative Umsetzung', 
    desc: 'Reibungslose Integration unserer Sicherheitskräfte und Systeme in Ihre Abläufe.', 
    sub: 'Execution', 
    icon: <Zap size={20} /> 
  },
  { 
    lottie: cybersecurityAnim, 
    title: 'Qualitätskontrolle', 
    desc: 'Kontinuierliche Überwachung, Reporting und Anpassung der Maßnahmen für maximalen Schutz.', 
    sub: 'Quality', 
    icon: <CheckCircle size={20} /> 
  },
];

const TimelineItem: React.FC<{ event: any; index: number }> = ({ event, index }) => {
    const isEven = index % 2 === 0;
    
    return (
        <div className="relative w-full flex flex-col md:flex-row justify-start md:justify-center items-center mb-16 last:mb-0 md:mb-32 gap-8 md:gap-0">
             
             {/* Trigger Point / Lottie Container */}
             <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="
                    relative z-20 shrink-0
                    w-20 h-20 md:w-25 md:h-25
                    rounded-full border-2 border-brand-500 bg-white dark:bg-neutral-950 
                    flex items-center justify-center 
                    shadow-md dark:shadow-[0_0_20px_rgba(212,175,55,0.4)] 
                    overflow-hidden
                    md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2
                "
             >
                <div className="w-full h-full p-2 flex items-center justify-center">
                    <Lottie animationData={event.lottie} loop={true} className="w-full h-full" />
                </div>
             </motion.div>

             {/* Content Card */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative w-full md:w-[40%] p-8 bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-brand-500/20 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-xl hover:border-brand-500/50 transition-colors group
                    ${isEven ? 'md:mr-[55%]' : 'md:ml-[55%]'}
                `}
            >
                {/* Connector Line (Desktop Only) */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-brand-200 dark:bg-brand-500/30 w-[20%] -z-10
                    ${isEven ? 'right-[-20%]' : 'left-[-20%]'}
                `}></div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start border-b border-neutral-200 dark:border-white/10 pb-4 mb-2">
                        <h1 className="font-bold text-xl md:text-2xl text-neutral-900 dark:text-white tracking-wide group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{event.title}</h1>
                        <div className="text-brand-500 p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                            {event.icon}
                        </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed">{event.desc}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold">
                        <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                        {event.sub}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 md:py-32 bg-neutral-100 dark:bg-neutral-950 font-['Titillium_Web'] overflow-hidden relative transition-colors duration-500">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-white dark:from-neutral-900 to-transparent pointer-events-none"></div>
      
      <div className="text-center mb-24 md:mb-32 relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Unser <span className="text-brand-600 dark:text-brand-500">Vorgehen</span></h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">Ein strukturierter Prozess für kompromisslose Sicherheit in vier Phasen.</p>
        <div className="w-1 h-20 bg-linear-to-b from-transparent via-brand-500 to-brand-500 mx-auto mt-8"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-neutral-200/0 via-neutral-300 dark:via-brand-500/30 to-neutral-200/0 -translate-x-1/2 hidden md:block"></div>
        
        <div className="py-12">
            {events.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};
