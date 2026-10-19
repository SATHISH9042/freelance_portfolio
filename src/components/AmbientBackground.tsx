import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const AmbientBackground: React.FC = () => {
  const { activeTheme, isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 40), 38);
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.4 + 0.8,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * (isDark ? 0.08 : 0.05);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = activeTheme.accent;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw particle dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme.accent;
        ctx.globalAlpha = isDark ? p.alpha : p.alpha * 0.6;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTheme, isDark]);

  const orbOpacity1 = isDark ? [0.18, 0.28, 0.18] : [0.05, 0.1, 0.05];
  const orbOpacity2 = isDark ? [0.12, 0.22, 0.12] : [0.04, 0.08, 0.04];
  const orbOpacity3 = isDark ? [0.1, 0.18, 0.1] : [0.03, 0.07, 0.03];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-700">
      {/* Dynamic Theme Radial Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: orbOpacity1,
          x: [0, 20, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: activeTheme.accent }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: orbOpacity2,
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: activeTheme.secondary }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: orbOpacity3,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: activeTheme.accent }}
      />

      {/* Floating Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none ${
          isDark ? 'opacity-60' : 'opacity-40'
        }`}
      />
    </div>
  );
};
