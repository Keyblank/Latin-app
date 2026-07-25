import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build alternativa che produce UN unico file HTML autonomo (tutto inline:
// JS, CSS e immagini come data URI). Utile per aprire l'app senza un server,
// o per pubblicarla come pagina singola.
//   npx vite build --config vite.singlefile.config.ts
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
