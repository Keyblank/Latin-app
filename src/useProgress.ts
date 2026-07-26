import { useCallback, useEffect, useState } from 'react'
import type { Exercise } from './types'
import type { Memoria } from './vocabolario'
import { avanza, fraGiorni, paroleDiLezione } from './vocabolario'

/** Una casella di strada: dove, e di che tipo. */
export interface Road {
  r: number
  c: number
  /** 0 sterrato, 1 lastricata, 2 consolare. */
  t: 0 | 1 | 2
}

/** Un edificio piazzato nella città: quale, dove, e come ruotato. */
export interface Placed {
  /** id dell'edificio */
  b: string
  /** riga e colonna dell'angolo del lotto */
  r: number
  c: number
  /** 1 se ruotato di 90° (larghezza e profondità si scambiano). */
  rot?: 0 | 1
}

const STORAGE_KEY = 'latino-app-progress-v1'
const MAX_MISTAKES = 40

export interface Progress {
  /** ID delle lezioni completate. */
  completed: string[]
  /** Punti esperienza totali. */
  xp: number
  /** Giorni di fila (streak). */
  streak: number
  /** Data (YYYY-MM-DD) dell'ultima attività. */
  lastDay: string | null
  /** XP guadagnati oggi (per l'obiettivo giornaliero). */
  dailyXp: number
  /** Data (YYYY-MM-DD) a cui si riferisce dailyXp. */
  dailyDate: string | null
  /** Esercizi sbagliati da ripassare (solo scelta multipla e costruzione). */
  mistakes: Exercise[]
  /** Monete da spendere per costruire la città (Urbs). */
  denarii: number
  /** Edifici piazzati nella città (posizione scelta dal giocatore). */
  city: Placed[]
  /** Caselle di strada. */
  roads: Road[]
  /** Livello del terreno acquistato (0 = isola iniziale). */
  land: number
  /** Se true, tutte le lezioni sono sbloccate (navigazione libera). */
  freeMode: boolean
  /** ID delle versioni già tradotte. */
  versiones: string[]
  /** Per ogni vocabolo: quanto lo sai e quando va rivisto. */
  vocab: Record<string, Memoria>
  /** Parole nuove già incontrate oggi, e in che giorno: serve a non
   *  divorare tutto il vocabolario in una sera. */
  vocabNuove: { data: string; n: number }
}

const emptyProgress: Progress = {
  completed: [],
  xp: 0,
  streak: 0,
  lastDay: null,
  dailyXp: 0,
  dailyDate: null,
  mistakes: [],
  denarii: 0,
  city: [],
  roads: [],
  land: 0,
  freeMode: false,
  versiones: [],
  vocab: {},
  vocabNuove: { data: '', n: 0 },
}

/**
 * Porta un salvataggio qualsiasi alla forma corrente: i campi che mancano
 * prendono il valore di partenza, così un salvataggio vecchio (o importato da
 * un'altra versione dell'app) non manda in crisi niente.
 */
export function migra(saved: Partial<Progress>): Progress {
  const p = { ...emptyProgress, ...saved } as Progress
  // Le prime versioni salvavano le strade come stringhe "riga,colonna".
  p.roads = (p.roads as unknown as (string | Road)[]).map((x) => {
    if (typeof x !== 'string') return x
    const [r, c] = x.split(',').map(Number)
    return { r, c, t: 1 as const }
  })
  // Le lezioni completate prima che esistesse il ripasso a distanza non hanno
  // mai messo in calendario le loro parole: le recuperiamo qui, una volta.
  // Senza, chi ha già studiato metà corso non rivedrebbe mai quel lessico.
  const vocab = { ...p.vocab }
  for (const id of p.completed) {
    for (const v of paroleDiLezione(id)) {
      if (!vocab[v.lat]) vocab[v.lat] = { liv: 0, quando: fraGiorni(1) }
    }
  }
  p.vocab = vocab
  return p
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    return migra(JSON.parse(raw))
  } catch {
    return emptyProgress
  }
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function isYesterday(dateStr: string): boolean {
  const y = new Date()
  y.setDate(y.getDate() - 1)
  return y.toISOString().slice(0, 10) === dateStr
}

