/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        markoOne: ["Marko One", "serif"],
        kavoon: ["Kavoon", "serif"],
        jaldi: ["Jaldi", "sans-serif"]
      },
      colors: {
        green: 'rgba(48, 80, 65, 1)',
        resultGreen: 'rgba(76, 175, 80, 0.7)',
        resultRed: 'rgba(255, 99, 132, 1)'
      }
    },
  },
  plugins: [],
}