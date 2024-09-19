/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-gray': '#CFCFCF',
        "custom-red":"#d32f2f"
      }
    },
  },
  plugins: [],
}