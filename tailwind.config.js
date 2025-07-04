// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Winsome flat color keys for direct use in Tailwind classes
        'background': '#f6dcca',
        'primary-brand': '#fca17d',
        'secondary-brand': '#da627d',
        'tertiary-purple': '#9a348e',
        'text-text-dark': '#10082b',
        'neutral-subtle': 'rgba(16, 8, 43, 0.7)',
        'border-theme': 'rgba(230, 202, 179, 0.2)',
        'card': '#fff',
        'error': '#d36060',

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
        // Retain nested winsome for reference if needed
        winsome: {
          background: "#f6dcca",
          "primary-orange": "#fca17d",
          "secondary-rose": "#da627d",
          "tertiary-purple": "#9a348e",
          "text-dark": "#10082b",
          "text-muted": "rgba(16, 8, 43, 0.7)",
          "border-subtle": "rgba(230, 202, 179, 0.2)",
          error: "#d36060",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 36px
        'heading-2': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }], // 24px
        'heading-3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 20px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }], // 12px
        // Tailwind defaults
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
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
