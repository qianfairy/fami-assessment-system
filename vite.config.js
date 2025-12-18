import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 👈 加上这一行，解决白屏的关键
  plugins: [react()],
})
