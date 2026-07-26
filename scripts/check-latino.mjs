// Controllo automatico del corso.
//
// Serve perché chi usa e sviluppa quest'app può non sapere il latino: le forme
// vanno verificate da qualcosa, non dalla fiducia. Qui dentro ci sono i
// paradigmi corretti, scritti a mano e con le lineette delle vocali lunghe;
// lo script li confronta con quello che c'è davvero in curriculum.ts, e
// controlla anche che gli esercizi siano ben formati.
//
//   npm run check
//
import { curriculum } from '../src/data/curriculum.ts'

// ─────────────────── i paradigmi di riferimento ───────────────────
// Le forme sono elencate nell'ordine in cui compaiono nella tabella, lette
// per righe. Il titolo della tabella fa da chiave.

const PARADIGMI = {
  'rosa, rosae (f.) — «la rosa»': [
    'rosa', 'rosae', 'rosae', 'rosārum', 'rosae', 'rosīs',
    'rosam', 'rosās', 'rosā', 'rosīs', 'rosa', 'rosae',
  ],
  'dominus, dominī (m.) — «il padrone»': [
    'dominus', 'dominī', 'dominī', 'dominōrum', 'dominō', 'dominīs',
    'dominum', 'dominōs', 'dominō', 'dominīs', 'domine', 'dominī',
  ],
  'templum, templī (n.) — «il tempio»': [
    'templum', 'templa', 'templī', 'templōrum', 'templō', 'templīs',
    'templum', 'templa', 'templō', 'templīs',
  ],
  'rēx, rēgis (m.) — «il re»': [
    'rēx', 'rēgēs', 'rēgis', 'rēgum', 'rēgī', 'rēgibus',
    'rēgem', 'rēgēs', 'rēge', 'rēgibus',
  ],
  'nōmen, nōminis (n.) — «il nome»': [
    'nōmen', 'nōmina', 'nōminis', 'nōminum', 'nōminī', 'nōminibus',
    'nōmen', 'nōmina', 'nōmine', 'nōminibus',
  ],
  'amāre (amare) — presente': ['amō', 'amās', 'amat', 'amāmus', 'amātis', 'amant'],
  'esse (essere) — presente': ['sum', 'es', 'est', 'sumus', 'estis', 'sunt'],
  'amāre — imperfetto': ['amābam', 'amābās', 'amābat', 'amābāmus', 'amābātis', 'amābant'],
  'esse — imperfetto («ero, eri, era…»)': ['eram', 'erās', 'erat', 'erāmus', 'erātis', 'erant'],
  'amāre — perfetto': ['amāvī', 'amāvistī', 'amāvit', 'amāvimus', 'amāvistis', 'amāvērunt'],
  'amāre al presente passivo': ['amor', 'amāris', 'amātur', 'amāmur', 'amāminī', 'amantur'],
  'Il perfetto passivo di amāre': [
    'amātus sum', 'amātus es', 'amātus est',
    'amātī sumus', 'amātī estis', 'amātī sunt',
  ],
  'quī, quae, quod — singolare': [
    'quī', 'quae', 'quod', 'cuius', 'cuius', 'cuius', 'cui', 'cui', 'cui',
    'quem', 'quam', 'quod', 'quō', 'quā', 'quō',
  ],
  'is, ea, id — singolare': [
    'is', 'ea', 'id', 'eius', 'eius', 'eius', 'eī', 'eī', 'eī',
    'eum', 'eam', 'id', 'eō', 'eā', 'eō',
  ],
  'is, ea, id — plurale': [
    'eī', 'eae', 'ea', 'eōrum', 'eārum', 'eōrum', 'eīs', 'eīs', 'eīs',
    'eōs', 'eās', 'ea', 'eīs', 'eīs', 'eīs',
  ],
  'hic, haec, hoc (questo) — singolare': [
    'hic', 'haec', 'hoc', 'huius', 'huius', 'huius', 'huic', 'huic', 'huic',
    'hunc', 'hanc', 'hoc', 'hōc', 'hāc', 'hōc',
  ],
  'ille, illa, illud (quello) — singolare': [
    'ille', 'illa', 'illud', 'illīus', 'illīus', 'illīus', 'illī', 'illī', 'illī',
    'illum', 'illam', 'illud', 'illō', 'illā', 'illō',
  ],
  'ego (io) e tū (tu)': [
    'ego', 'tū', 'meī', 'tuī', 'mihi', 'tibi', 'mē', 'tē', 'mē', 'tē',
  ],
  'nōs (noi) e vōs (voi)': [
    'nōs', 'vōs', 'nostrī', 'vestrī', 'nōbīs', 'vōbīs',
    'nōs', 'vōs', 'nōbīs', 'vōbīs',
  ],
  'sē — il riflessivo di 3ª persona': ['—', 'suī', 'sibi', 'sē', 'sē'],
  'Presente congiuntivo — le 4 coniugazioni': [
    'amem', 'moneam', 'legam', 'audiam',
    'amēs', 'moneās', 'legās', 'audiās',
    'amet', 'moneat', 'legat', 'audiat',
    'amēmus', 'moneāmus', 'legāmus', 'audiāmus',
    'amētis', 'moneātis', 'legātis', 'audiātis',
    'ament', 'moneant', 'legant', 'audiant',
  ],
  'esse — presente congiuntivo': ['sim', 'sīs', 'sit', 'sīmus', 'sītis', 'sint'],
  'Imperfetto congiuntivo — le 4 coniugazioni': [
    'amārem', 'legerem', 'audīrem', 'essem',
    'amārēs', 'legerēs', 'audīrēs', 'essēs',
    'amāret', 'legeret', 'audīret', 'esset',
    'amārēmus', 'legerēmus', 'audīrēmus', 'essēmus',
    'amārētis', 'legerētis', 'audīrētis', 'essētis',
    'amārent', 'legerent', 'audīrent', 'essent',
  ],
  'Perfetto e piuccheperfetto congiuntivo di amāre': [
    'amāverim', 'amāvissem',
    'amāverīs', 'amāvissēs',
    'amāverit', 'amāvisset',
    'amāverīmus', 'amāvissēmus',
    'amāverītis', 'amāvissētis',
    'amāverint', 'amāvissent',
  ],
}

