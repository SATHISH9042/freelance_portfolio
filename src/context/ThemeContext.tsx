import React, { createContext, useContext, useState, useEffect } from 'react';

type AccentColor = 'lime' | 'cobalt';

interface ThemeContextType {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentHex: string;
  accentGlow: string;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playClickSound: () => void;
  playPopSound: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accent, setAccent] = useState<AccentColor>('lime');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Audio Context for subtle synthetic UI sound feedback (no external assets needed)
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio context might be restricted
    }
  };

  const accentHex = accent === 'lime' ? '#D4FF00' : '#0066FF';
  const accentGlow = accent === 'lime' ? 'rgba(212, 255, 0, 0.2)' : 'rgba(0, 102, 255, 0.25)';

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentHex);
    document.documentElement.style.setProperty('--accent-glow', accentGlow);
  }, [accent, accentHex, accentGlow]);

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        accentHex,
        accentGlow,
        soundEnabled,
        setSoundEnabled,
        playClickSound,
        playPopSound,
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
