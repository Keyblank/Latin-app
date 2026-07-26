import type { Building } from '../data/city'
import { GRID_SIZE } from '../data/city'

// Vista ISOMETRICA della città, in stile "diorama in miniatura".
//
// Matematica di base: una cella è un rombo largo TW e alto TH.
// Un vertice di griglia (colonna C, riga R) finisce sullo schermo in:
//   x = (C - R) * TW/2      y = (C + R) * TH/2
// Aumentando C ci si sposta in basso a destra, aumentando R in basso a sinistra.
// Gli edifici sono prismi: faccia sinistra (ombra), faccia destra (luce), tetto.

const TW = 64
const TH = 32

// ── Palette calda da diorama ──
const GRASS_A = '#accd72'
const GRASS_B = '#a1c368'
const GRASS_EDGE = 'rgba(120,150,80,0.45)'
const PAVE_A = '#dccdac'
const PAVE_B = '#d4c3a0'
const PAVE_EDGE = 'rgba(150,130,95,0.4)'

const WALL_R = '#f6edda' // faccia in luce
const WALL_L = '#e0d3ba' // faccia in ombra
const WALL_TOP = '#fbf5e8'
const ROOF_R = '#d4744c'
const ROOF_L = '#b25a37'
const MARBLE_R = '#f8f4ec'
const MARBLE_L = '#e2dbcd'
const STONE_R = '#e8e0cf'
const STONE_L = '#cec5b0'
const SAND = '#ecd9b0'
const WATER = '#84c0dc'
const WOOD = '#9c6f42'
const GOLD = '#e0a52e'
const WINDOW = '#7d6a94'
const INK = 'rgba(104,80,48,0.5)'
const SHADOW = 'rgba(90,80,50,0.16)'

type P = [number, number]

function iso(c: number, r: number): P {
  return [(c - r) * (TW / 2), (c + r) * (TH / 2)]
}

const pts = (list: P[]) => list.map(([x, y]) => `${x},${y}`).join(' ')
const up = ([x, y]: P, h: number): P => [x, y - h]
const mid = ([x1, y1]: P, [x2, y2]: P): P => [(x1 + x2) / 2, (y1 + y2) / 2]

/** Punto su una faccia verticale: t = quanto lungo lo spigolo, u = quanto in alto. */
function onFace(p1: P, p2: P, t: number, u: number, h: number): P {
  return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t - u * h]
}

/** Rettangolo (porta, finestra) appoggiato su una faccia verticale. */
function quadOnFace(p1: P, p2: P, h: number, t0: number, t1: number, u0: number, u1: number): P[] {
  return [
    onFace(p1, p2, t0, u0, h),
    onFace(p1, p2, t1, u0, h),
    onFace(p1, p2, t1, u1, h),
    onFace(p1, p2, t0, u1, h),
  ]
}

interface Corners {
  a: P // nord (in alto)
  b: P // est (a destra)
  s: P // sud (in basso)
  d: P // ovest (a sinistra)
  center: P
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

/** Ombra morbida sotto l'edificio: dà il senso di "miniatura". */
function Shadow({ k, w, d }: { k: Corners; w: number; d: number }) {
  return (
    <ellipse
      cx={k.center[0]}
      cy={k.center[1] + 3}
      rx={((w + d) * TW) / 4.6}
      ry={((w + d) * TH) / 4.6}
      fill={SHADOW}
    />
  )
}

/** Prisma: due facce visibili + piano superiore. */
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
  return (
    <g>
      <polygon points={pts([k.d, k.s, up(k.s, h), up(k.d, h)])} fill={left} stroke={INK} strokeWidth={0.7} strokeLinejoin="round" />
      <polygon points={pts([k.s, k.b, up(k.b, h), up(k.s, h)])} fill={right} stroke={INK} strokeWidth={0.7} strokeLinejoin="round" />
      <polygon points={pts([up(k.a, h), up(k.b, h), up(k.s, h), up(k.d, h)])} fill={top} stroke={INK} strokeWidth={0.7} strokeLinejoin="round" />
    </g>
  )
}

