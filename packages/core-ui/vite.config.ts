/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const aliases = {
  '@': `${path.resolve(__dirname, './src/')}`,
  '@components': `${path.resolve(__dirname, './src/components/')}`,
  '@utils': `${path.resolve(__dirname, './src/utils/')}`,
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    alias: aliases,
    setupFiles: './setupTests.ts',
    include: ['src/**/*.spec.tsx'],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CoreUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        assetFileNames: '[name].[ext]',
      },
    },
    emptyOutDir: false,
  },
})
