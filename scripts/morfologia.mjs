// Un analizzatore morfologico latino, costruito sui dati di WHITAKER'S WORDS.
//
// William Whitaker ha passato anni a compilare due tabelle: INFLECTS.LAT, che
// elenca ogni desinenza latina con la sua analisi completa, e DICTLINE.GEN,
// che elenca 39 000 lemmi con i loro temi. Sono di pubblico dominio e sono la
// base di quasi tutti gli strumenti latini in circolazione.
//
// L'algoritmo è quello di Whitaker, ed è semplice: si prova a spezzare la
// parola in tema + desinenza in tutti i modi possibili; se la desinenza esiste
// per una certa flessione e il tema è quello di un lemma della stessa
// flessione, la lettura è valida.
//
// Serve a controllare quello che nessuna tabella di paradigmi può controllare:
// se le FRASI scritte negli esercizi sono latino vero, e se le analisi che il
// corso dichiara («rosam è accusativo singolare») sono giuste.

import { readFileSync, existsSync } from 'node:fs'

const CARTELLA = new URL('../.cache/', import.meta.url)
const file = (n) => new URL(n, CARTELLA)

export function datiPresenti() {
  return existsSync(file('INFLECTS.LAT')) && existsSync(file('DICTLINE.GEN'))
}

/** Via le lineette: i dati di Whitaker non le hanno. */
export const senzaLineette = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** In latino classico u/v e i/j sono la stessa lettera. */
const normale = (s) => senzaLineette(s).replace(/v/g, 'u').replace(/j/g, 'i')

// ─────────────────── le desinenze ───────────────────

/**
 * Una riga di INFLECTS.LAT, letta da destra: gli ultimi due campi sono età e
 * frequenza, prima c'è la desinenza (che può mancare), prima ancora la sua
 * lunghezza e il numero del tema da usare. Quello che resta in mezzo è
 * l'analisi: caso, numero, genere, tempo…
 */
function leggiDesinenze() {
  const perDesinenza = new Map()
  for (const riga of readFileSync(file('INFLECTS.LAT'), 'utf8').split(/\r?\n/)) {
    const pulita = riga.split('--')[0].trim()
    if (!pulita) continue
    const t = pulita.split(/\s+/)
    if (t.length < 5) continue
    let desinenza, lunghezza, tema, tag
    if (/^\d+$/.test(t[t.length - 3])) {
      desinenza = ''
      lunghezza = Number(t[t.length - 3])
      tema = Number(t[t.length - 4])
      tag = t.slice(0, t.length - 4)
    } else {
      desinenza = t[t.length - 3]
      lunghezza = Number(t[t.length - 4])
      tema = Number(t[t.length - 5])
      tag = t.slice(0, t.length - 5)
    }
    if (!Number.isInteger(tema) || !Number.isInteger(lunghezza)) continue
    if (desinenza.length !== lunghezza) continue
    const parte = tag[0]
    // Per i nomi, gli aggettivi, i verbi… i due campi dopo la parte del
    // discorso sono declinazione e variante; per le parole invariabili no.
    const flesso = /^(N|ADJ|V|VPAR|PRON|NUM|SUPINE)$/.test(parte)
    const decl = flesso ? Number(tag[1]) : 0
    const vari = flesso ? Number(tag[2]) : 0
    const analisi = flesso ? tag.slice(3) : tag.slice(1)
    const k = normale(desinenza)
    perDesinenza.set(k, [
      ...(perDesinenza.get(k) ?? []),
      { parte, decl, vari, tema, analisi, desinenza },
    ])
  }
  return perDesinenza
}

// ─────────────────── i lemmi ───────────────────

/**
 * DICTLINE.GEN ha colonne fisse: quattro temi da 19 caratteri, poi la parte
 * del discorso con i suoi codici, poi il significato.
 */
