import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

const sharedModules: Record<string, { singleton: boolean }> = {
  react: { singleton: true },
  'react-dom': { singleton: true },
};

export default defineConfig({
  // IMPORTANT for GitHub Pages deployment
  base: '/app3/',

  plugins: [
    react(),
    federation({
      name: 'app3',
      filename: 'remoteEntry.js',
      exposes: {
        './HRApp': './src/App.tsx',
      },

      shared: sharedModules,
    }),
  ],

  server: {
    host: true,
    port: 5176,
    cors: true,
  },

  preview: {
    host: true,
    port: 5176,
  },

  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
  },
});
