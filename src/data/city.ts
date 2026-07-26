// Gli edifici costruibili nella città (Urbs), disposti su una griglia
// ISOMETRICA. Ognuno ha un nome latino (vocabolario in più!), un prezzo in
// denarii, uno sblocco legato alle lezioni completate, e un "lotto" nella
// griglia (riga, colonna, larghezza, profondità).
//
// ►► IMMAGINI ◄◄
// Finché non ci sono illustrazioni, ogni edificio viene DISEGNATO in SVG in
// base al campo `look`. Quando avrai le immagini isometriche (PNG con sfondo
// trasparente), basta metterle in src/assets/city/ e valorizzare `img`:
//   img: new URL('../assets/city/templum.png', import.meta.url).href
// L'immagine viene ancorata al lotto e sostituisce il disegno.

export type BuildingLook =
  | 'domus'
  | 'garden'
  | 'shop'
  | 'fountain'
  | 'statue'
  | 'temple'
  | 'baths'
  | 'basilica'
  | 'aqueduct'
  | 'warehouse'
  | 'arena'
  | 'circus'

export interface Building {
  id: string
  /** Nome latino. */
  name: string
  /** Traduzione italiana. */
  gloss: string
  /** Icona per il negozio. */
  icon: string
  /** Costo in denarii. */
  cost: number
  /** Lezioni da completare per sbloccarlo all'acquisto. */
  unlock: number
  /** Lotto nella griglia isometrica: [riga, colonna, larghezza, profondità]. */
  plot: [number, number, number, number]
  /** Aspetto del segnaposto disegnato. */
  look: BuildingLook
  /** Immagine isometrica che sostituisce il disegno (opzionale). */
  img?: string
}

export const GRID_SIZE = 7

export const BUILDINGS: Building[] = [
  // ── Monumenti, in fondo (si vedono dietro) ──
  {
    id: 'templum', name: 'Templum', gloss: 'tempio', icon: '🏛️',
    cost: 110, unlock: 6, plot: [0, 0, 2, 2], look: 'temple',
  },
  {
    id: 'basilica', name: 'Basilica', gloss: 'basilica', icon: '🏦',
    cost: 190, unlock: 10, plot: [0, 3, 2, 2], look: 'basilica',
  },
  {
    id: 'amphitheatrum', name: 'Amphitheatrum', gloss: 'anfiteatro', icon: '🏟️',
    cost: 350, unlock: 16, plot: [0, 5, 2, 2], look: 'arena',
  },
  // ── L'acquedotto attraversa la città ──
  {
    id: 'aquaeductus', name: 'Aquaeductus', gloss: 'acquedotto', icon: '🌉',
    cost: 240, unlock: 12, plot: [2, 0, 3, 1], look: 'aqueduct',
  },
  // ── Fascia centrale ──
  {
    id: 'thermae', name: 'Thermae', gloss: 'terme', icon: '♨️',
    cost: 150, unlock: 8, plot: [3, 0, 2, 2], look: 'baths',
  },
  {
    id: 'circus', name: 'Circus', gloss: 'circo', icon: '🏇',
    cost: 420, unlock: 18, plot: [3, 3, 2, 2], look: 'circus',
  },
  {
    id: 'statua', name: 'Statua', gloss: 'statua', icon: '🗿',
    cost: 80, unlock: 5, plot: [3, 6, 1, 1], look: 'statue',
  },
  {
    id: 'fons', name: 'Fons', gloss: 'fontana', icon: '⛲',
    cost: 60, unlock: 4, plot: [4, 6, 1, 1], look: 'fountain',
  },
  // ── Davanti: la vita quotidiana ──
  {
    id: 'portus', name: 'Portus', gloss: 'porto', icon: '⚓',
    cost: 280, unlock: 14, plot: [5, 0, 2, 2], look: 'warehouse',
  },
  {
    id: 'domus', name: 'Domus', gloss: 'casa', icon: '🏠',
    cost: 20, unlock: 1, plot: [5, 3, 1, 1], look: 'domus',
  },
  {
    id: 'hortus', name: 'Hortus', gloss: 'giardino', icon: '🌳',
    cost: 30, unlock: 1, plot: [5, 4, 1, 1], look: 'garden',
  },
  {
    id: 'taberna', name: 'Taberna', gloss: 'bottega', icon: '🏪',
    cost: 45, unlock: 2, plot: [6, 3, 1, 1], look: 'shop',
  },
]
