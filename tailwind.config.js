/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: 'var(--bg-primary)',
          900: 'var(--bg-surface)',
          850: 'var(--bg-surface-elevated)',
          800: 'var(--bg-surface-hover)',
          700: 'var(--border-color)',
          600: 'var(--border-hover)',
        },
        charcoal: {
          900: 'var(--bg-surface)',
          800: 'var(--bg-surface-elevated)',
          700: 'var(--border-color)',
          600: 'var(--border-hover)',
        },
        lime: {
          accent: '#D4FF00',
          hover: '#E2FF33',
          glow: 'rgba(212, 255, 0, 0.15)',
          deep: '#8FB300',
        },
        cobalt: {
          accent: '#0066FF',
          hover: '#297BFF',
          glow: 'rgba(0, 102, 255, 0.15)',
        },
        surface: {
          card: 'var(--card-bg)',
          cardHover: 'var(--card-bg-hover)',
          border: 'var(--border-color)',
          borderHover: 'var(--border-hover)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Clash Display', 'Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
