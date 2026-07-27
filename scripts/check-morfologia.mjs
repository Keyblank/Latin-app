// Controlla il LATINO DELLE FRASI con un analizzatore morfologico.
//
// I paradigmi delle tabelle sono verificati altrove (npm run check e
// check:quantita). Quello che restava scoperto sono le frasi: gli esempi degli
// esercizi, i brani delle versioni, le traduzioni da comporre. Sono scritte a
// mano, e un errore lì non lo vede nessuno.
//
// Qui ogni parola latina del corso passa per l'analizzatore costruito sui dati
// di Whitaker's Words (scripts/morfologia.mjs). Due controlli:
//
//   1. la forma ESISTE in latino? (se non si analizza, o è rara o è sbagliata)
//   2. l'ANALISI che il corso dichiara è giusta? (gli esercizi di analisi
//      affermano «rosam è accusativo singolare»: l'analizzatore lo conferma?)
//
// Uso:  npm run lemmi   (una volta, scarica i dati)
//       npm run check:morfologia [--tutto]

import { analizza, datiPresenti, senzaLineette } from './morfologia.mjs'
import { curriculum } from '../src/data/curriculum.ts'
import { versiones } from '../src/data/versiones.ts'

if (!datiPresenti()) {
  console.error('Mancano i dati di Whitaker — scaricali con:  npm run lemmi')
  process.exit(2)
}

const tutto = process.argv.includes('--tutto')

// ─────────────────── 1. tutte le parole delle frasi ───────────────────

/** Le frasi latine del corso, con l'indicazione di dove stanno. */
function frasiLatine() {
  const out = []
  for (const v of versiones) {
    for (const f of v.frasi) out.push({ testo: f.lat, dove: `versio «${v.titolo}»` })
  }
  for (const u of curriculum) {
    for (const l of u.lessons) {
      for (const ex of l.exercises) {
        const dove = `${u.id} · ${l.title}`
        if (ex.type === 'analysis') out.push({ testo: ex.sentence, dove })
        if (ex.type === 'build') out.push({ testo: ex.answer.join(' '), dove })
        if (ex.type === 'choice' && ex.focus && /\s/.test(ex.focus)) {
          out.push({ testo: ex.focus, dove })
        }
      }
    }
  }
  return out
}

/**
 * Parole che l'analizzatore non conosce ma che vanno bene lo stesso: nomi
 * propri, parole del corso volutamente tarde o rare. Elencarle qui, invece di
 * ignorare in blocco tutto ciò che comincia per maiuscola, tiene il controllo
 * stretto: una parola nuova che non si analizza salta fuori.
 */
const AMMESSE = new Set([
  'caesar', 'roma', 'romam', 'romae', 'romani', 'romanus', 'romana', 'romanum',
  'romanorum', 'romanos', 'gallia', 'galliam', 'gallos', 'gallorum',
  'porsenna', 'mucius', 'scaevola', 'etruscorum', 'romulus', 'remus',
  'daedalus', 'icarus', 'catilina', 'catilinam', 'hannibal', 'hannibalem',
  'scipio', 'africam', 'italiam', 'cicero', 'phaedrus', 'helvetiorum',
  'ianua', 'ianuam', 'mucium',
])

const nonTrovate = []
let paroleControllate = 0
const gia = new Set()