const exKey = (e: Exercise) => JSON.stringify(e)

/** Aggiorna l'elenco degli errori: toglie quelli indovinati, aggiunge i nuovi. */
function updateMistakes(prev: Exercise[], wrong: Exercise[], correct: Exercise[]): Exercise[] {
  const correctKeys = new Set(correct.map(exKey))
  let list = prev.filter((m) => !correctKeys.has(exKey(m)))
  const present = new Set(list.map(exKey))
  for (const w of wrong) {
    const k = exKey(w)
    if (!present.has(k)) {
      list.push(w)
      present.add(k)
    }
  }
  if (list.length > MAX_MISTAKES) list = list.slice(list.length - MAX_MISTAKES)
  return list
}

interface FinishArgs {
  /** ID della lezione completata, oppure null per il ripasso (Repetitio). */
  lessonId: string | null
  xp: number
  wrong: Exercise[]
  correct: Exercise[]
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  /** Lezione completata con successo: XP, streak, obiettivo del giorno, errori. */
  const finishLesson = useCallback(({ lessonId, xp, wrong, correct }: FinishArgs) => {
    setProgress((prev) => {
      const today = todayKey()
      let streak = prev.streak
      if (prev.lastDay !== today) {
        streak = prev.lastDay && isYesterday(prev.lastDay) ? prev.streak + 1 : 1
      }
      const dailyBase = prev.dailyDate === today ? prev.dailyXp : 0
      const completed =
        lessonId && !prev.completed.includes(lessonId)
          ? [...prev.completed, lessonId]
          : prev.completed

      // Le parole appena studiate entrano nel ripasso a distanza, con
      // scadenza a domani. Prima ci arrivavano col contagocce (cinque al
      // giorno, scelte dal programma): studiavi diciotto preposizioni e il
      // giorno dopo ne rivedevi cinque a caso, magari di un'altra unità. Una
      // parola vista una volta e mai più non si impara — è tornare sopra a
      // distanza che la fissa.
      const vocab = { ...prev.vocab }
      if (lessonId) {
        for (const v of paroleDiLezione(lessonId)) {
          if (!vocab[v.lat]) vocab[v.lat] = { liv: 0, quando: fraGiorni(1) }
        }
      }

      return {
        ...prev,
        completed,
        vocab,
        xp: prev.xp + xp,
        // Si guadagnano denarii pari agli XP: da spendere nella città.
        denarii: prev.denarii + xp,
        streak,
        lastDay: today,
        dailyXp: dailyBase + xp,
        dailyDate: today,
        mistakes: updateMistakes(prev.mistakes, wrong, correct),
      }
    })
  }, [])

  /** Piazza un edificio nella città, se ci sono abbastanza denarii. */
  const build = useCallback(
    (id: string, cost: number, r: number, c: number, rot: 0 | 1 = 0) => {
      setProgress((prev) => {
        if (prev.denarii < cost) return prev
        return { ...prev, denarii: prev.denarii - cost, city: [...prev.city, { b: id, r, c, rot }] }
      })
    },
    [],
  )

  /** Demolisce l'edificio con quell'indice (rimborso indicato). */
  const demolish = useCallback((index: number, refund: number) => {
    setProgress((prev) => ({
      ...prev,
      denarii: prev.denarii + refund,
      city: prev.city.filter((_, i) => i !== index),
    }))
  }, [])

  /** Costruisce (o sostituisce) una casella di strada. */
  const addRoad = useCallback((r: number, c: number, t: 0 | 1 | 2, cost: number) => {
    setProgress((prev) => {
      const existing = prev.roads.find((x) => x.r === r && x.c === c)
      if (existing?.t === t || prev.denarii < cost) return prev
      const roads = prev.roads.filter((x) => !(x.r === r && x.c === c))
      return { ...prev, denarii: prev.denarii - cost, roads: [...roads, { r, c, t }] }
    })
  }, [])

