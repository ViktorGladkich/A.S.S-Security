
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitch: React.FC = () => {
  // Initialize state lazily to avoid layout thrashing
  const [isDark, setIsDark] = useState(() => {
      if (typeof document !== 'undefined') {
          return document.documentElement.classList.contains('dark');
      }
      return true;
  });

  // Observe class changes in case something else modifies it
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                 setIsDark(document.documentElement.classList.contains('dark'));
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative flex items-center cursor-pointer justify-center w-10 h-10 rounded-full border border-neutral-700 dark:border-neutral-700 hover:border-brand-500 transition-colors bg-neutral-100 dark:bg-neutral-900"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {isDark ? (
            <Moon size={18} className="text-brand-500 fill-brand-500" />
        ) : (
            <Sun size={18} className="text-amber-600 fill-amber-600" />
        )}
      </motion.div>
    </button>
  );
};
