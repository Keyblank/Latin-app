import { useRef, useState } from 'react'
import type { Progress } from '../useProgress'
import { ErroreSalvataggio, esporta, leggi, riassunto } from '../salvataggio'

/**
 * Esporta e importa i progressi.
 *
 * L'importazione cancella quello che c'è: per questo non parte al volo. Prima
 * mostra che cosa contiene il file e che cosa c'è adesso, e solo dopo si
 * conferma — perché se qualcuno sbaglia file, quello che perde sono mesi di
 * studio, e non c'è modo di tornare indietro.
 */
export function Salvataggio({
  progress,
  onImporta,
}: {
  progress: Progress
  onImporta: (p: Progress) => void
}) {
  const input = useRef<HTMLInputElement>(null)
  const [aperto, setAperto] = useState(false)
  const [errore, setErrore] = useState<string | null>(null)
  const [avviso, setAvviso] = useState<string | null>(null)
  const [inArrivo, setInArrivo] = useState<{ p: Progress; quando: string } | null>(null)

  function scarica() {
    setErrore(null)
    setInArrivo(null)
    try {
      const nome = esporta(progress)
      setAvviso(`Scaricato «${nome}». Tienilo da parte: da lì si riparte.`)
    } catch {
      setErrore('Non sono riuscito a preparare il file.')
    }
  }

  async function scelto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    // Il campo si svuota subito: così riscegliendo lo stesso file l'evento
    // scatta di nuovo.
    e.target.value = ''
    if (!file) return
    setErrore(null)
    setAvviso(null)
    try {
      const { progressi, quando } = await leggi(file)
      setInArrivo({ p: progressi, quando })
    } catch (err) {
      setInArrivo(null)
      setErrore(
        err instanceof ErroreSalvataggio ? err.message : 'Non sono riuscito a leggere il file.',
      )
    }
  }

  function conferma() {
    if (!inArrivo) return
    onImporta(inArrivo.p)
    setInArrivo(null)
    setAvviso('Progressi ripristinati.')
  }

  if (!aperto) {
    return (
      <div>
        <button className="link-btn" onClick={() => setAperto(true)}>
          Salva o ripristina i progressi
        </button>
      </div>
    )
  }

  return (
    <div className="salva-box">
      <p className="salva-intro">
        I progressi stanno solo in questo browser. Scarica un file per non
        perderli se cambi dispositivo o cancelli i dati di navigazione.
      </p>

      <div className="salva-azioni">
        <button className="salva-btn" onClick={scarica}>
          ⬇️ Esporta
        </button>
        <button className="salva-btn" onClick={() => input.current?.click()}>
          ⬆️ Importa
        </button>
      </div>
      <input
        ref={input}
        type="file"
        accept="application/json,.json"
        onChange={scelto}
        hidden
      />

      <p className="salva-ora">Adesso: {riassunto(progress)}</p>

      {avviso && <p className="salva-ok">{avviso}</p>}
      {errore && <p className="salva-no">{errore}</p>}

      {inArrivo && (
        <div className="salva-conferma">
          <p className="salva-conferma-tit">Sostituire i progressi?</p>
          <p className="salva-riga">
            <b>Nel file</b> ({inArrivo.quando}): {riassunto(inArrivo.p)}
          </p>
          <p className="salva-riga">
            <b>Adesso</b>: {riassunto(progress)}
          </p>
          <p className="salva-attenzione">
            Quello che c'è adesso viene cancellato e non si può recuperare.
          </p>
          <div className="salva-azioni">
            <button className="salva-btn salva-btn--rischio" onClick={conferma}>
              Sostituisci
            </button>
            <button className="salva-btn" onClick={() => setInArrivo(null)}>
              Annulla
            </button>
          </div>
        </div>
      )}

      <button className="link-btn" onClick={() => setAperto(false)}>
        Chiudi
      </button>
    </div>
  )
}
