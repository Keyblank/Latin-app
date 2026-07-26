import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { Building } from '../data/city'
import { GRID_SIZE } from '../data/city'

// Vista 3D della città, in stile "diorama" (alla Townscaper):
// camera ortografica inclinata, luce solare morbida, ombre di contatto,
// volumi con spigoli arrotondati. Nessun asset esterno: tutto geometria.

const TILE = 1 // lato di una cella
const PAL = {
  wall: 0xf3e9d6,
  wallWarm: 0xecdcc0,
  roof: 0xc4664a,
  roofAlt: 0xb4573f,
  marble: 0xf7f3ea,
  stone: 0xded5c2,
  sand: 0xe8d5ad,
  grass: 0x9cc46a,
  grassDark: 0x8bb35c,
  water: 0x7cc0dd,
  wood: 0x9a6c40,
  gold: 0xe0a52e,
  soil: 0xb99a6b,
}

function mat(color: number, rough = 0.95) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 })
}

/** Prisma con spigoli smussati: la base di quasi tutti gli edifici. */
function block(w: number, h: number, d: number, color: number) {
  const g = new RoundedBoxGeometry(w, h, d, 3, Math.min(0.07, h / 3))
  const m = new THREE.Mesh(g, mat(color))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Tetto a piramide (4 falde): semplice e "da miniatura". */
function pyramid(r: number, h: number, color: number) {
  const g = new THREE.CylinderGeometry(0.02, r, h, 4)
  const m = new THREE.Mesh(g, mat(color))
  m.rotation.y = Math.PI / 4
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function cylinder(r: number, h: number, color: number, seg = 24) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat(color))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function dome(r: number, color: number) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat(color))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Colonnato lungo il perimetro frontale. */
function colonnade(w: number, d: number, h: number, n: number) {
  const g = new THREE.Group()
  const add = (x: number, z: number) => {
    const c = cylinder(0.06, h, PAL.marble, 10)
    c.position.set(x, h / 2, z)
    g.add(c)
    const cap = block(0.18, 0.06, 0.18, PAL.marble)
    cap.position.set(x, h + 0.03, z)
    g.add(cap)
  }
  for (let i = 0; i < n; i++) {
    const t = -w / 2 + (w * (i + 0.5)) / n
    add(t, d / 2 - 0.12)
    add(t, -d / 2 + 0.12)
  }
  for (let i = 0; i < Math.max(2, Math.round((n * d) / w)); i++) {
    const t = -d / 2 + (d * (i + 0.5)) / Math.max(2, Math.round((n * d) / w))
    add(-w / 2 + 0.12, t)
    add(w / 2 - 0.12, t)
  }
  return g
}

