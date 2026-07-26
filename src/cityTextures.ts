import * as THREE from 'three'

// Texture generate dal codice con canvas 2D: niente file da scaricare, e
// bastano a togliere l'effetto "plastica" delle tinte piatte — tegole,
// intonaco sporco, blocchi di pietra, venature del marmo.

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const cv = document.createElement('canvas')
  cv.width = cv.height = size
  return [cv, cv.getContext('2d')!]
}

function toTexture(cv: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(cv)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

/** Rumore leggero, per sporcare una superficie. */
function speckle(ctx: CanvasRenderingContext2D, size: number, n: number, alpha: number, dark = true) {
  for (let i = 0; i < n; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 2 + 0.4
    ctx.fillStyle = dark
      ? `rgba(90,75,55,${Math.random() * alpha})`
      : `rgba(255,255,255,${Math.random() * alpha})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

/** Coppo su coppo: file di tegole in terracotta. */
function roofTiles(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#a8503a'
  ctx.fillRect(0, 0, S, S)
  const rows = 8
  const rowH = S / rows
  for (let r = 0; r < rows; r++) {
    const y = r * rowH
    const cols = 10
    const colW = S / cols
    for (let c = 0; c < cols; c++) {
      const x = c * colW + (r % 2 ? colW / 2 : 0)
      // ogni tegola ha una tinta appena diversa
      const v = Math.random() * 26 - 13
      ctx.fillStyle = `rgb(${196 + v}, ${101 + v * 0.7}, ${74 + v * 0.5})`
      ctx.beginPath()
      ctx.moveTo(x, y + rowH)
      ctx.lineTo(x, y + rowH * 0.42)
      ctx.quadraticCurveTo(x + colW / 2, y - rowH * 0.12, x + colW, y + rowH * 0.42)
      ctx.lineTo(x + colW, y + rowH)
      ctx.closePath()
      ctx.fill()
      // ombra sotto il bordo del coppo
      ctx.strokeStyle = 'rgba(90,40,28,0.5)'
      ctx.lineWidth = 1.4
      ctx.stroke()
    }
  }
  speckle(ctx, S, 500, 0.16)
  return cv
}

/** Intonaco: crema con macchie e sporco verso il basso. */
function plaster(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#efe6d2'
  ctx.fillRect(0, 0, S, S)
  // chiazze morbide
  for (let i = 0; i < 26; i++) {
    const x = Math.random() * S
    const y = Math.random() * S
    const r = 12 + Math.random() * 44
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    const dark = Math.random() > 0.45
    g.addColorStop(0, dark ? 'rgba(196,180,152,0.30)' : 'rgba(255,252,242,0.30)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  // umidità alla base
  const base = ctx.createLinearGradient(0, S * 0.72, 0, S)
  base.addColorStop(0, 'rgba(150,132,105,0)')
  base.addColorStop(1, 'rgba(150,132,105,0.38)')
  ctx.fillStyle = base
  ctx.fillRect(0, S * 0.72, S, S * 0.28)
  speckle(ctx, S, 700, 0.12)
  return cv
}

/** Muratura a blocchi squadrati (opus quadratum). */
function ashlar(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#b9b2a1'
  ctx.fillRect(0, 0, S, S)
  const rows = 6
  const rowH = S / rows
  for (let r = 0; r < rows; r++) {
    const cols = 4
    const colW = S / cols
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + (r % 2 ? colW / 2 : 0)
      const y = r * rowH
      const v = Math.random() * 24 - 12
      ctx.fillStyle = `rgb(${214 + v}, ${207 + v}, ${190 + v})`
      ctx.fillRect(x + 1.6, y + 1.6, colW - 3.2, rowH - 3.2)
      // spigolo in luce e ombra: dà rilievo
      ctx.fillStyle = 'rgba(255,255,255,0.22)'
      ctx.fillRect(x + 1.6, y + 1.6, colW - 3.2, 1.6)
      ctx.fillStyle = 'rgba(105,95,78,0.22)'
      ctx.fillRect(x + 1.6, y + rowH - 3.2, colW - 3.2, 1.6)
    }
  }
  speckle(ctx, S, 550, 0.14)
  return cv
}

/** Marmo: bianco caldo con venature grigie. */
function marble(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#f3efe4'
  ctx.fillRect(0, 0, S, S)
  ctx.lineCap = 'round'
  for (let i = 0; i < 16; i++) {
    ctx.strokeStyle = `rgba(168,162,150,${0.1 + Math.random() * 0.16})`
    ctx.lineWidth = 0.6 + Math.random() * 1.6
    ctx.beginPath()
    let x = Math.random() * S
    let y = -10
    ctx.moveTo(x, y)
    while (y < S + 10) {
      x += (Math.random() - 0.5) * 34
      y += 16 + Math.random() * 20
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  speckle(ctx, S, 260, 0.07)
  return cv
}

/** Prato: verde con ciuffi e variazioni. */
function grass(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#9dbd63'
  ctx.fillRect(0, 0, S, S)
  for (let i = 0; i < 240; i++) {
    const x = Math.random() * S
    const y = Math.random() * S
    const r = 4 + Math.random() * 16
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(146,178,94,0.22)' : 'rgba(170,197,120,0.2)'
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  // ciuffi d'erba
  ctx.strokeStyle = 'rgba(122,158,74,0.5)'
  ctx.lineWidth = 1
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * S
    const y = Math.random() * S
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (Math.random() - 0.5) * 3, y - 2 - Math.random() * 3)
    ctx.stroke()
  }
  return cv
}

/** Basolato: grandi lastre poligonali, come le vie romane. */
function paving(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#8e8a82'
  ctx.fillRect(0, 0, S, S)
  const cells = 5
  const step = S / cells
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const cx = c * step + step / 2 + (Math.random() - 0.5) * 6
      const cy = r * step + step / 2 + (Math.random() - 0.5) * 6
      const v = Math.random() * 30 - 15
      ctx.fillStyle = `rgb(${188 + v}, ${183 + v}, ${172 + v})`
      ctx.beginPath()
      const n = 6
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.25
        const rad = step * (0.42 + Math.random() * 0.08)
        const x = cx + Math.cos(a) * rad
        const y = cy + Math.sin(a) * rad
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = 'rgba(96,92,84,0.55)'
      ctx.lineWidth = 1.6
      ctx.stroke()
    }
  }
  speckle(ctx, S, 400, 0.14)
  return cv
}

/** Terra battuta per il sentiero. */
function dirt(): HTMLCanvasElement {
  const S = 256
  const [cv, ctx] = makeCanvas(S)
  ctx.fillStyle = '#b09368'
  ctx.fillRect(0, 0, S, S)
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * S
    const y = Math.random() * S
    const r = 6 + Math.random() * 22
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(158,131,92,0.45)' : 'rgba(198,175,138,0.4)'
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  speckle(ctx, S, 700, 0.2)
  return cv
}

// Immagini fornite dall'utente in src/assets/textures/: se ci sono, hanno la
// precedenza sulle texture disegnate dal codice (vedi il README lì dentro).
const files = import.meta.glob('./assets/textures/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const userImages: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  userImages[name] = url
}

const loader = new THREE.TextureLoader()

const cache: Record<string, THREE.Texture> = {}
const makers: Record<string, () => HTMLCanvasElement> = {
  roof: roofTiles,
  plaster,
  ashlar,
  marble,
  grass,
  paving,
  dirt,
}

export type TexKind = keyof typeof makers

/** Texture (condivisa) del tipo richiesto: immagine dell'utente se c'è,
 *  altrimenti quella generata dal codice. */
export function texture(kind: TexKind): THREE.Texture {
  if (!cache[kind]) {
    const url = userImages[kind]
    if (url) {
      const t = loader.load(url)
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 4
      cache[kind] = t
    } else {
      cache[kind] = toTexture(makers[kind]())
    }
  }
  return cache[kind]
}

/** Mappa normale fornita dall'utente (es. roof-normal.jpg), se presente. */
export function normalMap(kind: TexKind, rx = 1, ry = rx): THREE.Texture | null {
  const url = userImages[`${kind}-normal`]
  if (!url) return null
  const key = `${kind}-normal-${rx}x${ry}`
  if (!cache[key]) {
    const t = loader.load(url)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(rx, ry)
    t.anisotropy = 4
    cache[key] = t
  }
  return cache[key]
}

/** Copia della texture con una ripetizione diversa (per superfici grandi). */
export function tiled(kind: TexKind, rx: number, ry = rx): THREE.Texture {
  const t = texture(kind).clone()
  t.needsUpdate = true
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(rx, ry)
  return t
}
