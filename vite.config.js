import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // aliasy „gołych” ścieżek względem src/
      'components': path.resolve(__dirname, './src/components'),
      'assets': path.resolve(__dirname, './src/assets'),
      'utils': path.resolve(__dirname, './src/utils'),
      'patterns': path.resolve(__dirname, './src/patterns'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'Decor': path.resolve(__dirname, './src/Decor'),

      // (opcjonalnie) ogólny alias „@” do całego src/
      '@': path.resolve(__dirname, './src'),
    }
  }
})
