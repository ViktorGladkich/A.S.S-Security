
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Radio } from 'lucide-react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative py-32 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white overflow-hidden font-['Host_Grotesk'] transition-colors duration-500"
    >
      
      {/* Background Video/Image Placeholder with overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-10 dark:opacity-20 grayscale mix-blend-luminosity"></div>
         <div className="absolute inset-0 bg-linear-to-b from-neutral-50 via-neutral-100/90 to-neutral-50 dark:from-neutral-950 dark:via-neutral-900/90 dark:to-neutral-950 transition-colors duration-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-brand-600 dark:text-brand-500 font-bold tracking-[0.3em] uppercase text-sm flex items-center gap-2 mb-4">
                        <span className="w-8 h-0.5 bg-brand-600 dark:bg-brand-500"></span>
                        Über Uns
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-neutral-900 dark:text-white">
                        WIR DEFINIEREN <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-brand-400 dark:from-brand-400 dark:to-brand-600">SICHERHEIT NEU.</span>
                    </h2>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed border-l-4 border-brand-500 pl-6"
                >
                    A.S.S Security steht für moderne, kompromisslose Sicherheit in Dresden. 
                    Wir verbinden deutsche Präzision mit modernster Überwachungstechnologie, 
                    um Unternehmen und Privatpersonen den Schutz zu bieten, den sie verdienen.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-neutral-500 dark:text-neutral-400 leading-relaxed space-y-4"
                >
                   <p>
                       In einer sich schnell wandelnden Welt reichen traditionelle Methoden nicht mehr aus. 
                       Unser Ansatz ist proaktiv, diskret und technologisch führend. 
                       Wir warten nicht auf Vorfälle – wir verhindern sie.
                   </p>
                   <p>
                       Gegründet mit der Vision, Sicherheitsdienstleistungen auf ein neues Level zu heben, 
                       setzen wir auf handverlesenes Personal, kontinuierliche Weiterbildung und Equipment der nächsten Generation.
                   </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        { icon: <Shield className="text-brand-600 dark:text-brand-500" />, title: "Präzision", desc: "Kein Detail entgeht uns." },
                        { icon: <Lock className="text-brand-600 dark:text-brand-500" />, title: "Diskretion", desc: "Schutz, den man fühlt, aber nicht sieht." },
                        { icon: <Radio className="text-brand-600 dark:text-brand-500" />, title: "Technologie", desc: "High-End Equipment im Einsatz." }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-6 bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-brand-500/50 transition-colors shadow-sm dark:shadow-none"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h4 className="text-neutral-900 dark:text-white font-bold mb-2">{item.title}</h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Image Composition */}
            <motion.div 
                style={{ y }}
                className="relative hidden lg:block h-[600px]"
            >
                <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden border border-neutral-200 dark:border-brand-500/20 shadow-2xl z-10">
                    <img 
                        src="https://images.unsplash.com/photo-1614064641938-3e82da55e6ba?q=80&w=2670&auto=format&fit=crop" 
                        alt="Operations Center" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden border border-white dark:border-neutral-700 shadow-2xl z-20">
                     <img 
                        src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=2630&auto=format&fit=crop" 
                        alt="Professional Security Team" 
                        className="w-full h-full object-cover" 
                    />
                </div>

                {/* Decorative Box */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-500/10 rounded-full -z-10 animate-pulse"></div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};
    