import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const FloatingTechBadges: React.FC = () => {
  const { accentHex, isDark, playClickSound } = useTheme();

  const badges = [
    { label: '⚛️ React 18', x: -16, y: -24, delay: 0 },
    { label: '🟢 Node & Express', x: 230, y: -18, delay: 0.2 },
    { label: '🍃 MongoDB MERN', x: 250, y: 160, delay: 0.4 },
    { label: '✨ UX Psychology', x: -20, y: 180, delay: 0.6 },
  ];

  return (
    <div className="hidden xl:block absolute inset-0 pointer-events-none z-20">
      {badges.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 + b.delay },
            scale: { duration: 0.6, delay: 0.5 + b.delay },
            y: {
              repeat: Infinity,
              duration: 4.5 + i * 0.7,
              ease: 'easeInOut',
            },
          }}
          whileHover={{ scale: 1.1, cursor: 'pointer' }}
          onClick={playClickSound}
          className={`pointer-events-auto absolute px-3 py-1.5 rounded-full text-[11px] font-mono-code font-semibold shadow-lg backdrop-blur-md border transition-all ${
            isDark
              ? 'bg-midnight-900/90 text-slate-200 border-white/10 hover:border-white/30'
              : 'bg-white/95 text-slate-800 border-black/10 hover:border-black/20 shadow-black/5'
          }`}
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
          }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
            <span>{b.label}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};
