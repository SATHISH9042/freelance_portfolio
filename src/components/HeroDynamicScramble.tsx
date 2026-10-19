import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TITLES = [
  'Full Stack Developer (Python & Django)',
  'AI & MCP Workflow Specialist',
  'RAG & LLM Application Engineer',
  'UI/UX & Interaction Designer',
  'Relational Database & SQL Developer',
];

export const HeroDynamicScramble: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TITLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 font-mono-code text-xs sm:text-sm">
      <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
      <span className="text-neutral-500">Specializing in:</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={TITLES[index]}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="font-bold tracking-tight inline-block text-black"
        >
          {TITLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
