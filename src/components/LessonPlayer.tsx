import { useState } from 'react'
import type { Lesson } from '../types'
import { InfoCard, TableCard, Choice, Build, Match, type AnswerState } from './Exercises'

const START_HEARTS = 5
const XP_PER_EXERCISE = 10

interface Props {
  lesson: Lesson
  onExit: () => void
  onFinish: (xp: number) => void
}

type Phase = 'answering' | 'checked'

export function LessonPlayer({ lesson, onExit, onFinish }: Props) {
  const [idx, setIdx] = useState(0)
  const [hearts, setHearts] = useState(START_HEARTS)
  const [xp, setXp] = useState(0)
  const [phase, setPhase] = useState<Phase>('answering')
  const [answer, setAnswer] = useState<AnswerState>({ ready: false, correct: false })
  const [lastCorrect, setLastCorrect] = useState(false)
  const [finished, setFinished] = useState(false)

  const ex = lesson.exercises[idx]
  const total = lesson.exercises.length
  // Schermate didattiche: nessuna risposta, solo "Continua".
  const isReadOnly = ex.type === 'info' || ex.type === 'table'
  const isMatch = ex.type === 'match'

  function goNext() {
    if (idx + 1 >= total) {
      setFinished(true)
      return
    }
    setIdx(idx + 1)
    setPhase('answering')
    setAnswer({ ready: false, correct: false })
    setLastCorrect(false)
  }

  function check() {
    if (answer.correct) {
      setXp((x) => x + XP_PER_EXERCISE)
      setLastCorrect(true)
    } else {
      setHearts((h) => h - 1)
      setLastCorrect(false)
    }
    setPhase('checked')
  }

  // Match: si completa da solo, sempre corretto.
  function onMatchComplete() {
    setXp((x) => x + XP_PER_EXERCISE)
    setLastCorrect(true)
    setPhase('checked')
  }

  // Schermata di completamento.
  if (finished) {
    return (
      <div className="app lesson">
        <div className="end-screen win">
          <div className="end-emoji">🎉</div>
          <h1>Lezione completata!</h1>
          <p className="end-lesson-name">{lesson.icon} {lesson.title}</p>
          <div className="end-stats">
            <div className="end-stat">
              <span className="end-stat-num">+{xp}</span>
              <span className="end-stat-label">XP guadagnati</span>
            </div>
            <div className="end-stat">
              <span className="end-stat-num">❤️ {hearts}</span>
              <span className="end-stat-label">vite rimaste</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => onFinish(xp)}>
            Continua
          </button>
        </div>
      </div>
    )
  }

  // Schermata "vite finite".
  if (hearts <= 0 && phase === 'checked' && !lastCorrect) {
    return (
      <div className="app lesson">
        <div className="end-screen fail">
          <div className="end-emoji">💔</div>
          <h1>Vite finite!</h1>
          <p>Niente paura: sbagliare fa parte dell’imparare. Riprova con calma.</p>
          <button className="btn btn-primary" onClick={onExit}>
            Torna alla mappa
          </button>
        </div>
      </div>
    )
  }

  const progressPct = Math.round((idx / total) * 100)

  return (
    <div className="app lesson">
      <header className="lesson-top">
        <button className="close-btn" onClick={onExit} aria-label="Esci">
          ✕
        </button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="hearts">❤️ {hearts}</div>
      </header>

      <main className="lesson-body" key={idx}>
        {ex.type === 'info' && <InfoCard ex={ex} />}
        {ex.type === 'table' && <TableCard ex={ex} />}
        {ex.type === 'choice' && <Choice ex={ex} disabled={phase === 'checked'} onChange={setAnswer} />}
        {ex.type === 'build' && <Build ex={ex} disabled={phase === 'checked'} onChange={setAnswer} />}
        {ex.type === 'match' && <Match ex={ex} onComplete={onMatchComplete} />}
      </main>

      <footer
        className={`lesson-foot ${
          phase === 'checked' ? (lastCorrect ? 'foot-correct' : 'foot-wrong') : ''
        }`}
      >
        {phase === 'checked' && !isMatch && (
          <div className="feedback">
            {lastCorrect ? (
              <span className="fb-ok">✔ Perfetto!</span>
            ) : (
              <span className="fb-no">
                ✘ Risposta giusta:{' '}
                <b>
                  {ex.type === 'choice'
                    ? ex.answer
                    : ex.type === 'build'
                    ? ex.answer.join(' ')
                    : ''}
                </b>
              </span>
            )}
          </div>
        )}

        {isReadOnly ? (
          <button className="btn btn-primary" onClick={goNext}>
            Continua
          </button>
        ) : phase === 'answering' ? (
          <button className="btn btn-primary" disabled={!answer.ready || isMatch} onClick={check}>
            {isMatch ? 'Abbina tutte le coppie' : 'Verifica'}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={goNext}>
            Continua
          </button>
        )}
      </footer>
    </div>
  )
}