/** Tetto a due falde con colmo e piccola gronda. */
function Gable({ k, h, rh, color = ROOF_R, dark = ROOF_L }: { k: Corners; h: number; rh: number; color?: string; dark?: string }) {
  const a2 = up(k.a, h)
  const b2 = up(k.b, h)
  const s2 = up(k.s, h)
  const d2 = up(k.d, h)
  const r1 = up(mid(a2, d2), rh)
  const r2 = up(mid(b2, s2), rh)
  return (
    <g>
      <polygon points={pts([d2, s2, r2, r1])} fill={dark} stroke={INK} strokeWidth={0.7} strokeLinejoin="round" />
      <polygon points={pts([a2, b2, r2, r1])} fill={color} stroke={INK} strokeWidth={0.7} strokeLinejoin="round" />
      <polyline points={pts([r1, r2])} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.4} />
    </g>
  )
}

/** Porta e finestre sulle facce frontali. */
function Openings({ k, h, windows = 2 }: { k: Corners; h: number; windows?: number }) {
  const items: React.ReactNode[] = []
  // porta sulla faccia destra
  items.push(
    <polygon key="door" points={pts(quadOnFace(k.s, k.b, h, 0.34, 0.56, 0, 0.55) as P[])} fill={WOOD} stroke={INK} strokeWidth={0.5} />,
  )
  for (let i = 0; i < windows; i++) {
    const t = 0.22 + (i * 0.42) / Math.max(1, windows - 1 || 1)
    items.push(
      <polygon
        key={`wl${i}`}
        points={pts(quadOnFace(k.d, k.s, h, t, t + 0.16, 0.42, 0.72) as P[])}
        fill={WINDOW}
        stroke={INK}
        strokeWidth={0.5}
      />,
    )
  }
  return <g>{items}</g>
}

/** Colonnato sulle due facce frontali. */
function Columns({ k, h, n = 4 }: { k: Corners; h: number; n?: number }) {
  const cols: React.ReactNode[] = []
  const cw = 4.4
  const make = (p1: P, p2: P, key: string) => {
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1)
      const [x, y] = onFace(p1, p2, t, 0, h)
      cols.push(
        <g key={`${key}${i}`}>
          <rect x={x - cw / 2} y={y - h} width={cw} height={h} rx={1.6} fill={MARBLE_R} stroke={INK} strokeWidth={0.55} />
          <rect x={x - cw / 2 - 1} y={y - h - 2} width={cw + 2} height={2.6} rx={1} fill={MARBLE_L} stroke={INK} strokeWidth={0.4} />
        </g>,
      )
    }
  }
  make(k.d, k.s, 'l')
  make(k.s, k.b, 'r')
  return <g>{cols}</g>
}

/** Gradinata alla base (per tempio e basilica). */
function Steps({ k, n = 3 }: { k: Corners; n?: number }) {
  const rows: React.ReactNode[] = []
  for (let i = n; i >= 1; i--) {
    const grow = i * 3.2
    const kk: Corners = {
      a: [k.a[0], k.a[1] - grow * 0.5],
      b: [k.b[0] + grow, k.b[1]],
      s: [k.s[0], k.s[1] + grow * 0.5],
      d: [k.d[0] - grow, k.d[1]],
      center: k.center,
    }
    rows.push(
      <polygon key={i} points={pts([kk.a, kk.b, kk.s, kk.d])} fill={i % 2 ? STONE_L : STONE_R} stroke={INK} strokeWidth={0.5} />,
    )
  }
  return <g>{rows}</g>
}

