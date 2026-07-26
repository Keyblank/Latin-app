import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { Building } from '../data/city'
import { BUILDINGS, GRID_MAX, LAND_SIZES, landBounds } from '../data/city'
import type { Placed, Road } from '../useProgress'
import { texture, tiled } from '../cityTextures'
import type { TexKind } from '../cityTextures'

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
  roof: 0xf6ddd0,
  roofAlt: 0xe7c6b6,
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

/** Aspetto delle tre strade: larghezza (frazione di cella) e colori.
 *  Le strade occupano solo la parte centrale della cella, così resta
 *  un margine d'erba e il tracciato si legge meglio. */
const ROAD_STYLE = [
  // Semita: sentiero sterrato, stretto e irregolare
  { outer: 0.42, outerColor: 0xb59468, inner: 0, innerColor: 0, h: 0.05 },
  // Via strata: lastricata in pietra grigia
  { outer: 0.58, outerColor: 0xc6c0b1, inner: 0.46, innerColor: 0xb3ada0, h: 0.07 },
  // Via consularis: carreggiata in basalto con marciapiedi chiari
  { outer: 0.86, outerColor: 0xded7c5, inner: 0.58, innerColor: 0x9d9890, h: 0.09 },
] as const

/** Coordinata del centro della cella i sull'asse (spazio fisso GRID_MAX). */
const off = (i: number) => (i - (GRID_MAX - 1) / 2) * TILE

/** Ingombro effettivo tenendo conto della rotazione. */
export function footprint(b: Building, rot?: 0 | 1): [number, number] {
  return rot ? [b.size[1], b.size[0]] : b.size
}

function mat(color: number, rough = 0.95) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 })
}

/** Materiale con texture: il colore fa da tinta sopra la trama. */
function matTex(kind: TexKind, color = 0xffffff, repeat = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    map: repeat === 1 ? texture(kind) : tiled(kind, repeat),
    roughness: 0.95,
    metalness: 0,
  })
}

function block(w: number, h: number, d: number, color: number, kind: TexKind = 'plaster') {
  const m = new THREE.Mesh(
    new RoundedBoxGeometry(w, h, d, 3, Math.min(0.07, h / 3)),
    matTex(kind, color),
  )
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
  const m = new THREE.Mesh(geo, matTex('roof', color, Math.max(1, Math.round(w * 1.4))))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function cylinder(r: number, h: number, color: number, seg = 24, kind: TexKind = 'marble') {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), matTex(kind, color))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function dome(r: number, color: number) {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    matTex('roof', color, 3),
  )
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

/** Vicini con muro, per raccordare le mura di cinta: [su, giù, sx, dx]. */
export type WallLinks = [boolean, boolean, boolean, boolean]

