import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * La «versione» dell'app è il commit da cui è stata costruita.
 *
 * Serve alle segnalazioni: se un amico segnala un errore che nel frattempo è
 * già stato corretto, senza questo dato non c'è modo di accorgersene, e si
 * finisce per ricontrollare cose a posto.
 */
function versione(): string {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return 'locale'
  }
}

// https://vite.dev/config/
// In locale la base è '/'. Per GitHub Pages, la CI passa BASE_PATH=/ianua/
// così gli asset vengono cercati nel percorso giusto del sito pubblicato.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  define: { __VERSIONE__: JSON.stringify(versione()) },
  plugins: [react()],
})
