import React, { useEffect, useRef, useState } from "react";
import {
  Shield,
  Eye,
  UserCheck,
  Activity,
  Radio,
  ScanLine,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    id: 0,
    title: "Objektschutz",
    icon: <Shield size={64} />,
    desc: "Umfassender Schutz für Immobilien und Firmengebäude rund um die Uhr. Zutrittskontrolle und Streifendienst.",
  },
  {
    id: 1,
    title: "Personenschutz",
    icon: <UserCheck size={64} />,
    desc: "Diskret und professionell. Wir sorgen für Ihre persönliche Sicherheit in jeder Situation.",
  },
  {
    id: 2,
    title: "Event Security",
    icon: <Radio size={64} />,
    desc: "Sicherheit für Veranstaltungen jeder Größe. Einlasskontrolle, Crowd Management und VIP-Betreuung.",
  },
  {
    id: 3,
    title: "High-Tech Monitoring",
    icon: <Eye size={64} />,
    desc: "KI-gestützte Videoüberwachung und Alarmverfolgung mit modernster Drohnentechnologie.",
  },
  {
    id: 4,
    title: "Alarmverfolgung",
    icon: <Activity size={64} />,
    desc: "Sofortige Intervention bei Alarmauslösung durch mobile Einsatzkräfte und direkte Aufschaltung zur Leitstelle.",
  },
];

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if we are on desktop before adding scroll listener to save performance on mobile
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (container) {
            const index = Math.round(container.scrollTop / window.innerHeight);
            setActiveIndex(index);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="services"
      className="relative w-full bg-neutral-50 dark:bg-neutral-950 font-['Titillium_Web'] transition-colors duration-500"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none h-full"></div>

      {/* Active Index Indicator (Desktop Only) */}
      <div className="absolute top-8 right-8 z-30 hidden md:block">
        <span className="text-6xl font-bold text-neutral-200 dark:text-neutral-800 select-none">
          0{activeIndex + 1}
        </span>
      </div>

      {/* Indicators (Desktop Only) */}
      <div className="absolute right-[5%] top-1/2 z-20 hidden md:flex -translate-y-1/2 flex-col items-center gap-4">
        {services.map((_, idx) => (
          <div
            key={idx}
            className="relative flex items-center group cursor-pointer"
            onClick={() => {
              containerRef.current?.scrollTo({
                top: idx * window.innerHeight,
                behavior: "smooth",
              });
            }}
          >
            <span
              className={`text-xs font-bold transition-all duration-500 mr-4 ${
                idx === activeIndex
                  ? "text-brand-500 scale-125"
                  : "text-neutral-400 dark:text-neutral-600 scale-100"
              }`}
            >
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <div
              className={`w-1 rounded-full transition-all duration-500 ${
                idx === activeIndex
                  ? "h-8 bg-brand-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "h-1.5 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-500"
              }`}
            />
          </div>
        ))}
      </div>

      {/* 
          Slider Container 
          Mobile: h-auto (natural height), no snap, overflow-visible
          Desktop: h-screen, snap-y, overflow-y-scroll
      */}
      <div
        ref={containerRef}
        className="w-full relative z-10 flex flex-col md:block md:h-screen md:overflow-y-scroll md:snap-y md:snap-mandatory md:scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {services.map((service, idx) => (
          <div
            key={service.id}
            className="
                w-full flex items-center justify-center p-6 py-16
                md:h-screen md:snap-center md:pt-24
                border-b border-neutral-200 dark:border-neutral-800 md:border-none
            "
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ margin: "-100px", once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200 dark:border-brand-500/20 bg-white dark:bg-neutral-900 backdrop-blur-sm overflow-hidden rounded-2xl shadow-xl"
            >
              {/* Graphic Side */}
              <div className="relative h-56 md:h-auto bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-neutral-200 dark:border-brand-500/10 group">
                <div className="absolute inset-0 bg-linear-to-br from-brand-500/10 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20">
                  <ScanLine
                    size={300}
                    strokeWidth={0.5}
                    className="text-brand-500"
                  />
                </div>

                <div className="relative z-10 p-6 md:p-8 rounded-full border border-brand-500/20 bg-white dark:bg-neutral-950/80 shadow-xl dark:shadow-[0_0_30px_rgba(212,175,55,0.2)] text-brand-600 dark:text-brand-500">
                  {service.icon}
                </div>
              </div>

              {/* Text Side */}
              <div className="p-8 md:p-16 flex flex-col justify-center text-left">
                <span className="text-brand-600 dark:text-brand-500 text-sm font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-8 h-px bg-brand-600 dark:bg-brand-500"></span>
                  SERVICE_0{idx + 1}
                </span>

                <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                  {service.title}
                </h2>

                <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                  {service.desc}
                </p>

                {/* Static text button instead of removal if needed for layout balance, or remove entirely as requested previously */}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};
