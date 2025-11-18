import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base: './' ensures assets are loaded relatively. 
  // This allows the app to work at https://username.github.io/repo-name/
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});