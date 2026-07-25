import { useMemo, useRef, useState } from 'react'
import type { Lesson, Exercise } from '../types'
import { InfoCard, TableCard, Choice, Build, Match, type AnswerState } from './Exercises'
import { Mascot } from './Mascot'
import { pickQuip } from '../quips'

const START_HEARTS = 5
const XP_PER_EXERCISE = 10

interface Props {
  lesson: Lesson
  /** true se è una sessione di ripasso (Repetitio). */
  reviewMode?: boolean
  /** Uscita/abbandono: registra solo gli errori raccolti finora. */
  onQuit: (wrong: Exercise[], correct: Exercise[]) => void
  /** Completamento: XP guadagnati + errori e risposte esatte. */
  onFinish: (xp: number, wrong: Exercise[], correct: Exercise[]) => void
}

type Phase = 'answering' | 'checked'

export function LessonPlayer({ lesson, reviewMode = false, onQuit, onFinish }: Props) {
  const [idx, setIdx] = useState(0)
  const [hearts, setHearts] = useState(START_HEARTS)
  const [xp, setXp] = useState(0)
  const [phase, setPhase] = useState<Phase>('answering')
  const [answer, setAnswer] = useState<AnswerState>({ ready: false, correct: false })
  const [lastCorrect, setLastCorrect] = useState(false)
  const [finished, setFinished] = useState(false)
  const [feedbackQuip, setFeedbackQuip] = useState('')

  // Una battuta finale per sessione (non cambia a ogni render).
  const winQuip = useMemo(() => pickQuip('win'), [])
  const failQuip = useMemo(() => pickQuip('fail'), [])

  // Esercizi (a risposta) affrontati, per il ripasso degli errori.
  const wrong = useRef<Exercise[]>([])
  const correct = useRef<Exercise[]>([])

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
      setFeedbackQuip(pickQuip('correct'))
      correct.current.push(ex)
    } else {
      setHearts((h) => h - 1)
      setLastCorrect(false)
      setFeedbackQuip(pickQuip('wrong'))
      wrong.current.push(ex)
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
          <Mascot mood="happy" className="mascot--lg" />
          <h1 className="latin-shout">Optime!</h1>
          <p className="end-sub">{reviewMode ? 'Ripasso completato' : 'Lezione completata'}</p>
          <p className="end-quip">{winQuip}</p>
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
          <button
            className="btn btn-primary"
            onClick={() => onFinish(xp, wrong.current, correct.current)}
          >
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
          <Mascot mood="sad" className="mascot--lg" />
          <h1 className="latin-shout">Vae!</h1>
          <p className="end-sub">Vite finite</p>
          <p className="end-quip">{failQuip}</p>
          <p>
            Comunque: le parole che hai mancato le ritroverai nel <b>Ripasso</b>.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => onQuit(wrong.current, correct.current)}
          >
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
        <button
          className="close-btn"
          onClick={() => onQuit(wrong.current, correct.current)}
          aria-label="Esci"
        >
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
              <span className="fb-ok">✔ {feedbackQuip}</span>
            ) : (
              <span className="fb-no">
                <span className="fb-quip">✘ {feedbackQuip}</span>
                <span className="fb-answer">
                  Giusto:{' '}
                  <b>
                    {ex.type === 'choice'
                      ? ex.answer
                      : ex.type === 'build'
                      ? ex.answer.join(' ')
                      : ''}
                  </b>
                </span>
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
