import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'automatic', // Ensures JSX syntax works in .js files
  },
  base: '/',
  publicDir: 'public'
})
