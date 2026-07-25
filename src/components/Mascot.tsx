// Mascotte di Ianua: un giovane romano studioso.
//
// ►► COME SOSTITUIRLA CON LA TUA IMMAGINE ◄◄
// Questo è un SEGNAPOSTO disegnato in SVG. Quando avrai le tue immagini
// (es. mascot-idle.png, mascot-happy.png, mascot-sad.png con sfondo
// trasparente), mettile in src/assets/ e sostituisci il contenuto di
// <div className="mascot ..."> con:
//   <img src={new URL(`../assets/mascot-${mood}.png`, import.meta.url).href} alt="" />
// Le animazioni (dondolio/salto/tremolio) continueranno a funzionare
// perché sono applicate al contenitore .mascot tramite la classe del mood.

interface Props {
  mood?: 'idle' | 'happy' | 'sad'
  /** Classi extra, es. 'mascot--lg'. */
  className?: string
}

const SKIN = '#f2c79f'
const HAIR = '#5b3d24'
const TOGA = '#f6f1e2'
const LEAF = '#5aa15a'
const INK = '#3a2f4a'

export function Mascot({ mood = 'idle', className = '' }: Props) {
  return (
    <div className={`mascot mascot--${mood} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
        <g stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
          {/* collo */}
          <rect x={92} y={138} width={16} height={20} rx={5} fill={SKIN} />

          {/* corpo / toga */}
          <path d="M58 244 C54 188 72 150 100 150 C128 150 146 188 142 244 Z" fill={TOGA} />
          {/* banda porpora (clavus) */}
          <path d="M100 152 L100 244" stroke="#6a3fb5" strokeWidth={9} />
          {/* orlo dorato */}
          <path d="M60 240 C80 248 120 248 140 240" stroke="#e0a52e" strokeWidth={5} fill="none" />

          {/* rotolo di pergamena tra le mani */}
          <rect x={74} y={196} width={52} height={15} rx={7} fill="#f3e8c8" />
          <circle cx={74} cy={203} r={8} fill="#eaddba" />
          <circle cx={126} cy={203} r={8} fill="#eaddba" />
          {/* manine */}
          <circle cx={70} cy={206} r={8} fill={SKIN} />
          <circle cx={130} cy={206} r={8} fill={SKIN} />

          {/* testa */}
          <circle cx={100} cy={104} r={40} fill={SKIN} />
          {/* orecchie */}
          <circle cx={61} cy={106} r={7} fill={SKIN} />
          <circle cx={139} cy={106} r={7} fill={SKIN} />
          {/* capelli (frangia) */}
          <path d="M63 96 C66 68 134 68 137 96 C120 84 118 86 100 86 C82 86 80 84 63 96 Z" fill={HAIR} />

          {/* corona d'alloro */}
          <path d="M66 84 Q100 72 134 84" stroke="#e0a52e" strokeWidth={5} fill="none" />
        </g>

        {/* foglie d'alloro */}
        <g fill={LEAF} stroke={INK} strokeWidth={2}>
          <ellipse cx={74} cy={83} rx={7} ry={3.5} transform="rotate(-35 74 83)" />
          <ellipse cx={83} cy={77} rx={7} ry={3.5} transform="rotate(-20 83 77)" />
          <ellipse cx={126} cy={83} rx={7} ry={3.5} transform="rotate(35 126 83)" />
          <ellipse cx={117} cy={77} rx={7} ry={3.5} transform="rotate(20 117 77)" />
        </g>

        {/* guance */}
        <circle cx={74} cy={118} r={6} fill="#f4a6a6" opacity={0.55} />
        <circle cx={126} cy={118} r={6} fill="#f4a6a6" opacity={0.55} />

        {/* occhi e bocca secondo l'umore */}
        {mood === 'happy' ? (
          <g fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round">
            <path d="M80 108 Q86 101 92 108" />
            <path d="M108 108 Q114 101 120 108" />
            <path d="M87 124 Q100 139 113 124 Z" fill="#b3506a" />
          </g>
        ) : mood === 'sad' ? (
          <g stroke={INK} strokeWidth={3} strokeLinecap="round">
            {/* sopracciglia tristi */}
            <path d="M80 99 L92 103" fill="none" />
            <path d="M120 99 L108 103" fill="none" />
            <ellipse cx={86} cy={112} rx={3.5} ry={5} fill={INK} stroke="none" />
            <ellipse cx={114} cy={112} rx={3.5} ry={5} fill={INK} stroke="none" />
            <path d="M91 132 Q100 125 109 132" fill="none" />
          </g>
        ) : (
          <g>
            <ellipse cx={86} cy={109} rx={4} ry={5.5} fill={INK} />
            <ellipse cx={114} cy={109} rx={4} ry={5.5} fill={INK} />
            <circle cx={87.5} cy={107} r={1.4} fill="#fff" />
            <circle cx={115.5} cy={107} r={1.4} fill="#fff" />
            <path d="M92 126 Q100 133 108 126" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  )
}