  /** Rimuove una casella di strada (rimborso indicato). */
  const removeRoad = useCallback((r: number, c: number, refund: number) => {
    setProgress((prev) => {
      if (!prev.roads.some((x) => x.r === r && x.c === c)) return prev
      return {
        ...prev,
        denarii: prev.denarii + refund,
        roads: prev.roads.filter((x) => !(x.r === r && x.c === c)),
      }
    })
  }, [])

  /** Compra il livello di terreno successivo. */
  const expandLand = useCallback((cost: number) => {
    setProgress((prev) => {
      if (prev.denarii < cost) return prev
      return { ...prev, denarii: prev.denarii - cost, land: prev.land + 1 }
    })
  }, [])

  /** Uscita senza completare: registra solo gli errori (per il ripasso). */
  const recordMistakes = useCallback((wrong: Exercise[], correct: Exercise[]) => {
    if (wrong.length === 0 && correct.length === 0) return
    setProgress((prev) => ({
      ...prev,
      mistakes: updateMistakes(prev.mistakes, wrong, correct),
    }))
  }, [])

  /** Registra una versione tradotta: dà XP e denarii come una lezione, e
   *  contribuisce all'obiettivo giornaliero. */
  const finishVersio = useCallback((id: string, xp: number, denarii: number) => {
    setProgress((prev) => {
      const oggi = todayKey()
      const stessoGiorno = prev.dailyDate === oggi
      return {
        ...prev,
        xp: prev.xp + xp,
        denarii: prev.denarii + denarii,
        dailyXp: (stessoGiorno ? prev.dailyXp : 0) + xp,
        dailyDate: oggi,
        versiones: prev.versiones.includes(id) ? prev.versiones : [...prev.versiones, id],
      }
    })
  }, [])

  /** Registra un ripasso di lessico: aggiorna la scadenza di ogni parola. */
  const finishVocab = useCallback(
    (esiti: Record<string, boolean>, xp: number, denarii: number) => {
      setProgress((prev) => {
        const vocab = { ...prev.vocab }
        let nuove = 0
        for (const [parola, giusta] of Object.entries(esiti)) {
          if (!prev.vocab[parola]) nuove++
          vocab[parola] = avanza(prev.vocab[parola], giusta)
        }
        const g = todayKey()
        const stesso = prev.dailyDate === g
        const contate = prev.vocabNuove.data === g ? prev.vocabNuove.n : 0
        return {
          ...prev,
          vocab,
          vocabNuove: { data: g, n: contate + nuove },
          xp: prev.xp + xp,
          denarii: prev.denarii + denarii,
          dailyXp: (stesso ? prev.dailyXp : 0) + xp,
          dailyDate: g,
        }
      })
    },
    [],
  )

  /** Sostituisce i progressi con quelli di un file esportato.
   *
   *  Sovrascrive tutto, quindi chi chiama deve aver già chiesto conferma. */
  const importa = useCallback((salvati: Partial<Progress>) => {
    setProgress(migra(salvati))
  }, [])

  /** Attiva/disattiva lo sblocco di tutte le lezioni. */
  const toggleFreeMode = useCallback(() => {
    setProgress((prev) => ({ ...prev, freeMode: !prev.freeMode }))
  }, [])

  // "Ricomincia da capo" azzera i progressi ma mantiene la scelta della modalità.
  const reset = useCallback(() => {
    setProgress((prev) => ({ ...emptyProgress, freeMode: prev.freeMode }))
  }, [])

  return {
    progress,
    finishLesson,
    finishVersio,
    finishVocab,
    recordMistakes,
    build,
    demolish,
    addRoad,
    removeRoad,
    expandLand,
    reset,
    toggleFreeMode,
    importa,
  }
}
