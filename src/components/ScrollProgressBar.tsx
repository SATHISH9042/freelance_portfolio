import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ScrollProgressBar: React.FC = () => {
  const { accentHex, activeTheme } = useTheme();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[999] pointer-events-none bg-transparent">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${accentHex}, ${activeTheme.secondary})`,
          boxShadow: `0 0 12px ${accentHex}`,
        }}
      />
    </div>
  );
};
