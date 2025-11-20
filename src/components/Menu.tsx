
import React, { useState, useEffect, useRef } from 'react';
import {  Menu as MenuIcon, X } from 'lucide-react';
import { ThemeSwitch } from './ThemeSwitch';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Logo from "../assets/logotip.png"

gsap.registerPlugin(ScrollTrigger);

const FlipLink: React.FC<{ href: string; children: React.ReactNode; onClick: (e: React.MouseEvent) => void }> = ({ href, children, onClick }) => {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        initial="initial"
        whileHover="hovered"
        className="relative block overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-widest group p-2"
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <span className="text-black dark:text-neutral-300">{children}</span>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <span className="text-brand-600 dark:text-brand-400 drop-shadow-md">{children}</span>
        </motion.div>
      </motion.a>
    );
};

export const Menu: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const shutterRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Navbar Entrance & Scroll Effects
  useEffect(() => {
    const nav = navRef.current;
    const bg = bgRef.current;
    
    // Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(nav, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
    );

    if (nav && bg) {
        // Initial state
        gsap.set(bg, { opacity: 0 });
        
        // Scroll Trigger for Glass Effect & Hiding
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                // 1. Show/Hide Nav on Scroll (Desktop only behavior for hiding)
                if (window.innerWidth >= 1024) {
                    if (self.direction === -1 || self.progress === 0) {
                        gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power2.out" });
                    } else if (self.direction === 1 && self.progress > 0.05) {
                        gsap.to(nav, { yPercent: -100, duration: 0.4, ease: "power2.out" });
                    }
                }

                // 2. Background Opacity Logic
                if (self.scroll() > 50) {
                     gsap.to(bg, { opacity: 1, duration: 0.3 });
                     nav.classList.add('shadow-sm');
                } else {
                     gsap.to(bg, { opacity: 0, duration: 0.3 });
                     nav.classList.remove('shadow-sm');
                }
            }
        });
    }
  }, []);

  // GSAP Shutter Animation & Link Reveal
  useEffect(() => {
    const shutters = shutterRef.current?.children;
    const links = linksContainerRef.current?.children;

    if (isOpen) {
        document.body.style.overflow = 'hidden';
        
        const tl = gsap.timeline();
        
        // 1. Shutters slide down (staggered)
        if (shutters) {
            tl.to(shutters, {
                height: '100%',
                duration: 0.6,
                stagger: 0.04,
                ease: 'power4.inOut'
            });
        }

        // 2. Links reveal (slide up + fade)
        if (links) {
            tl.fromTo(links, 
                { y: 80, opacity: 0, skewY: 5 },
                { y: 0, opacity: 1, skewY: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)' },
                "-=0.2"
            );
        }

    } else {
        document.body.style.overflow = '';
        
        const tl = gsap.timeline();
        
        // 1. Links hide quickly
        if (links) {
            tl.to(links, {
                y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' 
            });
        }

        // 2. Shutters slide up to reveal site
        if (shutters) {
            tl.to(shutters, {
                height: '0%',
                duration: 0.6,
                stagger: 0.04,
                ease: 'power4.inOut'
            }, "-=0.1");
        }
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      if (isOpen) setIsOpen(false);

      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
          const delay = isOpen ? 1000 : 0;
          setTimeout(() => {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, delay);
      }
  };

  const links = [
    { name: 'Home', href: '#home', label: 'Startseite' },
    { name: 'Services', href: '#services', label: 'Dienstleistungen' },
    { name: 'FAQ', href: '#faq', label: 'Fragen & Antworten' },
    { name: 'Über Uns', href: '#about', label: 'Unsere Firma' },
    { name: 'Kontakt', href: '#contact', label: 'Anfrage' },
  ];

  return (
    <>
        {/* Fixed Navigation Bar */}
        <nav 
            ref={navRef}
            className="fixed top-0 left-0 w-full z-90 transition-transform duration-300 font-['Host_Grotesk']"
        >
            {/* Animated Glass Background */}
            <div 
                ref={bgRef}
                className="absolute inset-0 bg-white/95 dark:bg-[#050505]/90 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 transition-colors duration-500"
            ></div>

            <div className="relative px-6 py-4 md:px-12 md:py-5 flex justify-between items-center">
                
                {/* Logo */}
                <a 
                    ref={logoRef}
                    href="#home" 
                    onClick={(e) => handleLinkClick(e, '#home')} 
                    className="flex items-center gap-3 cursor-pointer z-50 group"
                >
                   <div className="relative w-13 h-12"> 
  {/* Белый круг */}
  <div className="absolute inset-0 bg-white rounded-full z-0"></div>

  {/* Логотип */}
  <img
    src={Logo}
    alt="Logo"
    width={50}
    height={50}
    className="relative z-10 transition-transform duration-500 group-hover:rotate-12"
  />

  {/* Дополнительный эффект (по желанию) */}
  <div className="absolute inset-0 bg-brand-500/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>
                    <div className="flex flex-col">
                        {/* Ensuring Text is BLACK in light mode for high visibility */}
                        <span className="text-xl font-bold tracking-tighter leading-none text-black dark:text-white transition-colors">A.S.S</span>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-brand-600 dark:text-brand-500 leading-none mt-1 transition-colors">SECURITY</span>
                    </div>
                </a>

                {/* Desktop Links (Hidden on Mobile) */}
                <div ref={menuItemsRef} className="hidden lg:flex items-center gap-8 z-50">
                    {links.map((link) => (
                        <FlipLink 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleLinkClick(e, link.href)}
                        >
                            {link.name}
                        </FlipLink>
                    ))}
                    
                    <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-800 mx-2"></div>
                    <ThemeSwitch />
                </div>

                {/* Mobile/Tablet Toggle Button */}
                <div className="flex items-center gap-4 lg:hidden z-50">
                    <div className="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full p-0.5 border border-neutral-200 dark:border-neutral-800">
                       <ThemeSwitch />
                    </div>
                    
                    <button 
                        onClick={toggleMenu}
                        className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border border-neutral-200 dark:border-neutral-700"
                    >
                        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Fullscreen Shutter Overlay */}
        <div 
            className="fixed inset-0 z-80 pointer-events-none flex"
            ref={shutterRef}
        >
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i} 
                    // Crucial: Added h-0 to prevent Flash of Content before GSAP takes over
                    className="h-0 w-1/5 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-900 relative"
                >
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-24 bg-neutral-300 dark:bg-brand-900/30"></div>
                </div>
            ))}
        </div>

        {/* Menu Content Layer */}
        <div className={`fixed inset-0 z-85 flex flex-col items-center justify-center ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
             {/* Removed opacity-0 from parent to fix visibility bug. Opacity is now handled on children. */}
             <div ref={linksContainerRef} className="flex flex-col items-center gap-6 md:gap-8">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        // Added opacity-0 here so they are hidden until GSAP reveals them
                        className="group relative flex flex-col items-center opacity-0"
                    >
                        <span className="text-4xl md:text-6xl font-bold menu-stroke-text transition-all duration-300 uppercase tracking-tighter font-['Host_Grotesk']">
                            {link.name}
                        </span>
                        <span className="text-xs text-brand-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.5em] absolute -bottom-4">
                            {link.label}
                        </span>
                    </a>
                ))}
            </div>
        </div>
        
        <style>{`
            /* Light Mode: Stroke is dark grey, Hover fills gold */
            .menu-stroke-text {
                -webkit-text-stroke: 1px rgba(23, 23, 23, 0.8); /* neutral-900 */
                color: transparent;
            }
            .menu-stroke-text:hover {
                -webkit-text-stroke: 0px;
                color: #D4AF37;
                transform: scale(1.05);
            }

            /* Dark Mode Override */
            .dark .menu-stroke-text {
                -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
                color: transparent;
            }
            .dark .menu-stroke-text:hover {
                color: #D4AF37;
                -webkit-text-stroke: 0px;
            }
        `}</style>
    </>
  );
};
