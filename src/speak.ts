// Audio di pronuncia tramite la sintesi vocale del browser (Web Speech API).
// Usa una voce ITALIANA per leggere il latino: resa vicina alla pronuncia
// ecclesiastica/italiana, senza costi né backend.
// Preferisce automaticamente le voci di qualità (es. «Google italiano»),
// ma l'utente può sceglierne una specifica.

const VOICE_KEY = 'ianua-voice'

const MACRONS: Record<string, string> = {
  ā: 'a', ē: 'e', ī: 'i', ō: 'o', ū: 'u', ȳ: 'y',
  Ā: 'A', Ē: 'E', Ī: 'I', Ō: 'O', Ū: 'U', Ȳ: 'Y',
}

function stripMacrons(text: string): string {
  return text.replace(/[āēīōūȳĀĒĪŌŪȲ]/g, (c) => MACRONS[c] ?? c)
}

/**
 * Riscrive il latino in una grafia che la voce ITALIANA legge alla
 * «ecclesiastica». La voce legge "come è scritto", quindi correggiamo la
 * scrittura prima di darla in pasto alla sintesi vocale:
 *   ae, oe → e      (caelum → celum → «chélum»; rosae → «rose»)
 *   ph → f, th → t, ch → k   (philosophia → filosofia; pulcher → pulker)
 *   ti + vocale → zi (tranne dopo s, t, x)   (natio → nazio; gratia → grazia)
 *   y → i,  h muta → via   (hora → ora)
 * Il testo MOSTRATO non cambia: si trasforma solo ciò che viene pronunciato.
 */
export function toEcclesiastical(text: string): string {
  let t = stripMacrons(text).replace(/[«»·]/g, ' ').toLowerCase()
  t = t.replace(/ph/g, 'f').replace(/th/g, 't').replace(/ch/g, 'k')
  t = t.replace(/ae/g, 'e').replace(/oe/g, 'e')
  t = t.replace(/y/g, 'i')
  t = t.replace(/(?<![stx])ti(?=[aeiou])/g, 'zi')
  t = t.replace(/h/g, '')
  return t.replace(/\s+/g, ' ').trim()
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Tutte le voci italiane disponibili sul dispositivo. */
export function getItalianVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported()) return []
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('it'))
}

/** Punteggio di qualità: più alto = voce migliore. */
function scoreVoice(v: SpeechSynthesisVoice): number {
  const n = v.name.toLowerCase()
  let s = 0
  if (n.includes('google')) s += 100
  if (/natural|neural|enhanced|premium|wavenet/.test(n)) s += 50
  if (v.localService === false) s += 10 // le voci online sono di solito migliori
  return s
}

let preferredName: string | null = (() => {
  try {
    return localStorage.getItem(VOICE_KEY)
  } catch {
    return null
  }
})()

export function getPreferredVoiceName(): string | null {
  return preferredName
}

/** Imposta la voce scelta (o null per «automatica»). */
export function setPreferredVoice(name: string | null): void {
  preferredName = name && name.length > 0 ? name : null
  try {
    if (preferredName) localStorage.setItem(VOICE_KEY, preferredName)
    else localStorage.removeItem(VOICE_KEY)
  } catch {
    /* localStorage non disponibile: ignora */
  }
}

/** La voce da usare: quella scelta, altrimenti la migliore italiana. */
function chosenVoice(): SpeechSynthesisVoice | null {
  const italian = getItalianVoices()
  if (italian.length === 0) return null
  if (preferredName) {
    const found = italian.find((v) => v.name === preferredName)
    if (found) return found
  }
  return [...italian].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]
}

// Alcuni browser caricano l'elenco delle voci in modo asincrono.
if (speechSupported()) {
  window.speechSynthesis.getVoices()
}

/** Pronuncia un testo latino con voce italiana. */
export function speak(text: string): void {
  if (!speechSupported()) return
  const synth = window.speechSynthesis
  synth.cancel() // interrompe eventuale audio in corso
  const utter = new SpeechSynthesisUtterance(toEcclesiastical(text))
  const voice = chosenVoice()
  utter.lang = voice?.lang ?? 'it-IT'
  try {
    if (voice) utter.voice = voice
  } catch {
    /* alcuni ambienti rifiutano l'assegnazione: si usa comunque la lingua */
  }
  utter.rate = 0.9 // un po' più lento, per imparare
  utter.pitch = 1
  synth.speak(utter)
}
