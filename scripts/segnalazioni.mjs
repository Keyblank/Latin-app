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
// Uso:
//   npm run segnalazioni -- file.json        il file scaricato dall'app
//   pbpaste | npm run segnalazioni           il messaggio incollato
//   npm run segnalazioni -- u19l4 5          a mano, quando basta la coordinata

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
  const dato = JSON.parse(readFileSync(percorso, 'utf8'))
  const lista = Array.isArray(dato) ? dato : (dato.lista ?? [])
  return lista.map((s) => ({
    quando: s.quando,
    versione: s.versione,
    categoria: s.categoria,
    testo: s.testo,
    estratto: s.posto?.estratto ?? '',
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
    out.push({
      versione: (/^\[ianua ([^\]]+)\]/.exec(intestazione) ?? [])[1],
      categoria: (linee[iInt + 1] ?? '').split(' — ')[0],
      estratto: (linee[iInt + 1] ?? '').split(' — ').slice(1).join(' — '),
      testo: linee.slice(iInt + 2).join('\n').trim(),
      ...c,
    })
  }
  return out
}

async function leggiStdin() {
  if (process.stdin.isTTY) return ''
  const pezzi = []
  for await (const p of process.stdin) pezzi.push(p)
  return Buffer.concat(pezzi).toString('utf8')
}

// ─────────────────── il programma ───────────────────

const argomenti = process.argv.slice(2)
let segnalazioni = []

if (argomenti.length >= 1 && /\.json$/i.test(argomenti[0])) {
  segnalazioni = daFile(argomenti[0])
} else if (argomenti.length >= 1 && /^u\d/i.test(argomenti[0])) {
  segnalazioni = [{ lezione: argomenti[0], numero: argomenti[1] ? Number(argomenti[1]) : null }]
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

let irrisolte = 0
for (const [k, s] of segnalazioni.entries()) {
  console.log(`───────── ${k + 1}/${segnalazioni.length} ─────────`)
  if (s.categoria) console.log(`tipo:      ${s.categoria}`)
  if (s.versione) console.log(`versione:  ${s.versione}`)
  if (s.testo) console.log(`commento:  ${s.testo.replace(/\n/g, '\n           ')}`)
  if (s.estratto) console.log(`segnalava: ${s.estratto}`)

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
