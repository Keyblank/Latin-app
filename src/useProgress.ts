import { useCallback, useEffect, useState } from 'react'
import type { Exercise } from './types'

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
  /** Caselle di strada, come chiavi "riga,colonna". */
  roads: string[]
  /** Livello del terreno acquistato (0 = isola iniziale). */
  land: number
  /** Se true, tutte le lezioni sono sbloccate (navigazione libera). */
  freeMode: boolean
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
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    return { ...emptyProgress, ...JSON.parse(raw) }
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
      return {
        ...prev,
        completed,
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

  /** Costruisce una casella di strada. */
  const addRoad = useCallback((key: string, cost: number) => {
    setProgress((prev) => {
      if (prev.roads.includes(key) || prev.denarii < cost) return prev
      return { ...prev, denarii: prev.denarii - cost, roads: [...prev.roads, key] }
    })
  }, [])

  /** Rimuove una casella di strada (rimborso indicato). */
  const removeRoad = useCallback((key: string, refund: number) => {
    setProgress((prev) => {
      if (!prev.roads.includes(key)) return prev
      return { ...prev, denarii: prev.denarii + refund, roads: prev.roads.filter((k) => k !== key) }
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
    recordMistakes,
    build,
    demolish,
    addRoad,
    removeRoad,
    expandLand,
    reset,
    toggleFreeMode,
  }
}
