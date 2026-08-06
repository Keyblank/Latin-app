/**
 * Il relay delle segnalazioni: da Ianua a una issue su GitHub.
 *
 * ►► PERCHE' ESISTE ◄◄
 * Ianua e' un sito statico: per aprire una issue serve una credenziale di
 * scrittura, e una credenziale dentro un bundle pubblicato e' una credenziale
 * regalata a chiunque. Questo pezzo sta in mezzo, tiene lui il token, e apre
 * la issue per conto dell'app.
 *
 *     app  →  relay (tiene il token)  →  issue su GitHub
 *
 * Serve anche a qualcosa che si vede solo dopo: quando il repository
 * diventera' privato, il link «apri su GitHub» smettera' di funzionare per
 * chi non ha accesso. Il relay no, perche' scrive con il token dell'autore.
 *
 * ►► COME SI INSTALLA ◄◄
 * 1. dash.cloudflare.com → Compute (Workers & Pages) → Create → Worker
 * 2. incolla questo file nell'editor, Deploy
 * 3. Settings → Variables and Secrets → aggiungi il segreto GITHUB_TOKEN
 *    (fine-grained, solo il repository `ianua`, permesso «Issues: write»)
 * 4. copia l'indirizzo del Worker e mettilo in VITE_RELAY nel workflow
 *
 * Il token NON entra mai nel codice ne' nel bundle: vive solo come segreto
 * dentro Cloudflare.
 */

const REPO = 'Keyblank/ianua'

/** Da dove accettiamo richieste. Il sito, e il file singolo aperto in locale. */
const ORIGINI = ['https://keyblank.github.io', 'http://localhost:5173', 'null']

const CATEGORIE = {
  latino: 'Errore di latino',
  traduzione: 'Traduzione sbagliata',
  refuso: 'Refuso',
  confuso: 'Spiegato male',
  tecnico: 'L’app fa i capricci',
  altro: 'Altro',
}

/**
 * Limite di richieste, per indirizzo IP.
 *
 * Vive nella memoria dell'isolate, quindi non e' una barriera invalicabile:
 * Cloudflare puo' avviarne piu' d'uno, e ognuno ha il suo conteggio. Basta
 * pero' a fermare chi tempesta l'indirizzo da un solo posto, che e' il caso
 * realistico. Se un giorno servisse davvero, si passa a un KV.
 */
const MAX_PER_ORA = 20
const visite = new Map()

function troppoSpesso(ip) {
  const ora = Math.floor(Date.now() / 3_600_000)
  const chiave = `${ip}@${ora}`
  const n = (visite.get(chiave) ?? 0) + 1
  visite.set(chiave, n)
  // La mappa non cresce all'infinito: le ore vecchie si buttano.
  if (visite.size > 5000) {
    for (const k of visite.keys()) if (!k.endsWith(`@${ora}`)) visite.delete(k)
  }
  return n > MAX_PER_ORA
}

const intestazioni = (origine) => ({
  'access-control-allow-origin': ORIGINI.includes(origine) ? origine : ORIGINI[0],
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
  'access-control-max-age': '86400',
})

const risposta = (dato, stato, origine) =>
  new Response(JSON.stringify(dato), {
    status: stato,
    headers: { 'content-type': 'application/json', ...intestazioni(origine) },
  })

/**
 * Che cosa accettiamo come segnalazione.
 *
 * Non e' pignoleria: e' il filtro che distingue una segnalazione dell'app da
 * qualunque altra cosa arrivi a un indirizzo aperto sul web. Tutto quello che
 * non ha questa forma viene rifiutato prima di toccare GitHub.
 */
