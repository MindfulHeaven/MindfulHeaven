import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/MindfulHeaven/",
  build: {
    rollupOptions: {
      input: './src/components/Login.jsx', // Specify the entry point here
    },
  },
})
