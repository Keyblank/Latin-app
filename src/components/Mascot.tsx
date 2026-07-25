// Mascotte di Ianua: un busto di marmo romano con attitudine.
//
// Le immagini sono in src/assets/ (mascot-idle/happy/sad.png, sfondo
// trasparente). Per ora i tre file possono essere identici: quando avrai
// le espressioni "felice" e "infastidita", basta sostituire i rispettivi
// file mantenendo lo stesso nome. Le animazioni (dondolio/salto/tremolio)
// sono applicate al contenitore .mascot in base al mood.

interface Props {
  mood?: 'idle' | 'happy' | 'sad'
  /** Classi extra, es. 'mascot--lg'. */
  className?: string
}

const IMAGES: Record<NonNullable<Props['mood']>, string> = {
  idle: new URL('../assets/mascot-idle.png', import.meta.url).href,
  happy: new URL('../assets/mascot-happy.png', import.meta.url).href,
  sad: new URL('../assets/mascot-sad.png', import.meta.url).href,
}

export function Mascot({ mood = 'idle', className = '' }: Props) {
  return (
    <div className={`mascot mascot--${mood} ${className}`} aria-hidden="true">
      <img src={IMAGES[mood]} alt="" />
    </div>
  )
}
