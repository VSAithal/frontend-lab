/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'

const aliases = {
  '@': `${path.resolve(__dirname, './src/')}`,
  '@components': `${path.resolve(__dirname, './src/components/')}`,
  '@utils': `${path.resolve(__dirname, './src/utils/')}`,
}
const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, './package.json'), 'utf-8'),
)
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]

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
      external: (id: string) =>
        externalPackages.some(
          (name) => id === name || id.startsWith(`${name}/`),
        ),
      output: {
        assetFileNames: '[name].[ext]',
      },
    },
    emptyOutDir: false,
  },
})
