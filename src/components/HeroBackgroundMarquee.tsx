import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const HeroBackgroundMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Slow traction movement left and right driven by scroll
  const x1 = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(smoothProgress, [0, 1], ['-30%', '0%']);
  const x3 = useTransform(smoothProgress, [0, 1], ['-5%', '-35%']);
  const x4 = useTransform(smoothProgress, [0, 1], ['-35%', '-5%']);
  const x5 = useTransform(smoothProgress, [0, 1], ['0%', '-25%']);

  const namesRow = [
    'SATHISH RAO S',
    'SATHISH RAO S',
    'SATHISH RAO S',
    'SATHISH RAO S',
    'SATHISH RAO S',
    'SATHISH RAO S',
  ];

  const roleRowA = [
    'SATHISH RAO S',
    'FULL STACK DEVELOPER',
    'SATHISH RAO S',
    'PYTHON & DJANGO',
    'SATHISH RAO S',
    'AI & MCP ARCHITECT',
  ];

  const roleRowB = [
    'UI/UX CRAFTSMAN',
    'SATHISH RAO S',
    'REST APIS & SQL',
    'SATHISH RAO S',
    'RAG & LLM WORKFLOWS',
    'SATHISH RAO S',
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex flex-col justify-around py-4 opacity-95"
    >
      {/* Row 1: Massive Bold Names (Moves Left with Scroll + Continuous Drift) */}
      <motion.div style={{ x: x1 }} className="will-change-transform">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap"
        >
          {[...namesRow, ...namesRow, ...namesRow, ...namesRow].map((name, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12">
              <span className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[140px] tracking-tighter uppercase stroke-text">
                {name}
              </span>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/20 shrink-0" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Row 2: Roles & Name (Moves Right with Scroll + Continuous Drift Right) */}
      <motion.div style={{ x: x2 }} className="will-change-transform">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap"
        >
          {[...roleRowA, ...roleRowA, ...roleRowA, ...roleRowA].map((text, i) => {
            const isName = text === 'SATHISH RAO';
            return (
              <div key={i} className="flex items-center gap-8 sm:gap-12">
                <span
                  className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[140px] tracking-tighter uppercase ${
                    isName ? 'text-black/[0.08] font-black' : 'stroke-text'
                  }`}
                >
                  {text}
                </span>
                <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/20 shrink-0" />
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Row 3: Bold Names Repeating (Moves Left with Scroll + Continuous Drift Left) */}
      <motion.div style={{ x: x3 }} className="will-change-transform">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap"
        >
          {[...namesRow, ...namesRow, ...namesRow, ...namesRow].map((name, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12">
              <span className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[140px] tracking-tighter uppercase text-black/[0.07]">
                {name}
              </span>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/20 shrink-0" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Row 4: Tech & Craftsmanship (Moves Right with Scroll + Continuous Drift Right) */}
      <motion.div style={{ x: x4 }} className="hidden md:block will-change-transform">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap"
        >
          {[...roleRowB, ...roleRowB, ...roleRowB, ...roleRowB].map((text, i) => {
            const isName = text === 'SATHISH RAO';
            return (
              <div key={i} className="flex items-center gap-8 sm:gap-12">
                <span
                  className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[140px] tracking-tighter uppercase ${
                    isName ? 'text-black/[0.08]' : 'stroke-text'
                  }`}
                >
                  {text}
                </span>
                <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/20 shrink-0" />
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Row 5: Bold Name Baseline (Moves Left with Scroll + Continuous Drift Left) */}
      <motion.div style={{ x: x5 }} className="hidden lg:block will-change-transform">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap"
        >
          {[...namesRow, ...namesRow, ...namesRow, ...namesRow].map((name, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12">
              <span className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[140px] tracking-tighter uppercase stroke-text">
                {name}
              </span>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/20 shrink-0" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
