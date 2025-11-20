
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Semen Raskin",
    role: "Geschäftsführung",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Andrey Pagasyan",
    role: "Geschäftsführung",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Alexander",
    role: "Geschäftsführung",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
];

export const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    // Staggered fade in for desktop grid view
    ScrollTrigger.batch(cards, {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }),
        start: "top 80%",
    });
  }, []);

  return (
    <section id="team" className="py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 overflow-hidden font-['Titillium_Web']">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 uppercase">Unser <span className="text-brand-600 dark:text-brand-500">Team</span></h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">Die Geschäftsführung von A.S.S Security. Kompetenz und Verantwortung.</p>
            <div className="w-16 h-1 bg-brand-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Horizontal Scroll Container with Snap */}
        <div 
            ref={containerRef}
            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide md:justify-center md:overflow-visible"
        >
            {team.map((member, index) => (
                <div
                    key={index}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="min-w-[280px] md:min-w-0 w-[80vw] md:w-96 snap-center opacity-0 translate-y-10 group relative"
                >
                    <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800">
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-1">{member.role}</p>
                            <h3 className="text-white text-2xl font-bold mb-2">{member.name}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};
