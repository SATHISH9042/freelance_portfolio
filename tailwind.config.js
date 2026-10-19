/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#FFFFFF',
          900: '#F9FAFB',
          850: '#F3F4F6',
          800: '#E5E7EB',
          700: '#D1D5DB',
          600: '#9CA3AF',
        },
        charcoal: {
          900: '#0A0A0A',
          800: '#171717',
          700: '#262626',
          600: '#404040',
        },
        surface: {
          card: '#FFFFFF',
          cardHover: '#F9FAFB',
          border: 'rgba(0, 0, 0, 0.08)',
          borderHover: 'rgba(0, 0, 0, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Clash Display', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
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
