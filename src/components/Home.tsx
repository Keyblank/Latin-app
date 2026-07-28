import type { Unit, Lesson } from '../types'
import type { Progress } from '../useProgress'
import { useState } from 'react'
import { StatusCard } from './StatusCard'
import { VoicePicker } from './VoicePicker'
import { Mascot } from './Mascot'
import { pickQuip } from '../quips'
import { sfxEnabled, setSfxEnabled } from '../sfx'
import { versiones } from '../data/versiones'
import { quanteOggi, nuoveRimasteOggi } from '../vocabolario'
import { Salvataggio } from './Salvataggio'
import { Segnalazioni } from './Segnalazioni'

interface Props {
  units: Unit[]
  progress: Progress
  onStartLesson: (lesson: Lesson) => void
  onStartReview: () => void
  onOpenCity: () => void
  onOpenVersiones: () => void
  onOpenGrammatica: () => void
  onOpenVocab: () => void
  onReset: () => void
  onToggleFreeMode: () => void
  /** Ripristina i progressi da un file esportato. */
  onImporta: (p: Progress) => void
}

/** Una piastrella della dashboard. */
function Tile({
  icona,
  titolo,
  nota,
  attiva,
  onClick,
}: {
  icona: string
  titolo: string
  nota: string
  /** Se false la piastrella resta, ma spenta: dice che non c'è niente da fare. */
  attiva?: boolean
  onClick: () => void
}) {
  return (
    <button className={`tile ${attiva === false ? 'tile--spenta' : ''}`} onClick={onClick}>
      <span className="tile-icona">{icona}</span>
      <span className="tile-titolo">{titolo}</span>
      <span className="tile-nota">{nota}</span>
    </button>
  )
}

