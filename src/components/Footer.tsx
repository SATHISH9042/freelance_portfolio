import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { playClickSound } = useTheme();

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-black/10 text-neutral-600 text-xs py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-display font-bold text-xs shadow-sm">
              SR
            </div>
            <div>
              <span className="font-display font-bold text-sm text-black block">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-[11px] font-mono-code text-neutral-500">
                B.Tech CSE (AI &amp; ML) &bull; {PORTFOLIO_DATA.personal.location}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-600 font-medium">
            <a href="#projects" className="hover:text-black transition-colors">Projects</a>
            <a href="#ux-lab" className="hover:text-black transition-colors">UX Lab</a>
            <a href="#skills" className="hover:text-black transition-colors">Skills</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#experience" className="hover:text-black transition-colors">Journey</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 rounded-full bg-white border border-black/15 hover:border-black text-black transition-all flex items-center gap-1.5 font-mono-code text-[11px] shadow-sm hover:bg-neutral-50"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-black" />
          </button>
        </div>

        {/* Bottom Credits & Spec */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px] font-mono-code">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. Built with architectural precision.</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-black" />
              <span>React 18 &bull; TypeScript &bull; Tailwind CSS &bull; Framer Motion</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