for (const { testo, dove } of frasiLatine()) {
  for (const grezza of testo.split(/[\s.,;:!?«»()"—]+/)) {
    if (!grezza) continue
    const p = senzaLineette(grezza)
    if (p.length < 2 || /[^a-z]/.test(p)) continue
    if (AMMESSE.has(p)) continue
    paroleControllate++
    if (gia.has(p)) continue
    gia.add(p)
    if (analizza(grezza).length === 0) nonTrovate.push({ parola: grezza, dove, testo })
  }
}

console.log(`Parole latine nelle frasi: ${paroleControllate} (${gia.size} diverse).`)
if (!nonTrovate.length) {
  console.log('Tutte si analizzano.')
} else {
  console.log(`\n${nonTrovate.length} forme che l'analizzatore non riconosce:\n`)
  for (const n of nonTrovate) {
    console.log(`  «${n.parola}» — ${n.dove}`)
    if (tutto) console.log(`      in: ${n.testo}`)
  }
  console.log(
    '\nNon sono per forza errori: possono essere nomi propri o parole che il\n' +
      'dizionario di Whitaker non copre. Ma vanno guardate.',
  )
}

// ─────────────────── 2. le analisi dichiarate dal corso ───────────────────
//
// Gli esercizi di analisi affermano che una certa parola, in una certa frase,
// è (per dire) accusativo singolare. È l'unica parte del corso che fa
// un'affermazione grammaticale verificabile parola per parola: se
// l'analizzatore non trova nessuna lettura che le dia ragione, o l'esercizio
// sbaglia o la parola è ambigua in un modo che non avevamo previsto.

/** Le forme di «esse» che compongono i tempi perfetti passivi. */
const ESSERE = new Set(['est', 'sunt', 'erat', 'erant', 'sit', 'esset', 'fuit', 'sum', 'es'])

const ETICHETTE = {
  Nominativo: 'NOM', Genitivo: 'GEN', Dativo: 'DAT', Accusativo: 'ACC',
  Ablativo: 'ABL', Vocativo: 'VOC',
  Singolare: 'S', Plurale: 'P',
  Maschile: 'M', Femminile: 'F', Neutro: 'N',
  Presente: 'PRES', Imperfetto: 'IMPF', Perfetto: 'PERF',
  Piuccheperfetto: 'PLUP', Futuro: 'FUT',
  Indicativo: 'IND', Congiuntivo: 'SUB',
  Passivo: 'PASSIVE', Attivo: 'ACTIVE',
  '1ª singolare': ['1', 'S'], '2ª singolare': ['2', 'S'], '3ª singolare': ['3', 'S'],
  '1ª plurale': ['1', 'P'], '2ª plurale': ['2', 'P'], '3ª plurale': ['3', 'P'],
}

/** I codici morfologici che una risposta del corso implica. */
const codici = (risposta) => {
  const c = ETICHETTE[risposta]
  return c === undefined ? [] : Array.isArray(c) ? c : [c]
}

console.log('\n─────────── le analisi dichiarate negli esercizi ───────────')
const smentite = []
let verificate = 0
let nonVerificabili = 0

for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const ex of l.exercises) {
      if (ex.type !== 'analysis') continue
      const pezzi = ex.word.split(/\s+/)
      // «capta est», «hortātus est»: forme composte da participio + «esse».
      // Tempo e diatesi appartengono alla coppia, non al participio da solo:
      // di quelle il corso è già verificato dai paradigmi. Qui controlliamo
      // che il participio esista e concordi.
      const composta = pezzi.length > 1 && ESSERE.has(senzaLineette(pezzi[pezzi.length - 1]))
      const letture = analizza(pezzi[0])
      if (!letture.length) {
        nonVerificabili++
        continue
      }
      // Tutti i codici che il corso afferma per questa parola.
      const attesi = ex.fields
        .flatMap((f) => codici(f.answer))
        // Di una forma composta il participio da solo non porta il tempo né
        // la persona: quelli stanno in «est».
        .filter((c) => !composta || /^(NOM|GEN|DAT|ACC|ABL|VOC|S|P|M|F|N)$/.test(c))
      if (!attesi.length) {
        nonVerificabili++
        continue
      }
      verificate++
      // Basta UNA lettura che contenga tutti i codici dichiarati: la forma è
      // ambigua per definizione, e il corso sceglie quella giusta nel contesto.
      const daccordo = letture.some((r) => attesi.every((c) => r.analisi.includes(c)))
      if (!daccordo) {
        smentite.push({
          dove: `${u.id} · ${l.title}`,
          parola: ex.word,
          frase: ex.sentence,
          dichiarato: ex.fields.map((f) => `${f.label}: ${f.answer}`).join(' · '),
          letture: [...new Set(letture.map((r) => r.analisi.join(' ')))].slice(0, 6),
        })
      }
    }
  }
}

console.log(`Analisi verificate: ${verificate}; non verificabili con questi dati: ${nonVerificabili}.`)
if (!smentite.length) {
  console.log("L'analizzatore conferma tutte le analisi dichiarate dal corso.")
} else {
  console.log(`\n${smentite.length} analisi che l'analizzatore non conferma:\n`)
  for (const s of smentite) {
    console.log(`  «${s.parola}» in «${s.frase}» — ${s.dove}`)
    console.log(`      il corso dice: ${s.dichiarato}`)
    console.log(`      l'analizzatore legge: ${s.letture.join(' / ')}`)
  }
}
