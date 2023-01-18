import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import codegen from 'vite-plugin-graphql-codegen';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), codegen()],
  server: {
    proxy: {
      '/graphql': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true
      },
      '^/media/.*': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true
      }
    }
  },
  preview: {
    proxy: {
      '/graphql': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true
      },
      '^/media/.*': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true
      }
    }
  }
})
