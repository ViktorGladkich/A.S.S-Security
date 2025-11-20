
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { id: 1, name: "Hans Müller", company: "Tech Corp", text: "Hervorragender Service. Sehr diskret und professionell." },
  { id: 2, name: "Sarah Schmidt", company: "Event GmbH", text: "Das Event verlief dank A.S.S reibungslos." },
  { id: 3, name: "Klaus Weber", company: "Immobilien AG", text: "Bester Objektschutz in Dresden. Absolut empfehlenswert." },
  { id: 4, name: "Julia Wagner", company: "Privat", text: "Ich fühle mich endlich wieder sicher." },
];

export const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white font-['Host_Grotesk'] transition-colors duration-500">
      <div className="absolute top-0 right-0 opacity-5 dark:opacity-10 text-slate-900 dark:text-white">
         <Quote size={400} />
      </div>

      <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center text-center">
        <div className="flex gap-1 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} className="text-amber-400 fill-amber-400 w-6 h-6" />)}
        </div>

        <div className="h-[300px] flex items-center justify-center relative w-full">
            <AnimatePresence initial={false} mode="wait">
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute w-full"
                >
                     <h2 className="text-3xl md:text-6xl font-bold italic tracking-tight leading-tight text-slate-800 dark:text-slate-100 mb-8">
                        "{testimonials[index].text}"
                    </h2>
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-1">
                            {testimonials[index].name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {testimonials[index].company}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Modern Navigation Pills */}
        <div className="flex items-center gap-4 mt-8">
            <button 
                onClick={prev} 
                className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-110 transition-all"
            >
                <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
                {testimonials.map((_, i) => (
                    <div 
                        key={i} 
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'w-8 bg-brand-600 dark:bg-brand-500' : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`} 
                    />
                ))}
            </div>

            <button 
                onClick={next} 
                className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-110 transition-all"
            >
                <ChevronRight size={24} />
            </button>
        </div>
      </div>
    </section>
  );
};
