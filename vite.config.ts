import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

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
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'tomasnyvlt-dp',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: (s) =>
        [
          ...Object.keys(pkg.dependencies),
          ...Object.keys(pkg.peerDependencies),
        ].some((dep) => s.startsWith(dep)),
      output: {
        globals: {},
      },
    },
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react({
      jsxRuntime: 'automatic', // Add this line
    }),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  resolve: {
    alias: {
      '@src/': '/src/',
    },
  },
});
