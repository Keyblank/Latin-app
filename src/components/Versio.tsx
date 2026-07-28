import { useMemo, useState } from 'react'
import type { Versio as VersioType } from '../data/versiones'
import { SpeakButton } from './SpeakButton'
import { Mascot } from './Mascot'
import { Confetti } from './Confetti'
import { playCorrect, playWin } from '../sfx'
import { BottoneSegnala } from './Segnala'
import { postoDiVersione } from '../segnalazioni'

/** Spezza una frase latina in parole e punteggiatura, senza perdere niente. */
function tokenize(frase: string): string[] {
  return frase.split(/(\s+|[.,;:!?«»])/).filter((t) => t !== '')
}

const isParola = (t: string) => /[a-zA-ZāēīōūĀĒĪŌŪ]/.test(t)

/**
 * Una versione da tradurre.
 *
 * Funziona come il quaderno: leggi la frase latina, tocchi le parole che non
 * conosci (il vocabolario ce l'hai, come all'esame), e solo dopo aver provato
 * scopri la traduzione. Si procede una frase alla volta perché è così che si
 * traduce davvero — il senso si costruisce, non si legge tutto insieme.
 */
export function Versio({
  versio,
  onFinish,
  onBack,
}: {
  versio: VersioType
  onFinish: (xp: number, denarii: number) => void
  onBack: () => void
}) {
  const [fase, setFase] = useState<'intro' | 'lettura' | 'fine'>('intro')
  const [i, setI] = useState(0)
  const [scoperte, setScoperte] = useState<number[]>([])
  const [parola, setParola] = useState<string | null>(null)
  /** Quante parole ha cercato: non è un voto, è un dato su di sé. */
  const [aiuti, setAiuti] = useState(0)

  const frase = versio.frasi[i]
  const vista = scoperte.includes(i)
  const tokens = useMemo(() => tokenize(frase?.lat ?? ''), [frase])
  const gloss = parola ? versio.parole[parola] : null

  const xp = 15 + versio.frasi.length * 3
  const denarii = 20 + versio.frasi.length * 2

  function tocca(t: string) {
    if (!versio.parole[t]) return
    setParola(parola === t ? null : t)
    if (parola !== t) setAiuti((n) => n + 1)
  }

  function scopri() {
    setScoperte((s) => [...s, i])
    setParola(null)
    playCorrect()
  }

  function avanti() {
    setParola(null)
    if (i + 1 < versio.frasi.length) {
      setI(i + 1)
      return
    }
    playWin()
    setFase('fine')
  }

  // ─────────────────── prima di cominciare ───────────────────
  if (fase === 'intro') {
    return (
      <div className="app lesson">
        <div className="lesson-top">
          <button className="close-btn" onClick={onBack} aria-label="Chiudi">✕</button>
          <span className="versio-livello">{versio.livello}</span>
        </div>
        <div className="lesson-body">
          <div className="info-card">
            <div className="info-icon">{versio.icona}</div>
            <h2>{versio.titolo}</h2>
            <div className="info-body">
              <p className="versio-fonte">{versio.fonte}</p>
              <p>{versio.intro}</p>
              <p className="versio-etichetta">Cosa mette alla prova</p>
              <ul className="info-list">
                {versio.costrutti.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="versio-nota">
                {versio.frasi.length} frasi. Tocca le parole che non conosci: il
                vocabolario ce l’hai, come all’esame.
              </p>
            </div>
          </div>
        </div>
        <footer className="lesson-foot">
          <button className="btn btn-primary" onClick={() => setFase('lettura')}>
            Comincia
          </button>
        </footer>
      </div>
    )
  }

  // ─────────────────── finito ───────────────────
  if (fase === 'fine') {
    return (
      <div className="app lesson">
        <div className="end-screen win">
          <Confetti />
          <Mascot mood="happy" className="mascot--lg" />
          <h1 className="latin-shout">Explicit!</h1>
          <p className="end-sub">Versione completata</p>
          <p className="end-lesson-name">{versio.icona} {versio.titolo}</p>
          <div className="end-stats">
            <div className="end-stat">
              <span className="end-stat-num">+{xp}</span>
              <span className="end-stat-label">XP guadagnati</span>
            </div>
            <div className="end-stat">
              <span className="end-stat-num">🪙 {denarii}</span>
              <span className="end-stat-label">denarii</span>
            </div>
            <div className="end-stat">
              <span className="end-stat-num">{aiuti}</span>
              <span className="end-stat-label">parole cercate</span>
            </div>
          </div>
          <p className="versio-nota">
            Rileggilo fra qualche giorno senza toccare niente: è lì che si vede
            se è entrato.
          </p>
          <button className="btn btn-primary" onClick={() => onFinish(xp, denarii)}>
            Continua
          </button>
        </div>
      </div>
    )
  }

  // ─────────────────── la lettura ───────────────────
  return (
    <div className="app lesson">
      <div className="lesson-top">
        <button className="close-btn" onClick={onBack} aria-label="Chiudi">✕</button>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((i + (vista ? 1 : 0)) / versio.frasi.length) * 100}%` }}
          />
        </div>
        <span className="versio-conteggio">
          {i + 1}/{versio.frasi.length}
        </span>
        <BottoneSegnala
          posto={postoDiVersione(versio.id, versio.titolo, versio.frasi[i].lat)}
        />
      </div>

      <div className="lesson-body">
        <div className="versio-latino">
          <p className="versio-frase">
            {tokens.map((t, k) =>
              isParola(t) && versio.parole[t] ? (
                <button
                  key={k}
                  className={`versio-parola ${parola === t ? 'aperta' : ''}`}
                  onClick={() => tocca(t)}
                >
                  {t}
                </button>
              ) : (
                <span key={k}>{t}</span>
              ),
            )}
          </p>
          <div className="versio-ascolta">
            <SpeakButton text={frase.lat} />
          </div>
        </div>

        {gloss ? (
          <div className="versio-gloss">
            <div className="gloss-lemma">{gloss.lemma}</div>
            <div className="gloss-senso">{gloss.senso}</div>
            {gloss.forma && <div className="gloss-forma">{gloss.forma}</div>}
          </div>
        ) : (
          !vista && <p className="versio-nota">Tocca una parola per il suo aiuto.</p>
        )}

        {vista && (
          <div className="versio-soluzione">
            <div className="versio-etichetta">traduzione</div>
            <p className="soluzione-ita">{frase.ita}</p>
            {frase.nota && <p className="table-note">{frase.nota}</p>}
          </div>
        )}
      </div>

      <footer className="lesson-foot">
        {vista ? (
          <button className="btn btn-primary" onClick={avanti}>
            {i + 1 < versio.frasi.length ? 'Frase successiva' : 'Ho finito'}
          </button>
        ) : (
          <button className="btn btn-reveal" onClick={scopri}>
            Ho provato: mostra la traduzione
          </button>
        )}
      </footer>
    </div>
  )
}
