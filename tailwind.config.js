/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          950: '#0b0404',
          900: '#140808',
          800: '#1f0d0d',
          700: '#321515',
          600: '#4d2121',
          gold: {
            DEFAULT: '#d4af37',
            light: '#f3e5ab',
            dark: '#aa8c2c',
          }
        }
      }
    },
  },
  plugins: [],
}
