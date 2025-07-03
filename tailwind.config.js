// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Azure Sunset
        'background-light-azure': '#f0f8ff',
        'primary-azure': '#4682b4',
        'secondary-azure': '#ff7f50',
        'neutral-azure': '#2f4f4f',
        'text-dark-azure': '#1a1a2e',

        // Emerald Bloom
        'background-emerald-light': '#f5f5f5',
        'primary-emerald': '#3cb371',
        'secondary-emerald': '#8a2be2',
        'tertiary-emerald': '#4b0082',
        'text-dark-emerald': '#191970',

        // Golden Meadow
        'background-golden-light': '#fffacd',
        'primary-golden': '#ffd700',
        'secondary-golden': '#b8860b',
        'tertiary-golden': '#556b2f',
        'text-dark-golden': '#36454F',
        winsome: {
          background: "#f6dcca", // Exact background from DOM: rgb(246, 220, 198)
          "primary-orange": "#fca17d", // Exact primary: rgb(252, 161, 126)
          "secondary-rose": "#da627d", // Rose color: rgb(218, 98, 125)
          "tertiary-purple": "#9a348e", // Purple color: rgb(154, 52, 142)
          "text-dark": "#10082b", // Exact text: rgb(16, 8, 43)
          "text-muted": "rgba(16, 8, 43, 0.7)", // Muted text
          "border-subtle": "rgba(230, 202, 179, 0.2)", // Border colors
          error: "#d36060",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "scale-in": "scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
