// Da una segnalazione alla riga di curriculum.ts.
//
// Le segnalazioni arrivano come le manda l'app: un messaggio su WhatsApp, o un
// file scaricato dal quaderno. La prima riga contiene la coordinata:
//
//   [ianua 51712f3] u19 · u19l4 · esercizio 5
//
// Questo script la legge e stampa il numero di riga esatto dentro
// src/data/curriculum.ts, più l'esercizio così com'è adesso — perché fra la
// segnalazione e la lettura può essere già stato corretto.
//
// Con --github le apre come issue sul repo: e' li' che il registro va tenuto,
// perche' una segnalazione dentro una chat si perde e una issue no. Serve un
// token in GITHUB_TOKEN (fine-grained, permesso «Issues: write» su questo solo
// repository). Non riapre due volte la stessa: ogni issue porta in fondo
// un'impronta «<!-- ianua:id -->» e le impronte gia' presenti si saltano.
//
// Uso:
//   npm run segnalazioni -- file.json        il file scaricato dall'app
//   pbpaste | npm run segnalazioni           il messaggio incollato
//   npm run segnalazioni -- u19l4 5          a mano, quando basta la coordinata
//   npm run segnalazioni -- file.json --github    e le apre come issue
//   ... --github --prova                     dice cosa aprirebbe, senza aprire

import { readFileSync } from 'node:fs'
import { curriculum } from '../src/data/curriculum.ts'

const SORGENTE = new URL('../src/data/curriculum.ts', import.meta.url)
const righe = readFileSync(SORGENTE, 'utf8').split('\n')

// ─────────────────── trovare la riga ───────────────────

/**
 * La riga in cui comincia l'ennesimo esercizio di una lezione.
 *
 * Cerca la lezione dal suo `id`, poi il suo `exercises: [`, e da lì cammina
 * contando le parentesi: ogni volta che la profondità torna a zero e si apre
 * una graffa, è un esercizio nuovo. Serve la profondità perché gli esercizi
 * contengono a loro volta liste e oggetti (`options`, `rows`, `fields`).
 */
function rigaDellEsercizio(lezione, numero) {
  const iLez = righe.findIndex((r) => new RegExp(`id: '${lezione}'`).test(r))
  if (iLez < 0) return null
  const iEx = righe.findIndex((r, k) => k > iLez && /exercises: \[/.test(r))
  if (iEx < 0) return null

  let profondita = 0
  let visti = 0
  for (let k = iEx; k < righe.length; k++) {
    const riga = righe[k]
    for (const c of riga) {
      if (c === '[' || c === '{') {
        // La graffa di primo livello dopo `exercises: [` apre un esercizio.
        if (profondita === 1 && c === '{') {
          visti++
          if (visti === numero) return k + 1
        }
        profondita++
      } else if (c === ']' || c === '}') {
        profondita--
        // Chiusa la lista degli esercizi: la lezione è finita.
        if (profondita === 0) return null
      }
    }
  }
  return null
}

/** L'esercizio come sta adesso nel corso. */
function esercizioOra(lezione, numero) {
  for (const u of curriculum) {
    for (const l of u.lessons) {
      if (l.id !== lezione) continue
      return l.exercises[numero - 1] ?? null
    }
  }
  return null
}

// ─────────────────── leggere le segnalazioni ───────────────────

/**
 * «[ianua 51712f3] u19 · u19l4 · esercizio 5» → { lezione: 'u19l4', numero: 5 }
 *
 * I pezzi sono separati da «·». L'unità («u19») e la lezione («u19l4») si
 * somigliano, e la lezione è sempre l'ultimo identificatore prima del numero:
 * prendere il primo darebbe l'unità, che non basta.
 */
function leggiCoordinata(testo) {
  const senzaFirma = testo.replace(/^\[[^\]]*\]\s*/, '')
  const pezzi = senzaFirma.split('·').map((p) => p.trim())
  const numero = pezzi.map((p) => /^esercizio\s+(\d+)$/i.exec(p)).find(Boolean)
  const identificatori = pezzi.filter((p) => /^u\d+[a-z0-9]*$/i.test(p))
  if (!identificatori.length) return null
  return {
    lezione: identificatori[identificatori.length - 1],
    numero: numero ? Number(numero[1]) : null,
  }
}

