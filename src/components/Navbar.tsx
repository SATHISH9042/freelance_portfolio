import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const NAV_LINKS = [
  { name: 'Projects', href: '#projects' },
  { name: 'UX Lab', href: '#ux-lab' },
  { name: 'Tech Stack', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { playClickSound } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['projects', 'ux-lab', 'skills', 'about', 'experience', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-lg shadow-black/[0.03]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                playClickSound();
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="Sathish Rao Portfolio"
            >
              <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-display font-black text-sm tracking-wider shadow-sm transition-transform group-hover:scale-105">
                SR
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-sm text-black tracking-tight flex items-center gap-1.5">
                  {PORTFOLIO_DATA.personal.name}
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                </span>
                <span className="text-[11px] font-mono-code text-neutral-500">Full-Stack &amp; UX</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-black/10 bg-neutral-100/80 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-white' : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-black shadow-sm"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Availability Badge & CTA */}
            <div className="flex items-center gap-3">
              {/* Availability Indicator */}
              {PORTFOLIO_DATA.personal.isAvailable && (
                <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 bg-white text-[11px] font-mono-code text-neutral-800 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  <span>Freelance Open</span>
                </div>
              )}

              {/* Contact Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleLinkClick('#contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide bg-black text-white hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-lg border border-black/10 bg-white text-black"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-white/98 backdrop-blur-2xl border-b border-black/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-left text-base font-semibold text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-black/10">
                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Contact Me</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