function leggiLemmi() {
  const perTema = new Map()
  for (const riga of readFileSync(file('DICTLINE.GEN'), 'utf8').split(/\r?\n/)) {
    if (riga.length < 80) continue
    const temi = [0, 19, 38, 57].map((i) => riga.slice(i, i + 19).trim())
    const resto = riga.slice(76).trim().split(/\s+/)
    const parte = resto[0]
    const flesso = /^(N|ADJ|V|VPAR|PRON|NUM|SUPINE)$/.test(parte)
    const decl = flesso ? Number(resto[1]) : 0
    const vari = flesso ? Number(resto[2]) : 0
    const senso = (riga.slice(76).match(/[A-Z] [A-Z] [A-Z] [A-Z] [A-Z]\s+(.*)$/) ?? [])[1] ?? ''
    const voce = { parte, decl, vari, temi, senso: senso.slice(0, 60) }
    temi.forEach((t, i) => {
      if (!t || t === 'zzz') return
      const k = `${i + 1}|${normale(t)}`
      perTema.set(k, [...(perTema.get(k) ?? []), voce])
    })
  }
  return perTema
}

/**
 * Le forme di ESSE, e le enclitiche.
 *
 * «sum» non è in DICTLINE.GEN: il programma di Whitaker lo tratta a parte,
 * perché è troppo irregolare per il meccanismo tema + desinenza. Lo scriviamo
 * qui, ed è l'unico pezzo di questo file che non viene da una fonte esterna.
 *
 * Non è un buco nel controllo: le forme di «esse» del corso sono già
 * verificate due volte — dal confronto interno con i paradigmi (npm run check)
 * e dai modelli di Collatinus. Qui servono soltanto a non far gridare
 * all'errore ogni volta che in una frase compare «est».
 */
const ESSE = {
  sum: 'PRES ACTIVE IND 1 S', es: 'PRES ACTIVE IND 2 S', est: 'PRES ACTIVE IND 3 S',
  sumus: 'PRES ACTIVE IND 1 P', estis: 'PRES ACTIVE IND 2 P', sunt: 'PRES ACTIVE IND 3 P',
  eram: 'IMPF ACTIVE IND 1 S', eras: 'IMPF ACTIVE IND 2 S', erat: 'IMPF ACTIVE IND 3 S',
  eramus: 'IMPF ACTIVE IND 1 P', eratis: 'IMPF ACTIVE IND 2 P', erant: 'IMPF ACTIVE IND 3 P',
  ero: 'FUT ACTIVE IND 1 S', eris: 'FUT ACTIVE IND 2 S', erit: 'FUT ACTIVE IND 3 S',
  erimus: 'FUT ACTIVE IND 1 P', eritis: 'FUT ACTIVE IND 2 P', erunt: 'FUT ACTIVE IND 3 P',
  fui: 'PERF ACTIVE IND 1 S', fuisti: 'PERF ACTIVE IND 2 S', fuit: 'PERF ACTIVE IND 3 S',
  fuimus: 'PERF ACTIVE IND 1 P', fuistis: 'PERF ACTIVE IND 2 P', fuerunt: 'PERF ACTIVE IND 3 P',
  fueram: 'PLUP ACTIVE IND 1 S', fuerat: 'PLUP ACTIVE IND 3 S', fuerant: 'PLUP ACTIVE IND 3 P',
  sim: 'PRES ACTIVE SUB 1 S', sis: 'PRES ACTIVE SUB 2 S', sit: 'PRES ACTIVE SUB 3 S',
  simus: 'PRES ACTIVE SUB 1 P', sitis: 'PRES ACTIVE SUB 2 P', sint: 'PRES ACTIVE SUB 3 P',
  essem: 'IMPF ACTIVE SUB 1 S', esses: 'IMPF ACTIVE SUB 2 S', esset: 'IMPF ACTIVE SUB 3 S',
  essemus: 'IMPF ACTIVE SUB 1 P', essetis: 'IMPF ACTIVE SUB 2 P', essent: 'IMPF ACTIVE SUB 3 P',
  fuerim: 'PERF ACTIVE SUB 1 S', fuerit: 'PERF ACTIVE SUB 3 S', fuerint: 'PERF ACTIVE SUB 3 P',
  fuissem: 'PLUP ACTIVE SUB 1 S', fuisset: 'PLUP ACTIVE SUB 3 S', fuissent: 'PLUP ACTIVE SUB 3 P',
  esse: 'PRES ACTIVE INF 0 X', fuisse: 'PERF ACTIVE INF 0 X', futurus: 'FUT ACTIVE PPL',
  potest: 'PRES ACTIVE IND 3 S', possunt: 'PRES ACTIVE IND 3 P', potuit: 'PERF ACTIVE IND 3 S',
}