function daFile(percorso) {
  let grezzo
  try {
    grezzo = readFileSync(percorso, 'utf8')
  } catch {
    console.error(`Non trovo il file «${percorso}».`)
    process.exit(2)
  }
  let dato
  try {
    dato = JSON.parse(grezzo)
  } catch {
    console.error(`«${percorso}» non e' un file di segnalazioni: non e' JSON valido.`)
    process.exit(2)
  }
  const lista = Array.isArray(dato) ? dato : (dato.lista ?? [])
  return lista.map((s) => ({
    id: s.id,
    quando: s.quando,
    versione: s.versione,
    categoria: s.categoria,
    testo: s.testo,
    estratto: s.posto?.estratto ?? '',
    selezione: s.selezione,
    lezione: s.posto?.lezione,
    numero: s.posto?.numero ?? null,
  }))
}

function daTesto(testo) {
  // Un messaggio incollato può contenerne una o venti, separate dalle righe
  // «── 3/12 ──» che l'app mette quando si mandano in blocco.
  const blocchi = testo.split(/^──.*──.*$/m).map((b) => b.trim()).filter(Boolean)
  const out = []
  for (const b of blocchi) {
    const linee = b.split('\n')
    const intestazione = linee.find((l) => /^\[ianua/.test(l))
    if (!intestazione) continue
    const c = leggiCoordinata(intestazione)
    if (!c) continue
    const iInt = linee.indexOf(intestazione)
    const iSel = linee.findIndex((l, k) => k > iInt && /^sul punto: /.test(l))
    out.push({
      versione: (/^\[ianua ([^\]]+)\]/.exec(intestazione) ?? [])[1],
      categoria: (linee[iInt + 1] ?? '').split(' — ')[0],
      estratto: (linee[iInt + 1] ?? '').split(' — ').slice(1).join(' — '),
      selezione: iSel >= 0 ? linee[iSel].replace(/^sul punto: /, '').replace(/^«|»$/g, '') : undefined,
      testo: linee.slice(iSel >= 0 ? iSel + 1 : iInt + 2).join('\n').trim(),
      ...c,
    })
  }
  return out
}

// ─────────────────── il registro su GitHub ───────────────────

const REPO = 'Keyblank/Latin-app'

const ETICHETTE = {
  segnalazione: ['6a3fb5', 'Arrivata dal ⚑ dentro l\u2019app'],
  latino: ['b60205', 'Errore di latino'],
  traduzione: ['d93f0b', 'Traduzione sbagliata'],
  refuso: ['fbca04', 'Refuso'],
  confuso: ['0e8a16', 'Spiegato male'],
  tecnico: ['1d76db', 'L\u2019app non funziona bene'],
  altro: ['ededed', 'Altro'],
}

function api(percorso, opzioni = {}) {
  return fetch(`https://api.github.com/repos/${REPO}${percorso}`, {
    ...opzioni,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'content-type': 'application/json',
      ...(opzioni.headers ?? {}),
    },
  })
}

/** Le impronte gia' presenti fra le issue, aperte e chiuse. */
async function improntePresenti() {
  const viste = new Set()
  for (let pagina = 1; pagina <= 10; pagina++) {
    const r = await api(`/issues?state=all&per_page=100&page=${pagina}`)
    if (!r.ok) throw new Error(`GitHub ha risposto ${r.status}: ${await r.text()}`)
    const lista = await r.json()
    for (const i of lista) {
      for (const m of (i.body ?? '').matchAll(/<!-- ianua:([^\s>]+) -->/g)) viste.add(m[1])
    }
    if (lista.length < 100) break
  }
  return viste
}

/** Crea le etichette che mancano: senza, GitHub le ignora in silenzio. */
async function preparaEtichette() {
  for (const [nome, [colore, descrizione]] of Object.entries(ETICHETTE)) {
    const c = await api(`/labels/${encodeURIComponent(nome)}`)
    if (c.ok) continue
    await api('/labels', { method: 'POST', body: JSON.stringify({ name: nome, color: colore, description: descrizione }) })
  }
}

