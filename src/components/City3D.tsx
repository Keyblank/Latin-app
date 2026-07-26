import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { Building } from '../data/city'
import { BUILDINGS, GRID_SIZE } from '../data/city'
import type { Placed } from '../useProgress'

// Vista 3D della città in stile diorama, con POSIZIONAMENTO LIBERO:
// scegli un edificio nel negozio e lo appoggi dove vuoi sulla griglia
// (come nei classici gestionali romani).
//
// Camera ortografica di tre quarti, luce solare morbida, ombre di contatto,
// volumi con spigoli arrotondati. Nessun asset esterno: tutto geometria.

const TILE = 1
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

const byId = new Map(BUILDINGS.map((b) => [b.id, b]))

/** Coordinata del centro della cella i sull'asse. */
const off = (i: number) => (i - (GRID_SIZE - 1) / 2) * TILE

function mat(color: number, rough = 0.95) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 })
}

function block(w: number, h: number, d: number, color: number) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(0.07, h / 3)), mat(color))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Tetto a due falde (prisma triangolare). */
function gable(w: number, h: number, d: number, color: number) {
  const shape = new THREE.Shape()
  shape.moveTo(-w / 2, 0)
  shape.lineTo(w / 2, 0)
  shape.lineTo(0, h)
  shape.closePath()
  const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false })
  geo.translate(0, 0, -d / 2)
  const m = new THREE.Mesh(geo, mat(color))
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

/** Colonnato perimetrale. */
function colonnade(w: number, d: number, h: number, n: number) {
  const g = new THREE.Group()
  const add = (x: number, z: number) => {
    const c = cylinder(0.055, h, PAL.marble, 10)
    c.position.set(x, h / 2, z)
    g.add(c)
  }
  for (let i = 0; i < n; i++) {
    const t = -w / 2 + (w * (i + 0.5)) / n
    add(t, d / 2)
    add(t, -d / 2)
  }
  const m = Math.max(2, Math.round((n * d) / w))
  for (let i = 0; i < m; i++) {
    const t = -d / 2 + (d * (i + 0.5)) / m
    add(-w / 2, t)
    add(w / 2, t)
  }
  return g
}

