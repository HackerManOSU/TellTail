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
          DEFAULT: '#66b2b2',
          light: '#f0f9f9',
          dark: '#fff',
        },
        secondary: {
          DEFAULT: '#f0f9f9',
          light: '#fff',
          dark: '#fff',
        },
        tertiary: {
          DEFAULT: '#2c3e50',
          light: '#fff',
          dark: '#fff',
        },
      },
    },
  },
  plugins: [],
}


