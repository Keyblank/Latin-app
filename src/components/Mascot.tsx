// Mascotte di Ianua: un busto di marmo romano... con parecchia attitudine.
//
// ►► COME SOSTITUIRLA CON LA TUA IMMAGINE ◄◄
// Questo è un SEGNAPOSTO in SVG. Quando avrai le tue immagini (es.
// mascot-idle.png, mascot-happy.png, mascot-sad.png con sfondo trasparente),
// mettile in src/assets/ e sostituisci l'<svg>...</svg> qui sotto con:
//   <img src={new URL(`../assets/mascot-${mood}.png`, import.meta.url).href} alt="" />
// Le animazioni (dondolio/salto/tremolio) continuano a funzionare, perché
// applicate al contenitore .mascot tramite la classe del mood.

interface Props {
  mood?: 'idle' | 'happy' | 'sad'
  /** Classi extra, es. 'mascot--lg'. */
  className?: string
}

const M_LIGHT = '#ece9e2'
const M_MID = '#d8d3c8'
const M_LINE = '#b4aea1'
const INK = '#4a4640'
const LEAF = '#5aa15a'
const GOLD = '#e0a52e'

export function Mascot({ mood = 'idle', className = '' }: Props) {
  return (
    <div className={`mascot mascot--${mood} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
        {/* piedistallo */}
        <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
          <rect x={54} y={228} width={92} height={18} rx={3} fill={M_MID} />
          <rect x={47} y={219} width={106} height={12} rx={3} fill={M_LIGHT} />
        </g>

        {/* busto / spalle */}
        <path
          d="M50 224 C50 182 74 162 100 162 C126 162 150 182 150 224 Z"
          fill={M_LIGHT}
          stroke={INK}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* pieghe della toga */}
        <g stroke={M_LINE} strokeWidth={2.5} fill="none" strokeLinecap="round">
          <path d="M70 200 Q100 188 130 200" />
          <path d="M78 214 Q100 206 122 214" />
          <path d="M66 182 L112 216" />
        </g>

        {/* collo */}
        <path d="M88 150 h24 v18 h-24 Z" fill={M_LIGHT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {/* testa */}
        <ellipse cx={100} cy={110} rx={40} ry={44} fill={M_LIGHT} stroke={INK} strokeWidth={3} />
        {/* orecchie */}
        <ellipse cx={61} cy={114} rx={6} ry={9} fill={M_LIGHT} stroke={INK} strokeWidth={3} />
        <ellipse cx={139} cy={114} rx={6} ry={9} fill={M_LIGHT} stroke={INK} strokeWidth={3} />

        {/* capelli scolpiti (ricci) */}
        <path
          d="M58 112 C52 74 148 74 142 112 C144 96 150 82 100 78 C50 82 56 96 58 112 Z"
          fill={M_MID}
          stroke={INK}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <g fill={M_MID} stroke={INK} strokeWidth={2.5}>
          <circle cx={72} cy={96} r={9} />
          <circle cx={86} cy={89} r={10} />
          <circle cx={100} cy={86} r={10} />
          <circle cx={114} cy={89} r={10} />
          <circle cx={128} cy={96} r={9} />
        </g>

        {/* corona d'alloro */}
        <path d="M64 88 Q100 74 136 88" stroke={GOLD} strokeWidth={5} fill="none" strokeLinecap="round" />
        <g fill={LEAF} stroke={INK} strokeWidth={2}>
          <ellipse cx={72} cy={86} rx={7} ry={3.5} transform="rotate(-35 72 86)" />
          <ellipse cx={82} cy={80} rx={7} ry={3.5} transform="rotate(-20 82 80)" />
          <ellipse cx={128} cy={86} rx={7} ry={3.5} transform="rotate(35 128 86)" />
          <ellipse cx={118} cy={80} rx={7} ry={3.5} transform="rotate(20 118 80)" />
        </g>

        {/* crepe da statua */}
        <g stroke={M_LINE} strokeWidth={1.6} fill="none" strokeLinecap="round">
          <path d="M122 104 l7 12 l-4 7" />
          <path d="M78 100 l-5 9" />
        </g>

        {/* naso classico (un po' sbeccato) */}
        <path d="M100 104 L94 130 Q100 134 106 130 Z" fill={M_LIGHT} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M100 126 l6 4 l-3 3 z" fill={M_MID} />

        {/* volto secondo l'umore */}
        {mood === 'happy' ? (
          <g stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round">
            <path d="M78 98 Q86 94 94 98" />
            <path d="M106 95 Q114 91 122 96" />
            <path d="M80 111 Q86 107 92 111" />
            <path d="M108 111 Q114 107 120 111" />
            <path d="M85 137 Q104 150 119 134" />
          </g>
        ) : mood === 'sad' ? (
          <g stroke={INK} strokeWidth={3} strokeLinecap="round">
            <path d="M78 101 L94 101" fill="none" />
            <path d="M106 97 Q114 95 122 99" fill="none" />
            {/* pupille all'insù: occhi al cielo */}
            <ellipse cx={86} cy={108} rx={4} ry={5} fill={INK} stroke="none" />
            <ellipse cx={114} cy={108} rx={4} ry={5} fill={INK} stroke="none" />
            <path d="M90 140 Q102 136 116 140" fill="none" />
          </g>
        ) : (
          <g stroke={INK} strokeWidth={3} strokeLinecap="round">
            {/* sopracciglio destro alzato: scetticismo */}
            <path d="M78 100 Q86 97 94 100" fill="none" />
            <path d="M106 96 Q114 92 122 97" fill="none" />
            <ellipse cx={86} cy={112} rx={4} ry={5} fill={INK} stroke="none" />
            <ellipse cx={114} cy={112} rx={4} ry={5} fill={INK} stroke="none" />
            {/* sorrisetto storto */}
            <path d="M90 140 Q104 144 116 137" fill="none" />
          </g>
        )}
      </svg>
    </div>
  )
}
