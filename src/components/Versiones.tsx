import type { Progress } from '../useProgress'
import type { Versio } from '../data/versiones'
import { versiones } from '../data/versiones'

/**
 * L'elenco dei brani da tradurre.
 *
 * Stava nella schermata iniziale, ma sette schede — quasi tutte chiuse, e
 * quindi inutili — spingevano le lezioni fuori dallo schermo. Chi vuole
 * tradurre un brano ci arriva in un tocco; chi vuole studiare non se le
 * trova più in mezzo.
 */
export function Versiones({
  progress,
  onStart,
  onBack,
}: {
  progress: Progress
  onStart: (v: Versio) => void
  onBack: () => void
}) {
  const fatte = progress.completed.length
  const aperte = versiones.filter((v) => progress.freeMode || fatte >= v.unlock).length

  return (
    <div className="app">
      <header className="topbar">
        <button className="close-btn" onClick={onBack} aria-label="Torna indietro">←</button>
        <span className="brand">Versiōnēs</span>
        <span className="gram-conta">{aperte}/{versiones.length}</span>
      </header>

      <main className="gram-body">
        <p className="versiones-intro">
          Brani latini interi, una frase alla volta: tocchi una parola e ne
          vedi lemma, significato e forma. Si aprono man mano che il corso
          spiega quello che contengono — {aperte} su {versiones.length}
          {aperte === 1 ? ' disponibile' : ' disponibili'} adesso.
        </p>

        <div className="versio-list">
          {versiones.map((v) => {
            const bloccata = !progress.freeMode && fatte < v.unlock
            const fatta = progress.versiones.includes(v.id)
            return (
              <button
                key={v.id}
                className="versio-card"
                disabled={bloccata}
                onClick={() => onStart(v)}
              >
                <span className="versio-icona">{bloccata ? '🔒' : v.icona}</span>
                <span>
                  <span className="versio-nome">
                    {v.titolo} {fatta && '✓'}
                  </span>
                  <span className="versio-meta">
                    {bloccata
                      ? `Completa ${v.unlock} lezioni per aprirla (ne hai fatte ${fatte})`
                      : `${v.livello} · ${v.frasi.length} frasi · ${v.fonte}`}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
