/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#211E1B',
        paper: '#FFFFFF',
        sand: '#F1EFEA',
        clay: '#B25B32',
        clayDark: '#8F4525',
        moss: '#454F3E',
        stone: '#8A8272',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