function corpoIssue(s, riga) {
  return [
    `**Dove:** \`${[s.lezione, s.numero && `esercizio ${s.numero}`].filter(Boolean).join(' · ')}\`` +
      (riga ? `  ·  [\`curriculum.ts:${riga}\`](https://github.com/${REPO}/blob/main/src/data/curriculum.ts#L${riga})` : '') +
      (s.versione ? `  ·  **versione:** \`${s.versione}\`` : ''),
    '',
    `> ${s.estratto || '(nessun estratto)'}`,
    ...(s.selezione ? ['', '**Sul punto:**', `> ${s.selezione}`] : []),
    '',
    '---',
    '',
    s.testo || '_(nessun commento)_',
    '',
    `<!-- ianua:${s.id ?? impronta(s)} -->`,
  ].join('\n')
}

/** Per le segnalazioni arrivate come testo l'id non c'e': se ne ricava uno
 *  stabile dal contenuto, cosi' reincollare lo stesso messaggio non raddoppia. */
function impronta(s) {
  const crudo = [s.lezione, s.numero, s.categoria, s.estratto, s.selezione, s.testo].join('|')
  let h = 0
  for (const c of crudo) h = (Math.imul(31, h) + c.codePointAt(0)) | 0
  return `t${(h >>> 0).toString(36)}`
}

/**
 * La categoria arriva in due grafie: dal file esportato e' l'identificatore
 * («latino»), dal messaggio incollato e' l'etichetta italiana («Errore di
 * latino»). Servono tutte e due le direzioni — l'etichetta per il titolo della
 * issue, l'identificatore per la label.
 */
const CATEGORIE = {
  latino: 'Errore di latino',
  traduzione: 'Traduzione sbagliata',
  refuso: 'Refuso',
  confuso: 'Spiegato male',
  tecnico: 'L\u2019app fa i capricci',
  altro: 'Altro',
}
const PER_ETICHETTA = Object.fromEntries(Object.entries(CATEGORIE).map(([k, v]) => [v, k]))

/** { id: 'confuso', nome: 'Spiegato male' }, comunque sia arrivata. */
function categoriaDi(grezza) {
  if (!grezza) return { id: null, nome: 'Segnalazione' }
  if (grezza in CATEGORIE) return { id: grezza, nome: CATEGORIE[grezza] }
  if (grezza in PER_ETICHETTA) return { id: PER_ETICHETTA[grezza], nome: grezza }
  return { id: null, nome: grezza }
}

async function apriSuGitHub(segnalazioni, prova) {
  if (!prova && !process.env.GITHUB_TOKEN) {
    console.error(
      'Manca GITHUB_TOKEN.\n\n' +
        'Creane uno fine-grained su https://github.com/settings/tokens?type=beta\n' +
        `con accesso al solo repository ${REPO} e permesso «Issues: write», poi:\n\n` +
        '  GITHUB_TOKEN=github_pat_... npm run segnalazioni -- file.json --github',
    )
    process.exit(2)
  }

  const gia = prova ? new Set() : await improntePresenti()
  if (!prova) await preparaEtichette()

  let aperte = 0
  let saltate = 0
  for (const s of segnalazioni) {
    const id = s.id ?? impronta(s)
    if (gia.has(id)) {
      saltate++
      console.log(`già in registro: ${s.estratto || id}`)
      continue
    }
    const riga = s.lezione && s.numero ? rigaDellEsercizio(s.lezione, s.numero) : null
    const coord = [s.lezione, s.numero && `${s.numero}`].filter(Boolean).join('·')
    const cat = categoriaDi(s.categoria)
    const titolo = `[${coord}] ${cat.nome} — ${s.estratto || ''}`.trim().slice(0, 200)
    const etichette = ['segnalazione', cat.id].filter((e) => e && e in ETICHETTE)

    if (prova) {
      console.log(`\n── aprirebbe ──\n${titolo}\netichette: ${etichette.join(', ')}\n${corpoIssue({ ...s, id }, riga)}`)
      aperte++
      continue
    }
    const r = await api('/issues', {
      method: 'POST',
      body: JSON.stringify({ title: titolo, body: corpoIssue({ ...s, id }, riga), labels: etichette }),
    })
    if (!r.ok) {
      console.error(`  ✗ ${titolo}\n    GitHub ha risposto ${r.status}: ${await r.text()}`)
      continue
    }
    const issue = await r.json()
    aperte++
    console.log(`  #${issue.number}  ${titolo}`)
  }
  console.log(
    `\n${prova ? 'Aprirebbe' : 'Aperte'} ${aperte} · già in registro ${saltate}.` +
      (prova ? '' : `\nhttps://github.com/${REPO}/issues?q=label%3Asegnalazione`),
  )
}

