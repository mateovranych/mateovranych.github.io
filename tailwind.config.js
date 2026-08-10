/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {

      colors: {

        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",

        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },

        accent: "var(--accent)"

      }      
    },
  },
  plugins: [],
}