export function Home({
  units,
  progress,
  onStartLesson,
  onStartReview,
  onOpenCity,
  onOpenVersiones,
  onOpenGrammatica,
  onOpenVocab,
  onReset,
  onToggleFreeMode,
  onImporta,
}: Props) {
  // Trova la prima lezione non completata: è quella "attuale".
  const allLessons = units.flatMap((u) => u.lessons)
  const currentLesson = allLessons.find((l) => !progress.completed.includes(l.id))
  const unitaCorrente = units.find((u) => u.lessons.some((l) => l.id === currentLesson?.id))

  const lezioniFatte = progress.completed.length

  const inScadenza = quanteOggi(
    progress.vocab,
    lezioniFatte,
    progress.freeMode,
    nuoveRimasteOggi(progress.vocabNuove),
  )
  const versioniAperte = versiones.filter(
    (v) => progress.freeMode || lezioniFatte >= v.unlock,
  ).length

  const [sfxOn, setSfxOn] = useState(sfxEnabled)

  // Le unità già finite si mostrano chiuse: con ventun unità, lasciarle tutte
  // aperte vuol dire scorrere per minuti prima di arrivare a dove si è.
  const [aperte, setAperte] = useState<Set<string>>(new Set())
  const apriChiudi = (id: string) =>
    setAperte((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  // Battuta della mascotte, scelta una volta per visita alla home.
  const [greeting] = useState(() =>
    progress.completed.length === 0
      ? 'Ave. Nuovo qui? Iniziamo dalle basi, senza fretta. Tanto tempo ne ho.'
      : pickQuip('home'),
  )

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <rect width="100" height="100" rx="22" fill="#6a3fb5" />
            <g fill="#e0a52e">
              <rect x="28" y="23" width="44" height="9" rx="2" />
              <rect x="44" y="32" width="12" height="36" />
              <rect x="26" y="68" width="48" height="10" rx="2" />
            </g>
          </svg>
          Ianua
        </div>
        <div className="stats">
          <span className="stat" title="Giorni di fila">🔥 {progress.streak}</span>
          <span className="stat" title="Punti esperienza">⭐ {progress.xp}</span>
          <span className="stat" title="Denarii da spendere nella città">🪙 {progress.denarii}</span>
        </div>
      </header>

      <main className="path">
        <div className="home-greeting">
          <Mascot mood="idle" />
          <div className="speech-bubble">{greeting}</div>
        </div>

        {/* Il pulsante che serve nove volte su dieci: riprendere da dove si era. */}
        {currentLesson && (
          <button className="riprendi" onClick={() => onStartLesson(currentLesson)}>
            <span className="riprendi-etichetta">
              {lezioniFatte === 0 ? 'Comincia da qui' : 'Riprendi da qui'}
            </span>
            <span className="riprendi-lezione">
              {currentLesson.icon} {currentLesson.title}
            </span>
            {unitaCorrente && <span className="riprendi-unita">{unitaCorrente.title}</span>}
          </button>
        )}

        <div className="tiles">
          <Tile
            icona="🧠"
            titolo="Vocābula"
            nota={
              inScadenza > 0
                ? `${inScadenza} ${inScadenza === 1 ? 'parola' : 'parole'} da ripassare`
                : 'niente in scadenza oggi'
            }
            attiva={inScadenza > 0}
            onClick={onOpenVocab}
          />
          <Tile
            icona="🔁"
            titolo="Repetītiō"
            nota={
              progress.mistakes.length > 0
                ? `${progress.mistakes.length} ${progress.mistakes.length === 1 ? 'errore' : 'errori'} da rifare`
                : 'nessun errore in sospeso'
            }
            attiva={progress.mistakes.length > 0}
            onClick={onStartReview}
          />
          <Tile
            icona="📜"
            titolo="Versiōnēs"
            nota={`${versioniAperte} di ${versiones.length} da tradurre`}
            attiva={versioniAperte > 0}
            onClick={onOpenVersiones}
          />
          <Tile
            icona="📚"
            titolo="Grammatica"
            nota="tutte le tabelle"
            onClick={onOpenGrammatica}
          />
          <Tile
            icona="🏛️"
            titolo="Urbs"
            nota={`${progress.city.length} edifici · 🪙 ${progress.denarii}`}
            onClick={onOpenCity}
          />
        </div>

        <StatusCard progress={progress} />

        {progress.completed.length > 0 && progress.completed.length === allLessons.length && (
          <div className="banner">
            🎉 Hai completato tutto il corso! Bravissimə. Presto arriveranno nuove lezioni.
          </div>
        )}

        <h2 className="path-titolo">Il corso</h2>

        {units.map((unit) => {
          const finita = unit.lessons.every((l) => progress.completed.includes(l.id))
          const chiusa = finita && !aperte.has(unit.id)
          return (
            <section key={unit.id} className="unit">
              {chiusa ? (
                <button
                  className="unit-chiusa"
                  onClick={() => apriChiudi(unit.id)}
                  style={{ borderColor: unit.color }}
                >
                  <span className="unit-chiusa-ok" style={{ background: unit.color }}>✓</span>
                  <span className="unit-chiusa-testo">
                    <span className="unit-chiusa-nome">{unit.title}</span>
                    <span className="unit-chiusa-meta">
                      {unit.lessons.length} lezioni · completata
                    </span>
                  </span>
                  <span className="unit-chiusa-freccia">▾</span>
                </button>
              ) : (
                <>
                  <div
                    className="unit-header"
                    style={{ background: unit.color, cursor: finita ? 'pointer' : undefined }}
                    onClick={finita ? () => apriChiudi(unit.id) : undefined}
                  >
                    <h2>{unit.title}</h2>
                    <p>{unit.subtitle}</p>
                  </div>

                  <div className="lessons">
                    {unit.lessons.map((lesson) => {
                      const done = progress.completed.includes(lesson.id)
                      const isCurrent = currentLesson?.id === lesson.id
                      // In modalità libera nulla è bloccato.
                      const locked = !done && !isCurrent && !progress.freeMode
                      return (
                        <button
                          key={lesson.id}
                          className={`lesson-node ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                          style={!locked ? { background: unit.color } : undefined}
                          disabled={locked}
                          onClick={() => onStartLesson(lesson)}
                          title={locked ? 'Completa prima le lezioni precedenti' : lesson.title}
                        >
                          <span className="lesson-icon">
                            {done ? '✓' : locked ? '🔒' : lesson.icon}
                          </span>
                          <span className="lesson-title">{lesson.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </section>
          )
        })}

        <footer className="home-footer">
          <VoicePicker />
          <button
            className={`free-toggle ${sfxOn ? 'on' : ''}`}
            onClick={() => {
              const next = !sfxOn
              setSfxEnabled(next)
              setSfxOn(next)
            }}
          >
            {sfxOn ? '🔔 Effetti sonori attivi' : '🔕 Effetti sonori spenti'}
          </button>
          <button
            className={`free-toggle ${progress.freeMode ? 'on' : ''}`}
            onClick={onToggleFreeMode}
          >
            {progress.freeMode ? '🔓 Tutte le lezioni sbloccate' : '🔒 Sblocca tutte le lezioni'}
          </button>
          <Salvataggio progress={progress} onImporta={onImporta} />
          <Segnalazioni />
          <div>
            <button className="link-btn" onClick={onReset}>
              Ricomincia da capo
            </button>
          </div>
        </footer>
      </main>
    </div>
  )
}