/** Costruisce il modello 3D di un edificio secondo il suo `look`. */
function buildMesh(b: Building): THREE.Group {
  const [, , w, d] = b.plot
  const W = w * TILE
  const D = d * TILE
  const g = new THREE.Group()

  switch (b.look) {
    case 'temple': {
      const base = block(W * 0.92, 0.18, D * 0.92, PAL.stone)
      base.position.y = 0.09
      g.add(base)
      const base2 = block(W * 0.82, 0.14, D * 0.82, PAL.marble)
      base2.position.y = 0.25
      g.add(base2)
      const col = colonnade(W * 0.78, D * 0.78, 0.62, 4)
      col.position.y = 0.32
      g.add(col)
      const entab = block(W * 0.86, 0.12, D * 0.86, PAL.marble)
      entab.position.y = 1.0
      g.add(entab)
      const roof = pyramid(Math.max(W, D) * 0.56, 0.38, PAL.roof)
      roof.position.y = 1.25
      g.add(roof)
      break
    }
    case 'basilica': {
      const base = block(W * 0.9, 0.14, D * 0.9, PAL.stone)
      base.position.y = 0.07
      g.add(base)
      const body = block(W * 0.62, 0.62, D * 0.62, PAL.wall)
      body.position.y = 0.45
      g.add(body)
      const col = colonnade(W * 0.82, D * 0.82, 0.5, 4)
      col.position.y = 0.14
      g.add(col)
      const roof = pyramid(Math.max(W, D) * 0.6, 0.34, PAL.roofAlt)
      roof.position.y = 0.9
      g.add(roof)
      break
    }
    case 'baths': {
      const body = block(W * 0.82, 0.5, D * 0.82, PAL.wallWarm)
      body.position.y = 0.25
      g.add(body)
      const dm = dome(Math.min(W, D) * 0.3, PAL.roof)
      dm.position.y = 0.5
      g.add(dm)
      const top = cylinder(0.05, 0.12, PAL.gold, 10)
      top.position.y = 0.5 + Math.min(W, D) * 0.3 + 0.05
      g.add(top)
      break
    }
    case 'domus': {
      const body = block(W * 0.7, 0.44, D * 0.7, PAL.wall)
      body.position.y = 0.22
      g.add(body)
      const roof = pyramid(Math.max(W, D) * 0.46, 0.28, PAL.roof)
      roof.position.y = 0.56
      g.add(roof)
      const door = block(0.16, 0.2, 0.04, PAL.wood)
      door.position.set(0, 0.1, (D * 0.7) / 2)
      g.add(door)
      break
    }
    case 'shop': {
      const body = block(W * 0.72, 0.36, D * 0.72, PAL.wallWarm)
      body.position.y = 0.18
      g.add(body)
      const awn = block(W * 0.72, 0.05, 0.24, 0xd2604f)
      awn.position.set(0, 0.34, (D * 0.72) / 2 + 0.08)
      awn.rotation.x = -0.28
      g.add(awn)
      const roof = pyramid(Math.max(W, D) * 0.5, 0.22, PAL.roofAlt)
      roof.position.y = 0.46
      g.add(roof)
      break
    }
    case 'warehouse': {
      // porto: bacino d'acqua + molo + nave
      const basin = block(W * 0.98, 0.08, D * 0.98, PAL.water)
      basin.position.y = 0.02
      g.add(basin)
      const quay = block(W * 0.98, 0.16, D * 0.34, PAL.stone)
      quay.position.set(0, 0.08, -D * 0.3)
      g.add(quay)
      const hull = block(0.62, 0.14, 0.26, PAL.wood)
      hull.position.set(0.1, 0.12, D * 0.16)
      g.add(hull)
      const mast = cylinder(0.02, 0.5, PAL.wood, 8)
      mast.position.set(0.1, 0.4, D * 0.16)
      g.add(mast)
      const sail = block(0.02, 0.3, 0.22, PAL.marble)
      sail.position.set(0.12, 0.44, D * 0.16)
      g.add(sail)
      break
    }
    case 'arena': {
      const outer = cylinder(Math.min(W, D) * 0.46, 0.56, PAL.stone, 28)
      outer.position.y = 0.28
      g.add(outer)
      const floor = cylinder(Math.min(W, D) * 0.3, 0.6, PAL.sand, 28)
      floor.position.y = 0.31
      g.add(floor)
      break
    }
    case 'circus': {
      const outer = cylinder(Math.min(W, D) * 0.48, 0.2, PAL.stone, 28)
      outer.scale.x = 1.15
      outer.position.y = 0.1
      g.add(outer)
      const floor = cylinder(Math.min(W, D) * 0.34, 0.24, PAL.sand, 28)
      floor.scale.x = 1.15
      floor.position.y = 0.13
      g.add(floor)
      const spina = block(0.5, 0.1, 0.1, PAL.marble)
      spina.position.y = 0.28
      g.add(spina)
      break
    }
    case 'aqueduct': {
      const n = Math.max(2, Math.round(W / 0.55))
      for (let i = 0; i < n; i++) {
        const x = -W / 2 + (W * (i + 0.5)) / n
        const pier = block(0.16, 0.62, 0.22, PAL.stone)
        pier.position.set(x, 0.31, 0)
        g.add(pier)
      }
      const deck = block(W, 0.14, 0.3, PAL.stone)
      deck.position.y = 0.69
      g.add(deck)
      const chan = block(W * 0.96, 0.05, 0.14, PAL.water)
      chan.position.y = 0.77
      g.add(chan)
      break
    }
    case 'garden': {
      const lawn = block(W * 0.94, 0.06, D * 0.94, PAL.grassDark)
      lawn.position.y = 0.03
      g.add(lawn)
      const spots: [number, number, number][] = [
        [-0.22, 0.18, 0.2],
        [0.2, -0.16, 0.17],
        [0.02, 0.02, 0.14],
      ]
      for (const [x, z, r] of spots) {
        const trunk = cylinder(0.035, 0.2, PAL.wood, 8)
        trunk.position.set(x, 0.13, z)
        g.add(trunk)
        const crown = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat(0x5da24c))
        crown.castShadow = true
        crown.position.set(x, 0.23 + r * 0.6, z)
        g.add(crown)
      }
      break
    }
    case 'fountain': {
      const basin = cylinder(0.34, 0.16, PAL.stone, 24)
      basin.position.y = 0.08
      g.add(basin)
      const water = cylinder(0.27, 0.17, PAL.water, 24)
      water.position.y = 0.1
      g.add(water)
      const pillar = cylinder(0.05, 0.34, PAL.marble, 12)
      pillar.position.y = 0.28
      g.add(pillar)
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), mat(PAL.water))
      drop.castShadow = true
      drop.position.y = 0.5
      g.add(drop)
      break
    }
    case 'statue': {
      const ped = block(0.34, 0.3, 0.34, PAL.stone)
      ped.position.y = 0.15
      g.add(ped)
      const body = cylinder(0.08, 0.34, PAL.marble, 12)
      body.position.y = 0.47
      g.add(body)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), mat(PAL.marble))
      head.castShadow = true
      head.position.y = 0.7
      g.add(head)
      const arm = block(0.22, 0.05, 0.05, PAL.marble)
      arm.position.set(0.12, 0.56, 0)
      arm.rotation.z = 0.4
      g.add(arm)
      break
    }
    default: {
      const body = block(W * 0.7, 0.4, D * 0.7, PAL.wall)
      body.position.y = 0.2
      g.add(body)
    }
  }
  return g
}

