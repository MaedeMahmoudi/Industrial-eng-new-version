/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // ==========================================
        // رنگ اصلی پروژه
        // ==========================================
        sand: {
          50: '#fffaf5',
          100: '#fff1e3',
          200: '#fddfc3',
          300: '#fbc59b',
          400: '#f6a66f',
          500: '#f28a4b',
          600: '#e86f2f',
          700: '#c95520',
          800: '#a7431d',
          900: '#87371b',
          950: '#4a1d0d',
        },

        // ==========================================
        // رنگ‌های اصلی semantic
        // ==========================================
        primary: {
          50: '#fffaf5',
          100: '#fff1e3',
          200: '#fddfc3',
          300: '#fbc59b',
          400: '#f6a66f',
          500: '#f28a4b',
          600: '#e86f2f',
          700: '#c95520',
          800: '#a7431d',
          900: '#87371b',
          950: '#4a1d0d',
        },

        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4c1d95',
        },

        accent: '#f59e0b',

        surface: {
          light: '#ffffff',
          dark: '#0f172a',
        },
      },

      boxShadow: {
        soft: '0 4px 24px rgba(15, 23, 42, 0.06)',
        card: '0 8px 30px rgba(15, 23, 42, 0.08)',
        glow: '0 0 30px rgba(242, 138, 75, 0.18)',
      },

      borderRadius: {
        '4xl': '2rem',
      },

      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },

  plugins: [],
}