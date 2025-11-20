import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Personenschutz VIP",
    category: "Close Protection",
    // Optimization: Use a slightly smaller quality/width for the default, but we handle sizing in CSS/Srcset ideally.
    // Here we assume the browser handles standard responsive images or we provide a lighter URL.
    image:
      "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=60&w=1200&auto=format&fit=crop",
    desc: "Diskretion und Sicherheit für hochrangige Persönlichkeiten.",
  },
  {
    id: 2,
    title: "Objektschutz Industrie",
    category: "Site Security",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=60&w=1200&auto=format&fit=crop",
    desc: "24/7 Überwachung von Industrieanlagen mit Drohnentechnologie.",
  },
  {
    id: 3,
    title: "Alarmverfolgung",
    category: "Intervention",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=60&w=1200&auto=format&fit=crop",
    desc: "Schnelle Reaktionszeiten bei Alarmauslösung durch mobile Einheiten.",
  },
  {
    id: 4,
    title: "Operationszentrale",
    category: "Monitoring",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=60&w=1200&auto=format&fit=crop",
    desc: "High-Tech Leitstelle für Echtzeit-Reaktion.",
  },
];

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enable for ALL screens (Mobile included)
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=3000", // Relative end value is safer
            scrub: 0.5, // Reduced scrub time for less lag perception
            pin: true,
            anticipatePin: 1, // Helps with jitter
            invalidateOnRefresh: true, // Handles resize better
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      className="bg-neutral-900 text-white relative z-20 overflow-hidden"
    >
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen w-[400vw] flex flex-row relative will-change-transform"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-screen h-full relative flex items-center justify-center p-4 md:p-10 lg:p-20 transform-gpu"
            >
              {/* Background Image - Optimized: Removed parallax scale/filters on mobile to save GPU */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-40 grayscale md:hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50"></div>
              </div>

              {/* Content Card - Optimized: Removed backdrop-blur on mobile */}
              <div className="relative z-10 w-full max-w-[90vw] md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-6 md:p-10 bg-black/80 md:bg-black/60 md:backdrop-blur-md border border-brand-500/30 rounded-2xl shadow-2xl transform md:hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-brand-500 text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded">
                      {project.category}
                    </span>
                    <span className="text-neutral-400 text-xs font-mono">
                      0{index + 1} / 04
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-['Host_Grotesk'] leading-tight wrap-break-word hyphens-auto">
                    {project.title}
                  </h3>
                  <p className="text-neutral-300 text-base md:text-lg mb-8 border-l-2 border-brand-500 pl-4">
                    {project.desc}
                  </p>
                  <button className="group flex items-center gap-2 text-brand-500 font-bold uppercase tracking-widest text-xs md:text-sm cursor-pointer">
                    Details ansehen
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                </div>
              </div>

              {/* Large Watermark - Hidden on Mobile to save paint */}
              <div className="hidden md:block absolute bottom-0 right-0 p-4 md:p-10 opacity-10 pointer-events-none">
                <span className="text-[6rem] md:text-[15rem] lg:text-[20rem] font-bold text-transparent stroke-text-white leading-none">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .will-change-transform { will-change: transform; }
        .stroke-text-white {
             -webkit-text-stroke: 2px rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
};
