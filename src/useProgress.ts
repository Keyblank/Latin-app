import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'latino-app-progress-v1'

export interface Progress {
  /** ID delle lezioni completate. */
  completed: string[]
  /** Punti esperienza totali. */
  xp: number
  /** Giorni di fila (streak). */
  streak: number
  /** Data (YYYY-MM-DD) dell'ultima attività. */
  lastDay: string | null
}

const emptyProgress: Progress = {
  completed: [],
  xp: 0,
  streak: 0,
  lastDay: null,
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

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  /** Registra una lezione completata, aggiornando XP e streak. */
  const completeLesson = useCallback((lessonId: string, xpEarned: number) => {
    setProgress((prev) => {
      const today = todayKey()
      let streak = prev.streak
      if (prev.lastDay !== today) {
        streak = prev.lastDay && isYesterday(prev.lastDay) ? prev.streak + 1 : 1
      }
      const completed = prev.completed.includes(lessonId)
        ? prev.completed
        : [...prev.completed, lessonId]
      return {
        completed,
        xp: prev.xp + xpEarned,
        streak,
        lastDay: today,
      }
    })
  }, [])

  const reset = useCallback(() => setProgress(emptyProgress), [])

  return { progress, completeLesson, reset }
}
