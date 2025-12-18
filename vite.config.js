import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 恢复最纯净的默认配置
export default defineConfig({
  plugins: [react()],
  // 不要加 base: './'，这会影响本地路由
  // 不要加 outDir: 'build'，Vite 默认就是 dist
})

