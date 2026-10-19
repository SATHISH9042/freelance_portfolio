import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePreset = 'lime' | 'cobalt' | 'amethyst' | 'amber' | 'emerald';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  tagline: string;
  accent: string;
  secondary: string;
  bgDark: string;
  bgSurface: string;
  glow: string;
  textMuted: string;
}

export const THEMES: Record<ThemePreset, ThemeConfig> = {
  lime: {
    id: 'lime',
    name: 'Electric Lime',
    tagline: 'Agency Neo / High Contrast',
    accent: '#D4FF00',
    secondary: '#10B981',
    bgDark: '#06080C',
    bgSurface: '#0E121A',
    glow: 'rgba(212, 255, 0, 0.22)',
    textMuted: '#94A3B8',
  },
  cobalt: {
    id: 'cobalt',
    name: 'Cyber Cobalt',
    tagline: 'Deep Ocean & Electric Blue',
    accent: '#0066FF',
    secondary: '#38BDF8',
    bgDark: '#050914',
    bgSurface: '#0B132B',
    glow: 'rgba(0, 102, 255, 0.28)',
    textMuted: '#94A3B8',
  },
  amethyst: {
    id: 'amethyst',
    name: 'Violet Amethyst',
    tagline: 'Astral Cyber & Synthwave',
    accent: '#A855F7',
    secondary: '#EC4899',
    bgDark: '#090611',
    bgSurface: '#160E29',
    glow: 'rgba(168, 85, 247, 0.26)',
    textMuted: '#A78BFA',
  },
  amber: {
    id: 'amber',
    name: 'Solar Ember',
    tagline: 'Warm Espresso & Molten Gold',
    accent: '#F59E0B',
    secondary: '#FB923C',
    bgDark: '#0A0806',
    bgSurface: '#18120D',
    glow: 'rgba(245, 158, 11, 0.24)',
    textMuted: '#FBBF24',
  },
  emerald: {
    id: 'emerald',
    name: 'Neo Emerald',
    tagline: 'Dark Jade & Mint Matrix',
    accent: '#10B981',
    secondary: '#06B6D4',
    bgDark: '#050C09',
    bgSurface: '#0A1C14',
    glow: 'rgba(16, 185, 129, 0.24)',
    textMuted: '#6EE7B7',
  },
};

interface ThemeContextType {
  activeTheme: ThemeConfig;
  setTheme: (preset: ThemePreset) => void;
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
  const [themePreset, setThemePreset] = useState<ThemePreset>('lime');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const activeTheme = THEMES[themePreset];

  // Synthesized Web Audio API sound effects
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
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.04);

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
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  };

  // Beautiful musical ascending triad chime on theme switch
  const playThemeChime = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
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

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', activeTheme.accent);
    root.style.setProperty('--accent-glow', activeTheme.glow);
    root.style.setProperty('--accent-secondary', activeTheme.secondary);
    root.style.setProperty('--bg-dark', activeTheme.bgDark);
    root.style.setProperty('--bg-surface', activeTheme.bgSurface);
    document.body.style.backgroundColor = activeTheme.bgDark;
  }, [activeTheme]);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setTheme,
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
