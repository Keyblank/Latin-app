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
import { versiones } from '../src/data/versiones.ts'
import { vocabolario } from '../src/vocabolario.ts'

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
  'Futuro — 1ª e 2ª coniugazione': [
    'amābō', 'monēbō', 'amābis', 'monēbis', 'amābit', 'monēbit',
    'amābimus', 'monēbimus', 'amābitis', 'monēbitis', 'amābunt', 'monēbunt',
  ],
  'Futuro — 3ª e 4ª coniugazione': [
    'legam', 'audiam', 'legēs', 'audiēs', 'leget', 'audiet',
    'legēmus', 'audiēmus', 'legētis', 'audiētis', 'legent', 'audient',
  ],
  'esse — futuro': ['erō', 'eris', 'erit', 'erimus', 'eritis', 'erunt'],
  'Piuccheperfetto indicativo di amāre': [
    'amāveram', 'amāverās', 'amāverat', 'amāverāmus', 'amāverātis', 'amāverant',
  ],
  'manus, manūs (f.) — «la mano»': [
    'manus', 'manūs', 'manūs', 'manuum', 'manuī', 'manibus',
    'manum', 'manūs', 'manū', 'manibus',
  ],
  'rēs, reī (f.) — «la cosa»': [
    'rēs', 'rēs', 'reī', 'rērum', 'reī', 'rēbus',
    'rem', 'rēs', 'rē', 'rēbus',
  ],
  'fortis, forte — singolare': [
    'fortis', 'forte', 'fortis', 'fortis', 'fortī', 'fortī',
    'fortem', 'forte', 'fortī', 'fortī',
  ],
  'possum (potere) — presente': [
    'possum', 'potes', 'potest', 'possumus', 'potestis', 'possunt',
  ],
  'eō (andare), ferō (portare), volō (volere)': [
    'eō', 'ferō', 'volō', 'īs', 'fers', 'vīs', 'it', 'fert', 'vult',
    'īmus', 'ferimus', 'volumus', 'ītis', 'fertis', 'vultis',
    'eunt', 'ferunt', 'volunt',
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

/** Icona delle lezioni di vocabolario: sulla mappa devono formare un binario
 *  riconoscibile, distinto dalle lezioni di grammatica. */
const ICONA_LESSICO = '🗂️'

/** Quesiti minimi per lezione: sotto questa soglia le vite non hanno senso. */
const MIN_QUESITI = 3

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

      if (ex.type === 'analysis') {
        // La parola da analizzare deve stare davvero nella frase: se non c'è,
        // l'evidenziazione non compare e si chiede di analizzare il nulla.
        if (!ex.sentence.includes(ex.word)) {
          segnala(dove, `«${ex.word}» non compare nella frase «${ex.sentence}»`)
        }
        if (!ex.translation?.trim()) {
          segnala(dove, `l'analisi di «${ex.word}» non ha la traduzione della frase`)
        }
        if (!ex.fields?.length) segnala(dove, `l'analisi di «${ex.word}» non ha domande`)
        for (const f of ex.fields ?? []) {
          if (!f.options.includes(f.answer)) {
            segnala(dove, `«${f.answer}» non è fra le opzioni di «${f.label}» (parola «${ex.word}»)`)
          }
          if (new Set(f.options).size !== f.options.length) {
            segnala(dove, `opzioni ripetute in «${f.label}» (parola «${ex.word}»)`)
          }
          // Con una sola opzione la risposta è regalata.
          if (f.options.length < 2) {
            segnala(dove, `«${f.label}» ha una sola opzione (parola «${ex.word}»)`)
          }
        }
        const etichette = (ex.fields ?? []).map((f) => f.label)
        if (new Set(etichette).size !== etichette.length) {
          segnala(dove, `due domande con la stessa etichetta nell'analisi di «${ex.word}»`)
        }
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
    // Le lezioni di lessico (id che finisce per «v») devono riconoscersi sulla
    // mappa: stessa icona per tutte, e nessun'altra lezione la usa.
    const lessico = /v$/.test(l.id)
    if (lessico && l.icon !== ICONA_LESSICO) {
      segnala(`${u.id} · ${l.title}`, `è una lezione di lessico ma ha l'icona ${l.icon} invece di ${ICONA_LESSICO}`)
    }
    // Le vite in lezione sono min(5, quesiti): sotto i tre quesiti una lezione
    // è una lettura con una domanda in fondo, e basta un errore per finirla.
    const quesiti = l.exercises.filter((e) => e.type !== 'info' && e.type !== 'table').length
    if (quesiti < MIN_QUESITI) {
      segnala(`${u.id} · ${l.title}`, `ha solo ${quesiti} quesiti a risposta: ne servono almeno ${MIN_QUESITI}`)
    }
    if (!lessico && l.icon === ICONA_LESSICO) {
      segnala(`${u.id} · ${l.title}`, `usa l'icona del lessico ${ICONA_LESSICO} ma non è una lezione di lessico`)
    }
  }
}

