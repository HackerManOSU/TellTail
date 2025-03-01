/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backround: {
          DEFAULT: '#E9D0B8',
          light:'#fff',
          dark: '#6fff',
        },
        background: {
          DEFAULT: '#E9D0B8',
          light:'#fff',
          dark: '#6fff',
        },
        primary: {
          DEFAULT: '#664C36',
          light: '#814918',
          dark: '#fff',
        },
        secondary: {
          DEFAULT: '#FFD3AC',
          light: '#fff',
          dark: '#fff',
        },
        tertiary: {
          DEFAULT: '#CCBEB1',
          light: '#fff',
          dark: '#fff',
        },
      },
    },
  },
  plugins: [],
}


