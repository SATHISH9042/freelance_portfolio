import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const HeroBackgroundMarquee: React.FC = () => {
  const { accentHex, isDark } = useTheme();

  const row1 = [
    'SATHISH RAO',
    'FULL-STACK DEVELOPER',
    'MERN ARCHITECT',
    'SATHISH RAO',
    'UI/UX CRAFTSMAN',
    'CREATIVE TECHNOLOGIST',
  ];

  const row2 = [
    'REACT & NODE.JS',
    'SATHISH RAO',
    'BESPOKE WEB APPS',
    'INTELLIGENT RAG & AI',
    'SATHISH RAO',
    'DESIGN PSYCHOLOGY',
  ];

  const row3 = [
    'CREATIVE ENGINEERING',
    'ZERO LATENCY',
    'SATHISH RAO',
    'ACCESSIBLE INTERFACES',
    'SATHISH RAO',
    'EFFORTLESS UX',
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex flex-col justify-center gap-6 sm:gap-10 md:gap-12 opacity-80 py-8">
      {/* Row 1: Leftward flow */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 38,
        }}
        className="flex items-center gap-8 whitespace-nowrap w-max will-change-transform"
      >
        {[...row1, ...row1, ...row1].map((text, i) => {
          const isName = text === 'SATHISH RAO';
          return (
            <div key={i} className="flex items-center gap-8">
              <span
                className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[105px] tracking-tighter uppercase transition-colors duration-500 ${
                  isName
                    ? isDark
                      ? 'stroke-text font-black'
                      : 'text-slate-900/[0.07] stroke-text font-black'
                    : 'stroke-text opacity-70'
                }`}
                style={{
                  color: isName ? `${accentHex}18` : 'transparent',
                  WebkitTextStroke: isDark
                    ? `1.5px rgba(255, 255, 255, ${isName ? 0.16 : 0.07})`
                    : `1.5px rgba(15, 23, 42, ${isName ? 0.18 : 0.08})`,
                }}
              >
                {text}
              </span>
              <span
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full opacity-40 shrink-0"
                style={{ backgroundColor: accentHex }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Row 2: Rightward flow (Opposite direction for mesmerizing depth) */}
      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 45,
        }}
        className="flex items-center gap-8 whitespace-nowrap w-max will-change-transform"
      >
        {[...row2, ...row2, ...row2].map((text, i) => {
          const isName = text === 'SATHISH RAO';
          return (
            <div key={i} className="flex items-center gap-8">
              <span
                className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[105px] tracking-tighter uppercase transition-colors duration-500 ${
                  isName
                    ? isDark
                      ? 'stroke-text font-black'
                      : 'text-slate-900/[0.07] stroke-text font-black'
                    : 'stroke-text opacity-70'
                }`}
                style={{
                  color: isName ? `${accentHex}18` : 'transparent',
                  WebkitTextStroke: isDark
                    ? `1.5px rgba(255, 255, 255, ${isName ? 0.16 : 0.07})`
                    : `1.5px rgba(15, 23, 42, ${isName ? 0.18 : 0.08})`,
                }}
              >
                {text}
              </span>
              <span
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full opacity-40 shrink-0"
                style={{ backgroundColor: accentHex }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Row 3: Leftward flow (Third layer for architectural depth) */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 42,
        }}
        className="hidden md:flex items-center gap-8 whitespace-nowrap w-max will-change-transform"
      >
        {[...row3, ...row3, ...row3].map((text, i) => {
          const isName = text === 'SATHISH RAO';
          return (
            <div key={i} className="flex items-center gap-8">
              <span
                className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[105px] tracking-tighter uppercase transition-colors duration-500 stroke-text`}
                style={{
                  color: isName ? `${accentHex}15` : 'transparent',
                  WebkitTextStroke: isDark
                    ? `1.5px rgba(255, 255, 255, ${isName ? 0.14 : 0.06})`
                    : `1.5px rgba(15, 23, 42, ${isName ? 0.16 : 0.07})`,
                }}
              >
                {text}
              </span>
              <span
                className="w-2.5 h-2.5 rounded-full opacity-30 shrink-0"
                style={{ backgroundColor: accentHex }}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
