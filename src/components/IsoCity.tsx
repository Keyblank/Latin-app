import type { Building } from '../data/city'
import { GRID_SIZE } from '../data/city'

// Vista ISOMETRICA della città.
//
// Matematica di base: una cella della griglia è un rombo largo TW e alto TH.
// Un vertice di griglia (colonna C, riga R) finisce sullo schermo in:
//   x = (C - R) * TW/2      y = (C + R) * TH/2
// Aumentando C ci si sposta in basso a destra, aumentando R in basso a sinistra.
// Gli edifici sono prismi: si disegnano la faccia sinistra, la destra e il tetto.

const TW = 64 // larghezza di una cella
const TH = 32 // altezza di una cella

// Palette
const GRASS_A = '#a7c168'
const GRASS_B = '#9cb85f'
const GRASS_EDGE = '#8aa650'
const WALL_R = '#efe5d2' // faccia illuminata (destra)
const WALL_L = '#d8cbb2' // faccia in ombra (sinistra)
const WALL_TOP = '#f7f0e2'
const TILE_ROOF = '#c15a3c'
const TILE_ROOF_D = '#a1462d'
const MARBLE_R = '#f4f0e7'
const MARBLE_L = '#ded8cb'
const STONE_R = '#e2dccd'
const STONE_L = '#c9c2b0'
const SAND = '#e6d2a8'
const WATER = '#79b7d6'
const GOLD = '#e0a52e'
const INK = 'rgba(90,74,45,0.55)'

type P = [number, number]

/** Converte un vertice di griglia in coordinate schermo. */
function iso(c: number, r: number): P {
  return [(c - r) * (TW / 2), (c + r) * (TH / 2)]
}

const pts = (list: P[]) => list.map(([x, y]) => `${x},${y}`).join(' ')
const up = ([x, y]: P, h: number): P => [x, y - h]
const mid = ([x1, y1]: P, [x2, y2]: P): P => [(x1 + x2) / 2, (y1 + y2) / 2]

interface Corners {
  /** vertice in alto (nord) */ a: P
  /** vertice a destra (est) */ b: P
  /** vertice in basso (sud) */ s: P
  /** vertice a sinistra (ovest) */ d: P
  /** centro del lotto */ center: P
}

function corners(r: number, c: number, w: number, dp: number): Corners {
  return {
    a: iso(c, r),
    b: iso(c + w, r),
    s: iso(c + w, r + dp),
    d: iso(c, r + dp),
    center: iso(c + w / 2, r + dp / 2),
  }
}

/** Prisma di base: due facce visibili + piano del tetto. */
function Box({
  k,
  h,
  right = WALL_R,
  left = WALL_L,
  top = WALL_TOP,
}: {
  k: Corners
  h: number
  right?: string
  left?: string
  top?: string
}) {
  const a2 = up(k.a, h)
  const b2 = up(k.b, h)
  const s2 = up(k.s, h)
  const d2 = up(k.d, h)
  return (
    <g>
      <polygon points={pts([k.d, k.s, s2, d2])} fill={left} stroke={INK} strokeWidth={0.8} />
      <polygon points={pts([k.s, k.b, b2, s2])} fill={right} stroke={INK} strokeWidth={0.8} />
      <polygon points={pts([a2, b2, s2, d2])} fill={top} stroke={INK} strokeWidth={0.8} />
    </g>
  )
}

/** Tetto a due falde sopra il piano superiore del prisma. */
function Gable({ k, h, rh, color = TILE_ROOF, dark = TILE_ROOF_D }: { k: Corners; h: number; rh: number; color?: string; dark?: string }) {
  const a2 = up(k.a, h)
  const b2 = up(k.b, h)
  const s2 = up(k.s, h)
  const d2 = up(k.d, h)
  const r1 = up(mid(a2, d2), rh) // colmo, lato sinistro
  const r2 = up(mid(b2, s2), rh) // colmo, lato destro
  return (
    <g>
      <polygon points={pts([d2, s2, r2, r1])} fill={dark} stroke={INK} strokeWidth={0.8} />
      <polygon points={pts([a2, b2, r2, r1])} fill={color} stroke={INK} strokeWidth={0.8} />
    </g>
  )
}

/** Colonnato sulle due facce frontali. */
function Columns({ k, h, n = 4 }: { k: Corners; h: number; n?: number }) {
  const cols: React.ReactNode[] = []
  const cw = 4
  const make = (p1: P, p2: P, key: string) => {
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1)
      const x = p1[0] + (p2[0] - p1[0]) * t
      const y = p1[1] + (p2[1] - p1[1]) * t
      cols.push(
        <rect key={`${key}${i}`} x={x - cw / 2} y={y - h} width={cw} height={h} rx={1.5} fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />,
      )
    }
  }
  make(k.d, k.s, 'l')
  make(k.s, k.b, 'r')
  return <g>{cols}</g>
}

