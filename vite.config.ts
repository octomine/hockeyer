import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [react()],
  root: '.',
  base: '/hockeyer/',
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@game': path.resolve(__dirname, './src/game'),
    }
  },
  build: {
    outDir: 'build'
  }
})