/** Modello 3D di un edificio. `seed` dà varietà (colori), `links` serve alle mura. */
function buildMesh(b: Building, seed = 0, links: WallLinks = [false, false, false, false]): THREE.Group {
  const [w, d] = b.size
  const W = w * TILE
  const D = d * TILE
  const g = new THREE.Group()

  switch (b.look) {
    case 'temple': {
      const base = block(W * 0.92, 0.16, D * 0.92, PAL.stone, 'ashlar')
      base.position.y = 0.08
      g.add(base)
      const base2 = block(W * 0.8, 0.12, D * 0.8, PAL.marble, 'marble')
      base2.position.y = 0.22
      g.add(base2)
      const col = colonnade(W * 0.66, D * 0.66, 0.6, 4)
      col.position.y = 0.28
      g.add(col)
      const entab = block(W * 0.78, 0.1, D * 0.78, PAL.marble, 'marble')
      entab.position.y = 0.93
      g.add(entab)
      const roof = gable(W * 0.84, 0.34, D * 0.84, PAL.roof)
      roof.position.y = 0.98
      g.add(roof)
      break
    }
    case 'basilica': {
      const base = block(W * 0.9, 0.12, D * 0.9, PAL.stone, 'ashlar')
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
      // piccola varietà di tinte, così una fila di case non è tutta uguale
      const wallTints = [0xf3e9d6, 0xf0e3cd, 0xeddfc6, 0xf5ecdd]
      const roofTints = [0xf6ddd0, 0xecc9b8, 0xffe8dc, 0xe0bdac]
      const body = block(W * 0.74, 0.4, D * 0.74, wallTints[seed % wallTints.length])
      body.position.y = 0.2
      g.add(body)
      const roof = gable(W * 0.82, 0.26, D * 0.82, roofTints[seed % roofTints.length])
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
      const quay = block(W * 0.98, 0.14, D * 0.32, PAL.stone, 'ashlar')
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
      const sail = block(0.02, 0.26, 0.2, PAL.marble, 'marble')
      sail.position.set(0.14, 0.4, D * 0.18)
      g.add(sail)
      break
    }
    case 'arena': {
      const outer = cylinder(Math.min(W, D) * 0.47, 0.5, PAL.stone, 30, 'ashlar')
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
      const outer = cylinder(Math.min(W, D) * 0.46, 0.18, PAL.stone, 30, 'ashlar')
      outer.scale.x = 1.2
      outer.position.y = 0.09
      g.add(outer)
      const floor = cylinder(Math.min(W, D) * 0.33, 0.22, PAL.sand, 30)
      floor.scale.x = 1.2
      floor.position.y = 0.12
      g.add(floor)
      const spina = block(0.46, 0.08, 0.09, PAL.marble, 'marble')
      spina.position.y = 0.25
      g.add(spina)
      break
    }
    case 'aqueduct': {
      const n = Math.max(2, Math.round(W / 0.55))
      for (let i = 0; i < n; i++) {
        const x = -W / 2 + (W * (i + 0.5)) / n
        const pier = block(0.15, 0.58, 0.2, PAL.stone, 'ashlar')
        pier.position.set(x, 0.29, 0)
        g.add(pier)
      }
      const deck = block(W * 0.98, 0.12, 0.28, PAL.stone, 'ashlar')
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
      const basin = cylinder(0.33, 0.14, PAL.stone, 24, 'ashlar')
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
      const ped = block(0.32, 0.28, 0.32, PAL.stone, 'ashlar')
      ped.position.y = 0.14
      g.add(ped)
      const body = cylinder(0.075, 0.3, PAL.marble, 12)
      body.position.y = 0.43
      g.add(body)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), mat(PAL.marble))
      head.castShadow = true
      head.position.y = 0.63
      g.add(head)
      const arm = block(0.2, 0.045, 0.045, PAL.marble, 'marble')
      arm.position.set(0.11, 0.51, 0)
      arm.rotation.z = 0.4
      g.add(arm)
      break
    }
    case 'insula': {
      // palazzina a più piani
      const body = block(W * 0.76, 0.78, D * 0.76, PAL.wallWarm)
      body.position.y = 0.39
      g.add(body)
      for (let f = 0; f < 3; f++) {
        const band = block(W * 0.8, 0.03, D * 0.8, 0xd8c7a6)
        band.position.y = 0.24 + f * 0.24
        g.add(band)
      }
      const par = block(W * 0.8, 0.07, D * 0.8, PAL.stone, 'ashlar')
      par.position.y = 0.8
      g.add(par)
      break
    }
    case 'villa': {
      // casa con cortile interno (peristilio)
      const ring = [
        [0, -D * 0.34, W * 0.9, D * 0.22],
        [0, D * 0.34, W * 0.9, D * 0.22],
        [-W * 0.34, 0, W * 0.22, D * 0.48],
        [W * 0.34, 0, W * 0.22, D * 0.48],
      ]
      for (const [x, z, bw, bd] of ring) {
        const wing = block(bw, 0.36, bd, PAL.wall)
        wing.position.set(x, 0.18, z)
        g.add(wing)
        const roof = gable(bw * 1.06, 0.16, bd * 1.06, PAL.roof)
        roof.position.set(x, 0.36, z)
        if (bw < bd) roof.rotation.y = Math.PI / 2
        g.add(roof)
      }
      const court = block(W * 0.44, 0.04, D * 0.44, PAL.grassDark)
      court.position.y = 0.02
      g.add(court)
      const pool = block(W * 0.2, 0.05, D * 0.2, PAL.water)
      pool.position.y = 0.04
      g.add(pool)
      break
    }
    case 'wall': {
      // Muro di cinta: si raccorda con i muri vicini, come le strade.
      const th = 0.34 // spessore
      const hgt = 0.42
      const seg = (dx: number, dz: number) => {
        const w = dx ? 0.5 + th / 2 : th
        const d = dz ? 0.5 + th / 2 : th
        const m = block(w, hgt, d, PAL.stone, 'ashlar')
        m.position.set((dx * (0.5 + th / 2)) / 2, hgt / 2, (dz * (0.5 + th / 2)) / 2)
        g.add(m)
        const cap = block(w * 0.98, 0.06, d * 0.98, 0xcfc5b0, 'ashlar')
        cap.position.set(m.position.x, hgt + 0.03, m.position.z)
        g.add(cap)
      }
      // blocco centrale
      const core = block(th, hgt, th, PAL.stone, 'ashlar')
      core.position.y = hgt / 2
      g.add(core)
      const coreCap = block(th * 1.05, 0.06, th * 1.05, 0xcfc5b0, 'ashlar')
      coreCap.position.y = hgt + 0.03
      g.add(coreCap)
      const [up_, dn, lf, rt] = links
      if (up_) seg(0, -1)
      if (dn) seg(0, 1)
      if (lf) seg(-1, 0)
      if (rt) seg(1, 0)
      // se è isolato o fa angolo, mettici una merlatura
      if (!up_ && !dn && !lf && !rt) {
        const merlo = block(0.1, 0.1, 0.1, 0xcfc5b0, 'ashlar')
        merlo.position.y = hgt + 0.1
        g.add(merlo)
      }
      break
    }
    case 'tower': {
      const base = cylinder(0.3, 0.82, PAL.stone, 14, 'ashlar')
      base.position.y = 0.41
      g.add(base)
      const ring = cylinder(0.34, 0.1, 0xcfc5b0, 14, 'ashlar')
      ring.position.y = 0.85
      g.add(ring)
      // merli
      for (let i = 0; i < 8; i++) {
        const a2 = (i / 8) * Math.PI * 2
        const m = block(0.09, 0.12, 0.09, 0xd6ccb6, 'ashlar')
        m.position.set(Math.cos(a2) * 0.27, 0.96, Math.sin(a2) * 0.27)
        g.add(m)
      }
      break
    }
    case 'gate': {
      // due torrette con arco in mezzo
      for (const x of [-0.32, 0.32]) {
        const t = block(0.3, 0.7, 0.42, PAL.stone, 'ashlar')
        t.position.set(x, 0.35, 0)
        g.add(t)
        const cap = block(0.34, 0.07, 0.46, 0xcfc5b0, 'ashlar')
        cap.position.set(x, 0.73, 0)
        g.add(cap)
      }
      const arch = block(0.42, 0.22, 0.4, PAL.stone, 'ashlar')
      arch.position.y = 0.6
      g.add(arch)
      const door = block(0.34, 0.4, 0.06, PAL.wood)
      door.position.set(0, 0.2, 0.18)
      g.add(door)
      break
    }
    case 'granary': {
      const body = block(W * 0.86, 0.42, D * 0.8, PAL.wallWarm)
      body.position.y = 0.21
      g.add(body)
      const roof = gable(W * 0.92, 0.24, D * 0.88, 0xe8cfae)
      roof.position.y = 0.42
      g.add(roof)
      // pilastrini di aerazione tipici dell'horreum
      for (let i = 0; i < 4; i++) {
        const p2 = block(0.07, 0.1, 0.07, PAL.stone, 'ashlar')
        p2.position.set(-W * 0.3 + (i * W * 0.2), 0.05, D * 0.3)
        g.add(p2)
      }
      break
    }
    case 'market': {
      // cortile porticato con banchi colorati
      const floor2 = block(W * 0.92, 0.06, D * 0.92, 0xd9cfb8)
      floor2.position.y = 0.03
      g.add(floor2)
      const col = colonnade(W * 0.74, D * 0.74, 0.4, 3)
      col.position.y = 0.06
      g.add(col)
      const roofRing = block(W * 0.94, 0.08, D * 0.94, PAL.roofAlt, 'roof')
      roofRing.position.y = 0.5
      g.add(roofRing)
      const hole = block(W * 0.4, 0.12, D * 0.4, PAL.grassDark)
      hole.position.y = 0.5
      g.add(hole)
      const stallColors = [0xd2604f, 0x4f8fd2, 0xd2b84f]
      for (let i = 0; i < 3; i++) {
        const st3 = block(0.26, 0.12, 0.2, stallColors[i])
        st3.position.set(-0.28 + i * 0.28, 0.12, -0.05)
        g.add(st3)
      }
      break
    }
    case 'tree': {
      // cipresso: la pianta romana per eccellenza
      const trunk = cylinder(0.045, 0.16, PAL.wood, 8)
      trunk.position.y = 0.08
      g.add(trunk)
      const crown = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.72, 14), mat(0x4f9147))
      crown.castShadow = true
      crown.receiveShadow = true
      crown.position.y = 0.5
      g.add(crown)
      break
    }
    case 'column': {
      const base = block(0.3, 0.12, 0.3, PAL.stone, 'ashlar')
      base.position.y = 0.06
      g.add(base)
      const shaft = cylinder(0.075, 0.78, PAL.marble, 14)
      shaft.position.y = 0.51
      g.add(shaft)
      const cap = block(0.22, 0.08, 0.22, PAL.marble, 'marble')
      cap.position.y = 0.94
      g.add(cap)
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), mat(PAL.gold))
      orb.castShadow = true
      orb.position.y = 1.05
      g.add(orb)
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

