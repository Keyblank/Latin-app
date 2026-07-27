// Cerca da solo gli errori di SIGNIFICATO — quelli che le forme non tradiscono.
//
// Nasce da un errore vero: il corso glossava «in» + accusativo come «verso» e
// faceva tradurre «in silvam» con «verso il bosco». Tutte le forme erano
// corrette, l'analizzatore morfologico era contento, e la traduzione era
// sbagliata — perché «verso il bosco» è «ad silvam».
//
// Quell'errore aveva però due firme riconoscibili, e questo script le cerca.
//
// ─── 1. COLLISIONI DI TRADUZIONE ───
// Due espressioni latine diverse con la STESSA identica traduzione italiana.
// A volte è legittimo (sinonimi: «timēre» e «vereor» sono tutti e due
// «temere»), a volte no: «ad silvam» e «in silvam» non possono essere
// entrambi «verso il bosco». I casi accettati stanno in un registro, con il
// motivo, così restano visibili solo quelli nuovi.
//
// ─── 2. LE PREPOSIZIONI CONTRO IL DIZIONARIO ───
// Le preposizioni sono una classe chiusa — una ventina di parole — e per
// quelle il confronto italiano/inglese si può fare davvero, con una tabellina
// di equivalenze scritta a mano. È un vocabolario piccolo e stabile: «verso» è
// «towards», «dentro» è «into», «sotto» è «under». Se un senso che il corso
// attribuisce a una preposizione non compare nella voce del dizionario, si
// segnala.
//
// Uso:  npm run check:sensi [-- --segna]

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { analizza, datiPresenti } from './morfologia.mjs'
import { curriculum } from '../src/data/curriculum.ts'

if (!datiPresenti()) {
  console.error('Mancano i dati di Whitaker — scaricali con:  npm run lemmi')
  process.exit(2)
}

const segna = process.argv.includes('--segna')
const REGISTRO = new URL('./collisioni-accettate.txt', import.meta.url)

const nudo = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, "'").trim()

// ═══════════════ 1. collisioni di traduzione ═══════════════

/** Non sono traduzioni ma etichette grammaticali: la risposta «Accusativo» a
 *  «che caso è?» non è la traduzione di niente. */
const ETICHETTE = /^(nominativo|genitivo|dativo|accusativo|ablativo|vocativo|singolare|plurale|maschile|femminile|neutro|presente|imperfetto|perfetto|piuccheperfetto|futuro|indicativo|congiuntivo|attivo|passiv[oa]|attiva|\d[ªa] (singolare|plurale)|[123][ªa]|finale|consecutiva)$/i

const perTraduzione = new Map()
const aggiungi = (lat, ita, dove) => {
  const k = nudo(ita)
  if (!k || k.length < 3 || ETICHETTE.test(k)) return
  perTraduzione.set(k, [...(perTraduzione.get(k) ?? []), { lat: lat.trim(), dove }])
}

for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const e of l.exercises) {
      const dove = `${u.id}·${l.id}`
      if (e.type === 'match') for (const [a, b] of e.pairs) aggiungi(a, b, dove)
      if (e.type === 'table' && e.lessico) {
        for (const r of e.rows) {
          aggiungi(String(r[0]), String(r[r.length - 1]).split(' — ')[0], dove)
        }
      }
      if (e.type === 'choice' && e.focus && /signific|vuol dire|traduc/i.test(e.prompt)) {
        aggiungi(e.focus, e.answer, dove)
      }
    }
  }
}

/** «mēns» e «mēns, mentis» sono la stessa voce. */
const capo = (x) => {
  const t = nudo(x)
  return t.includes(',') ? t.split(',')[0].trim() : t
}

const accettate = new Set(
  existsSync(REGISTRO)
    ? readFileSync(REGISTRO, 'utf8').split('\n').filter((r) => r && !r.startsWith('#')).map((r) => r.split('\t')[0])
    : [],
)

const collisioni = []
for (const [ita, voci] of perTraduzione) {
  const lat = [...new Set(voci.map((v) => capo(v.lat)))]
  if (lat.length < 2) continue
  if (accettate.has(ita)) continue
  collisioni.push({ ita, lat, dove: [...new Set(voci.map((v) => v.dove))] })
}

