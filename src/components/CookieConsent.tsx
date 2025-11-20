
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show with a slight delay for aesthetics
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[200] font-['Host_Grotesk']"
        >
          <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-neutral-200 dark:border-brand-500/20 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
            
            {/* Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand-400 to-brand-600"></div>
            <div className="absolute -right-10 -bottom-10 text-neutral-100 dark:text-neutral-900/50 pointer-events-none">
                 <Shield size={120} />
            </div>

            <div className="flex items-start gap-4 relative z-10">
               <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full text-brand-600 dark:text-brand-500 shrink-0">
                  <Cookie size={24} />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Datenschutz & Sicherheit</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                     Wir nutzen Cookies, um Ihre Erfahrung auf unserer High-Tech Sicherheitsplattform zu optimieren. Keine Sorge, Ihre Daten sind bei uns sicher wie in einem Tresor.
                  </p>
                  
                  <div className="flex gap-3">
                      <button 
                        onClick={handleAccept}
                        className="flex-1 cursor-pointer bg-brand-500 hover:bg-brand-400 text-black font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      >
                        Akzeptieren
                      </button>
                      <button 
                        onClick={handleDecline}
                        className="flex-1 cursor-pointer bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-widest transition-colors"
                      >
                        Ablehnen
                      </button>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
