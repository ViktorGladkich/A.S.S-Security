
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  { 
    question: "Bieten Sie Sicherheitsdienste rund um die Uhr an?", 
    answer: "Ja, unsere Operationszentrale und unsere Einsatzteams sind 24/7, 365 Tage im Jahr für Sie erreichbar und einsatzbereit. Ob Nachtschichten, Feiertage oder spontane Einsätze – wir sind da." 
  },
  { 
    question: "In welchen Gebieten ist A.S.S Security tätig?", 
    answer: "Unser Hauptsitz ist in Dresden. Wir decken den gesamten sächsischen Raum ab, einschließlich Leipzig und Chemnitz. Für Großprojekte sind wir auch bundesweit im Einsatz." 
  },
  { 
    question: "Sind Ihre Mitarbeiter zertifiziert?", 
    answer: "Absolut. Alle unsere Sicherheitsmitarbeiter verfügen mindestens über die Unterrichtung nach §34a GewO. Unsere Führungskräfte und spezialisierten Teams besitzen weiterführende Qualifikationen wie die Sachkundeprüfung, Waffensachkunde oder Meistertitel für Schutz und Sicherheit." 
  },
  { 
    question: "Wie schnell können Sie auf Anfragen reagieren?", 
    answer: "Für Notfälle garantieren wir eine Reaktionszeit von unter 60 Minuten in unserem Kerngebiet. Reguläre Angebote erstellen wir in der Regel innerhalb von 24 Stunden nach der ersten Bedarfsanalyse." 
  },
  { 
    question: "Bieten Sie auch technische Überwachung an?", 
    answer: "Ja, wir setzen auf einen hybriden Ansatz. Neben physischer Präsenz bieten wir modernste Videoüberwachung, Drohnen-Patrouillen und Einbruchmeldeanlagen, die direkt auf unsere Leitstelle aufgeschaltet sind." 
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-100 dark:bg-neutral-950 font-['Host_Grotesk'] transition-colors duration-500 relative overflow-hidden">
      {/* Background Decoration - Hidden on Mobile */}
      <div className="hidden md:block absolute right-0 top-0 opacity-5 pointer-events-none">
        <HelpCircle size={400} className="text-brand-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">HÄUFIGE <span className="text-brand-600 dark:text-brand-500">FRAGEN</span></h2>
            <p className="text-neutral-600 dark:text-neutral-400">Wichtige Informationen zu unseren Dienstleistungen auf einen Blick.</p>
            <div className="w-16 h-1 bg-brand-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div 
                key={idx} 
                className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left focus:outline-none touch-manipulation"
              >
                <span className={`text-base md:text-xl font-bold transition-colors duration-300 ${activeIndex === idx ? 'text-brand-600 dark:text-brand-400' : 'text-neutral-800 dark:text-neutral-200'}`}>
                    {item.question}
                </span>
                <span className={`ml-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 transition-all duration-300 shrink-0 ${activeIndex === idx ? 'rotate-180 bg-brand-100 dark:bg-brand-900/30 text-brand-600' : 'text-neutral-500'}`}>
                    {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Faster transition for mobile
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 md:px-8 md:pb-8 md:pt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
