import { curriculum } from './data/curriculum.ts'

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
}

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

/** Il nuovo stato di una parola dopo una risposta. */
export function avanza(prec: Memoria | undefined, giusta: boolean): Memoria {
  if (!giusta) {
    // Sbagliata: si torna in fondo e la si rivede domani. Niente sconti.
    return { liv: 0, quando: fraGiorni(1) }
  }
  const liv = Math.min((prec?.liv ?? 0) + 1, LIVELLO_MAX)
  return { liv, quando: fraGiorni(INTERVALLI[liv - 1]) }
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
