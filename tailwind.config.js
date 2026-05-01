/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0f',
        foreground: '#f1f1f3',
        card: {
          DEFAULT: 'rgba(18, 18, 26, 0.85)',
          foreground: '#f1f1f3',
        },
        border: 'rgba(255,255,255,0.07)',
        muted: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          foreground: 'rgba(255,255,255,0.4)',
        },
        primary: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
          50:  'rgba(16,185,129,0.05)',
          100: 'rgba(16,185,129,0.1)',
          200: 'rgba(16,185,129,0.2)',
        },
        transport: {
          bus:    '#3b82f6',
          taxi:   '#f59e0b',
          hiking: '#10b981',
          meal:   '#ef4444',
          event:  '#eab308',
          stay:   '#8b5cf6',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
