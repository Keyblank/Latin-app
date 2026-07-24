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
  const left = useMemo(() => shuffle(ex.pairs.map((p) => p[0])), [ex])
  const right = useMemo(() => shuffle(ex.pairs.map((p) => p[1])), [ex])
  const lookup = useMemo(() => new Map(ex.pairs.map((p) => [p[0], p[1]])), [ex])

  const [selLeft, setSelLeft] = useState<string | null>(null)
  const [selRight, setSelRight] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)

  function tryMatch(l: string, r: string) {
    if (lookup.get(l) === r) {
      const next = new Set(matched)
      next.add(l)
      next.add(r)
      setMatched(next)
      setSelLeft(null)
      setSelRight(null)
      if (next.size === ex.pairs.length * 2) {
        setTimeout(onComplete, 350)
      }
    } else {
      setWrong(`${l}|${r}`)
      setTimeout(() => {
        setWrong(null)
        setSelLeft(null)
        setSelRight(null)
      }, 500)
    }
  }

  function pickLeft(l: string) {
    if (matched.has(l)) return
    setSelLeft(l)
    if (selRight) tryMatch(l, selRight)
  }
  function pickRight(r: string) {
    if (matched.has(r)) return
    setSelRight(r)
    if (selLeft) tryMatch(selLeft, r)
  }

  const cls = (v: string, sel: string | null) =>
    `match-item ${matched.has(v) ? 'matched' : ''} ${sel === v ? 'sel' : ''} ${
      wrong?.includes(v) ? 'wrong' : ''
    }`

  return (
    <div className="exercise">
      <h2 className="prompt">{ex.prompt}</h2>
      <div className="match-grid">
        <div className="match-col">
          {left.map((l) => (
            <button key={l} className={cls(l, selLeft)} onClick={() => pickLeft(l)} disabled={matched.has(l)}>
              {l}
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map((r) => (
            <button key={r} className={cls(r, selRight)} onClick={() => pickRight(r)} disabled={matched.has(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
