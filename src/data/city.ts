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
  | 'tower'
  | 'gate'
  | 'granary'
  | 'market'
  | 'insula'
  | 'villa'
  | 'wall'
  | 'tree'
  | 'column'
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
  /** Ingombro in celle: [larghezza, profondità]. La posizione la sceglie il giocatore. */
  size: [number, number]
  /** Aspetto del segnaposto disegnato. */
  look: BuildingLook
  /** Immagine isometrica che sostituisce il disegno (opzionale). */
  img?: string
}

/** Lo spazio delle coordinate è sempre questo: l'area costruibile è un
 *  quadrato centrato che cresce comprando terreno. */
export const GRID_MAX = 18

/** Lato dell'area costruibile per ogni livello di terreno. */
export const LAND_SIZES = [10, 14, 18]

/** Costo per ampliare al livello successivo. */
export const LAND_COSTS = [400, 900]

/** I tre tipi di strada, dal sentiero alla via consolare. */
export interface RoadKind {
  id: 0 | 1 | 2
  /** Nome latino. */
  name: string
  /** Traduzione italiana. */
  gloss: string
  icon: string
  cost: number
  /** Lezioni da completare per sbloccarla. */
  unlock: number
}

export const ROAD_KINDS: RoadKind[] = [
  { id: 0, name: 'Semita', gloss: 'sentiero sterrato', icon: '🟤', cost: 3, unlock: 1 },
  { id: 1, name: 'Via strata', gloss: 'strada lastricata', icon: '⬜', cost: 8, unlock: 4 },
  { id: 2, name: 'Via consularis', gloss: 'via consolare con marciapiedi', icon: '🛣️', cost: 18, unlock: 10 },
]

/** Estremi (inclusi) dell'area costruibile per un livello di terreno. */
export function landBounds(land: number): { min: number; max: number } {
  const size = LAND_SIZES[Math.min(land, LAND_SIZES.length - 1)]
  const min = Math.floor((GRID_MAX - size) / 2)
  return { min, max: min + size - 1 }
}

export const BUILDINGS: Building[] = [
  // ── Monumenti, in fondo (si vedono dietro) ──
  {
    id: 'templum', name: 'Templum', gloss: 'tempio', icon: '🏛️',
    cost: 110, unlock: 6, size: [2, 2], look: 'temple',
  },
  {
    id: 'basilica', name: 'Basilica', gloss: 'basilica', icon: '🏦',
    cost: 190, unlock: 10, size: [2, 2], look: 'basilica',
  },
  {
    id: 'amphitheatrum', name: 'Amphitheatrum', gloss: 'anfiteatro', icon: '🏟️',
    cost: 350, unlock: 16, size: [2, 2], look: 'arena',
  },
  // ── L'acquedotto attraversa la città ──
  {
    id: 'aquaeductus', name: 'Aquaeductus', gloss: 'acquedotto', icon: '🌉',
    cost: 240, unlock: 12, size: [3, 1], look: 'aqueduct',
  },
  // ── Fascia centrale ──
  {
    id: 'thermae', name: 'Thermae', gloss: 'terme', icon: '♨️',
    cost: 150, unlock: 8, size: [2, 2], look: 'baths',
  },
  {
    id: 'circus', name: 'Circus', gloss: 'circo', icon: '🏇',
    cost: 420, unlock: 18, size: [2, 2], look: 'circus',
  },
  {
    id: 'statua', name: 'Statua', gloss: 'statua', icon: '🗿',
    cost: 80, unlock: 5, size: [1, 1], look: 'statue',
  },
  {
    id: 'fons', name: 'Fons', gloss: 'fontana', icon: '⛲',
    cost: 60, unlock: 4, size: [1, 1], look: 'fountain',
  },
  // ── Abitazioni e arredo urbano ──
  {
    id: 'insula', name: 'Insula', gloss: 'palazzina', icon: '🏢',
    cost: 60, unlock: 3, size: [1, 1], look: 'insula',
  },
  {
    id: 'villa', name: 'Villa', gloss: 'villa con cortile', icon: '🏡',
    cost: 130, unlock: 7, size: [2, 2], look: 'villa',
  },
  {
    id: 'columna', name: 'Columna', gloss: 'colonna onoraria', icon: '🏛️',
    cost: 70, unlock: 5, size: [1, 1], look: 'column',
  },
  {
    id: 'arbor', name: 'Arbor', gloss: 'albero', icon: '🌲',
    cost: 8, unlock: 1, size: [1, 1], look: 'tree',
  },
  {
    id: 'murus', name: 'Murus', gloss: 'muro di cinta', icon: '🧱',
    cost: 12, unlock: 1, size: [1, 1], look: 'wall',
  },
  {
    id: 'turris', name: 'Turris', gloss: 'torre', icon: '🗼',
    cost: 45, unlock: 4, size: [1, 1], look: 'tower',
  },
  {
    id: 'porta', name: 'Porta', gloss: 'porta della città', icon: '🚪',
    cost: 90, unlock: 6, size: [1, 1], look: 'gate',
  },
  {
    id: 'horreum', name: 'Horreum', gloss: 'granaio', icon: '🌾',
    cost: 70, unlock: 5, size: [2, 1], look: 'granary',
  },
  {
    id: 'macellum', name: 'Macellum', gloss: 'mercato', icon: '🧺',
    cost: 100, unlock: 7, size: [2, 2], look: 'market',
  },
  // ── Davanti: la vita quotidiana ──
  {
    id: 'portus', name: 'Portus', gloss: 'porto', icon: '⚓',
    cost: 280, unlock: 14, size: [2, 2], look: 'warehouse',
  },
  {
    id: 'domus', name: 'Domus', gloss: 'casa', icon: '🏠',
    cost: 20, unlock: 1, size: [1, 1], look: 'domus',
  },
  {
    id: 'hortus', name: 'Hortus', gloss: 'giardino', icon: '🌳',
    cost: 30, unlock: 1, size: [1, 1], look: 'garden',
  },
  {
    id: 'taberna', name: 'Taberna', gloss: 'bottega', icon: '🏪',
    cost: 45, unlock: 2, size: [1, 1], look: 'shop',
  },
]
