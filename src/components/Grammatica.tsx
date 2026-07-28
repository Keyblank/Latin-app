import { useMemo, useState } from 'react'
import { curriculum } from '../data/curriculum'
import type { TableExercise } from '../types'
import { TableCard } from './Exercises'
import { BottoneSegnala } from './Segnala'
import { postoDiEsercizio } from '../segnalazioni'

/** Toglie lineette e maiuscole: per cercare «rege» e trovare «rēge». */
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

interface Sezione {
  id: string
  titolo: string
  colore: string
  tabelle: TableExercise[]
}

/**
 * Il mini-manuale.
 *
 * Non duplica niente: raccoglie le tabelle che stanno già nelle lezioni, così
 * quando il corso cambia il manuale cambia con lui. Serve a chi sta traducendo
 * e ha bisogno di ricontrollare una desinenza senza rifare la lezione — che
 * poi è quello che si fa davvero con un manuale.
 */
export function Grammatica({ onBack }: { onBack: () => void }) {
  const [q, setQ] = useState('')

  const sezioni: Sezione[] = useMemo(
    () =>
      curriculum
        .map((u) => ({
          id: u.id,
          titolo: u.title,
          colore: u.color,
          tabelle: u.lessons.flatMap((l) =>
            l.exercises.filter((e): e is TableExercise => e.type === 'table'),
          ),
        }))
        .filter((s) => s.tabelle.length > 0),
    [],
  )

  // Si cerca dentro tutto: titolo, celle e nota. Chi traduce cerca una forma
  // («eius», «-ibus»), non il nome della tabella.
  const cerca = norm(q.trim())
  const filtrate: Sezione[] = useMemo(() => {
    if (!cerca) return sezioni
    return sezioni
      .map((s) => ({
        ...s,
        tabelle: s.tabelle.filter((t) =>
          norm([t.title, t.note ?? '', ...t.columns, ...t.rows.flat()].join(' ')).includes(cerca),
        ),
      }))
      .filter((s) => s.tabelle.length > 0)
  }, [sezioni, cerca])

  const [aperte, setAperte] = useState<string[]>([])
  const apri = (id: string) =>
    setAperte((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  const quante = filtrate.reduce((n, s) => n + s.tabelle.length, 0)
  const totale = sezioni.reduce((n, s) => n + s.tabelle.length, 0)

  return (
    <div className="app">
      <header className="topbar">
        <button className="close-btn" onClick={onBack} aria-label="Torna indietro">←</button>
        <span className="brand">Grammatica</span>
        <span className="gram-conta">{totale} tabelle</span>
      </header>

      <div className="gram-body">
        <div className="gram-cerca">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca una forma: eius, -ibus, amāret…"
            aria-label="Cerca nelle tabelle"
          />
          {q && (
            <button className="link-btn" onClick={() => setQ('')}>
              cancella
            </button>
          )}
        </div>

        {cerca && (
          <p className="gram-esito">
            {quante === 0
              ? 'Nessuna tabella contiene questa forma.'
              : `${quante} tabell${quante === 1 ? 'a' : 'e'} con «${q.trim()}».`}
          </p>
        )}

        {filtrate.map((s) => {
          // cercando si apre tutto da solo: nascondere i risultati sarebbe assurdo
          const aperta = cerca !== '' || aperte.includes(s.id)
          return (
            <section key={s.id} className="gram-sezione">
              <button
                className="gram-titolo"
                style={{ background: s.colore }}
                onClick={() => apri(s.id)}
                aria-expanded={aperta}
              >
                <span>{s.titolo}</span>
                <span className="gram-freccia">{aperta ? '▾' : '▸'}</span>
              </button>
              {aperta && (
                <div className="gram-tabelle">
                  {s.tabelle.map((t, i) => (
                    // Il manuale è dove le spiegazioni si rileggono a mente
                    // fredda, cioè dove è più probabile accorgersi che una
                    // nota dice una cosa storta.
                    <div key={i} className="gram-tabella">
                      <BottoneSegnala
                        posto={postoDiEsercizio(t)}
                        etichetta={`Segnala un errore in «${t.title}»`}
                      />
                      <TableCard ex={t} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
