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
  base: '/todo/',
  build: {
    outDir: '../../dist/todo',
    sourcemap: true,
    rollupOptions: {
      input: {
        'todo-list': resolve(__dirname, 'index.html')
      },
      output: {
        format: 'umd',
        entryFileNames: (chunkInfo) => {
          return '[name]-[hash].js'
        },
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
        name: 'todo'
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