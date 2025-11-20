import React from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
const FloatingInput = ({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
  placeholder: string;
}) => {
  return (
    <div className="relative group z-0 w-full mb-6">
      <input
        type={type}
        name="floating_input"
        className="block py-3 px-0 w-full text-base text-neutral-900 dark:text-white bg-transparent border-0 border-b-2 border-neutral-300 dark:border-neutral-700 appearance-none dark:focus:border-brand-500 focus:border-brand-500 focus:outline-none focus:ring-0 peer transition-colors"
        placeholder=" "
      />
      <label className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-brand-600 dark:peer-focus:text-brand-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 tracking-widest uppercase">
        {label}
      </label>
    </div>
  );
};
export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-neutral-50 dark:bg-[#080808] font-['Host_Grotesk'] transition-colors duration-500 overflow-hidden"
    >
      {/* Noise Texture Background - Hidden on mobile to save GPU */}
      <div className="hidden md:block absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      {/* Gradient Orbs - Optimized for Mobile (smaller blur, fewer layers) */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-500/5 rounded-full blur-[60px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-brand-500/10 rounded-full blur-[50px] md:blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Info (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 mb-4 border border-brand-500/30 rounded-full w-fit">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-500 tracking-[0.2em] uppercase">
                Get In Touch
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight leading-none">
              Kontakt <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-brand-600">
                Aufnehmen
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed font-light">
              Sicherheit ist Vertrauenssache. Wir erstellen Ihnen ein
              individuelles Sicherheitskonzept, das exakt auf Ihre Bedürfnisse
              zugeschnitten ist.
            </p>

            <div className="space-y-10">
              {[
                {
                  icon: Phone,
                  label: "24/7 Hotline",
                  value: "+49 (0) 351 123 456 78",
                },
                { icon: Mail, label: "Email", value: "info@ass-security.de" },
                {
                  icon: MapPin,
                  label: "Hauptquartier",
                  value: "Musterstraße 1, 01067 Dresden",
                },
              ].map((Item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 group cursor-default"
                >
                  <div className="w-12 h-12 border border-neutral-200 dark:border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 group-hover:text-brand-500 group-hover:border-brand-500 transition-all duration-300 bg-white dark:bg-neutral-900">
                    <Item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1 group-hover:text-brand-500 transition-colors">
                      {Item.label}
                    </h4>
                    <p className="text-lg font-medium text-neutral-900 dark:text-white">
                      {Item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chic Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0f0f0f] p-8 md:p-12 rounded-4xl border border-neutral-100 dark:border-white/5 shadow-2xl dark:shadow-[0_0_50px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Hover Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] group-hover:bg-brand-500/10 transition-colors duration-700 hidden md:block"></div>

              <form className="relative z-10 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <FloatingInput label="Name" placeholder="Ihr Name" />
                  <FloatingInput
                    label="Firma"
                    placeholder="Firmenname (Optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
                  <FloatingInput
                    label="Email"
                    type="email"
                    placeholder="ihre@email.de"
                  />
                  <FloatingInput
                    label="Telefon"
                    type="tel"
                    placeholder="Rückrufnummer"
                  />
                </div>

                <div className="relative group z-0 w-full mb-6 mt-8">
                  <textarea
                    name="message"
                    rows={4}
                    className="block py-3 px-0 w-full text-base text-neutral-900 dark:text-white bg-transparent border-0 border-b-2 border-neutral-300 dark:border-neutral-700 appearance-none dark:focus:border-brand-500 focus:border-brand-500 focus:outline-none focus:ring-0 peer transition-colors resize-none"
                    placeholder=" "
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-brand-600 dark:peer-focus:text-brand-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 tracking-widest uppercase">
                    Nachricht
                  </label>
                </div>

                <div className="flex justify-end mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-4 bg-neutral-900 dark:bg-brand-500 text-white dark:text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-800 dark:hover:bg-brand-400 transition-colors shadow-lg flex items-center gap-4 cursor-pointer"
                  >
                    <span>Absenden</span>
                    <Send size={16} />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