// ─────────────────────── Abitanti e fumo ───────────────────────

/** I tipi di abitante. Tinte sobrie, da lana naturale e tinture vegetali:
 *  i colori accesi stonerebbero con il resto del diorama. */
const FOLK = [
  { id: 'vir', tunic: 0xece5d5, trim: 0, h: 0.2 }, // toga di lana chiara
  { id: 'femina', tunic: 0xc9a98c, trim: 0, h: 0.19 }, // stola ocra
  { id: 'femina2', tunic: 0xa8b0a4, trim: 0, h: 0.19 }, // stola verde salvia
  { id: 'vir2', tunic: 0xd8cdb8, trim: 0, h: 0.2 }, // tunica écru
  { id: 'senator', tunic: 0xf0ebe0, trim: 0x8a6ba8, h: 0.21 }, // banda porpora
  { id: 'miles', tunic: 0xa5584a, trim: 0xb9a978, h: 0.2 }, // terracotta, elmo
  { id: 'puer', tunic: 0xcdb491, trim: 0, h: 0.13 }, // bambino
  { id: 'puella', tunic: 0xb6bda8, trim: 0, h: 0.13 }, // bambina
] as const

/** Un abitante: corpo a cono (la veste), testa, e un dettaglio colorato. */
function makePerson(kind: (typeof FOLK)[number]): THREE.Group {
  const g = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(kind.h * 0.16, kind.h * 0.34, kind.h * 0.72, 8),
    mat(kind.tunic),
  )
  body.castShadow = true
  body.position.y = kind.h * 0.36
  g.add(body)
  const head = new THREE.Mesh(new THREE.SphereGeometry(kind.h * 0.18, 10, 8), mat(0xd8b592))
  head.castShadow = true
  head.position.y = kind.h * 0.86
  g.add(head)
  // Dettaglio solo dove ha senso: la banda del senatore, l'elmo del soldato.
  if (kind.trim) {
    const trim = new THREE.Mesh(
      new THREE.CylinderGeometry(kind.h * 0.19, kind.h * 0.19, kind.h * 0.08, 8),
      mat(kind.trim),
    )
    trim.position.y = kind.id === 'miles' ? kind.h * 0.96 : kind.h * 0.55
    g.add(trim)
  }
  return g
}

