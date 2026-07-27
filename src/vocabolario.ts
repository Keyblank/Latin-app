import { curriculum } from './data/curriculum.ts'
import { versiones } from './data/versiones.ts'

/**
 * Il vocabolario del corso, ricavato dalle lezioni di lessico.
 *
 * Non c'è un elenco separato da tenere aggiornato: le parole sono quelle delle
 * tabelle «Latino / Italiano», lette dal curriculum. Se aggiungi una lezione di
 * vocaboli, entra da sola anche nel ripasso.
 */
export interface Vocabolo {
  /** La forma latina come sta in tabella (es. «omnis, omne»). */
  lat: string
  /** Il significato. */
  ita: string
  /** Dopo quante lezioni completate la parola è stata incontrata. */
  dopo: number
  /** Unità da cui viene: serve a pescare distrattori credibili. */
  unita: string
  /** Lezione che la insegna: quando la finisci, la parola entra nel ripasso. */
  lezione: string
}

function estrai(): Vocabolo[] {
  const out: Vocabolo[] = []
  const perParola = new Map<string, number>()
  let lezioni = 0

  /** La prima parola della citazione: «rosa, rosae» e «rosa» sono la stessa
   *  voce, e non ha senso chiederla due volte. */
  const chiave = (lat: string) => lat.split(/[,\s(]/)[0].toLowerCase()

  const aggiungi = (lat: string, ita: string, unita: string, lezione: string) => {
    // «cornū (n.)» → «cornū»: il genere è un'informazione della tabella, non
    // fa parte della parola da riconoscere.
    lat = lat.replace(/\s*\((m|f|n)\.\)\s*/g, ' ').trim()
    // «isola — e anche il palazzo d'affitto» → «isola»: la coda è un
    // approfondimento utile in tabella, ma qui sarebbe l'opzione più lunga e
    // quindi la risposta regalata.
    ita = ita.split(' — ')[0].trim()
    if (!lat || !ita) return
    const k = chiave(lat)
    const gia = perParola.get(k)
    if (gia !== undefined) {
      // se arriva la forma da vocabolario («rosa, rosae») rimpiazza quella
      // nuda: è quella che lo studente deve saper cercare
      if (lat.includes(',') && !out[gia].lat.includes(',')) out[gia] = { ...out[gia], lat }
      return
    }
    perParola.set(k, out.length)
    out.push({ lat, ita, dopo: lezioni, unita, lezione })
  }

  for (const u of curriculum) {
    for (const l of u.lessons) {
      lezioni++
      for (const ex of l.exercises) {
        if (ex.type === 'table') {
          // Le tabelle di vocaboli sono marcate nel corso con «lessico: true»:
          // le altre sono declinazioni e coniugazioni, e «amātus es = sei stato
          // amato» non è una parola da ripassare.
          if (ex.lessico) {
            for (const r of ex.rows) {
              // Con tre colonne la seconda è il genitivo: «homō» + «hominis»
              // fanno la voce da vocabolario «homō, hominis».
              const lat = r.length > 2 ? `${r[0]}, ${r[1]}` : String(r[0])
              aggiungi(lat, String(r[r.length - 1]), u.id, l.id)
            }
            continue
          }
          // Le parole-modello stanno nel titolo della loro tabella:
          // «rosa, rosae (f.) — «la rosa»». Sono le più importanti del corso.
          const m = ex.title.match(/^(.+?)\s+—\s+«(.+)»$/)
          if (m) aggiungi(m[1].replace(/\s*\((m|f|n)\.\)\s*$/, ''), m[2], u.id, l.id)
        }
        // Le schede non si leggono: quello che mostrano è la parola CALATA in
        // una frase — «amat», «magna», «est» — e nel ripasso una forma flessa
        // non serve, perché sul vocabolario non la trovi. Le parole nuove delle
        // prime unità stanno nelle loro tabelle, marcate come le altre.
      }
    }
  }
  return out
}

export const vocabolario: Vocabolo[] = estrai()

/**
 * Una frase vera in cui la parola compare, presa dalle versioni.
 *
 * Chiedere «che cosa vuol dire rēx» è una cosa; riconoscere «rēgem» dentro
 * una frase e capire che è lo stesso vocabolo è quello che serve davvero a
 * tradurre. Le frasi non sono inventate qui: sono quelle dei brani, dove
 * ogni parola ha già lemma e analisi controllati.
 */
export interface Contesto {
  frase: string
  /** La forma come compare nel testo: «rēgem», non «rēx». */
  forma: string
}

const CONTESTI: Map<string, Contesto> = (() => {
  const m = new Map<string, Contesto>()
  const capo = (s: string) =>
    s.replace(/\s*\((m|f|n)\.\)\s*/g, ' ').split(/[,(]/)[0].trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').toLowerCase()
  for (const v of versiones) {
    for (const f of v.frasi) {
      for (const parola of f.lat.split(/[\s.,;:!?«»]+/)) {
        const g = v.parole[parola]
        if (!g) continue
        const k = capo(g.lemma)
        // La prima frase che la contiene: le altre sono altrettanto buone e
        // una basta.
        if (k && !m.has(k)) m.set(k, { frase: f.lat, forma: parola })
      }
    }
  }
  return m
})()

/** La frase di contesto per un vocabolo, se il corso ne ha una. */
export function contestoPer(v: Vocabolo): Contesto | undefined {
  const k = v.lat.replace(/\s*\((m|f|n)\.\)\s*/g, ' ').split(/[,(]/)[0].trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  return CONTESTI.get(k)
}

/** Le parole insegnate da una lezione. */
export function paroleDiLezione(lessonId: string): Vocabolo[] {
  return vocabolario.filter((v) => v.lezione === lessonId)
}

/** Quanti giorni aspettare prima di rivedere una parola, per livello di
 *  padronanza. Gli intervalli crescono: è la ripetizione dilazionata. */
export const INTERVALLI = [1, 3, 7, 16, 35, 90]

export const LIVELLO_MAX = INTERVALLI.length

/** Quante parole per sessione. */
export const PER_SESSIONE = 12

/** Quante parole NUOVE si possono incontrare in un giorno.
 *
 *  Il tetto è il punto della ripetizione dilazionata: senza, si divorano
 *  tutti i vocaboli in una sera e il giorno dopo tornano tutti insieme.
 *  Poche parole al giorno, ripassate a distanza, si ricordano; molte in una
 *  volta no. */
export const NUOVE_AL_GIORNO = 5

export function oggi(): string {
  return new Date().toISOString().slice(0, 10)
}

/** La data (YYYY-MM-DD) fra n giorni. */
export function fraGiorni(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Stato di memoria di una parola. */
export interface Memoria {
  /** Livello: 0 = appena vista, cresce a ogni risposta giusta. */
  liv: number
  /** Quando va rivista (YYYY-MM-DD). */
  quando: string
  /**
   * Quanto quella parola ti riesce facile, da 0.5 a 1.6 (di partenza 1).
   * Moltiplica l'intervallo: una parola che sbagli spesso torna prima di una
   * che sai al volo, anche se sono allo stesso livello. Senza, tutte le
   * parole salirebbero la stessa scala — e non è vero che costano uguale.
   */
  facilita?: number
}

const FACILITA_MIN = 0.5
const FACILITA_MAX = 1.6
/** Quanto scende la facilità quando sbagli, quanto sale quando indovini. */
const GIU = 0.2
const SU = 0.05
/** Quanti livelli si perdono sbagliando.
 *
 *  Non si torna a zero: una parola tenuta per tre mesi e mancata una volta
 *  non è tornata sconosciuta, e rifarle risalire tutta la scala sprecherebbe
 *  ripassi che servono altrove. */
const LIVELLI_PERSI = 2

/**
 * Sceglie le parole della prossima sessione: prima quelle in scadenza (le più
 * vecchie per prime), poi qualche parola nuova se resta posto.
 */
export function daRipassare(
  memoria: Record<string, Memoria>,
  lezioniFatte: number,
  libero: boolean,
  nuoveRimaste = NUOVE_AL_GIORNO,
): { scadute: Vocabolo[]; nuove: Vocabolo[] } {
  const adesso = oggi()
  const disponibili = vocabolario.filter((v) => libero || v.dopo <= lezioniFatte)

  const scadute = disponibili
    .filter((v) => memoria[v.lat] && memoria[v.lat].quando <= adesso)
    .sort((a, b) => memoria[a.lat].quando.localeCompare(memoria[b.lat].quando))
    .slice(0, PER_SESSIONE)

  const spazio = Math.max(0, Math.min(nuoveRimaste, PER_SESSIONE - scadute.length))
  const nuove = disponibili.filter((v) => !memoria[v.lat]).slice(0, spazio)

  return { scadute, nuove }
}

/** Quante parole nuove si possono ancora incontrare oggi. */
export function nuoveRimasteOggi(contatore: { data: string; n: number }): number {
  if (contatore.data !== oggi()) return NUOVE_AL_GIORNO
  return Math.max(0, NUOVE_AL_GIORNO - contatore.n)
}

/** Quante parole aspettano oggi (scadute + nuove che entrerebbero). */
export function quanteOggi(
  memoria: Record<string, Memoria>,
  lezioniFatte: number,
  libero: boolean,
  nuoveRimaste = NUOVE_AL_GIORNO,
): number {
  const { scadute, nuove } = daRipassare(memoria, lezioniFatte, libero, nuoveRimaste)
  return scadute.length + nuove.length
}

/** L'intervallo vero: quello del livello, corretto da quanto la parola ti
 *  riesce facile. Mai meno di un giorno. */
export function giorniDiAttesa(liv: number, facilita: number): number {
  const base = INTERVALLI[Math.min(liv, LIVELLO_MAX) - 1] ?? INTERVALLI[0]
  return Math.max(1, Math.round(base * facilita))
}

/** Il nuovo stato di una parola dopo una risposta. */
export function avanza(prec: Memoria | undefined, giusta: boolean): Memoria {
  const facilitaPrec = prec?.facilita ?? 1
  if (!giusta) {
    const facilita = Math.max(FACILITA_MIN, facilitaPrec - GIU)
    const liv = Math.max(0, (prec?.liv ?? 0) - LIVELLI_PERSI)
    // Comunque domani: sbagliata va rivista subito, qualunque livello avesse.
    return { liv, quando: fraGiorni(1), facilita }
  }
  const facilita = Math.min(FACILITA_MAX, facilitaPrec + SU)
  const liv = Math.min((prec?.liv ?? 0) + 1, LIVELLO_MAX)
  return { liv, quando: fraGiorni(giorniDiAttesa(liv, facilita)), facilita }
}

/** Il primo significato di una glossa: «uccidere, abbattere» → «uccidere». */
const sensoPrincipale = (ita: string) => ita.split(/[,;(]/)[0].trim().toLowerCase()

/** Tre significati sbagliati, presi da parole della stessa unità quando
 *  possibile: distrattori troppo lontani rendono la domanda banale.
 *
 *  Sono esclusi i sinonimi: «interficere» = «uccidere» non può avere come
 *  distrattore «uccidere, abbattere», perché non ci sarebbe modo di scegliere.
 *  Una domanda senza risposta giusta non insegna niente e fa solo perdere la
 *  parola, che tornerebbe indietro di livello per colpa nostra. */
export function distrattori(v: Vocabolo, quanti = 3): string[] {
  const senso = sensoPrincipale(v.ita)
  const buono = (x: Vocabolo) => x.ita !== v.ita && sensoPrincipale(x.ita) !== senso
  const vicini = vocabolario.filter((x) => x.unita === v.unita && buono(x))
  const altri = vocabolario.filter((x) => x.unita !== v.unita && buono(x))
  const pool = [...mescola(vicini), ...mescola(altri)]
  const out: string[] = []
  for (const x of pool) {
    if (out.length >= quanti) break
    if (!out.includes(x.ita)) out.push(x.ita)
  }
  return out
}

/** Tre parole latine sbagliate: per la domanda nel verso opposto. */
export function distrattoriLatini(v: Vocabolo, quanti = 3): string[] {
  const senso = sensoPrincipale(v.ita)
  const buono = (x: Vocabolo) => x.lat !== v.lat && sensoPrincipale(x.ita) !== senso
  const vicini = vocabolario.filter((x) => x.unita === v.unita && buono(x))
  const altri = vocabolario.filter((x) => x.unita !== v.unita && buono(x))
  const out: string[] = []
  for (const x of [...mescola(vicini), ...mescola(altri)]) {
    if (out.length >= quanti) break
    if (!out.includes(x.lat)) out.push(x.lat)
  }
  return out
}

export function mescola<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
