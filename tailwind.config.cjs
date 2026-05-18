/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,css}'],
  theme: {
    extend: {
      colors: {
        earth: {
          50:  '#faf7f2',
          100: '#f2ebe0',
          200: '#e5d5bc',
          300: '#d4b896',
          400: '#c49a6c',
          500: '#b07d4f',
          600: '#916339',
          700: '#734d2c',
          800: '#5a3c22',
          900: '#3d2810',
        },
        bark: '#2c1f0e',
        cream: '#faf7f2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        earth: {
          50:  '#faf7f2',
          100: '#f2ebe0',
          200: '#e5d5bc',
          300: '#d4b896',
          400: '#c49a6c',
          500: '#b07d4f',
          600: '#916339',
          700: '#734d2c',
          800: '#5a3c22',
          900: '#3d2810',
        },
        bark: '#2c1f0e',
        cream: '#faf7f2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}