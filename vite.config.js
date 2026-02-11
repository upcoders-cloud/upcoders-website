import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import sitemapPlugin from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SITEMAP_STATIC_ROUTES = ['/en', '/pl', '/en/projects', '/pl/projects']

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin({
      hostname: 'https://upcoders.cloud',
      gzip: true,
      readable: true,
      dynamicRoutes: SITEMAP_STATIC_ROUTES,
      exclude: ['/'],
      changefreq: {
        '*': 'weekly',
        '/en': 'daily',
        '/pl': 'daily',
      },
      priority: {
        '*': 0.8,
        '/en': 1.0,
        '/pl': 1.0,
      },
    }),
    robots({
      rules: [
        {
          userAgent: '*',
          allow: '/'
        }
      ],
      sitemap: 'https://upcoders.cloud/sitemap.xml',
    })
  ],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      // aliasy „gołych” ścieżek względem src/
      'components': path.resolve(__dirname, './src/components'),
      'assets': path.resolve(__dirname, './src/assets'),
      'utils': path.resolve(__dirname, './src/utils'),
      'patterns': path.resolve(__dirname, './src/patterns'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'public': path.resolve(__dirname, './public'),

      // (opcjonalnie) ogólny alias „@” do całego src/
      '@': path.resolve(__dirname, './src'),
    }
  }
})
