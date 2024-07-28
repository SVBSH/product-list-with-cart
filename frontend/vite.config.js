import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let server = {}
  if (mode === 'development') {
    server = {
      host: '0.0.0.0',
      port: 5173,

      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      },
    }
  } else {
    server = {
      server: {
        host: '0.0.0.0',
        port: 5173,
      },
    }
  }
  return {
    plugins: [react()],
    resolve: {
      // https://stackoverflow.com/questions/70934834/eslint-complains-about-dirname-not-being-defined-in-a-nodejs-file
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@services': path.resolve(__dirname, './src/services'),
        '@context': path.resolve(__dirname, './src/context'),
      },
    },
    server: server,
  }
})
