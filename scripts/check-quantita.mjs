// Controllo delle QUANTITÀ VOCALICHE contro una fonte esterna.
//
// Le lineette sulle vocali lunghe (rēx, rosārum) le ho scritte a mano insieme
// al corso: sono esattamente il tipo di dato che nessuno di noi due può
// verificare a memoria. Questo script le confronta con il lessico di
// COLLATINUS, il lemmatizzatore latino di Yves Ouvrard e Philippe Verkerk
// (biblissima/collatinus, GPL), che marca le quantità di 24 000 lemmi.
//
// ►► UN AVVERTIMENTO CHE VALE PIÙ DELLO SCRIPT ◄◄
//
// Collatinus marca le quantità per la SCANSIONE METRICA, che include
// l'allungamento «per posizione»: in «terra» segna «tērra» perché la sillaba
// è chiusa, benché la e sia BREVE per natura. La lineetta del vocabolario
// indica invece solo la quantità PER NATURA. Le due cose non coincidono, e
// confrontarle alla cieca dà centinaia di falsi allarmi (li ho presi).
//
// Resta però una direzione affidabile, ed è quella che conta di più: la
// posizione può solo ALLUNGARE una sillaba, mai accorciarla. Quindi una
// vocale che la fonte marca BREVE è breve per natura senza discussione — e
// se il corso ci ha messo una lineetta, la lineetta è sbagliata.
//
// Questo script controlla solo quel verso. Le lineette MANCANTI non le può
// trovare: per quelle serve una fonte diversa.
//
// Uso:
//   node --experimental-strip-types scripts/check-quantita.mjs [--tutto]
//
// Il file dei lemmi non è nel repo: si scarica una volta con
//   npm run lemmi
// e finisce in .cache/lemmes.la (ignorato da git).
//
// NON gira in CI: è un controllo da fare a mano quando si aggiungono parole,
// perché dipende da una risorsa esterna e perché le divergenze vanno lette
// una per una — a volte ha ragione il corso (forme rare, grafie diverse).

import { readFileSync, existsSync } from 'node:fs'
import { vocabolario } from '../src/vocabolario.ts'
import { curriculum } from '../src/data/curriculum.ts'

const FILE = new URL('../.cache/lemmes.la', import.meta.url)
if (!existsSync(FILE)) {
  console.error('Manca .cache/lemmes.la — scaricalo con:  npm run lemmi')
  process.exit(2)
}

// ─────────────────── il lessico di riferimento ───────────────────

/** Toglie ogni segno di quantità e normalizza le grafie che variano
 *  (u/v, i/j): serve solo per trovare la parola, non per confrontarla. */
const chiave = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ̄̆]/g, '')
    .toLowerCase()
    .replace(/v/g, 'u')
    .replace(/j/g, 'i')

/** La sequenza delle quantità di una parola: per ogni vocale, L (lunga),
 *  B (breve) o ? (non marcata dalla fonte). */
function quantita(s) {
  const d = s.normalize('NFD')
  const out = []
  for (let i = 0; i < d.length; i++) {
    const c = d[i]
    if (!/[aeiouyAEIOUY]/.test(c)) continue
    const seg = d[i + 1]
    out.push(seg === '̄' ? 'L' : seg === '̆' ? 'B' : '?')
  }
  return out
}

// Una stessa grafia può essere parole diverse: «utī» è tanto l'infinito di
// «ūtor» quanto la congiunzione «ŭtī»; «amēs» è il congiuntivo di «amō» ma
// anche il nome «ămĕs» (palo forcuto). Teniamo TUTTE le letture: una lineetta
// è sbagliata solo se è breve in ognuna.
const rif = new Map()
for (const riga of readFileSync(FILE, 'utf8').split('\n')) {
  if (!riga || riga.startsWith('!')) continue
  const lemma = riga.split('|')[0]
  if (!lemma) continue
  for (const variante of lemma.split('=')) {
    const k = chiave(variante)
    if (!k) continue
    rif.set(k, [...(rif.get(k) ?? []), quantita(variante)])
  }
}

