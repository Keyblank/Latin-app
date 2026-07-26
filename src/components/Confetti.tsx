// Effetto di vittoria a tema romano: una pioggia di foglie d'alloro, oro e
// coriandoli nei colori "imperiali" (porpora + oro + verde alloro).
// Tutto animato in CSS, nessuna libreria esterna.

const COLORS = ['#e0a52e', '#6a3fb5', '#5aa15a', '#c9a227'] // oro, porpora, alloro
const EMOJI = ['🌿', '✨', '🌿', '🏛️']

export function Confetti({ count = 55 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 0.7
    const duration = 1.8 + Math.random() * 1.6
    const rot = Math.random() * 360
    const isEmoji = Math.random() < 0.4
    if (isEmoji) {
      const glyph = EMOJI[Math.floor(Math.random() * EMOJI.length)]
      return (
        <span
          key={i}
          className="confetto confetto--emoji"
          style={{
            left: `${left}%`,
            fontSize: `${13 + Math.random() * 12}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            transform: `rotate(${rot}deg)`,
          }}
        >
          {glyph}
        </span>
      )
    }
    const size = 6 + Math.random() * 8
    return (
      <span
        key={i}
        className="confetto"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size * 0.55}px`,
          background: COLORS[i % COLORS.length],
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transform: `rotate(${rot}deg)`,
        }}
      />
    )
  })
  return (
    <div className="confetti" aria-hidden="true">
      {pieces}
    </div>
  )
}
