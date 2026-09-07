import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      // Duas páginas reais no build: a home e a moldura.
      // Assim /moldura vira um arquivo de verdade no dist (moldura.html) e
      // não depende de rewrite de SPA para funcionar em produção — foi
      // justamente o rewrite que quebrava com o cleanUrls da Vercel.
      input: {
        principal: 'index.html',
        moldura: 'moldura.html',
      },
    },
  },
})
