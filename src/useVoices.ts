import { useEffect, useState } from 'react'
import { getItalianVoices, speechSupported } from './speak'

/** Elenco reattivo delle voci italiane (si aggiorna quando il browser le carica). */
export function useItalianVoices(): SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(getItalianVoices)

  useEffect(() => {
    if (!speechSupported()) return
    const update = () => setVoices(getItalianVoices())
    update()
    window.speechSynthesis.addEventListener?.('voiceschanged', update)
    // Fallback: alcuni browser popolano le voci con un piccolo ritardo.
    const t = setTimeout(update, 600)
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', update)
      clearTimeout(t)
    }
  }, [])

  return voices
}
