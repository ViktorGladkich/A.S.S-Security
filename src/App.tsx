
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalStyles } from './components/GlobalStyles';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Timeline } from './components/Timeline';
import { StatsChart } from './components/StatsChart';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Menu } from './components/Menu';
import { Gallery } from './components/Gallery';
import { Team } from './components/Team';
import { About } from './components/About';
import { CookieConsent } from './components/CookieConsent';
import { ShieldCheck, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen text-neutral-900 dark:text-white transition-colors duration-500 selection:bg-brand-500 selection:text-black overflow-x-hidden">
      <GlobalStyles />
      
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="overflow-x-hidden"
        >
          <Menu />
          <Hero />
          <Gallery />
          <Services />
          
          {/* Reordered Sections */}
          <About />
          <Timeline />
          <Team />
          
          <StatsChart />
          <FAQ />
          <ContactSection />
          
          {/* Footer */}
          <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 py-12 px-6 font-['Host_Grotesk']">
             <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-brand-500 rounded flex items-center justify-center text-black">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-none">A.S.S</span>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-brand-600 dark:text-brand-500 leading-none mt-1">SECURITY</span>
                    </div>
                </div>
                
                <div className="flex gap-6 text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider">
                    <a href="#" className="hover:text-brand-500 transition-colors">Impressum</a>
                    <a href="#" className="hover:text-brand-500 transition-colors">Datenschutz</a>
                    <a href="#" className="hover:text-brand-500 transition-colors">AGB</a>
                </div>

                <div className="flex gap-4">
                    {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-brand-500 hover:text-black dark:hover:bg-brand-500 dark:hover:text-black transition-all">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
             </div>
             <div className="text-center mt-12 text-neutral-400 dark:text-neutral-600 text-xs">
                &copy; {new Date().getFullYear()} A.S.S Security GmbH. All Rights Reserved.
             </div>
          </footer>
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
          
        </motion.main>
      )}
    </div>
  );
}