async function leggiStdin() {
  if (process.stdin.isTTY) return ''
  const pezzi = []
  for await (const p of process.stdin) pezzi.push(p)
  return Buffer.concat(pezzi).toString('utf8')
}

// ─────────────────── il programma ───────────────────

const argomenti = process.argv.slice(2)
const suGitHub = argomenti.includes('--github')
const prova = argomenti.includes('--prova')
const liberi = argomenti.filter((a) => !a.startsWith('--'))
let segnalazioni = []

if (liberi.length >= 1 && /\.json$/i.test(liberi[0])) {
  segnalazioni = daFile(liberi[0])
} else if (liberi.length >= 1 && /^u\d/i.test(liberi[0])) {
  segnalazioni = [{ lezione: liberi[0], numero: liberi[1] ? Number(liberi[1]) : null }]
} else {
  const testo = await leggiStdin()
  if (!testo.trim()) {
    console.error(
      'Niente da leggere.\n\n' +
        '  npm run segnalazioni -- ianua-segnalazioni-2026-07-28.json\n' +
        '  pbpaste | npm run segnalazioni\n' +
        '  npm run segnalazioni -- u19l4 5',
    )
    process.exit(2)
  }
  segnalazioni = daTesto(testo)
}

if (!segnalazioni.length) {
  console.error('Non ho riconosciuto nessuna coordinata in quello che mi hai dato.')
  process.exit(1)
}

console.log(`${segnalazioni.length} ${segnalazioni.length === 1 ? 'segnalazione' : 'segnalazioni'}.\n`)

if (suGitHub) {
  await apriSuGitHub(segnalazioni, prova)
  process.exit(0)
}

let irrisolte = 0
for (const [k, s] of segnalazioni.entries()) {
  console.log(`───────── ${k + 1}/${segnalazioni.length} ─────────`)
  if (s.categoria) console.log(`tipo:      ${s.categoria}`)
  if (s.versione) console.log(`versione:  ${s.versione}`)
  if (s.testo) console.log(`commento:  ${s.testo.replace(/\n/g, '\n           ')}`)
  if (s.estratto) console.log(`segnalava: ${s.estratto}`)
  if (s.selezione) console.log(`sul punto: «${s.selezione}»`)

  if (!s.lezione) {
    console.log('posizione: sconosciuta\n')
    irrisolte++
    continue
  }
  if (!s.numero) {
    const riga = righe.findIndex((r) => new RegExp(`id: '${s.lezione}'`).test(r))
    console.log(
      riga >= 0
        ? `posizione: src/data/curriculum.ts:${riga + 1}  (lezione «${s.lezione}», esercizio non indicato)\n`
        : `posizione: lezione «${s.lezione}» non trovata\n`,
    )
    if (riga < 0) irrisolte++
    continue
  }

  const riga = rigaDellEsercizio(s.lezione, s.numero)
  const ora = esercizioOra(s.lezione, s.numero)
  if (riga) console.log(`posizione: src/data/curriculum.ts:${riga}`)
  else {
    console.log(`posizione: non trovata (lezione «${s.lezione}», esercizio ${s.numero})`)
    irrisolte++
  }
  if (ora) {
    console.log('adesso:')
    console.log(
      JSON.stringify(ora, null, 2)
        .split('\n')
        .map((r) => '           ' + r)
        .join('\n'),
    )
  }
  console.log()
}

if (irrisolte) {
  console.log(
    `${irrisolte} non risolte: succede se la lezione è stata rinominata o l'esercizio\n` +
      'rimosso dopo la segnalazione. L\'estratto qui sopra basta per cercarlo a mano.',
  )
}
