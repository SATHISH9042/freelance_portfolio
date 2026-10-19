import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'FULL-STACK PYTHON & DJANGO APPS',
    'INTUITIVE UX PSYCHOLOGY (HICK & FITTS)',
    'ZERO LAYOUT SHIFT (CLS = 0.00)',
    'SUB-SECOND CORE WEB VITALS',
    'RETRIEVAL-AUGMENTED GENERATION (RAG)',
    'WCAG 2.1 ACCESSIBLE CODE',
    'RESPONSIVE CROSS-DEVICE BREAKPOINTS',
    'DEPENDABLE SPRINT DELIVERY',
  ];

  return (
    <div className="py-5 border-y border-black/10 bg-white overflow-hidden relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 30,
        }}
        className="flex items-center gap-10 whitespace-nowrap w-max"
      >
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-10 font-mono-code text-xs font-semibold text-neutral-500 tracking-widest">
            <span className="hover:text-black transition-colors">{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
