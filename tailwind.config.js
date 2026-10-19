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
          950: '#06080C',
          900: '#0B0F17',
          850: '#0F141F',
          800: '#141A28',
          700: '#1D2538',
          600: '#2A344D',
        },
        charcoal: {
          900: '#121316',
          800: '#1A1C21',
          700: '#24272E',
          600: '#323640',
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
          card: 'rgba(255, 255, 255, 0.03)',
          cardHover: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.18)',
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

