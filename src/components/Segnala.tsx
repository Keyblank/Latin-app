import { useState } from 'react'
import {
  CATEGORIE,
  aggiungi,
  coordinata,
  leggiSegnalazioni,
  manda,
  testoDi,
  type Categoria,
  type Posto,
} from '../segnalazioni'

/**
 * Il pulsante ⚑ e il foglio che apre.
 *
 * Due regole di forma, e sono quelle che decidono se verrà usato o no:
 *
 * 1. **Non chiede niente che si possa dedurre.** Non «in quale esercizio?»,
 *    non «in quale unità?»: quello lo sa già l'app. Chi segnala deve solo dire
 *    che cosa non va.
 * 2. **Si può mandare a vuoto.** Il testo non è obbligatorio: una categoria e
 *    via. Meglio dieci segnalazioni scarne che una sola perfetta, perché la
 *    coordinata basta per andare a guardare.
 *
 * Il foglio si può aprire in mezzo a un esercizio senza perdere la risposta:
 * sta sopra, non naviga da nessuna parte.
 */
export function BottoneSegnala({ posto, etichetta }: { posto: Posto; etichetta?: string }) {
  const [aperto, setAperto] = useState(false)
  const [selezione, setSelezione] = useState('')
  // Finché non è mai stato usato porta la sua etichetta: una bandierina muta
  // in mezzo alle icone non la nota nessuno, e un pulsante che nessuno nota
  // vale come non averlo messo. Alla prima segnalazione si fa da parte.
  const [maiUsato, setMaiUsato] = useState(() => leggiSegnalazioni().length === 0)

  return (
    <>
      <button
        className={`segnala-apri ${maiUsato ? 'segnala-apri--nuovo' : ''}`}
        // Su una scheda lunga «Scheda "Il participio perfetto"» non basta a
        // capire dove guardare. Se prima di toccare il ⚑ si è evidenziata la
        // frase incriminata, quella frase viaggia insieme alla segnalazione.
        // Va letta PRIMA del click, che portando via il fuoco cancella la
        // selezione.
        onPointerDown={() =>
          setSelezione((window.getSelection()?.toString() ?? '').replace(/\s+/g, ' ').trim().slice(0, 300))
        }
        onClick={() => setAperto(true)}
        aria-label={etichetta ?? 'Segnala un errore'}
        title={etichetta ?? 'Segnala un errore'}
      >
        ⚑{maiUsato && <span className="segnala-apri-testo">Segnala</span>}
      </button>
      {aperto && (
        <FoglioSegnala
          posto={posto}
          selezione={selezione}
          onChiudi={() => setAperto(false)}
          onMandata={() => setMaiUsato(false)}
        />
      )}
    </>
  )
}

function FoglioSegnala({
  posto,
  selezione,
  onChiudi,
  onMandata,
}: {
  posto: Posto
  selezione: string
  onChiudi: () => void
  onMandata: () => void
}) {
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [testo, setTesto] = useState('')
  const [esito, setEsito] = useState<string | null>(null)
  const [inCorso, setInCorso] = useState(false)

  async function invia() {
    if (!categoria || inCorso) return
    setInCorso(true)
    const s = aggiungi(categoria, testo, posto, selezione || undefined)
    onMandata()
    const come = await manda(testoDi(s))
    setInCorso(false)
    setEsito(
      come === 'condiviso'
        ? 'Mandata. Grazie: questa la sistemiamo.'
        : come === 'copiato'
        ? 'Copiata negli appunti — incollala dove vuoi e mandamela.'
        : 'Segnata. È salvata nell’app: la ritrovi in «Segnalazioni» dalla schermata iniziale.',
    )
  }

  return (
    <div className="segnala-velo" onClick={onChiudi}>
      <div className="segnala-foglio" onClick={(e) => e.stopPropagation()}>
        {esito ? (
          <>
            <p className="segnala-fatto">✅ {esito}</p>
            <button className="btn btn-primary" onClick={onChiudi}>
              Torna all’esercizio
            </button>
          </>
        ) : (
          <>
            <div className="segnala-testa">
              <h2>Che cosa non va?</h2>
              <button className="close-btn" onClick={onChiudi} aria-label="Chiudi">
                ✕
              </button>
            </div>

            <p className="segnala-dove">
              <span className="segnala-dove-coord">{coordinata(posto)}</span>
              <span className="segnala-dove-testo">{posto.estratto}</span>
              {selezione && <span className="segnala-dove-sel">«{selezione}»</span>}
            </p>

            <div className="segnala-categorie">
              {CATEGORIE.map((c) => (
                <button
                  key={c.id}
                  className={`segnala-cat ${categoria === c.id ? 'scelta' : ''}`}
                  onClick={() => setCategoria(c.id)}
                >
                  <span className="segnala-cat-ico">{c.icona}</span>
                  {c.etichetta}
                </button>
              ))}
            </div>

            <textarea
              className="segnala-testo"
              rows={3}
              placeholder={
                selezione
                  ? 'Facoltativo: che cosa non torna in questo pezzo?'
                  : 'Facoltativo: due parole su cosa hai notato.'
              }
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
            />

            <button
              className="btn btn-primary"
              disabled={!categoria || inCorso}
              onClick={invia}
            >
              {categoria ? 'Manda la segnalazione' : 'Scegli il tipo di problema'}
            </button>
            <p className="segnala-nota">
              {selezione
                ? 'Parte insieme al pezzo che hai evidenziato e alla posizione esatta: così si trova al primo colpo.'
                : 'Parte insieme alla posizione esatta di questo esercizio. Se il problema è in un punto preciso di una spiegazione, evidenzia quella frase prima di toccare ⚑ e te la porta dietro.'}{' '}
              Niente altro: nessun dato tuo, e non passa da nessun server.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
