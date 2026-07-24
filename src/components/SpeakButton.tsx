import { speak, speechSupported } from '../speak'

interface Props {
  /** Testo latino da pronunciare. */
  text: string
  /** Etichetta accessibile alternativa. */
  label?: string
}

/** Piccolo pulsante 🔊 che pronuncia una parola o frase latina. */
export function SpeakButton({ text, label }: Props) {
  if (!speechSupported()) return null
  return (
    <button
      type="button"
      className="speak-btn"
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label={`Ascolta: ${label ?? text}`}
      title="Ascolta la pronuncia"
    >
      🔊
    </button>
  )
}
