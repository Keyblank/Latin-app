// Confronta i SIGNIFICATI del corso con quelli di un dizionario.
//
// Gli altri controlli guardano le forme: che «rēgibus» esista, che sia dativo
// o ablativo plurale, che la desinenza sia quella giusta. Nessuno di loro
// guarda il SENSO — ed è lì che è passato l'errore peggiore che abbiamo
// trovato: «in» + accusativo glossato «verso» invece che «dentro». Tutte le
// forme erano corrette; era la traduzione a essere sbagliata.
//
// Qui ogni voce del vocabolario viene messa accanto alla glossa inglese di
// Whitaker's Words. Il confronto italiano/inglese non si può automatizzare in
// modo affidabile, quindi lo script non giudica: PRESENTA le coppie e tiene il
// conto di quelle già lette.
//
// Le voci già riviste stanno in scripts/glosse-riviste.txt, con la glossa
// esatta che è stata approvata. Se la glossa cambia, la voce ricompare. Così
// il lavoro si fa una volta sola e le aggiunte future costano solo il loro.
//
// Uso:  npm run check:glosse            mostra solo le voci da leggere
//       npm run check:glosse -- --tutto mostra tutto
//       npm run check:glosse -- --segna aggiunge le voci mostrate al registro

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { analizza, datiPresenti } from './morfologia.mjs'
import { vocabolario } from '../src/vocabolario.ts'

if (!datiPresenti()) {
  console.error('Mancano i dati di Whitaker — scaricali con:  npm run lemmi')
  process.exit(2)
}

const REGISTRO = new URL('./glosse-riviste.txt', import.meta.url)
const tutto = process.argv.includes('--tutto')
const segna = process.argv.includes('--segna')

/** Le voci già lette: chiave «latino\tglossa», così se cambia la glossa la
 *  voce torna da rileggere. */
const riviste = new Set(
  existsSync(REGISTRO)
    ? readFileSync(REGISTRO, 'utf8').split('\n').filter((r) => r && !r.startsWith('#'))
    : [],
)

const daLeggere = []
let confrontabili = 0
let senzaRiferimento = 0

for (const v of vocabolario) {
  const forma = v.lat.split(',')[0].trim()
  const sensi = [...new Set(analizza(forma).map((r) => r.senso).filter(Boolean))]
  if (!sensi.length) {
    senzaRiferimento++
    continue
  }
  confrontabili++
  const chiave = `${v.lat}\t${v.ita}`
  if (!tutto && riviste.has(chiave)) continue
  daLeggere.push({ chiave, lat: v.lat, ita: v.ita, rif: sensi.slice(0, 2).join(' // ') })
}

console.log(
  `Vocabolario: ${vocabolario.length} voci · ${confrontabili} con una glossa di ` +
    `riferimento · ${senzaRiferimento} senza.`,
)
console.log(`Già riviste: ${riviste.size}.`)

if (!daLeggere.length) {
  console.log('\nNiente di nuovo da rileggere.')
} else {
  console.log(`\n${daLeggere.length} voci da leggere (latino · corso · dizionario):\n`)
  for (const d of daLeggere) {
    console.log(`  ${d.lat.padEnd(22)} ${d.ita.padEnd(30)} ${d.rif.slice(0, 60)}`)
  }
  console.log(
    '\nIl dizionario è inglese e pieno di omografi: «fidēs» esce come «corda di\n' +
      'lira», «iūs» come «brodo». Non è un errore del corso — va letto con la testa.',
  )
  if (segna) {
    const righe = [...riviste, ...daLeggere.map((d) => d.chiave)].sort()
    writeFileSync(
      REGISTRO,
      '# Voci del vocabolario già confrontate con il dizionario di Whitaker.\n' +
        '# Formato: latino <TAB> glossa italiana approvata.\n' +
        '# Se la glossa cambia, la voce torna da rileggere.\n' +
        righe.join('\n') + '\n',
    )
    console.log(`\nSegnate come riviste: ora il registro ne ha ${righe.length}.`)
  } else {
    console.log('\nQuando le hai lette:  npm run check:glosse -- --segna')
  }
}
