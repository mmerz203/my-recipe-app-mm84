// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

// Read version from package.json
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
  },
  server: {        // <--- Add this block
    host: true,    // <--- This makes Vite bind to 0.0.0.0
    port: 5173     // Optional: explicitly set the port
  }
});