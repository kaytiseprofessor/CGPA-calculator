import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    // Legacy plugin handles polyfills for older browsers (Android 6+, iOS 10+)
    legacy({
      targets: ['android >= 6', 'ios >= 10', 'chrome >= 49', 'safari >= 10'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  // Base: './' ensures assets are loaded relatively. 
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure CSS is compatible
    cssTarget: 'chrome49', 
  }
});