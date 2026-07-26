import type { Progress } from './useProgress'

/**
 * Portare via i propri progressi.
 *
 * I progressi stanno nel localStorage del browser, e il localStorage è legato
 * a quel browser su quel dispositivo: cambi telefono, o cancelli i dati di
 * navigazione, e mesi di studio spariscono senza preavviso. Un account
 * risolverebbe il problema, ma vorrebbe dire un server da mantenere.
 *
 * Un file scaricabile no: costa niente, non manda niente a nessuno, e
 * funziona anche fra dispositivi diversi. È il minimo indispensabile perché
 * il lavoro fatto non dipenda dalla buona salute di un browser.
 */

/** Il formato del file esportato. Il numero serve se un giorno cambierà. */
const FORMATO = 1
const FIRMA = 'ianua'

export interface FileSalvataggio {
  app: typeof FIRMA
  formato: number
  esportato: string
  progressi: Progress
}

/** Data leggibile in italiano: «26 luglio 2026». */
function dataItaliana(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'data sconosciuta'
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Quattro numeri per capire al volo che cosa contiene un salvataggio. */
export function riassunto(p: Progress): string {
  const lezioni = p.completed.length
  const parole = Object.keys(p.vocab ?? {}).length
  const versioni = (p.versiones ?? []).length
  const pezzi = [
    `${lezioni} ${lezioni === 1 ? 'lezione' : 'lezioni'}`,
    `${p.xp} XP`,
  ]
  if (parole) pezzi.push(`${parole} ${parole === 1 ? 'parola' : 'parole'} in memoria`)
  if (versioni) pezzi.push(`${versioni} ${versioni === 1 ? 'versione' : 'versioni'}`)
  return pezzi.join(' · ')
}

/** Scarica i progressi come file. */
export function esporta(progress: Progress): string {
  const contenuto: FileSalvataggio = {
    app: FIRMA,
    formato: FORMATO,
    esportato: new Date().toISOString(),
    progressi: progress,
  }
  const nome = `ianua-progressi-${new Date().toISOString().slice(0, 10)}.json`
  const blob = new Blob([JSON.stringify(contenuto, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Il browser ha bisogno di un istante per iniziare a scaricare prima che
  // l'indirizzo temporaneo venga buttato via.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return nome
}

/** Errore con un messaggio che si può mostrare così com'è. */
export class ErroreSalvataggio extends Error {}

/**
 * Legge un file scelto dall'utente. Non tocca niente: restituisce solo quello
 * che ha trovato, così si può mostrare prima di sovrascrivere.
 */
export async function leggi(file: File): Promise<{ progressi: Progress; quando: string }> {
  let testo: string
  try {
    testo = await file.text()
  } catch {
    throw new ErroreSalvataggio('Non sono riuscito a leggere il file.')
  }

  let dato: unknown
  try {
    dato = JSON.parse(testo)
  } catch {
    throw new ErroreSalvataggio(
      'Questo non sembra un file di salvataggio: non è nel formato giusto.',
    )
  }

  const f = dato as Partial<FileSalvataggio>
  if (!f || typeof f !== 'object' || f.app !== FIRMA) {
    throw new ErroreSalvataggio('Questo file non è un salvataggio di Ianua.')
  }
  if (typeof f.formato === 'number' && f.formato > FORMATO) {
    throw new ErroreSalvataggio(
      'Questo salvataggio viene da una versione più recente dell’app: aggiornala e riprova.',
    )
  }
  const p = f.progressi as Progress | undefined
  if (!p || typeof p !== 'object' || !Array.isArray(p.completed) || typeof p.xp !== 'number') {
    throw new ErroreSalvataggio('Il file è danneggiato: i progressi non si leggono.')
  }

  return { progressi: p, quando: dataItaliana(f.esportato ?? '') }
}

/**
 * Chiede al browser di NON buttare via i dati quando lo spazio scarseggia.
 *
 * Senza questa richiesta il localStorage è «best effort»: il browser può
 * cancellarlo per fare posto, e nessuno avvisa. Non è garantito che venga
 * concessa — dipende da quanto l'utente usa il sito — ma chiederlo è gratis.
 */
export async function chiediSpazioDurevole(): Promise<void> {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) {
      await navigator.storage.persist()
    }
  } catch {
    // Se il browser non lo prevede, si continua come prima.
  }
}
