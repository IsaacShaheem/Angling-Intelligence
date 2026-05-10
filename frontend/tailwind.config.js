/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#08131f',
        surface: '#102030',
        lake: '#0e2a37',
        mist: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 22px rgba(34, 211, 238, 0.10)',
        emerald: '0 0 20px rgba(16, 185, 129, 0.09)',
      },
    },
  },
  plugins: [],
}
