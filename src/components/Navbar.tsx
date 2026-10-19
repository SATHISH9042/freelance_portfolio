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
  const { accentHex, activeTheme, setTheme, isDark, playClickSound } = useTheme();
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
            ? isDark
              ? 'py-3.5 bg-midnight-950/85 backdrop-blur-xl border-b border-surface-border shadow-2xl shadow-black/50'
              : 'py-3.5 bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-lg shadow-slate-200/40'
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
                className={`w-9 h-9 rounded-lg border flex items-center justify-center font-display font-bold text-sm tracking-wider transition-colors shadow-sm ${
                  isDark ? 'bg-midnight-900 border-surface-border group-hover:border-white/30' : 'bg-white border-black/10 group-hover:border-black/30'
                }`}
                style={{ color: accentHex }}
              >
                SR
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
                  {PORTFOLIO_DATA.personal.name}
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                </span>
                <span className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400">Full-Stack &amp; UX</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md ${
              isDark ? 'bg-midnight-900/70 border-surface-border' : 'bg-slate-100/80 border-black/10'
            }`}>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? isDark ? 'text-midnight-950 font-bold' : 'text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
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
              {/* Enhanced Curated Theme Switcher with Sun/Moon fast switch */}
              <ThemeSwitcher />

              {/* Availability Indicator (Subtle & Accurate) */}
              {PORTFOLIO_DATA.personal.isAvailable && (
                <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono-code ${
                  isDark ? 'bg-midnight-900/70 border-surface-border text-slate-300' : 'bg-white border-black/10 text-slate-700'
                }`}>
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
                  color: isDark ? '#06080C' : '#FFFFFF',
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
                className={`md:hidden p-2 rounded-lg border text-slate-700 dark:text-slate-300 ${
                  isDark ? 'bg-midnight-900 border-surface-border hover:text-white' : 'bg-white border-black/10 hover:text-black'
                }`}
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
            className={`fixed inset-x-0 top-[65px] z-40 backdrop-blur-2xl border-b p-6 md:hidden shadow-2xl ${
              isDark ? 'bg-midnight-950/98 border-surface-border' : 'bg-white/98 border-black/10 shadow-slate-300'
            }`}
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-surface-border flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400">Select Theme Aesthetic:</span>
                  <div className="grid grid-cols-5 gap-2">
                    {themeKeys.map((key) => {
                      const t = THEMES[key];
                      const isSelected = activeTheme.id === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className={`p-2 rounded-xl flex flex-col items-center gap-1 border text-center transition-all cursor-pointer ${
                            isSelected
                              ? isDark ? 'bg-white/10 border-white' : 'bg-slate-200 border-black/20'
                              : isDark ? 'border-surface-border' : 'border-black/10 bg-slate-50'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: t.accent }}
                          />
                          <span className="text-[9px] font-mono-code text-slate-700 dark:text-slate-300 truncate w-full">
                            {t.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  style={{
                    backgroundColor: accentHex,
                    color: isDark ? '#06080C' : '#FFFFFF',
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
