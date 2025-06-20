// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {        // <--- Add this block
    host: true,    // <--- This makes Vite bind to 0.0.0.0
    port: 5173     // Optional: explicitly set the port
  }
});