/** Anfiteatro / circo: anello ellittico estruso. */
function Oval({ k, h, rx, ry, floor = SAND }: { k: Corners; h: number; rx: number; ry: number; floor?: string }) {
  const [cx, cy] = k.center
  return (
    <g>
      {/* muro esterno */}
      <path
        d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${cy - h} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy - h} Z`}
        fill={STONE_L}
        stroke={INK}
        strokeWidth={0.8}
      />
      {/* corona superiore */}
      <ellipse cx={cx} cy={cy - h} rx={rx} ry={ry} fill={STONE_R} stroke={INK} strokeWidth={0.8} />
      {/* arena interna */}
      <ellipse cx={cx} cy={cy - h} rx={rx * 0.62} ry={ry * 0.62} fill={floor} stroke={INK} strokeWidth={0.6} />
    </g>
  )
}

/** Acquedotto: fila di arcate. */
function Arches({ k, h, n }: { k: Corners; h: number; n: number }) {
  const parts: React.ReactNode[] = []
  for (let i = 0; i < n; i++) {
    const t1 = i / n
    const t2 = (i + 1) / n
    const p1: P = [k.d[0] + (k.s[0] - k.d[0]) * t1, k.d[1] + (k.s[1] - k.d[1]) * t1]
    const p2: P = [k.d[0] + (k.s[0] - k.d[0]) * t2, k.d[1] + (k.s[1] - k.d[1]) * t2]
    const w = p2[0] - p1[0]
    parts.push(
      <g key={i}>
        <path
          d={`M ${p1[0]} ${p1[1]} L ${p1[0]} ${p1[1] - h} L ${p2[0]} ${p2[1] - h} L ${p2[0]} ${p2[1]} L ${p2[0] - w * 0.18} ${p2[1]} L ${p2[0] - w * 0.18} ${p2[1] - h * 0.45} A ${w * 0.32} ${h * 0.3} 0 0 0 ${p1[0] + w * 0.18} ${p1[1] - h * 0.45} L ${p1[0] + w * 0.18} ${p1[1]} Z`}
          fill={STONE_L}
          stroke={INK}
          strokeWidth={0.7}
        />
      </g>,
    )
  }
  // cornice in cima
  const top1 = up(k.d, h)
  const top2 = up(k.s, h)
  const top3 = up(k.b, h)
  const top4 = up(k.a, h)
  parts.push(
    <polygon key="top" points={pts([top4, top3, top2, top1])} fill={STONE_R} stroke={INK} strokeWidth={0.8} />,
  )
  return <g>{parts}</g>
}

/** Alberi del giardino. */
function Trees({ k }: { k: Corners }) {
  const [cx, cy] = k.center
  const spots: P[] = [
    [cx - 12, cy + 4],
    [cx + 10, cy + 1],
    [cx - 1, cy - 6],
  ]
  return (
    <g>
      <polygon points={pts([k.a, k.b, k.s, k.d])} fill="#8fb356" stroke={INK} strokeWidth={0.6} />
      {spots.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 1.6} y={y - 12} width={3.2} height={12} fill="#8a6134" />
          <circle cx={x} cy={y - 16} r={7.5} fill="#4e8f43" stroke={INK} strokeWidth={0.6} />
        </g>
      ))}
    </g>
  )
}

/** Fontana: vasca circolare con zampillo. */
function Fountain({ k }: { k: Corners }) {
  const [cx, cy] = k.center
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={17} ry={9} fill={STONE_L} stroke={INK} strokeWidth={0.8} />
      <ellipse cx={cx} cy={cy - 5} rx={17} ry={9} fill={STONE_R} stroke={INK} strokeWidth={0.8} />
      <ellipse cx={cx} cy={cy - 5} rx={11} ry={5.5} fill={WATER} />
      <rect x={cx - 1.6} y={cy - 20} width={3.2} height={15} fill={STONE_R} stroke={INK} strokeWidth={0.5} />
      <circle cx={cx} cy={cy - 22} r={3.4} fill={WATER} stroke={INK} strokeWidth={0.5} />
    </g>
  )
}

/** Statua su piedistallo. */
function Statue({ k }: { k: Corners }) {
  const [cx, cy] = k.center
  return (
    <g>
      <polygon points={pts([k.a, k.b, k.s, k.d])} fill={STONE_L} stroke={INK} strokeWidth={0.6} />
      <rect x={cx - 9} y={cy - 16} width={18} height={16} fill={STONE_R} stroke={INK} strokeWidth={0.7} />
      <ellipse cx={cx} cy={cy - 16} rx={9} ry={4.5} fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
      {/* figura */}
      <rect x={cx - 3} y={cy - 36} width={6} height={20} rx={3} fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
      <circle cx={cx} cy={cy - 39} r={4} fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
      <rect x={cx + 2} y={cy - 34} width={8} height={2.4} rx={1} fill={GOLD} />
    </g>
  )
}

/** Disegna un edificio in base al suo `look`. */
function Placeholder({ b, k }: { b: Building; k: Corners }) {
  switch (b.look) {
    case 'temple':
      return (
        <g>
          <Box k={k} h={8} right={MARBLE_R} left={MARBLE_L} top={MARBLE_R} />
          <Columns k={k} h={30} n={4} />
          <Box k={k} h={38} right="rgba(0,0,0,0)" left="rgba(0,0,0,0)" top={MARBLE_R} />
          <Gable k={k} h={38} rh={14} color={TILE_ROOF} dark={TILE_ROOF_D} />
        </g>
      )
    case 'basilica':
      return (
        <g>
          <Box k={k} h={6} right={STONE_R} left={STONE_L} top={STONE_R} />
          <Columns k={k} h={26} n={5} />
          <Box k={k} h={32} right="rgba(0,0,0,0)" left="rgba(0,0,0,0)" top={MARBLE_R} />
          <Gable k={k} h={32} rh={10} color="#b8683f" dark="#96522f" />
        </g>
      )
    case 'baths':
      return (
        <g>
          <Box k={k} h={26} right={WALL_R} left={WALL_L} top={WALL_TOP} />
          <ellipse cx={k.center[0]} cy={k.center[1] - 26} rx={22} ry={11} fill="#cf7a4a" stroke={INK} strokeWidth={0.8} />
          <ellipse cx={k.center[0]} cy={k.center[1] - 34} rx={13} ry={6.5} fill="#dc8a58" stroke={INK} strokeWidth={0.7} />
        </g>
      )
    case 'domus':
      return (
        <g>
          <Box k={k} h={20} />
          <Gable k={k} h={20} rh={11} />
        </g>
      )
    case 'shop':
      return (
        <g>
          <Box k={k} h={18} right="#e9d9b8" left="#d2c19c" top="#f0e6cd" />
          <polygon
            points={pts([k.s, k.b, up(k.b, 6), up(k.s, 6)])}
            fill="#b8574a"
            stroke={INK}
            strokeWidth={0.6}
            transform={`translate(0,-12)`}
          />
        </g>
      )
    case 'warehouse':
      return (
        <g>
          {/* specchio d'acqua del porto */}
          <polygon points={pts([k.a, k.b, k.s, k.d])} fill={WATER} stroke={INK} strokeWidth={0.6} />
          {/* molo di pietra sul lato nord */}
          <polygon
            points={pts([k.a, k.b, mid(k.b, k.s), mid(k.a, k.d)])}
            fill={STONE_R}
            stroke={INK}
            strokeWidth={0.7}
          />
          {/* nave ormeggiata */}
          <g transform={`translate(${k.center[0]}, ${k.center[1] + 8})`}>
            <path d="M -18 0 Q 0 9 18 0 L 13 -6 L -13 -6 Z" fill="#8a6134" stroke={INK} strokeWidth={0.7} />
            <rect x={-1.3} y={-28} width={2.6} height={22} fill="#6f4d29" />
            <path d="M 1.3 -27 L 14 -10 L 1.3 -10 Z" fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
          </g>
        </g>
      )
    case 'arena':
      return <Oval k={k} h={30} rx={44} ry={23} />
    case 'circus':
      return (
        <g>
          <Oval k={k} h={12} rx={48} ry={22} floor={SAND} />
          <ellipse cx={k.center[0]} cy={k.center[1] - 12} rx={16} ry={5} fill="#cbb78f" stroke={INK} strokeWidth={0.5} />
        </g>
      )
    case 'aqueduct':
      return <Arches k={k} h={34} n={4} />
    case 'garden':
      return <Trees k={k} />
    case 'fountain':
      return <Fountain k={k} />
    case 'statue':
      return <Statue k={k} />
    default:
      return <Box k={k} h={20} />
  }
}

export function IsoCity({ built }: { built: Building[] }) {
  // Ordine di disegno: dal fondo verso il davanti (algoritmo del pittore).
  const ordered = [...built].sort((x, y) => x.plot[0] + x.plot[1] - (y.plot[0] + y.plot[1]))

  const tiles: React.ReactNode[] = []
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const k = corners(r, c, 1, 1)
      tiles.push(
        <polygon
          key={`${r}-${c}`}
          points={pts([k.a, k.b, k.s, k.d])}
          fill={(r + c) % 2 === 0 ? GRASS_A : GRASS_B}
          stroke={GRASS_EDGE}
          strokeWidth={0.5}
        />,
      )
    }
  }

  return (
    <svg className="iso" viewBox="-250 -90 500 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La tua città">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe4f6" />
          <stop offset="100%" stopColor="#eaf6fc" />
        </linearGradient>
      </defs>
      <rect x={-250} y={-90} width={500} height={340} fill="url(#sky)" />
      <g>{tiles}</g>
      {ordered.map((b) => {
        const [r, c, w, d] = b.plot
        const k = corners(r, c, w, d)
        if (b.img) {
          // Sprite isometrico: ancorato al vertice inferiore del lotto.
          const spriteW = (w + d) * (TW / 2)
          return (
            <image
              key={b.id}
              href={b.img}
              x={k.d[0]}
              y={k.a[1] - spriteW * 0.5}
              width={spriteW}
              preserveAspectRatio="xMidYMax meet"
            />
          )
        }
        return (
          <g key={b.id}>
            <Placeholder b={b} k={k} />
          </g>
        )
      })}
    </svg>
  )
}
