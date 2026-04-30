/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        card: {
          DEFAULT: 'rgba(24, 24, 27, 0.8)',
          foreground: '#fafafa',
        },
        primary: {
          DEFAULT: '#10b981', // Emerald 500
          foreground: '#ffffff',
        },
        transport: {
          bus: '#3b82f6', // Blue
          taxi: '#f59e0b', // Amber
          hiking: '#10b981', // Emerald
          meal: '#ef4444', // Red
          event: '#eab308', // Yellow
          stay: '#8b5cf6', // Violet
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