/** Modello 3D di un edificio. */
function buildMesh(b: Building): THREE.Group {
  const [w, d] = b.size
  const W = w * TILE
  const D = d * TILE
  const g = new THREE.Group()

  switch (b.look) {
    case 'temple': {
      const base = block(W * 0.92, 0.16, D * 0.92, PAL.stone)
      base.position.y = 0.08
      g.add(base)
      const base2 = block(W * 0.8, 0.12, D * 0.8, PAL.marble)
      base2.position.y = 0.22
      g.add(base2)
      const col = colonnade(W * 0.66, D * 0.66, 0.6, 4)
      col.position.y = 0.28
      g.add(col)
      const entab = block(W * 0.78, 0.1, D * 0.78, PAL.marble)
      entab.position.y = 0.93
      g.add(entab)
      const roof = gable(W * 0.84, 0.34, D * 0.84, PAL.roof)
      roof.position.y = 0.98
      g.add(roof)
      break
    }
    case 'basilica': {
      const base = block(W * 0.9, 0.12, D * 0.9, PAL.stone)
      base.position.y = 0.06
      g.add(base)
      const body = block(W * 0.6, 0.55, D * 0.6, PAL.wall)
      body.position.y = 0.4
      g.add(body)
      const col = colonnade(W * 0.78, D * 0.78, 0.46, 4)
      col.position.y = 0.12
      g.add(col)
      const roof = gable(W * 0.86, 0.26, D * 0.86, PAL.roofAlt)
      roof.position.y = 0.62
      g.add(roof)
      break
    }
    case 'baths': {
      const body = block(W * 0.84, 0.44, D * 0.84, PAL.wallWarm)
      body.position.y = 0.22
      g.add(body)
      const dm = dome(Math.min(W, D) * 0.27, PAL.roof)
      dm.position.y = 0.44
      g.add(dm)
      const knob = cylinder(0.04, 0.1, PAL.gold, 10)
      knob.position.y = 0.44 + Math.min(W, D) * 0.27 + 0.04
      g.add(knob)
      break
    }
    case 'domus': {
      const body = block(W * 0.74, 0.4, D * 0.74, PAL.wall)
      body.position.y = 0.2
      g.add(body)
      const roof = gable(W * 0.82, 0.26, D * 0.82, PAL.roof)
      roof.position.y = 0.4
      g.add(roof)
      const door = block(0.14, 0.18, 0.03, PAL.wood)
      door.position.set(0, 0.09, (D * 0.74) / 2)
      g.add(door)
      break
    }
    case 'shop': {
      const body = block(W * 0.76, 0.34, D * 0.76, PAL.wallWarm)
      body.position.y = 0.17
      g.add(body)
      const awn = block(W * 0.76, 0.04, 0.2, 0xd2604f)
      awn.position.set(0, 0.33, (D * 0.76) / 2 + 0.06)
      awn.rotation.x = -0.3
      g.add(awn)
      const roof = gable(W * 0.84, 0.18, D * 0.84, PAL.roofAlt)
      roof.position.y = 0.34
      g.add(roof)
      break
    }
    case 'warehouse': {
      const basin = block(W * 0.98, 0.06, D * 0.98, PAL.water)
      basin.position.y = 0.02
      g.add(basin)
      const quay = block(W * 0.98, 0.14, D * 0.32, PAL.stone)
      quay.position.set(0, 0.07, -D * 0.31)
      g.add(quay)
      const shed = block(W * 0.4, 0.3, D * 0.24, PAL.wallWarm)
      shed.position.set(-W * 0.22, 0.22, -D * 0.31)
      g.add(shed)
      const hull = block(0.6, 0.12, 0.24, PAL.wood)
      hull.position.set(0.12, 0.1, D * 0.18)
      g.add(hull)
      const mast = cylinder(0.02, 0.46, PAL.wood, 8)
      mast.position.set(0.12, 0.36, D * 0.18)
      g.add(mast)
      const sail = block(0.02, 0.26, 0.2, PAL.marble)
      sail.position.set(0.14, 0.4, D * 0.18)
      g.add(sail)
      break
    }
    case 'arena': {
      const outer = cylinder(Math.min(W, D) * 0.47, 0.5, PAL.stone, 30)
      outer.position.y = 0.25
      g.add(outer)
      // gradoni
      const tier = cylinder(Math.min(W, D) * 0.4, 0.56, 0xd6ccb6, 30)
      tier.position.y = 0.28
      g.add(tier)
      const floor = cylinder(Math.min(W, D) * 0.3, 0.58, PAL.sand, 30)
      floor.position.y = 0.29
      g.add(floor)
      break
    }
    case 'circus': {
      const outer = cylinder(Math.min(W, D) * 0.46, 0.18, PAL.stone, 30)
      outer.scale.x = 1.2
      outer.position.y = 0.09
      g.add(outer)
      const floor = cylinder(Math.min(W, D) * 0.33, 0.22, PAL.sand, 30)
      floor.scale.x = 1.2
      floor.position.y = 0.12
      g.add(floor)
      const spina = block(0.46, 0.08, 0.09, PAL.marble)
      spina.position.y = 0.25
      g.add(spina)
      break
    }
    case 'aqueduct': {
      const n = Math.max(2, Math.round(W / 0.55))
      for (let i = 0; i < n; i++) {
        const x = -W / 2 + (W * (i + 0.5)) / n
        const pier = block(0.15, 0.58, 0.2, PAL.stone)
        pier.position.set(x, 0.29, 0)
        g.add(pier)
      }
      const deck = block(W * 0.98, 0.12, 0.28, PAL.stone)
      deck.position.y = 0.64
      g.add(deck)
      const chan = block(W * 0.94, 0.04, 0.12, PAL.water)
      chan.position.y = 0.71
      g.add(chan)
      break
    }
    case 'garden': {
      const lawn = block(W * 0.94, 0.05, D * 0.94, PAL.grassDark)
      lawn.position.y = 0.025
      g.add(lawn)
      const spots: [number, number, number][] = [
        [-0.22, 0.18, 0.19],
        [0.2, -0.16, 0.16],
        [0.03, 0.02, 0.13],
      ]
      for (const [x, z, r] of spots) {
        const trunk = cylinder(0.032, 0.18, PAL.wood, 8)
        trunk.position.set(x, 0.12, z)
        g.add(trunk)
        const crown = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat(0x5da24c))
        crown.castShadow = true
        crown.position.set(x, 0.21 + r * 0.6, z)
        g.add(crown)
      }
      break
    }
    case 'fountain': {
      const basin = cylinder(0.33, 0.14, PAL.stone, 24)
      basin.position.y = 0.07
      g.add(basin)
      const water = cylinder(0.26, 0.15, PAL.water, 24)
      water.position.y = 0.09
      g.add(water)
      const pillar = cylinder(0.045, 0.3, PAL.marble, 12)
      pillar.position.y = 0.25
      g.add(pillar)
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 12), mat(PAL.water))
      drop.castShadow = true
      drop.position.y = 0.44
      g.add(drop)
      break
    }
    case 'statue': {
      const ped = block(0.32, 0.28, 0.32, PAL.stone)
      ped.position.y = 0.14
      g.add(ped)
      const body = cylinder(0.075, 0.3, PAL.marble, 12)
      body.position.y = 0.43
      g.add(body)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), mat(PAL.marble))
      head.castShadow = true
      head.position.y = 0.63
      g.add(head)
      const arm = block(0.2, 0.045, 0.045, PAL.marble)
      arm.position.set(0.11, 0.51, 0)
      arm.rotation.z = 0.4
      g.add(arm)
      break
    }
    default: {
      const body = block(W * 0.7, 0.38, D * 0.7, PAL.wall)
      body.position.y = 0.19
      g.add(body)
    }
  }
  return g
}