console.log('─────────── espressioni diverse, stessa traduzione ───────────')
console.log(`Traduzioni distinte esaminate: ${perTraduzione.size} · già accettate: ${accettate.size}.`)
if (!collisioni.length) {
  console.log('Nessuna collisione nuova.')
} else {
  console.log(`\n${collisioni.length} da guardare:\n`)
  for (const c of collisioni) {
    console.log(`  «${c.ita}»  ←  ${c.lat.join('  ·  ')}   [${c.dove.join(', ')}]`)
  }
  console.log(
    '\nMolte saranno sinonimi veri e vanno accettate. Ma se due preposizioni o\n' +
      'due costrutti diversi finiscono con la stessa traduzione, uno dei due\n' +
      'sbaglia — ed è così che si è trovato «in silvam» = «verso il bosco».',
  )
  if (segna) {
    const righe = [
      ...(existsSync(REGISTRO)
        ? readFileSync(REGISTRO, 'utf8').split('\n').filter((r) => r && !r.startsWith('#'))
        : []),
      ...collisioni.map((c) => `${c.ita}\t${c.lat.join(' / ')}`),
    ].sort()
    writeFileSync(
      REGISTRO,
      '# Collisioni di traduzione già esaminate e accettate.\n' +
        '# Sono sinonimi veri, oppure omografie dell’ITALIANO: «porta» è tanto la\n' +
        '# porta quanto «lui porta», e «parte» è tanto la parte quanto «lui parte».\n' +
        '# Formato: traduzione <TAB> le espressioni latine che la condividono.\n' +
        righe.join('\n') + '\n',
    )
    console.log(`\nAccettate: il registro ora ne ha ${righe.length}.`)
  } else {
    console.log('\nQuando le hai esaminate:  npm run check:sensi -- --segna')
  }
}

// ═══════════════ 2. le preposizioni contro il dizionario ═══════════════

/**
 * Che cosa vuol dire, in inglese, ogni senso che il corso attribuisce a una
 * preposizione. È una tabellina scritta a mano, ma su un vocabolario chiuso e
 * piccolo: le preposizioni latine sono una ventina e non cambiano.
 */
const EQUIVALENZE = {
  verso: /\btoward/,
  presso: /\b(near|among|at the house)/,
  dentro: /\b(into|within)/,
  in: /\b(in|into|on|at)\b/,
  attraverso: /\bthrough/,
  'per mezzo di': /\bby (means|reason)/,
  'davanti a': /\b(before|in front)/,
  'prima di': /\bbefore/,
  'dietro a': /\b(behind|after)/,
  dopo: /\b(after|behind)/,
  fra: /\b(between|among)/,
  tra: /\b(between|among)/,
  contro: /\b(against|facing)/,
  'a causa di': /\b(on account of|because of)/,
  oltre: /\b(across|over|beyond)/,
  'al di là di': /\b(across|beyond|other side)/,
  da: /\b(from|by|out of|down)/,
  'fuori da': /\b(out of|from)/,
  con: /\bwith/,
  'giù da': /\b(down|from)/,
  'riguardo a': /\b(about|concerning|regard)/,
  'in favore di': /\b(on behalf of|for)\b/,
  senza: /\bwithout/,
  sotto: /\b(under|beneath|below)/,
  contro: /\b(against|facing)/,
}

/** I sensi che il corso dà a una preposizione, spezzati e ripuliti. */
const sensiDelCorso = (ita) =>
  ita
    .split(/[,;]/)
    .map((x) => x.replace(/\([^)]*\)/g, '').replace(/«[^»]*»/g, '').trim().toLowerCase())
    .filter(Boolean)

console.log('\n─────────── le preposizioni, senso per senso ───────────')
const sospetti = []
let sensiControllati = 0
const vistePrep = new Set()

for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const e of l.exercises) {
      if (e.type !== 'table' || !e.lessico) continue
      if (!/preposizioni/i.test(e.title)) continue
      for (const r of e.rows) {
        const lat = String(r[0]).trim()
        const ita = String(r[r.length - 1])
        if (vistePrep.has(nudo(lat) + ita)) continue
        vistePrep.add(nudo(lat) + ita)
        const voce = analizza(lat.split(',')[0].trim())
          .filter((x) => x.parte === 'PREP')
          .map((x) => x.senso.toLowerCase())
          .join(' ; ')
        if (!voce) continue
        for (const senso of sensiDelCorso(ita)) {
          const atteso = EQUIVALENZE[senso]
          if (!atteso) continue // senso non in tabella: non giudicabile
          sensiControllati++
          if (!atteso.test(voce)) {
            sospetti.push({ lat, senso, ita, voce: voce.slice(0, 78) })
          }
        }
      }
    }
  }
}

console.log(`Sensi di preposizione confrontati col dizionario: ${sensiControllati}.`)
if (!sospetti.length) {
  console.log('Ogni senso trova riscontro nella voce del dizionario.')
} else {
  console.log(`\n${sospetti.length} sensi che il dizionario non conferma:\n`)
  for (const s of sospetti) {
    console.log(`  «${s.lat}» — il corso dice «${s.senso}» (glossa intera: «${s.ita}»)`)
    console.log(`      il dizionario: ${s.voce}`)
  }
}
