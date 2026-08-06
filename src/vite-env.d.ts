/// <reference types="vite/client" />

/** Il commit da cui è stata costruita l'app: lo inietta vite.config.ts. */
declare const __VERSIONE__: string

interface ImportMetaEnv {
  /** Indirizzo del relay che apre le issue. Vuoto = funzione spenta. */
  readonly VITE_RELAY?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
