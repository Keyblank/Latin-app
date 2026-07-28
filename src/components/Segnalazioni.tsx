import { useState } from 'react'
import {
  coordinata,
  esportaSegnalazioni,
  leggiSegnalazioni,
  manda,
  svuota,
  testoDiTutte,
  CATEGORIE,
} from '../segnalazioni'

/**
 * Il quaderno delle segnalazioni fatte da questo dispositivo.
 *
 * Ogni segnalazione viene già mandata quando si scrive. Questo pannello serve
 * per due casi che capitano davvero: chi ha chiuso il foglio di condivisione
 * senza mandare niente, e chi ne ha accumulate dieci in una sessione e
 * preferisce spedirle in blocco a fine giro.
 */
export function Segnalazioni() {
  const [aperto, setAperto] = useState(false)
  const [lista, setLista] = useState(leggiSegnalazioni)
  const [avviso, setAvviso] = useState<string | null>(null)

  if (!aperto) {
    return (
      <div>
        <button
          className="link-btn"
          onClick={() => {
            setLista(leggiSegnalazioni())
            setAperto(true)
          }}
        >
          Segnalazioni{lista.length ? ` (${lista.length})` : ''}
        </button>
      </div>
    )
  }

  const icona = (c: string) => CATEGORIE.find((x) => x.id === c)?.icona ?? '💬'

  async function mandaTutte() {
    const come = await manda(testoDiTutte(lista), `Segnalazioni Ianua (${lista.length})`)
    setAvviso(
      come === 'condiviso'
        ? 'Mandate tutte.'
        : come === 'copiato'
        ? 'Copiate negli appunti: incollale dove vuoi.'
        : 'Non sono riuscito a passarle a un’altra app: prova a scaricarle.',
    )
  }

  return (
    <div className="salva-box">
      <p className="salva-intro">
        Quello che hai segnalato mentre studiavi. Ogni voce porta con sé la
        posizione esatta dell’esercizio, così chi corregge la trova al primo
        colpo.
      </p>

      {lista.length === 0 ? (
        <p className="segnala-vuoto">
          Ancora niente. Il pulsante ⚑ sta in alto a destra dentro ogni
          esercizio.
        </p>
      ) : (
        <>
          <ul className="segnala-lista">
            {lista
              .slice()
              .reverse()
              .map((s) => (
                <li key={s.id}>
                  <span className="segnala-lista-ico">{icona(s.categoria)}</span>
                  <span className="segnala-lista-testo">
                    <b>{coordinata(s.posto)}</b>
                    <span className="segnala-lista-estratto">{s.posto.estratto}</span>
                    {s.testo && <em>«{s.testo}»</em>}
                  </span>
                </li>
              ))}
          </ul>

          <div className="salva-azioni">
            <button className="salva-btn" onClick={mandaTutte}>
              📤 Mandale tutte
            </button>
            <button
              className="salva-btn"
              onClick={() => setAvviso(`Scaricato «${esportaSegnalazioni(lista)}».`)}
            >
              ⬇️ Scarica
            </button>
          </div>
          <button
            className="link-btn"
            onClick={() => {
              svuota()
              setLista([])
              setAvviso('Quaderno svuotato.')
            }}
          >
            Svuota il quaderno
          </button>
        </>
      )}

      {avviso && <p className="salva-ok">{avviso}</p>}

      <button className="link-btn" onClick={() => setAperto(false)}>
        Chiudi
      </button>
    </div>
  )
}
