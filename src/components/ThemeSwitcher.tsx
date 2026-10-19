import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sparkles, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { useTheme, THEMES, ThemePreset } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { activeTheme, setTheme, toggleMode, isDark, soundEnabled, setSoundEnabled, playPopSound } = useTheme();
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
    <div className="flex items-center gap-1.5" ref={containerRef}>
      {/* 1-Click Fast Light/Dark Mode Switcher */}
      <button
        onClick={toggleMode}
        className={`p-2 rounded-full border transition-all text-xs cursor-pointer shadow-sm active:scale-90 ${
          isDark
            ? 'bg-midnight-900 border-surface-border text-amber-400 hover:text-amber-300 hover:border-white/20'
            : 'bg-white border-black/10 text-slate-700 hover:text-slate-900 hover:border-black/20'
        }`}
        title={isDark ? 'Switch to White Theme' : 'Switch to Dark Mode'}
        aria-label="Toggle Light and Dark Mode"
      >
        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
      </button>

      {/* Palette Trigger Button */}
      <div className="relative">
        <button
          onClick={() => {
            playPopSound();
            setIsOpen(!isOpen);
          }}
          className={`px-3 py-1.5 rounded-full border text-xs font-mono-code transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-midnight-900/90 border-surface-border text-slate-200 hover:border-white/30'
              : 'bg-white border-black/10 text-slate-800 hover:border-black/20'
          }`}
          aria-label="Open Theme Palette"
          title="Customize theme color and aesthetic"
        >
          <span
            className="w-3.5 h-3.5 rounded-full shadow-sm transition-transform group-hover:scale-110"
            style={{
              backgroundColor: activeTheme.accent,
              boxShadow: `0 0 10px ${activeTheme.accent}`,
            }}
          />
          <span className="hidden sm:inline text-[11px] font-semibold">{activeTheme.name}</span>
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
              className={`absolute right-0 mt-2.5 w-72 rounded-2xl border shadow-2xl backdrop-blur-2xl p-3 z-50 overflow-hidden ${
                isDark
                  ? 'bg-midnight-950/98 border-surface-border'
                  : 'bg-white/98 border-black/10 shadow-slate-300'
              }`}
            >
              {/* Header */}
              <div className={`px-2.5 py-1.5 flex items-center justify-between border-b mb-2 ${
                isDark ? 'border-surface-border/80' : 'border-black/10'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-display font-bold text-slate-900 dark:text-white">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                  <span>Aesthetics &amp; Palette</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400">White &amp; Dark</span>
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
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? isDark
                            ? 'bg-white/10 border border-white/20'
                            : 'bg-slate-100 border border-black/15 shadow-sm'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Dual-color swatch */}
                        <div className="flex items-center -space-x-1.5 shrink-0">
                          <span
                            className="w-4 h-4 rounded-full border border-black/30 shadow-sm"
                            style={{ backgroundColor: theme.accent }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/30 shadow-sm"
                            style={{ backgroundColor: theme.secondary }}
                          />
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            <span>{theme.name}</span>
                            <span className="text-[9px] font-mono-code text-slate-400">
                              {theme.isDark ? '🌙 Dark' : '☀️ White'}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono-code block">
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
              <div className={`mt-2.5 pt-2 border-t px-2 flex items-center justify-between text-xs ${
                isDark ? 'border-surface-border/80' : 'border-black/10'
              }`}>
                <span className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Haptic Sounds</span>
                </span>

                <button
                  onClick={toggleSound}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code border transition-colors cursor-pointer ${
                    soundEnabled
                      ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-white border-black/20 dark:border-white/30 font-semibold'
                      : 'bg-slate-100 text-slate-600 dark:bg-midnight-900 dark:text-slate-400 border-black/10 dark:border-surface-border'
                  }`}
                >
                  {soundEnabled ? 'Enabled' : 'Muted'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
