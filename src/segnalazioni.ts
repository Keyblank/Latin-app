import type { Exercise, Lesson } from './types'
import { curriculum } from './data/curriculum'

/**
 * Le segnalazioni di chi prova l'app.
 *
 * Il corso è scritto da chi il latino lo sta imparando insieme a chi lo usa:
 * gli errori si trovano leggendo, e chi legge sono gli amici a cui l'app la
 * diamo in mano. Il problema non è che li trovino — è che il tragitto fra
 * «qui c'è qualcosa che non va» e la riga da correggere sia abbastanza corto
 * da non farlo abbandonare a metà.
 *
 * Perciò la segnalazione non chiede QUALE esercizio: se lo prende da sola.
 * Ogni esercizio del corso ha una posizione esatta — unità, lezione, indice —
 * e quella posizione viene allegata al messaggio. Chi segnala scrive una
 * frase; chi corregge riceve una coordinata.
 *
 * Restano nel browser di chi segnala, come i progressi, e si mandano via a
 * mano: niente server, come tutto il resto dell'app.
 */

const CHIAVE = 'ianua-segnalazioni-v1'
const MASSIMO = 200

export type Categoria = 'latino' | 'traduzione' | 'refuso' | 'confuso' | 'tecnico' | 'altro'

export const CATEGORIE: { id: Categoria; etichetta: string; icona: string }[] = [
  { id: 'latino', etichetta: 'Errore di latino', icona: '🏛️' },
  { id: 'traduzione', etichetta: 'Traduzione sbagliata', icona: '🔁' },
  { id: 'refuso', etichetta: 'Refuso', icona: '✏️' },
  { id: 'confuso', etichetta: 'Spiegato male', icona: '🤔' },
  { id: 'tecnico', etichetta: 'L’app fa i capricci', icona: '🐞' },
  { id: 'altro', etichetta: 'Altro', icona: '💬' },
]

/** Dove si trovava chi ha segnalato. */
export interface Posto {
  schermata: 'lezione' | 'vocabolario' | 'versione'
  /** Coordinate dentro il corso, quando l'esercizio è del curriculum. */
  unita?: string
  lezione?: string
  /** Posizione dell'esercizio dentro la lezione, a partire da 1. */
  numero?: number
  tipo?: string
  /** Una riga per riconoscere a occhio di che cosa si parla. */
  estratto: string
}

export interface Segnalazione {
  id: string
  quando: string
  categoria: Categoria
  testo: string
  posto: Posto
  /** Il pezzo di testo che chi segnala aveva selezionato, se l'aveva fatto. */
  selezione?: string
  /** Versione dell'app: se una segnalazione arriva vecchia, si vede. */
  versione: string
}

// ─────────────────── trovare l'esercizio dentro il corso ───────────────────

/**
 * Indice da esercizio a posizione.
 *
 * Serve perché nel Repetitio gli esercizi arrivano sciolti, senza più la
 * lezione da cui vengono: sono copie salvate fra i progressi. Confrontarli per
 * contenuto è l'unico modo per rimetterli al loro posto — ed è affidabile,
 * perché due esercizi identici in due punti diversi sarebbero comunque da
 * correggere tutti e due.
 */
const posizioni = new Map<string, { unita: string; lezione: string; numero: number }>()
for (const u of curriculum) {
  for (const l of u.lessons) {
    l.exercises.forEach((e, k) => {
      const chiave = JSON.stringify(e)
      if (!posizioni.has(chiave)) {
        posizioni.set(chiave, { unita: u.id, lezione: l.id, numero: k + 1 })
      }
    })
  }
}

/** La prima riga leggibile di un esercizio, tagliata corta. */
function estrattoDi(ex: Exercise): string {
  const taglia = (s: string) => (s.length > 90 ? s.slice(0, 88).trimEnd() + '…' : s)
  switch (ex.type) {
    case 'info':
      return taglia(`Scheda «${ex.title}»`)
    case 'table':
      return taglia(`Tabella «${ex.title}»`)
    case 'choice':
      return taglia(`${ex.prompt} → ${ex.answer}`)
    case 'build':
      return taglia(`${ex.prompt} → ${ex.answer.join(' ')}`)
    case 'match':
      return taglia(`Abbinamento: ${ex.pairs.map((p) => p.join(' = ')).join(' · ')}`)
    case 'analysis':
      return taglia(`Analisi di «${ex.word}» in «${ex.sentence}»`)
  }
}

/**
 * `lezione` serve solo come ripiego: se l'esercizio non si ritrova nel corso
 * (perché è stato modificato dopo essere finito nei progressi) resta almeno il
 * nome della lezione da cui lo si stava facendo. Dalla Grammatica, dove la
 * lezione non c'è, si omette.
 */