/** Sbuffo di fumo che sale dal tetto e svanisce. */
function makeSmoke(): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xf2f2f2, transparent: true, opacity: 0.5, depthWrite: false }),
  )
  return m
}

/** Posiziona il gruppo di un edificio sul suo lotto. */
function placeAt(g: THREE.Object3D, r: number, c: number, w: number, d: number) {
  g.position.set(off(c) + ((w - 1) * TILE) / 2, 0, off(r) + ((d - 1) * TILE) / 2)
}

export type CityMode = 'view' | 'build' | 'road' | 'demolish'

interface Props {
  placed: Placed[]
  /** Caselle di strada. */
  roads: Road[]
  /** Livello di terreno acquistato. */
  land: number
  mode: CityMode
  /** Edificio da posizionare (modalità 'build'). */
  pending: Building | null
  /** Rotazione scelta per l'edificio da posizionare. */
  rot: 0 | 1
  onPlace: (r: number, c: number) => void
  onRoad: (r: number, c: number) => void
  onDemolish: (r: number, c: number) => void
}

export function City3D({ placed, roads, land, mode, pending, rot, onPlace, onRoad, onDemolish }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const api = useRef<{
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    town: THREE.Group
    life: THREE.Group
    ways: THREE.Group
    ghost: THREE.Group
    render: () => void
    zoomBy: (k: number) => void
  } | null>(null)

  // Valori sempre aggiornati per i gestori di eventi (creati una volta sola).
  const st = useRef({ placed, roads, land, mode, pending, rot, onPlace, onRoad, onDemolish })
  st.current = { placed, roads, land, mode, pending, rot, onPlace, onRoad, onDemolish }

  // ── Scena (creata una volta sola) ──
  useEffect(() => {
    const el = host.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdceff8)

    const aspect = el.clientWidth / Math.max(1, el.clientHeight)
    const view = 5.4
    const camera = new THREE.OrthographicCamera(-view * aspect, view * aspect, view, -view, 0.1, 120)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xdff0fb, 0xb8ac8e, 0.72))
    const sun = new THREE.DirectionalLight(0xfff3dd, 2.2)
    sun.position.set(8, 13, 6)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    const s = 13
    sun.shadow.camera.left = -s
    sun.shadow.camera.right = s
    sun.shadow.camera.top = s
    sun.shadow.camera.bottom = -s
    sun.shadow.camera.far = 44
    sun.shadow.bias = -0.0012
    sun.shadow.radius = 3
    scene.add(sun)

    const island = new THREE.Group()
    scene.add(island)
    const ways = new THREE.Group()
    scene.add(ways)
    const town = new THREE.Group()
    scene.add(town)
    const life = new THREE.Group()
    scene.add(life)
    const ghost = new THREE.Group()
    ghost.visible = false
    scene.add(ghost)

    // Piano invisibile per capire quale cella è sotto il dito
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(GRID_MAX * TILE, GRID_MAX * TILE),
      new THREE.MeshBasicMaterial({ visible: false }),
    )
    ground.rotation.x = -Math.PI / 2
    scene.add(ground)

    const clampZoom = (z: number) => Math.min(3.2, Math.max(0.7, z))
    let angle = Math.PI / 4
    let userZoom = 1 // 1 = tutta l'isola in vista; più alto = più vicino
    let raf = 0
    const render = () => {
      const size = LAND_SIZES[Math.min(st.current.land, LAND_SIZES.length - 1)]
      const radius = 16
      camera.zoom = (LAND_SIZES[0] / size) * userZoom
      camera.updateProjectionMatrix()
      camera.position.set(Math.sin(angle) * radius, 11, Math.cos(angle) * radius)
      camera.lookAt(0, 0.4, 0)
      renderer.render(scene, camera)
    }
    const schedule = () => {
      if (looping) return // il ciclo continuo disegna già
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    // Ciclo continuo, attivo solo quando c'è vita da animare.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let looping = false
    let last = 0
    const loop = (now: number) => {
      if (!looping) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      animateLife(dt)
      render()
      rafLoop = requestAnimationFrame(loop)
    }
    let rafLoop = 0
    const setLooping = (on: boolean) => {
      if (reduce) on = false
      if (on === looping) return
      looping = on
      cancelAnimationFrame(rafLoop)
      if (on) {
        last = performance.now()
        rafLoop = requestAnimationFrame(loop)
      } else {
        schedule()
      }
    }

    /** Stato degli abitanti che camminano e degli sbuffi di fumo. */
    type Walker = {
      mesh: THREE.Group
      from: [number, number]
      to: [number, number]
      t: number
      speed: number
    }
    let walkers: Walker[] = []
    let smokes: { mesh: THREE.Mesh; x: number; z: number; y0: number; p: number; sp: number }[] = []
    let roadTiles: [number, number][] = []

    /** Sceglie una casella di strada vicina, evitando di tornare indietro. */
    const nextTile = (cur: [number, number], prev: [number, number]): [number, number] => {
      const set = new Set(roadTiles.map(([r, c]) => `${r},${c}`))
      const opts: [number, number][] = []
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][]) {
        const n: [number, number] = [cur[0] + dr, cur[1] + dc]
        if (!set.has(`${n[0]},${n[1]}`)) continue
        if (n[0] === prev[0] && n[1] === prev[1]) continue
        opts.push(n)
      }
      if (opts.length === 0) return prev // vicolo cieco: torna indietro
      return opts[Math.floor(Math.random() * opts.length)]
    }

    const animateLife = (dt: number) => {
      for (const w of walkers) {
        w.t += dt * w.speed
        while (w.t >= 1) {
          w.t -= 1
          const prev = w.from
          w.from = w.to
          w.to = nextTile(w.to, prev)
        }
        const x = off(w.from[1]) + (off(w.to[1]) - off(w.from[1])) * w.t
        const z = off(w.from[0]) + (off(w.to[0]) - off(w.from[0])) * w.t
        w.mesh.position.set(x, 0.08, z)
        const dx = off(w.to[1]) - off(w.from[1])
        const dz = off(w.to[0]) - off(w.from[0])
        if (dx || dz) w.mesh.rotation.y = Math.atan2(dx, dz)
        // passo: piccolo saltello
        w.mesh.position.y = 0.08 + Math.abs(Math.sin(w.t * Math.PI * 6)) * 0.012
      }
      for (const s2 of smokes) {
        s2.p += dt * s2.sp
        if (s2.p > 1) s2.p -= 1
        s2.mesh.position.set(s2.x, s2.y0 + s2.p * 0.55, s2.z)
        const mm = s2.mesh.material as THREE.MeshBasicMaterial
        mm.opacity = 0.45 * (1 - s2.p)
        const k = 0.6 + s2.p * 0.9
        s2.mesh.scale.setScalar(k)
      }
    }

    /** Ricostruisce abitanti e fumo in base a città e strade. */
    const rebuildLife = () => {
      life.clear()
      walkers = []
      smokes = []
      roadTiles = st.current.roads.map((x) => [x.r, x.c] as [number, number])

      // Abitanti: camminano sulle vie. Più edifici → più gente.
      if (roadTiles.length >= 2) {
        const n = Math.min(16, Math.max(2, Math.round(st.current.placed.length * 0.8)))
        for (let i = 0; i < n; i++) {
          const kind = FOLK[i % FOLK.length]
          const mesh = makePerson(kind)
          const start = roadTiles[Math.floor(Math.random() * roadTiles.length)]
          const w: Walker = {
            mesh,
            from: start,
            to: nextTile(start, start),
            t: Math.random(),
            speed: 0.35 + Math.random() * 0.25,
          }
          walkers.push(w)
          life.add(mesh)
        }
      }

      // Fumo: dai tetti delle abitazioni e dalle terme.
      const smoky = new Set(['domus', 'insula', 'taberna', 'thermae', 'villa'])
      for (const p of st.current.placed) {
        const b = byId.get(p.b)
        if (!b || !smoky.has(b.id)) continue
        const [w, d] = footprint(b, p.rot)
        const x = off(p.c) + ((w - 1) * TILE) / 2
        const z = off(p.r) + ((d - 1) * TILE) / 2
        const y0 = b.id === 'insula' ? 0.86 : b.id === 'thermae' ? 0.78 : 0.62
        for (let k = 0; k < 2; k++) {
          const mesh = makeSmoke()
          life.add(mesh)
          smokes.push({ mesh, x: x + 0.12, z: z - 0.1, y0, p: k * 0.5, sp: 0.32 })
        }
      }

      setLooping(walkers.length > 0 || smokes.length > 0)
      if (!looping) schedule()
    }
    api.current = {
      scene, camera, renderer, town, life, ways, ghost,
      render: schedule,
      zoomBy: (k: number) => {
        userZoom = clampZoom(userZoom * k)
        schedule()
      },
    }

    // ── Isola: ricostruita quando cresce il terreno ──
    const buildIsland = () => {
      island.clear()
      const size = LAND_SIZES[Math.min(st.current.land, LAND_SIZES.length - 1)] * TILE
      const top = new THREE.Mesh(
        new RoundedBoxGeometry(size, 0.5, size, 4, 0.18),
        matTex('grass', 0xffffff, Math.round(size / 2)),
      )
      top.position.y = -0.25
      top.receiveShadow = true
      island.add(top)
      const soil = new THREE.Mesh(
        new RoundedBoxGeometry(size * 0.95, 0.9, size * 0.95, 4, 0.22),
        matTex('dirt', 0xd8bf95, Math.round(size / 3)),
      )
      soil.position.y = -0.9
      island.add(soil)
      const grid = new THREE.GridHelper(size, size / TILE, 0x86a660, 0x93b26c)
      grid.position.y = 0.012
      const gm = grid.material as THREE.Material
      gm.opacity = 0.45
      gm.transparent = true
      island.add(grid)
    }
    const extra = api.current as unknown as {
      buildIsland: () => void
      rebuildLife: () => void
    }
    extra.buildIsland = buildIsland
    extra.rebuildLife = rebuildLife
    buildIsland()
    render()

    // ── Interazione ──
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    let down = false
    let lastX = 0

    const tileUnder = (e: PointerEvent): [number, number] | null => {
      const rect = renderer.domElement.getBoundingClientRect()
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(ndc, camera)
      const hit = raycaster.intersectObject(ground)[0]
      if (!hit) return null
      const c = Math.round(hit.point.x / TILE + (GRID_MAX - 1) / 2)
      const r = Math.round(hit.point.z / TILE + (GRID_MAX - 1) / 2)
      return [r, c]
    }

    /** true se il lotto è dentro il terreno e non tocca nulla. */
    const free = (r: number, c: number, w: number, d: number) => {
      const { min, max } = landBounds(st.current.land)
      if (r < min || c < min || r + d - 1 > max || c + w - 1 > max) return false
      for (const p of st.current.placed) {
        const pb = byId.get(p.b)
        if (!pb) continue
        const [pw, pd] = footprint(pb, p.rot)
        if (c < p.c + pw && c + w > p.c && r < p.r + pd && r + d > p.r) return false
      }
      for (const road of st.current.roads) {
        if (road.c >= c && road.c < c + w && road.r >= r && road.r < r + d) return false
      }
      return true
    }

    const updateGhost = (e: PointerEvent) => {
      const { pending: b, rot: rr, mode: m } = st.current
      if (m !== 'build' || !b) {
        ghost.visible = false
        return
      }
      const t = tileUnder(e)
      if (!t) return
      const [r, c] = t
      const [w, d] = footprint(b, rr)
      const ok = free(r, c, w, d)
      ghost.userData.tile = ok ? [r, c] : null
      ghost.visible = true
      placeAt(ghost, r, c, w, d)
      const pad = ghost.children[0] as THREE.Mesh | undefined
      if (pad) (pad.material as THREE.MeshBasicMaterial).color.set(ok ? 0x35c65a : 0xf03b2c)
      schedule()
    }

    const onDown = (e: PointerEvent) => {
      down = true
      lastX = e.clientX
      try {
        renderer.domElement.setPointerCapture(e.pointerId)
      } catch {
        /* alcuni browser rifiutano la cattura: non è essenziale */
      }
      const m = st.current.mode
      if (m === 'build') updateGhost(e)
      else if (m === 'road') {
        const t = tileUnder(e)
        if (t) st.current.onRoad(t[0], t[1])
      }
    }
    const onMove = (e: PointerEvent) => {
      if (touches.size >= 2) return // sta zoomando col pizzico
      const m = st.current.mode
      if (down) {
        if (m === 'build') updateGhost(e)
        else if (m === 'road') {
          const t = tileUnder(e)
          if (t) st.current.onRoad(t[0], t[1]) // trascina per tracciare la via
        } else if (m === 'view') {
          angle -= (e.clientX - lastX) * 0.008
          schedule()
        }
        lastX = e.clientX
      } else if (m === 'build') {
        updateGhost(e)
      }
    }
    const onUp = (e: PointerEvent) => {
      const m = st.current.mode
      if (down && m === 'build') {
        updateGhost(e)
        const t = ghost.userData.tile as [number, number] | null
        if (t) st.current.onPlace(t[0], t[1])
      } else if (down && m === 'demolish') {
        const t = tileUnder(e)
        if (t) st.current.onDemolish(t[0], t[1])
      }
      down = false
    }
    // ── Zoom: rotellina sul computer, pizzico sul telefono ──
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      userZoom = clampZoom(userZoom * (1 - e.deltaY * 0.0015))
      schedule()
    }
    const touches = new Map<number, { x: number; y: number }>()
    let pinchStart = 0
    let pinchZoom = 1
    const dist = () => {
      const [a2, b2] = [...touches.values()]
      return Math.hypot(a2.x - b2.x, a2.y - b2.y)
    }
    const onPinchDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (touches.size === 2) {
        pinchStart = dist()
        pinchZoom = userZoom
      }
    }
    const onPinchMove = (e: PointerEvent) => {
      if (e.pointerType !== 'touch' || !touches.has(e.pointerId)) return
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (touches.size === 2 && pinchStart > 0) {
        userZoom = clampZoom((pinchZoom * dist()) / pinchStart)
        schedule()
      }
    }
    const onPinchUp = (e: PointerEvent) => {
      touches.delete(e.pointerId)
      if (touches.size < 2) pinchStart = 0
    }

    const canvas = renderer.domElement
    canvas.addEventListener('wheel', onWheel, { passive: false })
    canvas.addEventListener('pointerdown', onPinchDown)
    canvas.addEventListener('pointermove', onPinchMove)
    canvas.addEventListener('pointerup', onPinchUp)
    canvas.addEventListener('pointercancel', onPinchUp)
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
      setLooping(false)
      cancelAnimationFrame(rafLoop)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('wheel', onWheel)
      canvas.removeEventListener('pointerdown', onPinchDown)
      canvas.removeEventListener('pointermove', onPinchMove)
      canvas.removeEventListener('pointerup', onPinchUp)
      canvas.removeEventListener('pointercancel', onPinchUp)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      renderer.dispose()
      if (canvas.parentNode === el) el.removeChild(canvas)
      api.current = null
    }
  }, [])

  // ── Terreno (cresce comprando) ──
  useEffect(() => {
    const a = api.current as unknown as { buildIsland?: () => void; render: () => void } | null
    if (!a) return
    a.buildIsland?.()
    a.render()
  }, [land])

  // ── Edifici piazzati ──
  useEffect(() => {
    const a = api.current
    if (!a) return
    a.town.clear()
    // caselle con muro, per raccordare le mura di cinta
    const walls = new Set(
      placed.filter((p) => byId.get(p.b)?.look === 'wall').map((p) => `${p.r},${p.c}`),
    )
    placed.forEach((p, i) => {
      const b = byId.get(p.b)
      if (!b) return
      const links: WallLinks = [
        walls.has(`${p.r - 1},${p.c}`),
        walls.has(`${p.r + 1},${p.c}`),
        walls.has(`${p.r},${p.c - 1}`),
        walls.has(`${p.r},${p.c + 1}`),
      ]
      const m = buildMesh(b, p.r * 7 + p.c * 3 + i, links)
      const [w, d] = footprint(b, p.rot)
      m.rotation.y = p.rot ? Math.PI / 2 : 0
      placeAt(m, p.r, p.c, w, d)
      a.town.add(m)
    })
    ;(a as unknown as { rebuildLife?: () => void }).rebuildLife?.()
    a.render()
  }, [placed])

  // ── Strade: ogni casella si raccorda con quelle vicine ──
  useEffect(() => {
    const a = api.current
    if (!a) return
    a.ways.clear()
    const at = new Map(roads.map((x) => [`${x.r},${x.c}`, x.t]))
    const mats = ROAD_STYLE.map((s, i) => ({
      outer: matTex(i === 0 ? 'dirt' : 'paving', s.outerColor, 1),
      inner: s.inner ? matTex('paving', s.innerColor, 1) : null,
    }))

    /** Aggiunge un pezzo di strada (centro o braccio verso un vicino). */
    const slab = (
      w: number,
      d: number,
      x: number,
      z: number,
      y: number,
      material: THREE.Material,
    ) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.02, d), material)
      m.position.set(x, y, z)
      m.receiveShadow = true
      a.ways.add(m)
    }

    for (const road of roads) {
      const st2 = ROAD_STYLE[road.t]
      const x = off(road.c)
      const z = off(road.r)
      const dirs: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
      const layers: [number, THREE.Material | null, number][] = [
        [st2.outer, mats[road.t].outer, st2.h],
        [st2.inner, mats[road.t].inner, st2.h + 0.012],
      ]
      for (const [width, material, y] of layers) {
        if (!width || !material) continue
        // blocco centrale
        slab(width, width, x, z, y, material)
        // bracci verso i vicini che hanno strada
        for (const [dr, dc] of dirs) {
          if (!at.has(`${road.r + dr},${road.c + dc}`)) continue
          const len = TILE / 2
          if (dc !== 0) slab(len, width, x + (dc * (TILE / 2 + width / 2)) / 2, z, y, material)
          else slab(width, len, x, z + (dr * (TILE / 2 + width / 2)) / 2, y, material)
        }
      }
    }
    ;(a as unknown as { rebuildLife?: () => void }).rebuildLife?.()
    a.render()
  }, [roads])

  // ── Anteprima dell'edificio da posizionare ──
  useEffect(() => {
    const a = api.current
    if (!a) return
    a.ghost.clear()
    if (mode !== 'build' || !pending) {
      a.ghost.visible = false
      a.render()
      return
    }
    const [w, d] = footprint(pending, rot)
    const pad = new THREE.Mesh(
      new THREE.PlaneGeometry(w * TILE * 0.98, d * TILE * 0.98),
      new THREE.MeshBasicMaterial({ color: 0x35c65a, transparent: true, opacity: 0.8, depthWrite: false }),
    )
    pad.rotation.x = -Math.PI / 2
    pad.position.y = 0.05
    a.ghost.add(pad)
    const preview = buildMesh(pending)
    preview.rotation.y = rot ? Math.PI / 2 : 0
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
  }, [pending, rot, mode])

  return (
    <div className="city3d-wrap">
      <div className="city3d" ref={host} />
      <div className="zoom-btns">
        <button onClick={() => api.current?.zoomBy(1.25)} aria-label="Ingrandisci">+</button>
        <button onClick={() => api.current?.zoomBy(0.8)} aria-label="Riduci">−</button>
      </div>
    </div>
  )
}
