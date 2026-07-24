// Audio di pronuncia tramite la sintesi vocale del browser (Web Speech API).
// Usa una voce ITALIANA per leggere il latino: resa vicina alla pronuncia
// ecclesiastica/italiana, senza costi né backend.

const MACRONS: Record<string, string> = {
  ā: 'a', ē: 'e', ī: 'i', ō: 'o', ū: 'u', ȳ: 'y',
  Ā: 'A', Ē: 'E', Ī: 'I', Ō: 'O', Ū: 'U', Ȳ: 'Y',
}

/** Toglie i segni di lunga (rosā → rosa) e simboli: la voce legge meglio. */
function normalize(text: string): string {
  return text
    .replace(/[āēīōūȳĀĒĪŌŪȲ]/g, (c) => MACRONS[c] ?? c)
    .replace(/[«»·]/g, ' ')
    .trim()
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

let italianVoice: SpeechSynthesisVoice | null = null

function pickVoice(): SpeechSynthesisVoice | null {
  if (!speechSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  italianVoice =
    voices.find((v) => /^it($|[-_])/i.test(v.lang)) ??
    voices.find((v) => v.lang.toLowerCase().startsWith('it')) ??
    null
  return italianVoice
}

if (speechSupported()) {
  // L'elenco delle voci può caricarsi in modo asincrono.
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
}

/** Pronuncia un testo latino con voce italiana. */
export function speak(text: string): void {
  if (!speechSupported()) return
  const synth = window.speechSynthesis
  synth.cancel() // interrompe eventuale audio in corso
  const utter = new SpeechSynthesisUtterance(normalize(text))
  utter.lang = 'it-IT'
  const voice = italianVoice ?? pickVoice()
  if (voice) utter.voice = voice
  utter.rate = 0.9 // un po' più lento, per imparare
  utter.pitch = 1
  synth.speak(utter)
}
