import { useMemo, useState } from 'react'
import type { Memoria, Vocabolo } from '../vocabolario'
import { daRipassare, distrattori, mescola, nuoveRimasteOggi } from '../vocabolario'
import { Mascot } from './Mascot'
import { Confetti } from './Confetti'
import { SpeakButton } from './SpeakButton'
import { playCorrect, playWrong, playWin } from '../sfx'

interface Domanda {
  v: Vocabolo
  opzioni: string[]
  nuova: boolean
}

/**
 * Vocābula — il ripasso del lessico.
 *
 * Il «Repetitio» ripassa solo quello che hai sbagliato: una parola indovinata
 * per caso esce dal corso e non torna più. Qui invece ogni parola ha una sua
 * scadenza, che si allunga ogni volta che la ricordi (1, 3, 7, 16, 35, 90
 * giorni) e torna a zero quando la sbagli. È la ripetizione dilazionata: si
 * rivede poco, ma nel momento in cui stavi per dimenticare.
 */
export function Vocabula({
  memoria,
  nuoveOggi,
  lezioniFatte,
  libero,
  onFinish,
  onBack,
}: {
  memoria: Record<string, Memoria>
  nuoveOggi: { data: string; n: number }
  lezioniFatte: number
  libero: boolean
  onFinish: (esiti: Record<string, boolean>, xp: number, denarii: number) => void
  onBack: () => void
}) {
  const domande = useMemo<Domanda[]>(() => {
    const { scadute, nuove } = daRipassare(
      memoria,
      lezioniFatte,
      libero,
      nuoveRimasteOggi(nuoveOggi),
    )
    const tutte = [
      ...scadute.map((v) => ({ v, nuova: false })),
      ...nuove.map((v) => ({ v, nuova: true })),
    ]
    return mescola(tutte).map(({ v, nuova }) => ({
      v,
      nuova,
      opzioni: mescola([v.ita, ...distrattori(v)]),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [i, setI] = useState(0)
  const [scelta, setScelta] = useState<string | null>(null)
  const [esiti, setEsiti] = useState<Record<string, boolean>>({})
  const [fine, setFine] = useState(false)

  const d = domande[i]

  function rispondi(opt: string) {
    if (scelta) return
    const giusta = opt === d.v.ita
    setScelta(opt)
    setEsiti((e) => ({ ...e, [d.v.lat]: giusta }))
    giusta ? playCorrect() : playWrong()
  }

  function avanti() {
    setScelta(null)
    if (i + 1 < domande.length) {
      setI(i + 1)
      return
    }
    playWin()
    setFine(true)
  }

  // ─────────────────── niente da ripassare ───────────────────
  if (domande.length === 0) {
    return (
      <div className="app lesson">
        <div className="end-screen">
          <Mascot mood="idle" className="mascot--lg" />
          <h1 className="latin-shout">Nihil hodiē</h1>
          <p className="end-sub">Niente da ripassare, per oggi</p>
          <p className="end-quip">
            Le parole tornano quando stanno per uscirti di testa, non prima.
            Torna domani.
          </p>
          <button className="btn btn-primary" onClick={onBack}>
            Torna indietro
          </button>
        </div>
      </div>
    )
  }

  // ─────────────────── finito ───────────────────
  if (fine) {
    const giuste = Object.values(esiti).filter(Boolean).length
    const xp = giuste * 2
    const denarii = giuste
    return (
      <div className="app lesson">
        <div className="end-screen win">
          <Confetti />
          <Mascot mood={giuste >= domande.length / 2 ? 'happy' : 'sad'} className="mascot--lg" />
          <h1 className="latin-shout">Satis!</h1>
          <p className="end-sub">Ripasso del lessico</p>
          <div className="end-stats">
            <div className="end-stat">
              <span className="end-stat-num">{giuste}/{domande.length}</span>
              <span className="end-stat-label">ricordate</span>
            </div>
            <div className="end-stat">
              <span className="end-stat-num">+{xp}</span>
              <span className="end-stat-label">XP</span>
            </div>
            <div className="end-stat">
              <span className="end-stat-num">🪙 {denarii}</span>
              <span className="end-stat-label">denarii</span>
            </div>
          </div>
          <p className="versio-nota">
            Le parole ricordate torneranno più in là; quelle sbagliate domani.
          </p>
          <button className="btn btn-primary" onClick={() => onFinish(esiti, xp, denarii)}>
            Continua
          </button>
        </div>
      </div>
    )
  }

  // ─────────────────── la domanda ───────────────────
  return (
    <div className="app lesson">
      <div className="lesson-top">
        <button className="close-btn" onClick={onBack} aria-label="Chiudi">✕</button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(i / domande.length) * 100}%` }} />
        </div>
        <span className="versio-conteggio">{i + 1}/{domande.length}</span>
      </div>

      <div className="lesson-body">
        <h2 className="prompt">
          {d.nuova ? 'Parola nuova: che cosa vuol dire?' : 'Che cosa vuol dire?'}
        </h2>
        <div className="focus-word voc-parola">
          <span>{d.v.lat}</span>
          <SpeakButton text={d.v.lat} />
        </div>

        <div className="options">
          {d.opzioni.map((opt) => (
            <button
              key={opt}
              className={`option ${
                scelta && opt === d.v.ita ? 'reveal-correct' : ''
              } ${scelta === opt && opt !== d.v.ita ? 'reveal-wrong' : ''}`}
              onClick={() => rispondi(opt)}
              disabled={!!scelta}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <footer className="lesson-foot">
        <button className="btn btn-primary" disabled={!scelta} onClick={avanti}>
          {i + 1 < domande.length ? 'Avanti' : 'Finisci'}
        </button>
      </footer>
    </div>
  )
}
