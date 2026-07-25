import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// In locale la base è '/'. Per GitHub Pages, la CI passa BASE_PATH=/Latin-app/
// così gli asset vengono cercati nel percorso giusto del sito pubblicato.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