// ─────────────────── che cosa confrontare ───────────────────

/** Le forme latine del corso da controllare: la voce di vocabolario e, quando
 *  c'è, il genitivo che le sta accanto. */
function formeDaControllare() {
  const out = []
  for (const v of vocabolario) {
    for (const pezzo of v.lat.split(',')) {
      const f = pezzo.trim()
      if (f.length > 2 && /^[A-Za-zĀ-ſĀ-ſ̀-ͯ]+$/.test(f.normalize('NFC'))) {
        out.push({ forma: f, dove: `vocabolario · ${v.lat}` })
      }
    }
  }
  // le celle delle tabelle di paradigma: declinazioni e coniugazioni
  for (const u of curriculum) {
    for (const l of u.lessons) {
      for (const ex of l.exercises) {
        if (ex.type !== 'table' || ex.lessico) continue
        const latine = ex.columns
          .map((c, i) => (/italiano|significato|domanda|ruolo|tipo|come si presenta/i.test(c) ? -1 : i))
          .filter((i) => i > 0)
        for (const r of ex.rows) {
          for (const i of latine) {
            const cella = String(r[i] ?? '').trim()
            if (cella.length > 2 && /^[A-Za-zĀ-ſ]+$/.test(cella.normalize('NFC'))) {
              out.push({ forma: cella, dove: `${u.id} · tabella «${ex.title}»` })
            }
          }
        }
      }
    }
  }
  return out
}

// ─────────────────── il confronto ───────────────────

/**
 * Divergenze già guardate a mano e archiviate, con il motivo.
 *
 * Sono tutte OMOGRAFI: la stessa grafia è due parole diverse, e il lessico
 * conosce solo l'altra. Tenerle qui invece che ignorarle in blocco serve a
 * far risaltare le divergenze nuove, che vanno guardate.
 */
const GIA_VISTE = {
  'tenēre': 'infinito di «teneō»; il lessico ha solo l’avverbio «tĕnĕrē» (teneramente)',
  'manūs': 'genitivo di «manus»; il lessico ha solo il nominativo «mănŭs»',
  'ūtī': 'infinito di «ūtor»; il lessico ha solo la congiunzione «ŭtī» (= ut)',
  'amēs': 'congiuntivo di «amō»; il lessico ha solo il nome «ămĕs, ămĭtis» (palo forcuto)',
}

const tutto = process.argv.includes('--tutto')
const forme = formeDaControllare()
const viste = new Set()
const divergenze = []
const archiviate = []
let confrontate = 0
let assenti = 0

for (const { forma, dove } of forme) {
  const k = chiave(forma)
  if (viste.has(k + forma)) continue
  viste.add(k + forma)
  const letture = (rif.get(k) ?? []).filter((q) => q.length === quantita(forma).length)
  if (!letture.length) {
    assenti++
    if (tutto) console.log(`  (assente dal lessico di riferimento) ${forma} — ${dove}`)
    continue
  }
  const nostro = quantita(forma)
  confrontate++
  const problemi = []
  nostro.forEach((q, i) => {
    if (q !== 'L') return
    // Solo il verso affidabile: la posizione può allungare una sillaba, mai
    // accorciarla, quindi una vocale marcata BREVE è breve per natura. E la
    // segnaliamo solo se TUTTE le letture di quella grafia sono d'accordo:
    // altrimenti è un omografo, non un errore.
    if (letture.every((l) => l[i] === 'B')) {
      problemi.push(`la ${i + 1}ª vocale è BREVE per natura in ogni lettura, ma qui ha la lineetta`)
    }
  })
  if (problemi.length) {
    if (GIA_VISTE[forma.normalize('NFC')]) archiviate.push(forma)
    else divergenze.push({ forma, dove, problemi })
  }
}

console.log(`Lessico di riferimento: ${rif.size} lemmi (Collatinus).`)
console.log(`Forme del corso controllate: ${confrontate}; non presenti nel lessico: ${assenti}.`)