export function postoDiEsercizio(ex: Exercise, lezione?: Lesson): Posto {
  const trovato = posizioni.get(JSON.stringify(ex))
  return {
    schermata: 'lezione',
    unita: trovato?.unita,
    // Nel Repetitio `lezione.id` è «repetitio»: vale la posizione vera, se c'è.
    lezione: trovato?.lezione ?? lezione?.id,
    numero: trovato?.numero,
    tipo: ex.type,
    estratto: estrattoDi(ex),
  }
}

export function postoDiVocabolo(lat: string, ita: string, lezione?: string): Posto {
  return {
    schermata: 'vocabolario',
    lezione,
    tipo: 'vocabolo',
    estratto: `«${lat}» = ${ita}`,
  }
}

export function postoDiVersione(id: string, titolo: string, frase: string): Posto {
  return {
    schermata: 'versione',
    lezione: id,
    tipo: 'versione',
    estratto: `${titolo} — «${frase}»`,
  }
}

/** La coordinata in forma compatta: «u19 · u19l4 · esercizio 5». */
export function coordinata(p: Posto): string {
  const pezzi = [p.unita, p.lezione].filter(Boolean)
  if (p.numero) pezzi.push(`esercizio ${p.numero}`)
  return pezzi.length ? pezzi.join(' · ') : p.schermata
}

// ─────────────────── il registro ───────────────────

export function leggiSegnalazioni(): Segnalazione[] {
  try {
    const grezzo = localStorage.getItem(CHIAVE)
    if (!grezzo) return []
    const dato = JSON.parse(grezzo)
    return Array.isArray(dato) ? (dato as Segnalazione[]) : []
  } catch {
    return []
  }
}

function scrivi(lista: Segnalazione[]): void {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(lista.slice(-MASSIMO)))
  } catch {
    // Se lo spazio è finito la segnalazione è comunque già stata condivisa:
    // il registro locale è una comodità, non l'unico canale.
  }
}

export function aggiungi(
  categoria: Categoria,
  testo: string,
  posto: Posto,
  selezione?: string,
): Segnalazione {
  const s: Segnalazione = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    quando: new Date().toISOString(),
    categoria,
    testo: testo.trim(),
    posto,
    ...(selezione ? { selezione } : {}),
    versione: __VERSIONE__,
  }
  scrivi([...leggiSegnalazioni(), s])
  return s
}

export function svuota(): void {
  try {
    localStorage.removeItem(CHIAVE)
  } catch {
    /* niente da fare */
  }
}

// ─────────────────── mandarle via ───────────────────

const etichetta = (c: Categoria) => CATEGORIE.find((x) => x.id === c)?.etichetta ?? c

/**
 * Il testo che arriva a chi corregge.
 *
 * La prima riga fra parentesi quadre è pensata per essere letta da uno script
 * (`npm run segnalazioni`), non da un umano: è quella che dice dove mettere le
 * mani. Il resto è per l'umano.
 */
export function testoDi(s: Segnalazione): string {
  return [
    `[ianua ${s.versione}] ${coordinata(s.posto)}`,
    `${etichetta(s.categoria)} — ${s.posto.estratto}`,
    ...(s.selezione ? ['', `sul punto: «${s.selezione}»`] : []),
    '',
    s.testo || '(nessun commento)',
  ].join('\n')
}

export function testoDiTutte(lista: Segnalazione[]): string {
  if (!lista.length) return 'Nessuna segnalazione.'
  return lista
    .map((s, k) => `── ${k + 1}/${lista.length} ─────────────\n${testoDi(s)}`)
    .join('\n\n')
}

export type EsitoInvio = 'condiviso' | 'copiato' | 'niente'

/**
 * Prova a passare il testo a un'altra app (WhatsApp, mail, Telegram…). Se il
 * browser non lo prevede — quasi tutti i desktop — lo copia negli appunti.
 */
export async function manda(testo: string, titolo = 'Segnalazione Ianua'): Promise<EsitoInvio> {
  try {
    if (navigator.share) {
      await navigator.share({ title: titolo, text: testo })
      return 'condiviso'
    }
  } catch (e) {
    // L'utente ha chiuso il foglio di condivisione: non è un errore, ma non
    // ha nemmeno mandato niente. Meglio non fingere di sì.
    if (e instanceof DOMException && e.name === 'AbortError') return 'niente'
  }
  try {
    await navigator.clipboard.writeText(testo)
    return 'copiato'
  } catch {
    return 'niente'
  }
}

/** Scarica tutte le segnalazioni come file, per mandarle in blocco. */
export function esportaSegnalazioni(lista: Segnalazione[]): string {
  const nome = `ianua-segnalazioni-${new Date().toISOString().slice(0, 10)}.json`
  const blob = new Blob([JSON.stringify({ app: 'ianua-segnalazioni', lista }, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return nome
}
