/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#331C08',
          light: '#814918',
          dark: '#fff',
        },
        secondary: {
          DEFAULT: '#664C36',
          light: '#fff',
          dark: '#fff',
        },
        tertiary: {
          DEFAULT: '#ccBEB1',
          light: '#fff',
          dark: '#fff',
        },
      },
    },
  },
  plugins: [],
}