const problemi = []
const segnala = (dove, testo) => problemi.push(`${dove}\n    ${testo}`)

// ─────────────────── 1. le forme latine ───────────────────

let tabelleControllate = 0
for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const ex of l.exercises) {
      if (ex.type !== 'table') continue
      const atteso = PARADIGMI[ex.title]
      if (!atteso) continue
      tabelleControllate++
      // colonne latine: tutte tranne l'etichetta di riga e le glosse italiane
      const cols = ex.columns
        .map((c, i) => ((i > 0 || /latino|forma/i.test(c)) && !/italiano|significato/i.test(c) ? i : -1))
        .filter((i) => i >= 0)
      const trovato = ex.rows.flatMap((r) => cols.map((i) => r[i]))
      const dove = `${u.id} · ${l.title} · tabella «${ex.title}»`
      if (trovato.length !== atteso.length) {
        segnala(dove, `ha ${trovato.length} forme, ne servono ${atteso.length}`)
        continue
      }
      trovato.forEach((f, i) => {
        if (f !== atteso[i]) segnala(dove, `«${f}» dovrebbe essere «${atteso[i]}»`)
      })
    }
  }
}
// Se una tabella viene rinominata, il suo paradigma smette di essere
// controllato in silenzio: meglio accorgersene.
const nonTrovate = Object.keys(PARADIGMI).filter(
  (t) => !curriculum.some((u) =>
    u.lessons.some((l) => l.exercises.some((e) => e.type === 'table' && e.title === t))),
)
for (const t of nonTrovate) {
  segnala('paradigmi', `la tabella «${t}» non esiste più: aggiorna il riferimento o toglilo`)
}

// ─────────────────── 2. gli esercizi ───────────────────

let esercizi = 0
for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const ex of l.exercises) {
      esercizi++
      const dove = `${u.id} · ${l.title}`

      if (ex.type === 'choice') {
        if (!ex.options.includes(ex.answer)) {
          segnala(dove, `la risposta «${ex.answer}» non è fra le opzioni di «${ex.prompt}»`)
        }
        if (new Set(ex.options).size !== ex.options.length) {
          segnala(dove, `opzioni ripetute in «${ex.prompt}»`)
        }
      }

      if (ex.type === 'build') {
        const banco = [...ex.answer, ...(ex.extra ?? [])]
        for (const w of ex.answer) {
          if (!banco.includes(w)) segnala(dove, `«${w}» non è nel banco di «${ex.prompt}»`)
        }
      }

      if (ex.type === 'match') {
        const sx = ex.pairs.map((p) => p[0])
        const dx = ex.pairs.map((p) => p[1])
        // Una coppia con le due parole identiche («rosa» → «rosa») non insegna
        // niente; e in passato bloccava anche l'esercizio.
        for (const [a, b] of ex.pairs) {
          if (a === b) segnala(dove, `coppia inutile: «${a}» → «${b}»`)
        }
        if (new Set(sx).size !== sx.length) segnala(dove, `parole ripetute a sinistra in «${ex.prompt}»`)
        if (new Set(dx).size !== dx.length) segnala(dove, `parole ripetute a destra in «${ex.prompt}»`)
      }

      if (ex.type === 'table') {
        for (const r of ex.rows) {
          if (r.length !== ex.columns.length) {
            segnala(dove, `riga con ${r.length} celle in una tabella da ${ex.columns.length} colonne: «${ex.title}»`)
          }
        }
      }
    }
  }
}

// ─────────────────── 3. le lezioni ───────────────────

const idVisti = new Set()
let lezioni = 0
for (const u of curriculum) {
  for (const l of u.lessons) {
    lezioni++
    if (idVisti.has(l.id)) segnala(u.id, `l'id di lezione «${l.id}» è usato due volte`)
    idVisti.add(l.id)
    // Una lezione di sole schede non fa mai guadagnare niente né sbagliare.
    if (!l.exercises.some((e) => e.type !== 'info' && e.type !== 'table')) {
      segnala(`${u.id} · ${l.title}`, 'nessun esercizio da svolgere: solo schede e tabelle')
    }
  }
}

// ─────────────────── esito ───────────────────

console.log(`Corso: ${curriculum.length} sezioni, ${lezioni} lezioni, ${esercizi} esercizi.`)
console.log(`Paradigmi latini verificati: ${tabelleControllate}.`)

if (problemi.length) {
  console.log(`\n${problemi.length} problemi:\n`)
  for (const p of problemi) console.log('  • ' + p)
  process.exit(1)
}
console.log('\nTutto a posto.')
