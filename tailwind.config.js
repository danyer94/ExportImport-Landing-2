/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a192f',
          light: '#112240',
        },
        gold: {
          DEFAULT: '#e6c200',
          light: '#f8d62b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(230, 194, 0, 0.3)',
      },
    },
  },
  plugins: [],
};