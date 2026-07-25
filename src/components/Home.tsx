import type { Unit, Lesson } from '../types'
import type { Progress } from '../useProgress'
import { StatusCard } from './StatusCard'
import { VoicePicker } from './VoicePicker'
import { Mascot } from './Mascot'

interface Props {
  units: Unit[]
  progress: Progress
  onStartLesson: (lesson: Lesson) => void
  onStartReview: () => void
  onReset: () => void
  onToggleFreeMode: () => void
}

export function Home({
  units,
  progress,
  onStartLesson,
  onStartReview,
  onReset,
  onToggleFreeMode,
}: Props) {
  // Trova la prima lezione non completata: è quella "attuale".
  const allLessons = units.flatMap((u) => u.lessons)
  const currentLesson = allLessons.find((l) => !progress.completed.includes(l.id))

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
        </div>
      </header>

      <main className="path">
        <div className="home-greeting">
          <Mascot mood="idle" />
          <div className="speech-bubble">
            <span className="speech-latin">Salve!</span>{' '}
            {progress.completed.length === 0
              ? 'Sono il tuo compagno di studi. Cominciamo dal latino!'
              : 'Bentornatə! Pronto a imparare qualcosa di nuovo?'}
          </div>
        </div>

        <StatusCard progress={progress} />

        {progress.mistakes.length > 0 && (
          <button className="review-btn" onClick={onStartReview}>
            <span className="review-icon">🔁</span>
            <span className="review-text">
              <span className="latin-label">Repetitio · ripassa gli errori</span>
              <span className="review-count">
                {progress.mistakes.length}{' '}
                {progress.mistakes.length === 1 ? 'parola da ripassare' : 'parole da ripassare'}
              </span>
            </span>
          </button>
        )}

        {progress.completed.length > 0 && progress.completed.length === allLessons.length && (
          <div className="banner">
            🎉 Hai completato tutto il corso! Bravissimə. Presto arriveranno nuove lezioni.
          </div>
        )}

        {units.map((unit) => (
          <section key={unit.id} className="unit">
            <div className="unit-header" style={{ background: unit.color }}>
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
                    <span className="lesson-icon">{done ? '✓' : locked ? '🔒' : lesson.icon}</span>
                    <span className="lesson-title">{lesson.title}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}

        <footer className="home-footer">
          <VoicePicker />
          <button
            className={`free-toggle ${progress.freeMode ? 'on' : ''}`}
            onClick={onToggleFreeMode}
          >
            {progress.freeMode ? '🔓 Tutte le lezioni sbloccate' : '🔒 Sblocca tutte le lezioni'}
          </button>
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
