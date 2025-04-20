import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: '', // You can keep this or remove it (default is 'assets')
  },
  publicDir: 'public',
  // The css block is removed - Vite will use postcss.config.js
});