if (archiviate.length) {
  console.log(`\nGià verificate a mano (omografi, ${archiviate.length}):`)
  for (const f of archiviate) console.log(`  «${f}» — ${GIA_VISTE[f.normalize('NFC')]}`)
}

if (!divergenze.length) {
  console.log('\nNessuna lineetta nuova su vocale breve.')
} else {
  console.log(`\n${divergenze.length} forme da guardare:\n`)
  for (const d of divergenze) {
    console.log(`  «${d.forma}» — ${d.dove}`)
    for (const p of d.problemi) console.log(`      ${p}`)
  }
  console.log(
    '\nDa leggere una per una: la fonte non è infallibile e qualche divergenza\n' +
      'è legittima (grafie alternative, forme rare, quantità discusse).',
  )
}

// ═══════════════════ 2. le desinenze delle declinazioni ═══════════════════
//
// Qui la fonte è utilizzabile senza riserve: `modeles.la` elenca le desinenze
// di ogni modello di flessione CON le quantità, e le desinenze sono la parte
// del corso dove un errore sarebbe sistematico — sbagliata una, è sbagliata
// in ogni parola di quella declinazione.
//
// Il tema (rēg-, nōmin-) lo ricaviamo dalla tabella stessa, dal genitivo
// singolare: il confronto riguarda quello che viene dopo.

const MODELLI = readFileSync(new URL('../.cache/modeles.la', import.meta.url), 'utf8')

/** Le liste di desinenze condivise: «$uita=ă;ă;ăm;…». */
const LISTE = new Map()
for (const riga of MODELLI.split('\n')) {
  const m = /^\$(\w+)=(.*)$/.exec(riga.trim())
  if (m) LISTE.set(m[1], m[2].split(';'))
}

/** I blocchi «modele:nome» del file, spezzati una volta sola. */
const BLOCCHI = new Map()
{
  let nome = null
  let righe = []
  for (const riga of MODELLI.split('\n')) {
    const m = /^modele:(\S+)/.exec(riga)
    if (m) {
      if (nome) BLOCCHI.set(nome, righe)
      nome = m[1]
      righe = []
    } else if (nome) righe.push(riga)
  }
  if (nome) BLOCCHI.set(nome, righe)
}

/** I dodici casi di un modello, nell'ordine di Collatinus:
 *  nom, voc, acc, gen, dat, abl al singolare, poi gli stessi al plurale. */
function desinenzeDi(nome, visti = new Set()) {
  if (visti.has(nome)) return []
  visti.add(nome)
  const righe = BLOCCHI.get(nome)
  if (!righe) return []
  let des = []
  const padre = righe.find((r) => r.startsWith('pere:'))
  if (padre) des = [...desinenzeDi(padre.slice(5).trim(), visti)]
  for (const r of righe) {
    const m = /^des:([\d,\-]+):(\d+):(.*)$/.exec(r.trim())
    if (!m) continue
    const slot = []
    for (const p of m[1].split(',')) {
      const [a, b] = p.split('-').map(Number)
      for (let i = a; i <= (b ?? a); i++) slot.push(i)
    }
    if (slot.some((n) => n > 12)) continue // aggettivi: numerazione diversa
    const valori = m[3].startsWith('$') ? LISTE.get(m[3].slice(1)) ?? [] : m[3].split(';')
    // Quando le desinenze sono meno delle caselle, l'ultima vale per tutte
    // quelle che restano: nella 3ª declinazione «-ibus» copre dativo e
    // ablativo plurale, ed è scritto una volta sola.
    slot.forEach((n, i) => {
      const v = valori[Math.min(i, valori.length - 1)]
      if (v !== undefined && v !== '') des[n - 1] = v
    })
  }
  return des
}

/** Le tabelle del corso da controllare, e il modello di Collatinus. */
const PARADIGMI_MODELLO = {
  'rosa, rosae (f.) — «la rosa»': 'uita',
  'dominus, dominī (m.) — «il padrone»': 'lupus',
  'templum, templī (n.) — «il tempio»': 'templum',
  'rēx, rēgis (m.) — «il re»': 'miles',
  'nōmen, nōminis (n.) — «il nome»': 'corpus',
  'manus, manūs (f.) — «la mano»': 'manus',
  'rēs, reī (f.) — «la cosa»': 'res',
}

