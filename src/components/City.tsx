import { useEffect, useRef, useState } from 'react'
import { BUILDINGS } from '../data/city'
import type { Building } from '../data/city'
import type { Progress } from '../useProgress'
import { playCorrect } from '../sfx'
import { City3D } from './City3D'

interface Props {
  progress: Progress
  onBuild: (id: string, cost: number, r: number, c: number) => void
  onBack: () => void
}

/** Urbs: la città che costruisci spendendo i denarii guadagnati studiando. */
export function City({ progress, onBuild, onBack }: Props) {
  const done = progress.completed.length
  const [pending, setPending] = useState<Building | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Quando scegli un edificio, porta la mappa in vista: il negozio sta sotto.
  useEffect(() => {
    if (pending) mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [pending])

  // Quante copie di ogni edificio sono già in città.
  const counts = new Map<string, number>()
  for (const p of progress.city) counts.set(p.b, (counts.get(p.b) ?? 0) + 1)

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
            pending={pending}
            onPlace={(r, c) => {
              if (!pending) return
              onBuild(pending.id, pending.cost, r, c)
              playCorrect()
              setPending(null)
            }}
          />
        </div>

        {pending ? (
          <div className="place-bar">
            <span>
              Tocca la mappa per posizionare <b>{pending.name}</b>
            </span>
            <button className="place-cancel" onClick={() => setPending(null)}>
              Annulla
            </button>
          </div>
        ) : (
          <p className="city-hint">
            Guadagni <b>denarii 🪙</b> studiando. Scegli un edificio e <b>appoggialo dove vuoi</b>:
            puoi costruirne quanti ne vuoi. Trascina per girare la città.
          </p>
        )}

        <div className="shop">
          {BUILDINGS.map((b) => {
            const n = counts.get(b.id) ?? 0
            const locked = done < b.unlock
            const afford = progress.denarii >= b.cost
            const active = pending?.id === b.id
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
                  <button
                    className="shop-buy"
                    disabled={!afford}
                    onClick={() => setPending(active ? null : b)}
                  >
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
