import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson, Exercise } from '../types'
import { InfoCard, TableCard, Choice, Build, Match, Analysis, type AnswerState } from './Exercises'
import { Mascot } from './Mascot'
import { Confetti } from './Confetti'
import { pickQuip } from '../quips'
import { playCorrect, playWrong, playWin } from '../sfx'

/** Tetto delle vite. Nelle lezioni corte se ne danno meno: vedi sotto. */
const MAX_HEARTS = 5
const XP_PER_EXERCISE = 10

/** Schede e tabelle si leggono e basta: non sono quesiti. */
const isQuestion = (e: Exercise) => e.type !== 'info' && e.type !== 'table'

const exKey = (e: Exercise) => JSON.stringify(e)

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
  // Le vite non possono essere più dei quesiti: in una lezione da tre domande
  // con cinque vite il contatore sarebbe una decorazione, perché finirle
  // sarebbe impossibile.
  const quesiti = useMemo(() => lesson.exercises.filter(isQuestion).length, [lesson])
  const viteIniziali = Math.min(MAX_HEARTS, quesiti)

  const [idx, setIdx] = useState(0)
  const [hearts, setHearts] = useState(viteIniziali)
  const [xp, setXp] = useState(0)
  const [phase, setPhase] = useState<Phase>('answering')
  const [answer, setAnswer] = useState<AnswerState>({ ready: false, correct: false })
  const [lastCorrect, setLastCorrect] = useState(false)
  const [finished, setFinished] = useState(false)
  const [feedbackQuip, setFeedbackQuip] = useState('')

  // Secondo giro sugli sbagliati, prima di uscire: vedi `passaAlRecupero`.
  const [daRifare, setDaRifare] = useState<Exercise[]>([])
  const [rIdx, setRIdx] = useState(0)
  const recupero = daRifare.length > 0

  // Una battuta finale per sessione (non cambia a ogni render).
  const winQuip = useMemo(() => pickQuip('win'), [])
  const failQuip = useMemo(() => pickQuip('fail'), [])

  // Esercizi (a risposta) affrontati, per il ripasso degli errori.
  const wrong = useRef<Exercise[]>([])
  const correct = useRef<Exercise[]>([])

  const lista = recupero ? daRifare : lesson.exercises
  const i = recupero ? rIdx : idx
  const ex = lista[i]
  const total = lista.length
  // Schermate didattiche: nessuna risposta, solo "Continua".
  const isReadOnly = ex.type === 'info' || ex.type === 'table'
  const isMatch = ex.type === 'match'

  /**
   * Alla fine della lezione si rifanno i quesiti sbagliati.
   *
   * Non danno XP, non tolgono vite e non cancellano l'errore dal Repetitio:
   * indovinare dieci secondi dopo aver letto la risposta non dimostra niente,
   * e quella domanda deve tornare fra qualche giorno lo stesso. Servono a non
   * uscire dalla lezione con l'ultima immagine di una risposta sbagliata.
   */
  function passaAlRecupero(): boolean {
    const visti = new Set<string>()
    const unici = wrong.current.filter((e) => {
      const k = exKey(e)
      if (visti.has(k)) return false
      visti.add(k)
      return true
    })
    if (unici.length === 0) return false
    setDaRifare(unici)
    setRIdx(0)
    setPhase('answering')
    setAnswer({ ready: false, correct: false })
    setLastCorrect(false)
    return true
  }

  function goNext() {
    if (i + 1 < total) {
      if (recupero) setRIdx(i + 1)
      else setIdx(i + 1)
      setPhase('answering')
      setAnswer({ ready: false, correct: false })
      setLastCorrect(false)
      return
    }
    if (!recupero && passaAlRecupero()) return
    setFinished(true)
  }

  function check() {
    // Nel recupero non si guadagna e non si perde: è solo pratica.
    if (recupero) {
      setLastCorrect(answer.correct)
      setFeedbackQuip(pickQuip(answer.correct ? 'correct' : 'wrong'))
      if (answer.correct) playCorrect()
      else playWrong()
      setPhase('checked')
      return
    }
    if (answer.correct) {
      setXp((x) => x + XP_PER_EXERCISE)
      setLastCorrect(true)
      setFeedbackQuip(pickQuip('correct'))
      correct.current.push(ex)
      playCorrect()
    } else {
      setHearts((h) => h - 1)
      setLastCorrect(false)
      setFeedbackQuip(pickQuip('wrong'))
      wrong.current.push(ex)
      playWrong()
    }
    setPhase('checked')
  }

  /**
   * L'abbinamento si chiude da solo, ma non è detto che sia andato bene:
   * insistendo si azzecca comunque. Conta i tentativi a vuoto, e se ce ne sono
   * stati l'esercizio è sbagliato come ogni altro — vita in meno, ripasso, e
   * secondo giro.
   */
  function onMatchComplete(errori: number) {
    const bene = errori === 0
    if (recupero) {
      setLastCorrect(bene)
      setPhase('checked')
      if (bene) playCorrect()
      else playWrong()
      return
    }
    if (bene) {
      setXp((x) => x + XP_PER_EXERCISE)
      correct.current.push(ex)
      playCorrect()
    } else {
      setHearts((h) => h - 1)
      wrong.current.push(ex)
      playWrong()
    }
    setLastCorrect(bene)
    setFeedbackQuip(pickQuip(bene ? 'correct' : 'wrong'))
    setPhase('checked')
  }

  // Suono di vittoria alla comparsa della schermata finale.
  useEffect(() => {
    if (finished) playWin()
  }, [finished])

  // Schermata di completamento.
  if (finished) {
    return (
      <div className="app lesson">
        <div className="end-screen win">
          <Confetti />
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
              <span className="end-stat-num">🪙 +{xp}</span>
              <span className="end-stat-label">denarii guadagnati</span>
            </div>
            <div className="end-stat">
              <span className="end-stat-num">❤️ {hearts}/{viteIniziali}</span>
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

  const progressPct = Math.round((i / total) * 100)

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
          <div
            className={`progress-fill ${recupero ? 'progress-fill--recupero' : ''}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="hearts">❤️ {hearts}</div>
      </header>

      <main className="lesson-body" key={`${recupero ? 'r' : 'p'}${i}`}>
        {recupero && (
          <p className="recupero-nota">
            🔁 Secondo giro: rifai quelle che avevi sbagliato. Qui non si
            perdono vite e non si guadagnano XP.
          </p>
        )}
        {ex.type === 'info' && <InfoCard ex={ex} />}
        {ex.type === 'table' && <TableCard ex={ex} />}
        {ex.type === 'choice' && <Choice ex={ex} disabled={phase === 'checked'} onChange={setAnswer} />}
        {ex.type === 'build' && <Build ex={ex} disabled={phase === 'checked'} onChange={setAnswer} />}
        {ex.type === 'match' && <Match ex={ex} onComplete={onMatchComplete} />}
        {ex.type === 'analysis' && (
          <Analysis ex={ex} disabled={phase === 'checked'} onChange={setAnswer} />
        )}
      </main>

      <footer
        className={`lesson-foot ${
          phase === 'checked' ? (lastCorrect ? 'foot-correct' : 'foot-wrong') : ''
        }`}
      >
        {phase === 'checked' && (!isMatch || !lastCorrect) && (
          <div className="feedback">
            {lastCorrect ? (
              <span className="fb-ok">✔ {feedbackQuip}</span>
            ) : (
              <span className="fb-no">
                <span className="fb-quip">✘ {feedbackQuip}</span>
                {ex.type === 'match' ? (
                  <span className="fb-answer">
                    Le coppie le hai trovate, ma non al primo colpo: questo
                    esercizio torna nel ripasso.
                  </span>
                ) : (
                  <span className="fb-answer">
                    Giusto:{' '}
                    <b>
                      {ex.type === 'choice'
                        ? ex.answer
                        : ex.type === 'build'
                        ? ex.answer.join(' ')
                        : ex.type === 'analysis'
                        ? ex.fields.map((f) => f.answer).join(' · ')
                        : ''}
                    </b>
                  </span>
                )}
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
            {i + 1 < total || recupero || wrong.current.length === 0 ? 'Continua' : 'Rifai gli errori'}
          </button>
        )}
      </footer>
    </div>
  )
}
