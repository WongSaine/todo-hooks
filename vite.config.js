/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      utils: '/src/utils',
      assets: '/src/assets',
    },
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
});