/** Anello ellittico estruso (anfiteatro, circo). */
function Oval({ k, h, rx, ry, floor = SAND, arcs = 0 }: { k: Corners; h: number; rx: number; ry: number; floor?: string; arcs?: number }) {
  const [cx, cy] = k.center
  const arches: React.ReactNode[] = []
  for (let i = 0; i < arcs; i++) {
    const ang = Math.PI * (0.08 + (0.84 * i) / Math.max(1, arcs - 1))
    const x = cx - Math.cos(ang) * rx * 0.92
    const y = cy + Math.sin(ang) * ry * 0.92
    arches.push(
      <ellipse key={i} cx={x} cy={y - h * 0.45} rx={3.2} ry={h * 0.26} fill="rgba(120,95,60,0.35)" />,
    )
  }
  return (
    <g>
      <path
        d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${cy - h} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy - h} Z`}
        fill={STONE_L}
        stroke={INK}
        strokeWidth={0.7}
      />
      {arches}
      <ellipse cx={cx} cy={cy - h} rx={rx} ry={ry} fill={STONE_R} stroke={INK} strokeWidth={0.7} />
      <ellipse cx={cx} cy={cy - h} rx={rx * 0.66} ry={ry * 0.66} fill={floor} stroke={INK} strokeWidth={0.55} />
    </g>
  )
}

/** Acquedotto: fila di arcate. */
function Arches({ k, h, n }: { k: Corners; h: number; n: number }) {
  const parts: React.ReactNode[] = []
  for (let i = 0; i < n; i++) {
    const p1 = onFace(k.d, k.s, i / n, 0, h)
    const p2 = onFace(k.d, k.s, (i + 1) / n, 0, h)
    const w = p2[0] - p1[0]
    parts.push(
      <path
        key={i}
        d={`M ${p1[0]} ${p1[1]} L ${p1[0]} ${p1[1] - h} L ${p2[0]} ${p2[1] - h} L ${p2[0]} ${p2[1]} L ${p2[0] - w * 0.2} ${p2[1]} L ${p2[0] - w * 0.2} ${p2[1] - h * 0.42} A ${w * 0.3} ${h * 0.3} 0 0 0 ${p1[0] + w * 0.2} ${p1[1] - h * 0.42} L ${p1[0] + w * 0.2} ${p1[1]} Z`}
        fill={STONE_L}
        stroke={INK}
        strokeWidth={0.6}
        strokeLinejoin="round"
      />,
    )
  }
  parts.push(
    <polygon
      key="top"
      points={pts([up(k.a, h), up(k.b, h), up(k.s, h), up(k.d, h)])}
      fill={STONE_R}
      stroke={INK}
      strokeWidth={0.7}
    />,
  )
  parts.push(
    <polygon
      key="water"
      points={pts([up(k.a, h - 3), up(k.b, h - 3), up(k.s, h - 3), up(k.d, h - 3)])}
      fill={WATER}
      opacity={0.75}
    />,
  )
  return <g>{parts}</g>
}

function Trees({ k }: { k: Corners }) {
  const [cx, cy] = k.center
  const spots: [number, number, number][] = [
    [cx - 13, cy + 5, 8],
    [cx + 11, cy + 2, 7],
    [cx - 1, cy - 5, 6.4],
  ]
  return (
    <g>
      <polygon points={pts([k.a, k.b, k.s, k.d])} fill="#93bb5c" stroke={INK} strokeWidth={0.5} />
      {spots.map(([x, y, rr], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y + 1} rx={rr * 0.8} ry={rr * 0.35} fill={SHADOW} />
          <rect x={x - 1.7} y={y - 13} width={3.4} height={13} rx={1.4} fill={WOOD} />
          <circle cx={x} cy={y - 17} r={rr} fill="#59a04a" stroke={INK} strokeWidth={0.55} />
          <circle cx={x - rr * 0.3} cy={y - 18.5} r={rr * 0.55} fill="#6bb35a" />
        </g>
      ))}
    </g>
  )
}

function Fountain({ k }: { k: Corners }) {
  const [cx, cy] = k.center
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={18} ry={9.5} fill={STONE_L} stroke={INK} strokeWidth={0.7} />
      <ellipse cx={cx} cy={cy - 6} rx={18} ry={9.5} fill={STONE_R} stroke={INK} strokeWidth={0.7} />
      <ellipse cx={cx} cy={cy - 6} rx={12} ry={6} fill={WATER} />
      <ellipse cx={cx} cy={cy - 6} rx={12} ry={6} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={0.9} />
      <rect x={cx - 1.8} y={cy - 22} width={3.6} height={16} rx={1.4} fill={STONE_R} stroke={INK} strokeWidth={0.5} />
      <circle cx={cx} cy={cy - 24} r={3.8} fill={WATER} stroke={INK} strokeWidth={0.5} />
    </g>
  )
}

function Statue({ k }: { k: Corners }) {
  const [cx, cy] = k.center
  return (
    <g>
      <polygon points={pts([k.a, k.b, k.s, k.d])} fill={STONE_L} stroke={INK} strokeWidth={0.5} />
      <rect x={cx - 9} y={cy - 17} width={18} height={17} rx={1.5} fill={STONE_R} stroke={INK} strokeWidth={0.6} />
      <ellipse cx={cx} cy={cy - 17} rx={9} ry={4.6} fill={MARBLE_R} stroke={INK} strokeWidth={0.55} />
      <rect x={cx - 3.2} y={cy - 37} width={6.4} height={20} rx={3.2} fill={MARBLE_R} stroke={INK} strokeWidth={0.55} />
      <circle cx={cx} cy={cy - 40} r={4.2} fill={MARBLE_R} stroke={INK} strokeWidth={0.55} />
      <path d={`M ${cx - 2} ${cy - 43.5} q 2 -2.6 4 0`} fill="none" stroke={GOLD} strokeWidth={1.6} />
      <rect x={cx + 2.5} y={cy - 35} width={8.5} height={2.4} rx={1.2} fill={GOLD} />
    </g>
  )
}

function Placeholder({ b, k }: { b: Building; k: Corners }) {
  switch (b.look) {
    case 'temple':
      return (
        <g>
          <Steps k={k} n={3} />
          <Box k={k} h={7} right={MARBLE_R} left={MARBLE_L} top={MARBLE_R} />
          <Columns k={k} h={30} n={4} />
          {/* trabeazione: poggia sulle colonne, niente vuoto sotto il tetto */}
          <polygon points={pts([k.d, k.s, up(k.s, 30), up(k.d, 30)])} fill="rgba(0,0,0,0)" />
          <polygon points={pts([up(k.d, 26), up(k.s, 26), up(k.s, 31), up(k.d, 31)])} fill={MARBLE_L} stroke={INK} strokeWidth={0.6} />
          <polygon points={pts([up(k.s, 26), up(k.b, 26), up(k.b, 31), up(k.s, 31)])} fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
          <polygon
            points={pts([up(k.a, 31), up(k.b, 31), up(k.s, 31), up(k.d, 31)])}
            fill={MARBLE_R}
            stroke={INK}
            strokeWidth={0.7}
          />
          <Gable k={k} h={31} rh={14} />
        </g>
      )
    case 'basilica':
      return (
        <g>
          <Steps k={k} n={2} />
          <Box k={k} h={6} right={STONE_R} left={STONE_L} top={STONE_R} />
          <Columns k={k} h={25} n={5} />
          <polygon points={pts([up(k.d, 21), up(k.s, 21), up(k.s, 26), up(k.d, 26)])} fill={MARBLE_L} stroke={INK} strokeWidth={0.6} />
          <polygon points={pts([up(k.s, 21), up(k.b, 21), up(k.b, 26), up(k.s, 26)])} fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
          <polygon
            points={pts([up(k.a, 26), up(k.b, 26), up(k.s, 26), up(k.d, 26)])}
            fill={MARBLE_R}
            stroke={INK}
            strokeWidth={0.7}
          />
          <Gable k={k} h={26} rh={10} color="#c8845a" dark="#a5643f" />
        </g>
      )
    case 'baths':
      return (
        <g>
          <Box k={k} h={24} />
          <Openings k={k} h={24} windows={2} />
          <ellipse cx={k.center[0]} cy={k.center[1] - 24} rx={23} ry={11.5} fill={ROOF_R} stroke={INK} strokeWidth={0.7} />
          <ellipse cx={k.center[0]} cy={k.center[1] - 32} rx={13.5} ry={7} fill="#e08d5f" stroke={INK} strokeWidth={0.6} />
          <circle cx={k.center[0]} cy={k.center[1] - 40} r={2.6} fill={GOLD} stroke={INK} strokeWidth={0.5} />
        </g>
      )
    case 'domus':
      return (
        <g>
          <Box k={k} h={19} />
          <Openings k={k} h={19} windows={2} />
          <Gable k={k} h={19} rh={12} />
        </g>
      )
    case 'shop':
      return (
        <g>
          <Box k={k} h={17} right="#f0e2c4" left="#dccaa6" top="#f5ead2" />
          <polygon points={pts(quadOnFace(k.s, k.b, 17, 0.2, 0.8, 0, 0.5) as P[])} fill={WOOD} stroke={INK} strokeWidth={0.5} />
          {/* tendone a strisce */}
          <polygon
            points={pts([onFace(k.s, k.b, 0.1, 0.66, 17), onFace(k.s, k.b, 0.9, 0.66, 17), [onFace(k.s, k.b, 0.9, 0.5, 17)[0] + 7, onFace(k.s, k.b, 0.9, 0.5, 17)[1] + 4], [onFace(k.s, k.b, 0.1, 0.5, 17)[0] + 7, onFace(k.s, k.b, 0.1, 0.5, 17)[1] + 4]])}
            fill="#d2604f"
            stroke={INK}
            strokeWidth={0.55}
          />
          <Gable k={k} h={17} rh={7} />
        </g>
      )
    case 'warehouse':
      return (
        <g>
          <polygon points={pts([k.a, k.b, k.s, k.d])} fill={WATER} stroke={INK} strokeWidth={0.5} />
          <polygon points={pts([k.a, k.b, mid(k.b, k.s), mid(k.a, k.d)])} fill={STONE_R} stroke={INK} strokeWidth={0.6} />
          <polygon points={pts([k.a, k.b, mid(k.b, k.s), mid(k.a, k.d)])} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.8} />
          {/* onde */}
          <path d={`M ${k.center[0] - 24} ${k.center[1] + 16} q 6 -3 12 0 q 6 3 12 0`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.2} />
          {/* nave */}
          <g transform={`translate(${k.center[0]}, ${k.center[1] + 9})`}>
            <path d="M -19 0 Q 0 10 19 0 L 14 -6.5 L -14 -6.5 Z" fill={WOOD} stroke={INK} strokeWidth={0.7} strokeLinejoin="round" />
            <rect x={-1.4} y={-30} width={2.8} height={24} rx={1.2} fill="#7b5730" />
            <path d="M 1.4 -29 L 15 -11 L 1.4 -11 Z" fill={MARBLE_R} stroke={INK} strokeWidth={0.6} />
          </g>
        </g>
      )
    case 'arena':
      return <Oval k={k} h={30} rx={45} ry={23} arcs={7} />
    case 'circus':
      return (
        <g>
          <Oval k={k} h={11} rx={48} ry={22} arcs={5} />
          <ellipse cx={k.center[0]} cy={k.center[1] - 11} rx={17} ry={5.5} fill="#d8c49a" stroke={INK} strokeWidth={0.5} />
          <rect x={k.center[0] - 1.4} y={k.center[1] - 24} width={2.8} height={13} fill={STONE_L} />
          <path d={`M ${k.center[0]} ${k.center[1] - 26} l 5 2 l -5 2 z`} fill={GOLD} />
        </g>
      )
    case 'aqueduct':
      return <Arches k={k} h={33} n={4} />
    case 'garden':
      return <Trees k={k} />
    case 'fountain':
      return <Fountain k={k} />
    case 'statue':
      return <Statue k={k} />
    default:
      return <Box k={k} h={19} />
  }
}

/** Tipo di terreno di ogni cella: erba oppure lastricato. */
function groundKind(r: number, c: number): 'grass' | 'pave' {
  if (c === 2) return 'pave' // strada principale
  if (r === 2 && c >= 3) return 'pave' // strada trasversale
  if (r >= 3 && r <= 4 && c === 5) return 'pave' // accesso alla piazza
  return 'grass'
}

export function IsoCity({ built }: { built: Building[] }) {
  // Algoritmo del pittore: dal fondo verso il davanti.
  const ordered = [...built].sort((x, y) => x.plot[0] + x.plot[1] - (y.plot[0] + y.plot[1]))

  const tiles: React.ReactNode[] = []
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const k = corners(r, c, 1, 1)
      const paved = groundKind(r, c) === 'pave'
      const even = (r + c) % 2 === 0
      tiles.push(
        <polygon
          key={`${r}-${c}`}
          points={pts([k.a, k.b, k.s, k.d])}
          fill={paved ? (even ? PAVE_A : PAVE_B) : even ? GRASS_A : GRASS_B}
          stroke={paved ? PAVE_EDGE : GRASS_EDGE}
          strokeWidth={0.5}
        />,
      )
    }
  }

  return (
    <svg className="iso" viewBox="-250 -95 500 345" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La tua città">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe4f6" />
          <stop offset="100%" stopColor="#f0f8fc" />
        </linearGradient>
      </defs>
      <rect x={-250} y={-95} width={500} height={345} fill="url(#sky)" />
      <g>{tiles}</g>
      {ordered.map((b) => {
        const [r, c, w, d] = b.plot
        const k = corners(r, c, w, d)
        if (b.img) {
          const spriteW = (w + d) * (TW / 2)
          return (
            <g key={b.id}>
              <Shadow k={k} w={w} d={d} />
              <image
                href={b.img}
                x={k.d[0]}
                y={k.a[1] - spriteW * 0.5}
                width={spriteW}
                preserveAspectRatio="xMidYMax meet"
              />
            </g>
          )
        }
        return (
          <g key={b.id}>
            <Shadow k={k} w={w} d={d} />
            <Placeholder b={b} k={k} />
          </g>
        )
      })}
    </svg>
  )
}
