import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    qiankun('todo-list', {
      useDevMode: true
    })
  ],
  server: {
    port: 5174,
    cors: true
  },
  build: {
    outDir: '../../dist/todo-list',
    sourcemap: true,
    rollupOptions: {
      input: {
        'todo': resolve(__dirname, 'index.html')
      },
      output: {
        // 确保 React 相关依赖被正确打包
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    // 确保正确处理 CommonJS 模块
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})