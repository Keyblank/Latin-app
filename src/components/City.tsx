import { BUILDINGS } from '../data/city'
import type { Progress } from '../useProgress'
import { playCorrect } from '../sfx'
import { IsoCity } from './IsoCity'

interface Props {
  progress: Progress
  onBuild: (id: string, cost: number) => void
  onBack: () => void
}

/** Urbs: la città che cresce spendendo i denarii guadagnati studiando. */
export function City({ progress, onBuild, onBack }: Props) {
  const done = progress.completed.length
  const built = BUILDINGS.filter((b) => progress.built.includes(b.id))

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
        <div className="cityscape">
          <IsoCity built={built} />
          {built.length === 0 && (
            <div className="city-empty">
              Un terreno vuoto sul colle… <b>inizia a costruire la tua Roma!</b>
            </div>
          )}
        </div>

        <p className="city-hint">
          Guadagni <b>denarii 🪙</b> studiando. Spendili per costruire edifici romani:
          i più grandi si sbloccano avanzando nel corso.
        </p>

        <div className="shop">
          {BUILDINGS.map((b) => {
            const isBuilt = progress.built.includes(b.id)
            const locked = done < b.unlock
            const afford = progress.denarii >= b.cost
            return (
              <div
                key={b.id}
                className={`shop-card ${isBuilt ? 'is-built' : ''} ${locked ? 'is-locked' : ''}`}
              >
                <div className="shop-icon">{locked ? '🔒' : b.icon}</div>
                <div className="shop-name">{b.name}</div>
                <div className="shop-gloss">«{b.gloss}»</div>
                {isBuilt ? (
                  <div className="shop-state built">✓ Costruito</div>
                ) : locked ? (
                  <div className="shop-state locked">Completa {b.unlock} lezioni</div>
                ) : (
                  <button
                    className="shop-buy"
                    disabled={!afford}
                    onClick={() => {
                      onBuild(b.id, b.cost)
                      playCorrect()
                    }}
                  >
                    🪙 {b.cost}
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
