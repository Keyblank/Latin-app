// Coriandoli per la schermata "Optime!". Pezzetti colorati generati con
// posizioni/tempi casuali e animati in CSS (nessuna libreria esterna).

const COLORS = ['#6a3fb5', '#e0a52e', '#4caf50', '#1cb0f6', '#ff4b4b', '#ce82ff']

export function Confetti({ count = 60 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 0.6
    const duration = 1.6 + Math.random() * 1.4
    const color = COLORS[i % COLORS.length]
    const size = 6 + Math.random() * 8
    const rot = Math.random() * 360
    return (
      <span
        key={i}
        className="confetto"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size * 0.6}px`,
          background: color,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transform: `rotate(${rot}deg)`,
        }}
      />
    )
  })
  return <div className="confetti" aria-hidden="true">{pieces}</div>
}
