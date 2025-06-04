import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép truy cập từ bên ngoài container
    port: 3000,
    watch: {
      usePolling: true, // Cần thiết cho Docker
    },
  },
}) 