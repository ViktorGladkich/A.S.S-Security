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
    image:
      "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=2670&auto=format&fit=crop", // Bodyguards / Suits
    desc: "Diskretion und Sicherheit für hochrangige Persönlichkeiten.",
  },
  {
    id: 2,
    title: "Objektschutz Industrie",
    category: "Site Security",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop", // Modern Building
    desc: "24/7 Überwachung von Industrieanlagen mit Drohnentechnologie.",
  },
  {
    id: 3,
    title: "Alarmverfolgung",
    category: "Intervention",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2700&auto=format&fit=crop", // Technology/Response
    desc: "Schnelle Reaktionszeiten bei Alarmauslösung durch mobile Einheiten.",
  },
  {
    id: 4,
    title: "Operationszentrale",
    category: "Monitoring",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // Tech room
    desc: "High-Tech Leitstelle für Echtzeit-Reaktion.",
  },
];
export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Only enable horizontal scroll on large screens (Desktop)
        "(min-width: 1024px)": function () {
          gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
            {
              translateX: "-300vw",
              ease: "none",
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "3000 top",
                scrub: 0.6,
                pin: true,
                anticipatePin: 1,
              },
            }
          );
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="gallery" className="bg-neutral-900 text-white relative z-20">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="
flex flex-col w-full h-auto
lg:h-screen lg:w-[400vw] lg:flex-row lg:relative
"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="
w-full min-h-[70vh] relative flex items-center justify-center p-6 py-20
lg:w-screen lg:h-full lg:p-20
border-b border-neutral-800 lg:border-none
"
            >
              {/* Background Image with parallax feel */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50"></div>
              </div>

              {/* Content Card */}
              <div className="relative z-10 w-full max-w-xl lg:max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-10 bg-black/60 backdrop-blur-md border border-brand-500/30 rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
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
              <div className="hidden lg:block absolute bottom-0 right-0 p-4 md:p-10 opacity-10 pointer-events-none">
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