export function City3D({ built }: { built: Building[] }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdceff8)

    // Camera ortografica inclinata: il "diorama".
    const aspect = el.clientWidth / Math.max(1, el.clientHeight)
    // L'isola deve riempire il riquadro: inquadratura calcolata sull'altezza.
    const view = 3.5
    const camera = new THREE.OrthographicCamera(-view * aspect, view * aspect, view, -view, 0.1, 100)
    camera.position.set(9, 8.5, 9)
    camera.lookAt(0, 0.4, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // Luci: cielo/terra + sole morbido con ombre.
    scene.add(new THREE.HemisphereLight(0xdff0fb, 0xb8ac8e, 0.72))
    const sun = new THREE.DirectionalLight(0xfff3dd, 2.2)
    sun.position.set(6, 10, 4)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    const s = 8
    sun.shadow.camera.left = -s
    sun.shadow.camera.right = s
    sun.shadow.camera.top = s
    sun.shadow.camera.bottom = -s
    sun.shadow.camera.near = 0.5
    sun.shadow.camera.far = 30
    sun.shadow.bias = -0.0012
    sun.shadow.radius = 3
    scene.add(sun)

    // Isola: terreno + fascia di terra sotto.
    const size = GRID_SIZE * TILE
    const island = new THREE.Group()
    const top = new THREE.Mesh(new RoundedBoxGeometry(size, 0.5, size, 4, 0.18), mat(PAL.grass))
    top.position.y = -0.25
    top.receiveShadow = true
    island.add(top)
    const soil = new THREE.Mesh(new RoundedBoxGeometry(size * 0.94, 0.7, size * 0.94, 4, 0.2), mat(PAL.soil))
    soil.position.y = -0.8
    island.add(soil)
    scene.add(island)

    // Strade lastricate.
    const road = (x: number, z: number, w: number, d: number) => {
      const r = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, d), mat(0xdccdac))
      r.position.set(x, 0.01, z)
      r.receiveShadow = true
      scene.add(r)
    }
    const off = (i: number) => (i - (GRID_SIZE - 1) / 2) * TILE
    road(off(2), 0, TILE, size)
    road(1.2, off(2), size * 0.62, TILE)

    // Edifici.
    for (const b of built) {
      const [r, c, w, d] = b.plot
      const m = buildMesh(b)
      m.position.set(off(c) + ((w - 1) * TILE) / 2, 0, off(r) + ((d - 1) * TILE) / 2)
      scene.add(m)
    }

    let raf = 0
    // Angolo iniziale di tre quarti: è quello che dà il colpo d'occhio isometrico.
    let angle = Math.PI / 4
    let dragging = false
    let lastX = 0

    const render = () => {
      const radius = 12
      camera.position.set(Math.sin(angle) * radius, 8, Math.cos(angle) * radius)
      camera.lookAt(0, 0.5, 0)
      renderer.render(scene, camera)
    }
    render()

    // Rotazione col dito / mouse.
    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      el.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      angle -= (e.clientX - lastX) * 0.008
      lastX = e.clientX
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }
    const onUp = () => {
      dragging = false
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)

    const onResize = () => {
      const a = el.clientWidth / Math.max(1, el.clientHeight)
      camera.left = -view * a
      camera.right = view * a
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
      render()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [built])

  return <div className="city3d" ref={host} />
}
