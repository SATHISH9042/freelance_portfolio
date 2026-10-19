import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePreset = 'white-cobalt' | 'white-emerald' | 'white-violet' | 'dark-obsidian' | 'dark-cobalt';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  tagline: string;
  isDark: boolean;
  accent: string;
  secondary: string;
  bgDark: string;
  bgSurface: string;
  glow: string;
  textMuted: string;
}

export const THEMES: Record<ThemePreset, ThemeConfig> = {
  'white-cobalt': {
    id: 'white-cobalt',
    name: 'Studio White',
    tagline: 'Pristine White / Royal Cobalt',
    isDark: false,
    accent: '#0066FF',
    secondary: '#00D2FF',
    bgDark: '#FFFFFF',
    bgSurface: '#F8FAFC',
    glow: 'rgba(0, 102, 255, 0.22)',
    textMuted: '#64748B',
  },
  'white-emerald': {
    id: 'white-emerald',
    name: 'White Emerald',
    tagline: 'Minimalist Alabaster / Mint Jade',
    isDark: false,
    accent: '#059669',
    secondary: '#0D9488',
    bgDark: '#FFFFFF',
    bgSurface: '#F8FAFC',
    glow: 'rgba(5, 150, 105, 0.22)',
    textMuted: '#64748B',
  },
  'white-violet': {
    id: 'white-violet',
    name: 'White Violet',
    tagline: 'Fashion Editorial / Electric Purple',
    isDark: false,
    accent: '#7C3AED',
    secondary: '#DB2777',
    bgDark: '#FFFFFF',
    bgSurface: '#FAF5FF',
    glow: 'rgba(124, 58, 237, 0.22)',
    textMuted: '#64748B',
  },
  'dark-obsidian': {
    id: 'dark-obsidian',
    name: 'Midnight Lime',
    tagline: 'Deep Obsidian / Electric Lime',
    isDark: true,
    accent: '#D4FF00',
    secondary: '#10B981',
    bgDark: '#06080C',
    bgSurface: '#0E131F',
    glow: 'rgba(212, 255, 0, 0.22)',
    textMuted: '#94A3B8',
  },
  'dark-cobalt': {
    id: 'dark-cobalt',
    name: 'Cyber Cobalt',
    tagline: 'Deep Navy / Cyber Blue',
    isDark: true,
    accent: '#0066FF',
    secondary: '#38BDF8',
    bgDark: '#050914',
    bgSurface: '#0B132B',
    glow: 'rgba(0, 102, 255, 0.28)',
    textMuted: '#94A3B8',
  },
};

interface ThemeContextType {
  activeTheme: ThemeConfig;
  setTheme: (preset: ThemePreset) => void;
  toggleMode: () => void;
  isDark: boolean;
  accentHex: string;
  accentGlow: string;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playClickSound: () => void;
  playPopSound: () => void;
  playThemeChime: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to white-cobalt as requested!
  const [themePreset, setThemePreset] = useState<ThemePreset>('white-cobalt');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const activeTheme = THEMES[themePreset];
  const isDark = activeTheme.isDark;

  const getAudioContext = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      return AudioCtx ? new AudioCtx() : null;
    } catch {
      return null;
    }
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playPopSound = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  };

  const playThemeChime = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C major chord
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.035, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  };

  const setTheme = (preset: ThemePreset) => {
    setThemePreset(preset);
    playThemeChime();
  };

  const toggleMode = () => {
    playPopSound();
    if (activeTheme.isDark) {
      setThemePreset('white-cobalt');
    } else {
      setThemePreset('dark-obsidian');
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', activeTheme.accent);
    root.style.setProperty('--accent-glow', activeTheme.glow);
    root.style.setProperty('--accent-secondary', activeTheme.secondary);
    root.style.setProperty('--bg-primary', activeTheme.bgDark);
    root.style.setProperty('--bg-surface', activeTheme.bgSurface);

    if (activeTheme.isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setTheme,
        toggleMode,
        isDark,
        accentHex: activeTheme.accent,
        accentGlow: activeTheme.glow,
        soundEnabled,
        setSoundEnabled,
        playClickSound,
        playPopSound,
        playThemeChime,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
