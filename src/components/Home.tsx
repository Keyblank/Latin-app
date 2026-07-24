import type { Unit, Lesson } from '../types'
import type { Progress } from '../useProgress'

interface Props {
  units: Unit[]
  progress: Progress
  onStartLesson: (lesson: Lesson) => void
  onReset: () => void
}

export function Home({ units, progress, onStartLesson, onReset }: Props) {
  // Trova la prima lezione non completata: è quella "attuale".
  const allLessons = units.flatMap((u) => u.lessons)
  const currentLesson = allLessons.find((l) => !progress.completed.includes(l.id))

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">🏛️ Latino</div>
        <div className="stats">
          <span className="stat" title="Giorni di fila">🔥 {progress.streak}</span>
          <span className="stat" title="Punti esperienza">⭐ {progress.xp}</span>
        </div>
      </header>

      <main className="path">
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
                const locked = !done && !isCurrent
                return (
                  <button
                    key={lesson.id}
                    className={`lesson-node ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                    style={done || isCurrent ? { background: unit.color } : undefined}
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
          <button className="link-btn" onClick={onReset}>
            Ricomincia da capo
          </button>
        </footer>
      </main>
    </div>
  )
}
