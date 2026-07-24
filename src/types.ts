// Tipi condivisi per il corso e gli esercizi.

/** Carta didattica: spiega un concetto, non richiede risposta. */
export interface InfoExercise {
  type: 'info'
  title: string
  body: string
  /** Emoji o simbolo decorativo mostrato in grande. */
  icon?: string
}

/** Scelta multipla: scegli la risposta corretta tra le opzioni. */
export interface ChoiceExercise {
  type: 'choice'
  /** Istruzione (es. "Quale significa «acqua»?"). */
  prompt: string
  /** Parola o frase mostrata in evidenza (opzionale). */
  focus?: string
  options: string[]
  /** L'opzione corretta (deve essere presente in options). */
  answer: string
}

/** Costruisci la traduzione toccando le parole nell'ordine giusto. */
export interface BuildExercise {
  type: 'build'
  prompt: string
  /** Frase da tradurre, mostrata in evidenza. */
  source: string
  /** Parole corrette, in ordine. */
  answer: string[]
  /** Parole extra da mescolare come distrattori. */
  extra?: string[]
}

/** Abbina le parole latine al loro significato. */
export interface MatchExercise {
  type: 'match'
  prompt: string
  /** Coppie [latino, italiano]. */
  pairs: [string, string][]
}

/** Tabella di grammatica (es. una declinazione): didattica, non richiede risposta. */
export interface TableExercise {
  type: 'table'
  title: string
  /** Intestazioni di colonna (es. ["Caso", "Singolare", "Plurale"]). */
  columns: string[]
  /** Righe della tabella; ogni riga ha una cella per colonna. */
  rows: string[][]
  /** Nota o spiegazione mostrata sotto la tabella. */
  note?: string
  /** Indici delle colonne le cui celle sono pronunciabili (pulsante 🔊). */
  speakCols?: number[]
}

export type Exercise =
  | InfoExercise
  | ChoiceExercise
  | BuildExercise
  | MatchExercise
  | TableExercise

export interface Lesson {
  id: string
  title: string
  /** Emoji dell'icona della lezione. */
  icon: string
  exercises: Exercise[]
}

export interface Unit {
  id: string
  title: string
  subtitle: string
  /** Colore principale dell'unità (CSS). */
  color: string
  lessons: Lesson[]
}