// ─────────────────── 4. le versioni ───────────────────
//
// Una parola senza voce nel glossario non si può toccare: lo studente la
// cerca, non succede niente, e non ha modo di sapere se è un buco o se quella
// parola non ha aiuto. Meglio che ci siano tutte.

let versioParole = 0
for (const v of versiones) {
  const dove = `versio «${v.titolo}»`
  const usate = new Set()
  for (const f of v.frasi) {
    for (const t of f.lat.split(/[\s.,;:!?«»]+/)) {
      if (!t) continue
      versioParole++
      usate.add(t)
      if (!v.parole[t]) segnala(dove, `la parola «${t}» non ha una voce nel glossario`)
    }
    if (!f.ita.trim()) segnala(dove, `la frase «${f.lat}» non ha traduzione`)
  }
  for (const k of Object.keys(v.parole)) {
    if (!usate.has(k)) segnala(dove, `il glossario ha «${k}» ma nel testo non compare`)
  }
  if (v.frasi.length < 3) segnala(dove, 'ha meno di tre frasi: è troppo corta per essere una versione')
  // Uno sblocco più in là della fine del corso non arriverebbe mai.
  if (v.unlock > lezioni) segnala(dove, `si sblocca alla lezione ${v.unlock}, ma il corso ne ha ${lezioni}`)
}
// L'elenco si legge dall'alto: se gli sblocchi non crescono, le versioni
// compaiono in un ordine che non corrisponde alla difficoltà.
for (let k = 1; k < versiones.length; k++) {
  if (versiones[k].unlock < versiones[k - 1].unlock) {
    segnala('versiones', `«${versiones[k].titolo}» si sblocca prima di «${versiones[k - 1].titolo}» ma viene dopo nell'elenco`)
  }
}

// ─────────────────── 5. il lessico ───────────────────
//
// Il ripasso delle parole (Vocābula) pesca dalle tabelle marcate «lessico:
// true». Il rischio è il silenzio: una tabella di vocaboli aggiunta senza il
// marchio non dà errore, semplicemente non entra mai nel ripasso. Qui sotto
// ogni tabella «Latino … Italiano» deve essere o marcata, o dichiarata come
// non-lessico: così una tabella nuova costringe a decidere.

const NON_LESSICO = new Set([
  'amāre al presente passivo',
  'Chi agisce: persona o cosa',
  'Il perfetto passivo di amāre',
  'esse — presente congiuntivo',
  'esse — futuro',
])

for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const ex of l.exercises) {
      if (ex.type !== 'table') continue
      const primaLat = /latino/i.test(ex.columns[0] ?? '')
      const ultimaIta = /italiano/i.test(ex.columns[ex.columns.length - 1] ?? '')
      const dove = `${u.id} · ${l.id} · tabella «${ex.title}»`
      if (ex.lessico) {
        if (!primaLat || !ultimaIta) {
          segnala(dove, `è marcata «lessico» ma le colonne sono ${JSON.stringify(ex.columns)}: servono Latino … Italiano`)
        }
        for (const r of ex.rows) {
          if (!String(r[0] ?? '').trim() || !String(r[r.length - 1] ?? '').trim()) {
            segnala(dove, `la riga ${JSON.stringify(r)} ha una cella vuota`)
          }
        }
      } else if (primaLat && ultimaIta && !NON_LESSICO.has(ex.title)) {
        segnala(dove, 'ha colonne Latino/Italiano ma non è marcata «lessico: true»: se sono vocaboli aggiungi il marchio, altrimenti mettila in NON_LESSICO dentro questo script')
      }
    }
  }
}

// Due voci per la stessa parola vogliono dire chiederla due volte nel ripasso.
const senzaLineette = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
const chiavi = new Map()
for (const v of vocabolario) {
  const k = senzaLineette(v.lat).split(/[,\s(]/)[0].toLowerCase()
  if (chiavi.has(k)) segnala('vocabolario', `«${v.lat}» e «${chiavi.get(k)}» sono la stessa parola: nel ripasso uscirebbe due volte`)
  else chiavi.set(k, v.lat)
  if (/\s/.test(v.lat) && !v.lat.includes(',')) {
    segnala('vocabolario', `«${v.lat}» sembra una forma coniugata, non una voce da vocabolario`)
  }
  if (!v.ita.trim()) segnala('vocabolario', `«${v.lat}» non ha significato`)
}

// ─────────────────── esito ───────────────────

console.log(`Corso: ${curriculum.length} sezioni, ${lezioni} lezioni, ${esercizi} esercizi.`)
console.log(`Paradigmi latini verificati: ${tabelleControllate}.`)
console.log(`Versioni: ${versiones.length}, ${versioParole} parole tutte glossate.`)
console.log(`Lessico da ripassare: ${vocabolario.length} vocaboli.`)

if (problemi.length) {
  console.log(`\n${problemi.length} problemi:\n`)
  for (const p of problemi) console.log('  • ' + p)
  process.exit(1)
}
console.log('\nTutto a posto.')