/** Posiziona il gruppo di un edificio sul suo lotto. */
function placeAt(g: THREE.Object3D, r: number, c: number, w: number, d: number) {
  g.position.set(off(c) + ((w - 1) * TILE) / 2, 0, off(r) + ((d - 1) * TILE) / 2)
}

interface Props {
  placed: Placed[]
  /** Edificio in attesa di essere posizionato (o null). */
  pending: Building | null
  /** Chiamata quando l'utente conferma la posizione. */
  onPlace: (r: number, c: number) => void
}

export function City3D({ placed, pending, onPlace }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const api = useRef<{
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    town: THREE.Group
    ghost: THREE.Group
    ground: THREE.Mesh
    render: () => void
  } | null>(null)
  const pendingRef = useRef<Building | null>(null)
  const placedRef = useRef<Placed[]>(placed)
  const onPlaceRef = useRef(onPlace)

  placedRef.current = placed
  onPlaceRef.current = onPlace

  // ── Scena (creata una volta sola) ──
  useEffect(() => {
    const el = host.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdceff8)

    const aspect = el.clientWidth / Math.max(1, el.clientHeight)
    const view = 5
    const camera = new THREE.OrthographicCamera(-view * aspect, view * aspect, view, -view, 0.1, 100)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xdff0fb, 0xb8ac8e, 0.72))
    const sun = new THREE.DirectionalLight(0xfff3dd, 2.2)
    sun.position.set(7, 11, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    const s = 9
    sun.shadow.camera.left = -s
    sun.shadow.camera.right = s
    sun.shadow.camera.top = s
    sun.shadow.camera.bottom = -s
    sun.shadow.camera.far = 34
    sun.shadow.bias = -0.0012
    sun.shadow.radius = 3
    scene.add(sun)

    // Isola
    const size = GRID_SIZE * TILE
    const top = new THREE.Mesh(new RoundedBoxGeometry(size, 0.5, size, 4, 0.18), mat(PAL.grass))
    top.position.y = -0.25
    top.receiveShadow = true
    scene.add(top)
    const soil = new THREE.Mesh(new RoundedBoxGeometry(size * 0.95, 0.8, size * 0.95, 4, 0.22), mat(PAL.soil))
    soil.position.y = -0.85
    scene.add(soil)

    // Griglia delle celle: aiuta a capire dove si appoggia l'edificio
    const grid = new THREE.GridHelper(size, GRID_SIZE, 0x88a862, 0x93b26c)
    grid.position.y = 0.012
    ;(grid.material as THREE.Material).opacity = 0.5
    ;(grid.material as THREE.Material).transparent = true
    scene.add(grid)

    // Piano invisibile per capire quale cella è sotto il dito
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({ visible: false }),
    )
    ground.rotation.x = -Math.PI / 2
    scene.add(ground)

    const town = new THREE.Group()
    scene.add(town)
    const ghost = new THREE.Group()
    ghost.visible = false
    scene.add(ghost)

    let angle = Math.PI / 4
    let raf = 0
    const render = () => {
      const radius = 14
      camera.position.set(Math.sin(angle) * radius, 9.5, Math.cos(angle) * radius)
      camera.lookAt(0, 0.4, 0)
      renderer.render(scene, camera)
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    api.current = { scene, camera, renderer, town, ghost, ground, render: schedule }
    render()

    // ── Interazione: trascina per ruotare, tocca per posizionare ──
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    let down = false
    let moved = 0
    let lastX = 0

    const tileUnder = (e: PointerEvent): [number, number] | null => {
      const rect = renderer.domElement.getBoundingClientRect()
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(ndc, camera)
      const hit = raycaster.intersectObject(ground)[0]
      if (!hit) return null
      const c = Math.round(hit.point.x / TILE + (GRID_SIZE - 1) / 2)
      const r = Math.round(hit.point.z / TILE + (GRID_SIZE - 1) / 2)
      return [r, c]
    }

    const free = (r: number, c: number, w: number, d: number) => {
      if (r < 0 || c < 0 || r + d > GRID_SIZE || c + w > GRID_SIZE) return false
      for (const p of placedRef.current) {
        const pb = byId.get(p.b)
        if (!pb) continue
        const [pw, pd] = pb.size
        if (c < p.c + pw && c + w > p.c && r < p.r + pd && r + d > p.r) return false
      }
      return true
    }

    const updateGhost = (e: PointerEvent) => {
      const b = pendingRef.current
      if (!b) {
        ghost.visible = false
        return
      }
      const t = tileUnder(e)
      if (!t) return
      const [r, c] = t
      const [w, d] = b.size
      const ok = free(r, c, w, d)
      ghost.userData.tile = ok ? [r, c] : null
      ghost.visible = true
      placeAt(ghost, r, c, w, d)
      const pad = ghost.children[0] as THREE.Mesh
      ;(pad.material as THREE.MeshBasicMaterial).color.set(ok ? 0x35c65a : 0xf03b2c)
      schedule()
    }

    const onDown = (e: PointerEvent) => {
      down = true
      moved = 0
      lastX = e.clientX
      renderer.domElement.setPointerCapture(e.pointerId)
      if (pendingRef.current) updateGhost(e)
    }
    const onMove = (e: PointerEvent) => {
      if (down) {
        const dx = e.clientX - lastX
        moved += Math.abs(dx)
        if (pendingRef.current) {
          // in modalità posizionamento il trascinamento sposta l'anteprima
          updateGhost(e)
        } else {
          angle -= dx * 0.008
          schedule()
        }
        lastX = e.clientX
      } else if (pendingRef.current) {
        updateGhost(e)
      }
    }
    const onUp = (e: PointerEvent) => {
      if (down && pendingRef.current) {
        updateGhost(e)
        const t = ghost.userData.tile as [number, number] | null
        if (t) onPlaceRef.current(t[0], t[1])
      }
      down = false
    }
    const canvas = renderer.domElement
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', () => (down = false))

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
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      renderer.dispose()
      if (canvas.parentNode === el) el.removeChild(canvas)
      api.current = null
    }
  }, [])

  // ── Edifici piazzati ──
  useEffect(() => {
    const a = api.current
    if (!a) return
    a.town.clear()
    for (const p of placed) {
      const b = byId.get(p.b)
      if (!b) continue
      const m = buildMesh(b)
      placeAt(m, p.r, p.c, b.size[0], b.size[1])
      a.town.add(m)
    }
    a.render()
  }, [placed])

  // ── Anteprima dell'edificio da posizionare ──
  useEffect(() => {
    pendingRef.current = pending
    const a = api.current
    if (!a) return
    a.ghost.clear()
    if (!pending) {
      a.ghost.visible = false
      a.render()
      return
    }
    const [w, d] = pending.size
    // riquadro del lotto (verde = si può, rosso = occupato)
    const pad = new THREE.Mesh(
      new THREE.PlaneGeometry(w * TILE * 0.98, d * TILE * 0.98),
      new THREE.MeshBasicMaterial({ color: 0x35c65a, transparent: true, opacity: 0.8, depthWrite: false }),
    )
    pad.rotation.x = -Math.PI / 2
    pad.position.y = 0.05
    a.ghost.add(pad)
    // modello semitrasparente
    const preview = buildMesh(pending)
    preview.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = false
        mesh.receiveShadow = false
        const mm = mesh.material as THREE.MeshStandardMaterial
        mm.transparent = true
        mm.opacity = 0.6
      }
    })
    a.ghost.add(preview)
    a.render()
  }, [pending])

  return <div className="city3d" ref={host} />
}
