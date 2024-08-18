import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Thay đổi cổng nếu cần
    strictPort: true, // Nếu true, Vite sẽ không tự động chọn cổng khác nếu cổng đã được sử dụng
  },
})
