import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TITLES = [
  'Full-Stack MERN Developer',
  'UI/UX Design Craftsman',
  'Bespoke Web Application Architect',
  'AI & RAG Integration Specialist',
  'Frontend Performance Engineer',
];

export const HeroDynamicScramble: React.FC = () => {
  const { accentHex } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TITLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 font-mono-code text-xs sm:text-sm">
      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentHex }} />
      <span className="text-slate-400">Specializing in:</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={TITLES[index]}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="font-bold tracking-tight inline-block"
          style={{ color: accentHex }}
        >
          {TITLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
