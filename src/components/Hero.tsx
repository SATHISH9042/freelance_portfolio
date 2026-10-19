import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, CheckCircle2, ArrowUpRight, Code2, Layers, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroBackgroundMarquee } from './HeroBackgroundMarquee';
import { HeroDynamicScramble } from './HeroDynamicScramble';

export const Hero: React.FC = () => {
  const { playClickSound } = useTheme();

  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineWords = [
    { text: 'I', highlight: false },
    { text: 'build', highlight: false },
    { text: 'digital', highlight: false },
    { text: 'experiences', highlight: false },
    { text: 'that', highlight: false },
    { text: 'feel', highlight: true },
    { text: 'effortless.', highlight: true },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:py-32 flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* 1. Multi-Row Massive Bold Running Name Background Marquee with Scroll Traction */}
      <HeroBackgroundMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top Status & Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono-code"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-black text-sm tracking-tight">{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-black/30">/</span>
            <HeroDynamicScramble />
          </div>

          {PORTFOLIO_DATA.personal.isAvailable && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-sm text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-neutral-800 font-medium">Available for Freelance &amp; Full-Time</span>
            </motion.div>
          )}
        </motion.div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Staggered Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Staggered Word Reveal */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] font-extrabold tracking-tight text-black mb-6">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.07,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`inline-block mr-2 sm:mr-3.5 ${
                    word.highlight ? 'relative' : ''
                  }`}
                >
                  {word.highlight ? (
                    <span className="relative z-10 text-black">
                      {word.text}
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="absolute bottom-1.5 left-0 h-[6px] -z-0 bg-black/15 rounded-full"
                      />
                    </span>
                  ) : (
                    word.text
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-lg sm:text-xl text-neutral-600 max-w-2xl font-light leading-relaxed mb-8"
            >
              {PORTFOLIO_DATA.personal.shortBio}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-full font-bold text-sm tracking-wide bg-black text-white hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 flex items-center gap-2 group cursor-pointer"
              >
                <span>Let’s Build Something</span>
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 rounded-full font-semibold text-sm text-black bg-white hover:bg-neutral-50 border border-black/15 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-neutral-500 group-hover:translate-y-0.5" />
              </motion.button>
            </motion.div>

            {/* Micro stats / Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-black/10 text-xs text-neutral-600"
            >
              <div>
                <div className="font-mono-code font-bold text-base sm:text-lg text-black">Full Stack</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Python • Django • REST APIs • SQL</div>
              </div>
              <div>
                <div className="font-mono-code font-bold text-base sm:text-lg text-black">AI &amp; MCP</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">RAG • ElevenLabs • Twilio • Agents</div>
              </div>
              <div>
                <div className="font-mono-code font-bold text-base sm:text-lg text-black">UI/UX Design</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Figma • Jakob's &amp; Hick's Laws</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: User Portrait Image + Floating Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-white p-3 border border-black/10 shadow-2xl shadow-black/10 group"
            >
              {/* Sathish Rao's Actual Photo */}
              <div className="relative w-full aspect-[4/4.5] rounded-2xl overflow-hidden bg-neutral-100 border border-black/5">
                <img
                  src="/sathish-rao.jpg"
                  alt="Sathish Rao S — Full Stack Developer & AI Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle gradient overlay at bottom for title integration */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {PORTFOLIO_DATA.personal.name}
                      </h3>
                      <p className="text-[11px] font-mono-code text-white/80">
                        {PORTFOLIO_DATA.personal.location}
                      </p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
                  </div>
                </div>
              </div>

              {/* Floating Pill Badges */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-full bg-black text-white text-[11px] font-mono-code font-bold shadow-xl border border-white/20 flex items-center gap-1.5"
              >
                <span>Full-Stack &bull; Python &amp; AI</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-mono-code font-bold shadow-xl border border-black/10 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>PMIST CSE (AI &amp; ML)</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          onClick={() => scrollToSection('projects')}
        >
          <span className="text-[11px] font-mono-code uppercase tracking-widest">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-black" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