const CASI = { nominativo: 0, vocativo: 1, accusativo: 2, genitivo: 3, dativo: 4, ablativo: 5 }
const senzaSegni = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
/**
 * Porta una forma della fonte alla convenzione del corso: via le brevi (il
 * corso segna solo le lunghe) e via la lineetta sui DITTONGHI.
 *
 * Collatinus scrive «rosāe» perché metricamente il dittongo è lungo; i
 * vocabolari scrivono «rosae», perché un dittongo è lungo per definizione e
 * la lineetta non aggiunge nulla. È una differenza di convenzione, non di
 * sostanza — e senza questa riga produrrebbe decine di falsi allarmi.
 */
const soloLunghe = (s) =>
  s
    .normalize('NFD')
    .replace(/\u0306/g, '')
    .normalize('NFC')
    .replace(/ā(?=e)/g, 'a')
    .replace(/ō(?=e)/g, 'o')
    .replace(/ā(?=u)/g, 'a')
    .replace(/ē(?=u|i)/g, 'e')
/** Vero se due forme coincidono anche nelle lineette. */
const uguali = (a, b) => a.normalize('NFC') === b.normalize('NFC')

console.log('\n─────────── desinenze delle declinazioni ───────────')
let celleControllate = 0
const erroriDes = []
let saltatiNom = 0

for (const u of curriculum) {
  for (const l of u.lessons) {
    for (const ex of l.exercises) {
      if (ex.type !== 'table') continue
      const modello = PARADIGMI_MODELLO[ex.title]
      if (!modello) continue
      const des = desinenzeDi(modello)
      if (des.length < 12) {
        console.log(`  (modello «${modello}» incompleto: salto «${ex.title}»)`)
        continue
      }
      // il tema si ricava dal genitivo singolare, togliendo la sua desinenza
      const rigaGen = ex.rows.find((r) => /genitivo/i.test(String(r[0])))
      if (!rigaGen) continue
      const finaleGen = senzaSegni(des[3]).replace(/,.*/, '')
      const genSg = String(rigaGen[1])
      if (!senzaSegni(genSg).endsWith(finaleGen)) {
        erroriDes.push(`${ex.title}: il genitivo singolare «${genSg}» non finisce in «-${finaleGen}» come vuole il modello`)
        continue
      }
      const tema = genSg.slice(0, genSg.length - finaleGen.length)

      for (const r of ex.rows) {
        const caso = CASI[String(r[0]).trim().toLowerCase()]
        if (caso === undefined) continue
        for (const [col, base] of [[1, 0], [2, 6]]) {
          const nostra = String(r[col] ?? '').trim()
          if (!nostra || nostra === '—') continue
          const attesa = des[base + caso]
          if (attesa === undefined) continue
          // Nominativo e vocativo singolari della 3ª sono irregolari (rēx,
          // nōmen): il modello non li costruisce dal tema, e infatti li marca
          // «-». Non si possono controllare così.
          if (attesa === '-') { saltatiNom++; continue }
          celleControllate++
          const ok = attesa
            .split(',')
            .some((variante) => uguali(nostra, soloLunghe(tema + variante)))
          if (!ok) {
            erroriDes.push(
              `${ex.title} · ${r[0]} ${col === 1 ? 'singolare' : 'plurale'}: ` +
                `il corso ha «${nostra}», il modello dà «${soloLunghe(tema + attesa)}»`,
            )
          }
        }
      }
    }
  }
}

console.log(`Celle di paradigma confrontate: ${celleControllate} (${saltatiNom} nominativi irregolari non confrontabili).`)
if (!erroriDes.length) console.log('Tutte le desinenze coincidono con il modello, lineette comprese.')
else {
  console.log(`\n${erroriDes.length} divergenze:\n`)
  for (const e of erroriDes) console.log('  • ' + e)
}
