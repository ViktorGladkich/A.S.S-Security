
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Personenschutz VIP",
    category: "Close Protection",
    image: "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=2670&auto=format&fit=crop", // Bodyguards / Suits
    desc: "Diskretion und Sicherheit für hochrangige Persönlichkeiten."
  },
  {
    id: 2,
    title: "Objektschutz Industrie",
    category: "Site Security",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop", // Modern Building
    desc: "24/7 Überwachung von Industrieanlagen mit Drohnentechnologie."
  },
  {
    id: 3,
    title: "Alarmverfolgung",
    category: "Intervention",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2700&auto=format&fit=crop", // Technology/Response
    desc: "Schnelle Reaktionszeiten bei Alarmauslösung durch mobile Einheiten."
  },
  {
    id: 4,
    title: "Operationszentrale",
    category: "Monitoring",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // Tech room
    desc: "High-Tech Leitstelle für Echtzeit-Reaktion."
  },
];

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "3000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="gallery" className="overflow-hidden bg-neutral-900 text-white">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen w-[400vw] flex flex-row relative"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-screen h-full relative flex items-center justify-center p-4 md:p-10 lg:p-20"
            >
                {/* Background Image with parallax feel */}
                <div className="absolute inset-0 z-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50"></div>
                </div>

                {/* Content Card - Fixed width constraints */}
                <div className="relative z-10 w-full max-w-[90vw] md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-6 md:p-10 bg-black/60 backdrop-blur-md border border-brand-500/30 rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-brand-500 text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded">{project.category}</span>
                            <span className="text-neutral-400 text-xs font-mono">0{index + 1} / 04</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-['Host_Grotesk'] leading-tight wrap-break-word hyphens-auto">
                            {project.title}
                        </h3>
                        <p className="text-neutral-300 text-base md:text-lg mb-4 border-l-2 border-brand-500 pl-4">
                            {project.desc}
                        </p>
                    </div>
                </div>
                
                {/* Large Watermark */}
                <div className="absolute bottom-0 right-0 p-4 md:p-10 opacity-10 pointer-events-none">
                    <span className="text-[6rem] md:text-[15rem] lg:text-[20rem] font-bold text-transparent stroke-text-white leading-none">
                        {index + 1}
                    </span>
                </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stroke-text-white {
             -webkit-text-stroke: 2px rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
};