function leggiSegnalazione(corpo) {
  if (!corpo || typeof corpo !== 'object') return 'Corpo non valido.'
  const { id, categoria, testo, selezione, versione, posto } = corpo
  if (typeof id !== 'string' || id.length < 4 || id.length > 60) return 'id non valido.'
  if (!(categoria in CATEGORIE)) return 'categoria non valida.'
  if (typeof versione !== 'string' || versione.length > 40) return 'versione non valida.'
  if (testo != null && (typeof testo !== 'string' || testo.length > 2000)) return 'testo troppo lungo.'
  if (selezione != null && (typeof selezione !== 'string' || selezione.length > 400))
    return 'selezione troppo lunga.'
  if (!posto || typeof posto !== 'object') return 'posto mancante.'
  if (typeof posto.estratto !== 'string' || posto.estratto.length > 300) return 'estratto non valido.'
  for (const campo of ['unita', 'lezione', 'tipo']) {
    const v = posto[campo]
    if (v != null && (typeof v !== 'string' || v.length > 40)) return `${campo} non valido.`
  }
  if (posto.numero != null && (typeof posto.numero !== 'number' || posto.numero > 999))
    return 'numero non valido.'
  return null
}

const coordinata = (p) =>
  [p.unita, p.lezione, p.numero && `esercizio ${p.numero}`].filter(Boolean).join(' · ') || 'ignota'

/** Toglie i caratteri di controllo dal testo di chi segnala. Il resto
 *  passa: GitHub non esegue niente di cio' che sta in una issue. */
const sicuro = (s) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim()

function corpoIssue(s) {
  const p = s.posto
  return [
    `**Dove:** \`${coordinata(p)}\`  ·  **tipo:** ${p.tipo ?? '—'}  ·  **versione:** \`${s.versione}\``,
    '',
    `> ${sicuro(p.estratto)}`,
    ...(s.selezione ? ['', '**Sul punto:**', `> ${sicuro(s.selezione)}`] : []),
    '',
    '---',
    '',
    sicuro(s.testo) || '_(nessun commento)_',
    '',
    '<sub>Arrivata dal ⚑ dentro l’app.</sub>',
    '',
    `<!-- ianua:${s.id} -->`,
  ].join('\n')
}

export default {
  async fetch(richiesta, env) {
    const origine = richiesta.headers.get('origin') ?? ''

    if (richiesta.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: intestazioni(origine) })
    }
    if (richiesta.method !== 'POST') {
      return risposta({ errore: 'Solo POST.' }, 405, origine)
    }
    if (origine && !ORIGINI.includes(origine)) {
      return risposta({ errore: 'Origine non ammessa.' }, 403, origine)
    }
    if (!env.GITHUB_TOKEN) {
      return risposta({ errore: 'Relay non configurato: manca GITHUB_TOKEN.' }, 500, origine)
    }

    const ip = richiesta.headers.get('cf-connecting-ip') ?? 'ignoto'
    if (troppoSpesso(ip)) {
      return risposta({ errore: 'Troppe segnalazioni in poco tempo. Riprova fra un’ora.' }, 429, origine)
    }

    let corpo
    try {
      corpo = await richiesta.json()
    } catch {
      return risposta({ errore: 'JSON non valido.' }, 400, origine)
    }

    const problema = leggiSegnalazione(corpo)
    if (problema) return risposta({ errore: problema }, 400, origine)

    const titolo =
      `[${coordinata(corpo.posto)}] ${CATEGORIE[corpo.categoria]} — ${sicuro(corpo.posto.estratto)}`
        .slice(0, 200)

    const r = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'content-type': 'application/json',
        'user-agent': 'ianua-segnalazioni',
      },
      body: JSON.stringify({
        title: titolo,
        body: corpoIssue(corpo),
        labels: ['segnalazione', corpo.categoria],
      }),
    })

    if (!r.ok) {
      // Il dettaglio resta nei log del Worker: a chi segnala non serve, e
      // rivelarlo direbbe a un estraneo com'e' fatto il repository.
      console.error('GitHub ha risposto', r.status, await r.text())
      return risposta({ errore: 'GitHub non ha accettato la segnalazione.' }, 502, origine)
    }

    const issue = await r.json()
    return risposta({ numero: issue.number, url: issue.html_url }, 201, origine)
  },
}
