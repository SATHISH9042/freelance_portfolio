import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';
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
  const { accent, setAccent, accentHex, soundEnabled, setSoundEnabled, playClickSound, playPopSound } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
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

  const toggleAccent = () => {
    playPopSound();
    setAccent(accent === 'lime' ? 'cobalt' : 'lime');
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playPopSound(), 50);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-midnight-950/80 backdrop-blur-xl border-b border-surface-border shadow-2xl shadow-black/40'
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
                className="w-9 h-9 rounded-lg bg-midnight-900 border border-surface-border flex items-center justify-center font-display font-bold text-sm tracking-wider group-hover:border-white/30 transition-colors"
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
            <nav className="hidden md:flex items-center gap-1 bg-midnight-900/60 p-1.5 rounded-full border border-surface-border backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive ? 'text-midnight-950 font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: accentHex }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Accent Color, Sound, CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Accent Color Switcher */}
              <button
                onClick={toggleAccent}
                className="p-2 rounded-full bg-midnight-900/80 border border-surface-border hover:border-white/25 transition-all text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono-code"
                title={`Switch accent color (Current: ${accent})`}
                aria-label={`Toggle accent color, current is ${accent}`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 transition-transform active:scale-90"
                  style={{ backgroundColor: accentHex }}
                />
                <span className="hidden xl:inline capitalize text-[11px] text-slate-400">{accent}</span>
              </button>

              {/* Sound FX Toggle */}
              <button
                onClick={toggleSound}
                className={`p-2 rounded-full border transition-all text-xs ${
                  soundEnabled
                    ? 'border-white/30 text-slate-100 bg-midnight-800'
                    : 'border-surface-border text-slate-400 hover:text-slate-200 bg-midnight-900/80'
                }`}
                title={soundEnabled ? 'Mute micro-haptics' : 'Enable audio feedback'}
                aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" style={{ color: accentHex }} />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Availability Indicator (Subtle & Accurate) */}
              {PORTFOLIO_DATA.personal.isAvailable && (
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900/70 border border-surface-border text-[11px] font-mono-code text-slate-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Freelance Open</span>
                </div>
              )}

              {/* Contact Button */}
              <button
                onClick={() => handleLinkClick('#contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 group"
                style={{
                  backgroundColor: accentHex,
                  color: '#06080C',
                }}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

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
            className="fixed inset-x-0 top-[65px] z-40 bg-midnight-950/95 backdrop-blur-2xl border-b border-surface-border p-6 md:hidden shadow-2xl"
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
                <div className="flex items-center justify-between px-3 py-2 text-xs font-mono-code text-slate-400">
                  <span>Theme Accent</span>
                  <button
                    onClick={toggleAccent}
                    className="flex items-center gap-2 px-2.5 py-1 rounded bg-midnight-800 border border-surface-border text-slate-200"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentHex }} />
                    <span className="capitalize">{accent}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
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
