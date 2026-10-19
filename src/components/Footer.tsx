import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { accentHex, playClickSound } = useTheme();

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-midnight-950 border-t border-surface-border text-slate-400 text-xs py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-surface-border/60">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg bg-midnight-900 border border-surface-border flex items-center justify-center font-display font-bold text-xs"
              style={{ color: accentHex }}
            >
              SR
            </div>
            <div>
              <span className="font-display font-bold text-sm text-slate-200 block">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-[11px] font-mono-code text-slate-500">
                Full-Stack MERN &bull; Bengaluru, India / Remote
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#ux-lab" className="hover:text-white transition-colors">UX Lab</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Journey</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-midnight-900 border border-surface-border hover:border-white/20 text-slate-300 hover:text-white transition-all flex items-center gap-2 font-mono-code text-[11px]"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" style={{ color: accentHex }} />
          </button>
        </div>

        {/* Bottom Credits & Spec */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono-code">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-slate-500" />
              <span>React 18 &bull; TypeScript &bull; Tailwind CSS &bull; Framer Motion</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
