import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useTheme, THEMES, ThemePreset } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { activeTheme, setTheme, soundEnabled, setSoundEnabled, playPopSound } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const themeKeys = Object.keys(THEMES) as ThemePreset[];

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTheme = (preset: ThemePreset) => {
    setTheme(preset);
    setIsOpen(false);
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playPopSound(), 50);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => {
          playPopSound();
          setIsOpen(!isOpen);
        }}
        className="px-3 py-1.5 rounded-full bg-midnight-900/90 border border-surface-border hover:border-white/30 text-xs font-mono-code text-slate-200 transition-all flex items-center gap-2 shadow-sm active:scale-95"
        aria-label="Open Theme & Aesthetics Palette"
        title="Switch theme aesthetics"
      >
        <span
          className="w-3.5 h-3.5 rounded-full shadow-sm transition-transform group-hover:scale-110"
          style={{
            backgroundColor: activeTheme.accent,
            boxShadow: `0 0 10px ${activeTheme.accent}`,
          }}
        />
        <span className="hidden sm:inline text-[11px] font-medium">{activeTheme.name}</span>
        <Palette className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Floating Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-72 rounded-2xl bg-midnight-950/95 border border-surface-border shadow-2xl backdrop-blur-2xl p-3 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-surface-border/80 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-display font-bold text-white">
                <Sparkles className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                <span>Theme Aesthetics</span>
              </div>
              <span className="text-[10px] font-mono-code text-slate-500">5 Curated Presets</span>
            </div>

            {/* Theme Presets List */}
            <div className="space-y-1">
              {themeKeys.map((key) => {
                const theme = THEMES[key];
                const isSelected = activeTheme.id === key;

                return (
                  <button
                    key={key}
                    onClick={() => handleSelectTheme(key)}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Dual-color swatch */}
                      <div className="flex items-center -space-x-1.5 shrink-0">
                        <span
                          className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                          <span>{theme.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono-code block">
                          {theme.tagline}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sound FX Toggle inside Theme Switcher */}
            <div className="mt-2.5 pt-2 border-t border-surface-border/80 px-2 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono-code text-slate-400 flex items-center gap-1.5">
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>Haptic Audio Feedback</span>
              </span>

              <button
                onClick={toggleSound}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code border transition-colors ${
                  soundEnabled
                    ? 'bg-white/10 text-white border-white/30 font-semibold'
                    : 'bg-midnight-900 text-slate-400 border-surface-border hover:text-slate-200'
                }`}
              >
                {soundEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
