// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Crucial: Ensures Tailwind scans your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Crucial: Ensures Tailwind scans all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}