import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { useTheme, THEMES, ThemePreset } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThemeSwitcher } from './ThemeSwitcher';

const NAV_LINKS = [
  { name: 'Projects', href: '#projects' },
  { name: 'UX Lab', href: '#ux-lab' },
  { name: 'Tech Stack', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { accentHex, activeTheme, setTheme, playClickSound } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const themeKeys = Object.keys(THEMES) as ThemePreset[];

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
            ? 'py-3.5 bg-midnight-950/85 backdrop-blur-xl border-b border-surface-border shadow-2xl shadow-black/50'
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
              aria-label="Sathish Rao Portfolio Homepage"
            >
              <div
                className="w-9 h-9 rounded-lg bg-midnight-900 border border-surface-border flex items-center justify-center font-display font-bold text-sm tracking-wider group-hover:border-white/30 transition-colors shadow-sm"
                style={{ color: accentHex }}
              >
                SR
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
                  {PORTFOLIO_DATA.personal.name}
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                </span>
                <span className="text-[11px] font-mono-code text-slate-400">Full-Stack &amp; UX</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-midnight-900/70 p-1.5 rounded-full border border-surface-border backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-midnight-950 font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full shadow-sm"
                        style={{ backgroundColor: accentHex }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Theme Switcher, Availability Pill, CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Enhanced Curated Theme Switcher */}
              <ThemeSwitcher />

              {/* Availability Indicator (Subtle & Accurate) */}
              {PORTFOLIO_DATA.personal.isAvailable && (
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900/70 border border-surface-border text-[11px] font-mono-code text-slate-300">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: accentHex }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: accentHex }}
                    />
                  </span>
                  <span>Freelance Open</span>
                </div>
              )}

              {/* Contact Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleLinkClick('#contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm group cursor-pointer"
                style={{
                  backgroundColor: accentHex,
                  color: '#06080C',
                }}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-lg bg-midnight-900 border border-surface-border text-slate-300 hover:text-white"
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
            className="fixed inset-x-0 top-[65px] z-40 bg-midnight-950/98 backdrop-blur-2xl border-b border-surface-border p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-base font-medium text-slate-200 hover:bg-white/5 transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-surface-border flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono-code text-slate-400">Select Theme Aesthetic:</span>
                  <div className="grid grid-cols-5 gap-2">
                    {themeKeys.map((key) => {
                      const t = THEMES[key];
                      const isSelected = activeTheme.id === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className={`p-2 rounded-xl flex flex-col items-center gap-1 border text-center transition-all ${
                            isSelected ? 'bg-white/10 border-white' : 'border-surface-border'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: t.accent }}
                          />
                          <span className="text-[9px] font-mono-code text-slate-300 truncate w-full">
                            {t.name.split(' ')[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2"
                  style={{
                    backgroundColor: accentHex,
                    color: '#06080C',
                  }}
                >
                  <span>Let's Build Something</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
