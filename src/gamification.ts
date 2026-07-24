// Regole di gioco: ranghi latini e obiettivo giornaliero.

export interface Rank {
  /** Titolo latino del rango. */
  name: string
  /** Traduzione italiana. */
  gloss: string
  /** XP minimi per raggiungerlo. */
  minXp: number
  /** Emoji/simbolo del rango. */
  icon: string
}

// Scala di ranghi ispirata al cursus honorum romano.
export const RANKS: Rank[] = [
  { name: 'Tiro', gloss: 'recluta', minXp: 0, icon: '🔰' },
  { name: 'Discipulus', gloss: 'allievo', minXp: 100, icon: '📖' },
  { name: 'Scriba', gloss: 'scrivano', minXp: 250, icon: '✒️' },
  { name: 'Grammaticus', gloss: 'grammatico', minXp: 500, icon: '📜' },
  { name: 'Rhetor', gloss: 'oratore', minXp: 900, icon: '🗣️' },
  { name: 'Senator', gloss: 'senatore', minXp: 1400, icon: '🏛️' },
  { name: 'Consul', gloss: 'console', minXp: 2100, icon: '⚜️' },
  { name: 'Imperator', gloss: 'imperatore', minXp: 3000, icon: '👑' },
]

export interface RankProgress {
  current: Rank
  next: Rank | null
  /** Frazione 0–1 verso il rango successivo. */
  progress: number
  xpIntoRank: number
  xpForNext: number
}

export function rankInfo(xp: number): RankProgress {
  let idx = 0
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXp) idx = i
  }
  const current = RANKS[idx]
  const next = RANKS[idx + 1] ?? null
  const xpForNext = next ? next.minXp - current.minXp : 0
  const xpIntoRank = xp - current.minXp
  const progress = next ? Math.min(1, xpIntoRank / xpForNext) : 1
  return { current, next, progress, xpIntoRank, xpForNext }
}

/** Obiettivo di XP giornaliero (Pensum diei). */
export const DAILY_GOAL = 40
