/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#6366f1',
          soft: 'rgba(99,102,241,0.15)',
          hover: '#4f46e5',
        },
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'blob': 'blob 12s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
        'slide-right': 'slideRight 0.35s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(40px,30px) scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