/** Le particelle che si attaccano in coda: «populusque» = «populus» + «que». */
const ENCLITICHE = ['que', 've', 'ne']

let DESINENZE = null
let LEMMI = null

/**
 * Tutte le letture possibili di una forma latina.
 *
 * Ogni lettura dice quale lemma è, con quale desinenza, e che analisi ha —
 * per esempio «NOM S M» (nominativo singolare maschile) o «PERF ACTIVE IND 3 S».
 */
export function analizza(parola) {
  if (!DESINENZE) DESINENZE = leggiDesinenze()
  if (!LEMMI) LEMMI = leggiLemmi()
  const p = normale(parola)
  if (!p || /[^a-z]/.test(p)) return []

  if (ESSE[p]) return [{ lemma: 'sum', parte: 'V', analisi: ESSE[p].split(' '), senso: 'essere' }]

  // «populusque» → «populus» + «-que»
  for (const enc of ENCLITICHE) {
    if (p.length > enc.length + 2 && p.endsWith(enc)) {
      const senza = analizza(p.slice(0, p.length - enc.length))
      if (senza.length) return senza
    }
  }

  const dirette = cerca(p)
  if (dirette.length) return dirette

  // Il perfetto si contrae spesso: «trānsīsse» sta per «trānsiisse»,
  // «amārunt» per «amāvērunt». Whitaker registra le forme piene, quindi la
  // contratta va riportata a quella prima di cercarla.
  for (const [contratta, piena] of [
    [/isse(m|s|t|mus|tis|nt)?$/, 'iisse$1'],
    [/arunt$/, 'auerunt'],
    [/asse(m|s|t|mus|tis|nt)?$/, 'auisse$1'],
    // I composti di «eō» hanno due perfetti, «-iī» accanto a «-īvī», e
    // Whitaker registra solo il secondo: «trānsiisset» va cercato come
    // «trānsīvisset».
    [/iisse(m|s|t|mus|tis|nt)?$/, 'iuisse$1'],
    [/isse(m|s|t|mus|tis|nt)?$/, 'iuisse$1'],
    [/iit$/, 'iuit'],
    [/ierunt$/, 'iuerunt'],
  ]) {
    const espansa = p.replace(contratta, piena)
    if (espansa !== p) {
      const r = cerca(espansa)
      if (r.length) return r
    }
  }
  return []
}

/** Il cuore dell'algoritmo: prova tutti i tagli tema + desinenza. */
function cerca(p) {
  const out = []
  // la desinenza può essere lunga da 0 a 7 lettere
  for (let n = 0; n <= Math.min(7, p.length); n++) {
    const tema = p.slice(0, p.length - n)
    const des = p.slice(p.length - n)
    for (const d of DESINENZE.get(des) ?? []) {
      for (const voce of LEMMI.get(`${d.tema}|${tema}`) ?? []) {
        if (voce.parte !== d.parte && !(d.parte === 'VPAR' && voce.parte === 'V')) continue
        // Lo zero vale «qualsiasi», da una parte e dall'altra: le desinenze
        // del perfetto, per dire, sono le stesse in tutte le coniugazioni e
        // Whitaker le registra una volta sola con declinazione 0.
        if (d.decl !== 0 && voce.decl !== 0 && d.decl !== voce.decl) continue
        if (d.vari !== 0 && voce.vari !== 0 && d.vari !== voce.vari) continue
        out.push({
          lemma: voce.temi.find(Boolean),
          parte: d.parte,
          analisi: d.analisi,
          senso: voce.senso,
        })
      }
    }
  }
  return out
}

/** Vero se la forma esiste in latino (almeno una lettura). */
export const esiste = (parola) => analizza(parola).length > 0
