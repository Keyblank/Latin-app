import type { Unit, Lesson } from '../types'
import type { Progress } from '../useProgress'
import { useState } from 'react'
import { StatusCard } from './StatusCard'
import { VoicePicker } from './VoicePicker'
import { Mascot } from './Mascot'
import { pickQuip } from '../quips'
import { sfxEnabled, setSfxEnabled } from '../sfx'
import { versiones } from '../data/versiones'
import type { Versio } from '../data/versiones'

interface Props {
  units: Unit[]
  progress: Progress
  onStartLesson: (lesson: Lesson) => void
  onStartReview: () => void
  onOpenCity: () => void
  onStartVersio: (v: Versio) => void
  onOpenGrammatica: () => void
  onReset: () => void
  onToggleFreeMode: () => void
}

export function Home({
  units,
  progress,
  onStartLesson,
  onStartReview,
  onOpenCity,
  onStartVersio,
  onOpenGrammatica,
  onReset,
  onToggleFreeMode,
}: Props) {
  // Trova la prima lezione non completata: è quella "attuale".
  const allLessons = units.flatMap((u) => u.lessons)
  const currentLesson = allLessons.find((l) => !progress.completed.includes(l.id))

  const lezioniFatte = progress.completed.length

  const [sfxOn, setSfxOn] = useState(sfxEnabled)

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

        <StatusCard progress={progress} />

        <button className="urbs-btn" onClick={onOpenCity}>
          <span className="urbs-icon">🏛️</span>
          <span className="urbs-text">
            <span className="latin-label">Urbs · costruisci la tua Roma</span>
            <span className="urbs-count">
              {progress.city.length} edifici · 🪙 {progress.denarii} da spendere
            </span>
          </span>
        </button>

        <button className="gram-btn" onClick={onOpenGrammatica}>
          <span className="urbs-icon">📚</span>
          <span className="urbs-text">
            <span className="latin-label">Grammatica · tutte le tabelle</span>
            <span className="urbs-count">Da consultare mentre traduci</span>
          </span>
        </button>

        <div className="versio-blocco">
          <p className="versio-etichetta">Versiones · traduci un brano intero</p>
          <div className="versio-list">
            {versiones.map((v) => {
              const bloccata = !progress.freeMode && lezioniFatte < v.unlock
              const fatta = progress.versiones.includes(v.id)
              return (
                <button
                  key={v.id}
                  className="versio-card"
                  disabled={bloccata}
                  onClick={() => onStartVersio(v)}
                >
                  <span className="versio-icona">{bloccata ? '🔒' : v.icona}</span>
                  <span>
                    <span className="versio-nome">
                      {v.titolo} {fatta && '✓'}
                    </span>
                    <span className="versio-meta">
                      {bloccata
                        ? `Completa ${v.unlock} lezioni per aprirla`
                        : `${v.livello} · ${v.frasi.length} frasi · ${v.fonte}`}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

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
