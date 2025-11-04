import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Dùng 'node:path' là cách import hiện đại, an toàn hơn
import path from "node:path" 
import { fileURLToPath } from 'node:url'

// __dirname không tồn tại trong ESM, chúng ta cần tạo ra nó
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  resolve: {
    alias: {
      // Dòng này map "@/" tới thư mục "src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

