import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const MarqueeTicker: React.FC = () => {
  const { accentHex } = useTheme();

  const items = [
    'FULL-STACK MERN ARCHITECTURE',
    'INTUITIVE UX PSYCHOLOGY (HICK & FITTS)',
    'ZERO LAYOUT SHIFT (CLS = 0.00)',
    'SUB-SECOND CORE WEB VITALS',
    'RETRIEVAL-AUGMENTED GENERATION (RAG)',
    'WCAG 2.1 ACCESSIBLE CODE',
    'RESPONSIVE CROSS-DEVICE BREAKPOINTS',
    'DEPENDABLE SPRINT DELIVERY',
  ];

  return (
    <div className="py-4 border-y border-surface-border bg-midnight-950/40 backdrop-blur-md overflow-hidden relative select-none">
      {/* Edge gradient masks for smooth fade in/out */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-midnight-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-midnight-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28,
        }}
        className="flex items-center gap-8 whitespace-nowrap w-max"
      >
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 font-mono-code text-xs text-slate-400 tracking-widest">
            <span className="hover:text-slate-200 transition-colors">{text}</span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentHex }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
