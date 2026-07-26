// Gli edifici costruibili nella città (Urbs). Ognuno ha un nome latino
// (vocabolario in più!), un prezzo in denarii e uno sblocco legato al numero
// di lezioni completate. Facile da ampliare: basta aggiungere elementi.

export interface Building {
  id: string
  /** Nome latino. */
  name: string
  /** Traduzione italiana. */
  gloss: string
  /** Icona (emoji). */
  icon: string
  /** Costo in denarii. */
  cost: number
  /** Lezioni da completare per sbloccarlo all'acquisto. */
  unlock: number
}

export const BUILDINGS: Building[] = [
  // Fascia 1 — le basi
  { id: 'domus', name: 'Domus', gloss: 'casa', icon: '🏠', cost: 20, unlock: 1 },
  { id: 'hortus', name: 'Hortus', gloss: 'giardino', icon: '🌳', cost: 30, unlock: 1 },
  { id: 'taberna', name: 'Taberna', gloss: 'bottega', icon: '🏪', cost: 45, unlock: 2 },
  // Fascia 2 — la vita pubblica
  { id: 'fons', name: 'Fons', gloss: 'fontana', icon: '⛲', cost: 60, unlock: 4 },
  { id: 'statua', name: 'Statua', gloss: 'statua', icon: '🗿', cost: 80, unlock: 5 },
  { id: 'templum', name: 'Templum', gloss: 'tempio', icon: '🏛️', cost: 110, unlock: 6 },
  // Fascia 3 — la grande città
  { id: 'thermae', name: 'Thermae', gloss: 'terme', icon: '♨️', cost: 150, unlock: 8 },
  { id: 'basilica', name: 'Basilica', gloss: 'basilica', icon: '🏦', cost: 190, unlock: 10 },
  { id: 'aquaeductus', name: 'Aquaeductus', gloss: 'acquedotto', icon: '🌉', cost: 240, unlock: 12 },
  // Fascia 4 — i monumenti
  { id: 'portus', name: 'Portus', gloss: 'porto', icon: '⚓', cost: 280, unlock: 14 },
  { id: 'amphitheatrum', name: 'Amphitheatrum', gloss: 'anfiteatro', icon: '🏟️', cost: 350, unlock: 16 },
  { id: 'circus', name: 'Circus', gloss: 'circo', icon: '🏇', cost: 420, unlock: 18 },
]
