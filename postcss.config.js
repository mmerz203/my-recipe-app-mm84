// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- CRITICAL CHANGE: Use the specific PostCSS plugin
    autoprefixer: {},
  },
}