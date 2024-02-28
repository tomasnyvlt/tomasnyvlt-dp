/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    environment: 'jsdom',
  },
  define: {
    global: {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'DP',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react({
      jsxRuntime: 'automatic', // Add this line
    }),
    svgr({
      //include: '**/*.svg?react',
    }),
    dts(),
  ],
  resolve: {
    alias: {
      '@src/': '/src/',
    },
  },
});
