import { useEffect, useRef, useState } from 'react'
import { BUILDINGS, LAND_COSTS, LAND_SIZES, ROAD_KINDS } from '../data/city'
import type { Building } from '../data/city'
import type { Progress } from '../useProgress'
import { playCorrect, playWrong } from '../sfx'
import { City3D, footprint } from './City3D'
import type { CityMode } from './City3D'

interface Props {
  progress: Progress
  onBuild: (id: string, cost: number, r: number, c: number, rot: 0 | 1) => void
  onDemolish: (index: number, refund: number) => void
  onAddRoad: (r: number, c: number, t: 0 | 1 | 2, cost: number) => void
  onRemoveRoad: (r: number, c: number, refund: number) => void
  onExpandLand: (cost: number) => void
  onBack: () => void
}

const byId = new Map(BUILDINGS.map((b) => [b.id, b]))

/** Urbs: la città che costruisci spendendo i denarii guadagnati studiando. */
export function City({
  progress,
  onBuild,
  onDemolish,
  onAddRoad,
  onRemoveRoad,
  onExpandLand,
  onBack,
}: Props) {
  const done = progress.completed.length
  const [mode, setMode] = useState<CityMode>('view')
  const [pending, setPending] = useState<Building | null>(null)
  const [rot, setRot] = useState<0 | 1>(0)
  const [roadKind, setRoadKind] = useState<0 | 1 | 2>(0)
  const mapRef = useRef<HTMLDivElement>(null)

  // Quando entri in una modalità operativa, porta la mappa in vista.
  useEffect(() => {
    if (mode !== 'view') mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [mode, pending])

  const counts = new Map<string, number>()
  for (const p of progress.city) counts.set(p.b, (counts.get(p.b) ?? 0) + 1)

  const landIdx = Math.min(progress.land, LAND_SIZES.length - 1)
  const nextLandCost = LAND_COSTS[progress.land]
  const canExpand = nextLandCost !== undefined

  const chooseBuilding = (b: Building) => {
    if (pending?.id === b.id && mode === 'build') {
      setPending(null)
      setMode('view')
    } else {
      setPending(b)
      setMode('build')
    }
  }

  const setTool = (m: CityMode) => {
    setMode((cur) => (cur === m ? 'view' : m))
    setPending(null)
  }

  /** Cerca l'edificio che occupa quella cella. */
  const buildingAt = (r: number, c: number) => {
    for (let i = 0; i < progress.city.length; i++) {
      const p = progress.city[i]
      const b = byId.get(p.b)
      if (!b) continue
      const [w, d] = footprint(b, p.rot)
      if (c >= p.c && c < p.c + w && r >= p.r && r < p.r + d) return { i, b }
    }
    return null
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="close-btn" onClick={onBack} aria-label="Indietro">
          ←
        </button>
        <div className="brand" style={{ fontSize: 21 }}>🏛️ Urbs</div>
        <div className="stats">
          <span className="stat" title="Denarii">🪙 {progress.denarii}</span>
        </div>
      </header>

      <main className="city">
        <div className="cityscape" ref={mapRef}>
          <City3D
            placed={progress.city}
            roads={progress.roads}
            land={progress.land}
            mode={mode}
            pending={pending}
            rot={rot}
            onPlace={(r, c) => {
              if (!pending) return
              onBuild(pending.id, pending.cost, r, c, rot)
              playCorrect()
              setPending(null)
              setMode('view')
            }}
            onRoad={(r, c) => {
              if (buildingAt(r, c)) return
              const kind = ROAD_KINDS[roadKind]
              const existing = progress.roads.find((x) => x.r === r && x.c === c)
              if (existing?.t === roadKind) return
              if (progress.denarii < kind.cost) return
              onAddRoad(r, c, roadKind, kind.cost)
            }}
            onDemolish={(r, c) => {
              const hit = buildingAt(r, c)
              if (hit) {
                onDemolish(hit.i, Math.floor(hit.b.cost / 2))
                playWrong()
                return
              }
              const road = progress.roads.find((x) => x.r === r && x.c === c)
              if (road) {
                onRemoveRoad(r, c, Math.floor(ROAD_KINDS[road.t].cost / 2))
                playWrong()
              }
            }}
          />
        </div>

        {/* Barra degli strumenti */}
        <div className="tools">
          <button
            className={`tool ${mode === 'road' ? 'on' : ''}`}
            onClick={() => setTool('road')}
            title="Traccia strade"
          >
            🛣️ Vie
          </button>
          <button
            className={`tool ${mode === 'demolish' ? 'on' : ''}`}
            onClick={() => setTool('demolish')}
            title="Demolisci (rimborso metà prezzo)"
          >
            🔨 Demolisci
          </button>
          {mode === 'build' && pending && (
            <button className="tool" onClick={() => setRot((v) => (v === 0 ? 1 : 0))} title="Ruota">
              🔄 Ruota
            </button>
          )}
        </div>

        {mode === 'build' && pending ? (
          <div className="place-bar">
            <span>
              Tocca la mappa per posizionare <b>{pending.name}</b>
            </span>
            <button className="place-cancel" onClick={() => { setPending(null); setMode('view') }}>
              Annulla
            </button>
          </div>
        ) : mode === 'road' ? (
          <>
            <div className="road-picker">
              {ROAD_KINDS.map((k) => {
                const locked = done < k.unlock
                return (
                  <button
                    key={k.id}
                    className={`road-chip ${roadKind === k.id ? 'on' : ''} ${locked ? 'off' : ''}`}
                    disabled={locked}
                    onClick={() => setRoadKind(k.id)}
                  >
                    <span className="road-name">{locked ? '🔒' : k.icon} {k.name}</span>
                    <span className="road-gloss">«{k.gloss}»</span>
                    <span className="road-cost">{locked ? `${k.unlock} lezioni` : `🪙 ${k.cost}`}</span>
                  </button>
                )
              })}
            </div>
            <div className="place-bar">
              <span>Trascina sulla mappa per tracciare la <b>{ROAD_KINDS[roadKind].name}</b></span>
              <button className="place-cancel" onClick={() => setMode('view')}>Fine</button>
            </div>
          </>
        ) : mode === 'demolish' ? (
          <div className="place-bar demolish">
            <span>Tocca un edificio per <b>demolirlo</b> (metà rimborso)</span>
            <button className="place-cancel" onClick={() => setMode('view')}>Fine</button>
          </div>
        ) : (
          <p className="city-hint">
            Guadagni <b>denarii 🪙</b> studiando. Scegli un edificio e appoggialo dove vuoi;
            traccia le vie, demolisci, ruota. Trascina la mappa per girare la città.
          </p>
        )}

        {/* Terreno */}
        <div className="land-row">
          <span className="land-info">
            <span className="latin-label">Ager · terreno</span>
            <b>{LAND_SIZES[landIdx]}×{LAND_SIZES[landIdx]}</b> celle · {progress.city.length} edifici
          </span>
          {canExpand ? (
            <button
              className="land-buy"
              disabled={progress.denarii < nextLandCost}
              onClick={() => onExpandLand(nextLandCost)}
            >
              Amplia 🪙 {nextLandCost}
            </button>
          ) : (
            <span className="land-max">Terreno massimo</span>
          )}
        </div>

        <div className="shop">
          {BUILDINGS.map((b) => {
            const n = counts.get(b.id) ?? 0
            const locked = done < b.unlock
            const afford = progress.denarii >= b.cost
            const active = pending?.id === b.id && mode === 'build'
            return (
              <div
                key={b.id}
                className={`shop-card ${n > 0 ? 'is-built' : ''} ${locked ? 'is-locked' : ''} ${active ? 'is-active' : ''}`}
              >
                {n > 0 && <div className="shop-count">×{n}</div>}
                <div className="shop-icon">{locked ? '🔒' : b.icon}</div>
                <div className="shop-name">{b.name}</div>
                <div className="shop-gloss">«{b.gloss}»</div>
                {locked ? (
                  <div className="shop-state locked">Completa {b.unlock} lezioni</div>
                ) : (
                  <button className="shop-buy" disabled={!afford} onClick={() => chooseBuilding(b)}>
                    {active ? 'Annulla' : `🪙 ${b.cost}`}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
