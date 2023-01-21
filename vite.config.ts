import {defineConfig, type PluginOption} from 'vite'
import react from '@vitejs/plugin-react-swc'
import codegen from 'vite-plugin-graphql-codegen';
import {visualizer} from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), codegen(), visualizer() as PluginOption],
    experimental: {
        renderBuiltUrl(filename, {hostType}) {
            if (hostType === "js" || hostType === "css") {
                return "https://d1mwzc9v8ocr0h.cloudfront.net/static/" + filename
            } else {
                return {relative: true}
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 1000
    },
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
