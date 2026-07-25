import { useState } from 'react'
import { useItalianVoices } from '../useVoices'
import {
  speak,
  speechSupported,
  getPreferredVoiceName,
  setPreferredVoice,
} from '../speak'

/** Menù per scegliere la voce della pronuncia (es. «Google italiano»). */
export function VoicePicker() {
  const voices = useItalianVoices()
  const [name, setName] = useState<string>(getPreferredVoiceName() ?? '')

  // Niente da mostrare se il browser non offre voci italiane.
  if (!speechSupported() || voices.length === 0) return null

  return (
    <div className="voice-picker">
      <span className="latin-label">Vox · voce della pronuncia</span>
      <div className="voice-row">
        <select
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setPreferredVoice(e.target.value || null)
          }}
        >
          <option value="">Automatica (migliore disponibile)</option>
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
        <button className="voice-test" onClick={() => speak('Salve! Rosa, Cicero, magnus.')}>
          ▶ Prova
        </button>
      </div>
      <span className="voice-hint">
        Suggerimento: su Google Chrome cerca una voce «Google italiano» per la resa migliore.
      </span>
    </div>
  )
}
