import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Ianua in un file solo.
 *
 * La via normale è GitHub Pages. Ma un sito dipende da un servizio che può
 * smettere di funzionare — è successo, restando bloccato in coda per ore dopo
 * un cambio di visibilità del repository — e nel frattempo l'app non si può
 * dare a nessuno.
 *
 * Questa build impacchetta tutto (JavaScript, CSS, i font, la mascotte) in un
 * unico `ianua.html`: si apre con un doppio clic, funziona senza rete, si manda
 * per WhatsApp o per mail. Non sostituisce il sito — i progressi restano legati
 * al file da cui apri l'app, e l'aggiornamento non è automatico — ma è la
 * copia che si può consegnare in mano oggi.
 *
 *   npm run build:singlefile   →   dist-singlefile/index.html
 */
function versione(): string {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return 'locale'
  }
}

export default defineConfig({
  base: './',
  define: { __VERSIONE__: JSON.stringify(versione()) },
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-singlefile',
    // Tutto dentro: nessuna richiesta esterna, nessun file accanto.
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100_000,
  },
})
