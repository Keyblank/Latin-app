import { useEffect, useMemo, useState } from 'react'
import type {
  ChoiceExercise,
  BuildExercise,
  MatchExercise,
  InfoExercise,
  TableExercise,
} from '../types'
import { SpeakButton } from './SpeakButton'
import { speak } from '../speak'

/** Mescola una copia dell'array (Fisher–Yates). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export interface AnswerState {
  ready: boolean
  correct: boolean
}

// ─────────────────────────── Carta didattica ───────────────────────────

export function InfoCard({ ex }: { ex: InfoExercise }) {
  return (
    <div className="info-card">
      {ex.icon && <div className="info-icon">{ex.icon}</div>}
      <h2>{ex.title}</h2>
      {ex.body.split('\n').map((line, i) => (
        <p key={i}>{line || ' '}</p>
      ))}
    </div>
  )
}

// ─────────────────────────── Tabella grammatica ───────────────────────────

export function TableCard({ ex }: { ex: TableExercise }) {
  return (
    <div className="table-card">
      <h2 className="prompt">{ex.title}</h2>
      <div className="grammar-table-wrap">
        <table className="grammar-table">
          <thead>
            <tr>
              {ex.columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ex.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => {
                  const speakable = ex.speakCols?.includes(c) && cell
                  return (
                    <td key={c} className={c === 0 ? 'row-label' : ''}>
                      {speakable ? (
                        <button className="cell-speak" onClick={() => speak(cell)} title="Ascolta">
                          {cell} <span className="spk">🔊</span>
                        </button>
                      ) : (
                        cell
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {ex.note && <p className="table-note">{ex.note}</p>}
    </div>
  )
}

// ─────────────────────────── Scelta multipla ───────────────────────────

export function Choice({
  ex,
  disabled,
  onChange,
}: {
  ex: ChoiceExercise
  disabled: boolean
  onChange: (s: AnswerState) => void
}) {
  const options = useMemo(() => shuffle(ex.options), [ex])
  const [picked, setPicked] = useState<string | null>(null)

  function select(opt: string) {
    if (disabled) return
    setPicked(opt)
    onChange({ ready: true, correct: opt === ex.answer })
  }

  return (
    <div className="exercise">
      <h2 className="prompt">{ex.prompt}</h2>
      {ex.focus && (
        <div className="focus-word">
          <span>{ex.focus}</span>
          <SpeakButton text={ex.focus} />
        </div>
      )}
      <div className="options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`option ${picked === opt ? 'picked' : ''} ${
              disabled && opt === ex.answer ? 'reveal-correct' : ''
            } ${disabled && picked === opt && opt !== ex.answer ? 'reveal-wrong' : ''}`}
            onClick={() => select(opt)}
            disabled={disabled}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────── Costruisci la traduzione ───────────────────────

export function Build({
  ex,
  disabled,
  onChange,
}: {
  ex: BuildExercise
  disabled: boolean
  onChange: (s: AnswerState) => void
}) {
  const bank = useMemo(() => shuffle([...ex.answer, ...(ex.extra ?? [])]), [ex])
  const [chosen, setChosen] = useState<number[]>([]) // indici nel bank

  const isCorrect = useMemo(() => {
    const built = chosen.map((i) => bank[i])
    return (
      built.length === ex.answer.length &&
      built.every((w, i) => w === ex.answer[i])
    )
  }, [chosen, bank, ex])

  useEffect(() => {
    onChange({ ready: chosen.length === ex.answer.length, correct: isCorrect })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen, isCorrect])

  function add(i: number) {
    if (disabled || chosen.includes(i)) return
    setChosen((c) => [...c, i])
  }
  function remove(i: number) {
    if (disabled) return
    setChosen((c) => c.filter((x) => x !== i))
  }

  return (
    <div className="exercise">
      <h2 className="prompt">{ex.prompt}</h2>
      <div className="source-sentence">« {ex.source} »</div>

      <div className="answer-line">
        {chosen.length === 0 && <span className="placeholder">tocca le parole…</span>}
        {chosen.map((i) => (
          <button key={i} className="tile chosen" onClick={() => remove(i)} disabled={disabled}>
            {bank[i]}
          </button>
        ))}
      </div>

      <div className="word-bank">
        {bank.map((w, i) => (
          <button
            key={i}
            className={`tile ${chosen.includes(i) ? 'used' : ''}`}
            onClick={() => add(i)}
            disabled={disabled || chosen.includes(i)}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────── Abbina le coppie ───────────────────────────

export function Match({
  ex,
  onComplete,
}: {
  ex: MatchExercise
  onComplete: () => void
}) {
  // Le carte si identificano con l'INDICE della coppia, non con il testo:
  // altrimenti una coppia come «rosa → rosa» (parola uguale nelle due lingue)
  // conterebbe una volta sola e l'esercizio non si chiuderebbe mai.
  const left = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ i, text: p[0] }))), [ex])
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ i, text: p[1] }))), [ex])

  const [selLeft, setSelLeft] = useState<number | null>(null)
  const [selRight, setSelRight] = useState<number | null>(null)
  const [done, setDone] = useState<number[]>([])
  const [wrong, setWrong] = useState<[number, number] | null>(null)

  function tryMatch(l: number, r: number) {
    if (l === r) {
      const next = [...done, l]
      setDone(next)
      setSelLeft(null)
      setSelRight(null)
      if (next.length === ex.pairs.length) setTimeout(onComplete, 350)
    } else {
      setWrong([l, r])
      setTimeout(() => {
        setWrong(null)
        setSelLeft(null)
        setSelRight(null)
      }, 500)
    }
  }

  function pickLeft(l: number) {
    if (done.includes(l)) return
    setSelLeft(l)
    if (selRight !== null) tryMatch(l, selRight)
  }
  function pickRight(r: number) {
    if (done.includes(r)) return
    setSelRight(r)
    if (selLeft !== null) tryMatch(selLeft, r)
  }

  const cls = (i: number, sel: number | null, side: 0 | 1) =>
    `match-item ${done.includes(i) ? 'matched' : ''} ${sel === i ? 'sel' : ''} ${
      wrong?.[side] === i ? 'wrong' : ''
    }`

  return (
    <div className="exercise">
      <h2 className="prompt">{ex.prompt}</h2>
      <div className="match-grid">
        <div className="match-col">
          {left.map((it) => (
            <button
              key={it.i}
              className={cls(it.i, selLeft, 0)}
              onClick={() => pickLeft(it.i)}
              disabled={done.includes(it.i)}
            >
              {it.text}
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map((it) => (
            <button
              key={it.i}
              className={cls(it.i, selRight, 1)}
              onClick={() => pickRight(it.i)}
              disabled={done.includes(it.i)}
            >
              {it.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
