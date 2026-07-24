import type { Progress } from '../useProgress'
import { rankInfo, DAILY_GOAL } from '../gamification'

/** Tabula: rango latino, obiettivo del giorno (Pensum diei) e giorni di fila. */
export function StatusCard({ progress }: { progress: Progress }) {
  const rank = rankInfo(progress.xp)
  const today = new Date().toISOString().slice(0, 10)
  const dailyXp = progress.dailyDate === today ? progress.dailyXp : 0
  const dailyPct = Math.min(100, Math.round((dailyXp / DAILY_GOAL) * 100))
  const dailyDone = dailyXp >= DAILY_GOAL

  return (
    <div className="status-card">
      <div className="status-rank">
        <div className="rank-medal" title={rank.current.gloss}>
          {rank.current.icon}
        </div>
        <div className="rank-info">
          <span className="latin-label">Gradvs · il tuo rango</span>
          <span className="rank-name">{rank.current.name}</span>
          <span className="rank-gloss">«{rank.current.gloss}»</span>
        </div>
        <div className="rank-xp">⭐ {progress.xp}</div>
      </div>

      <div className="rank-progress">
        <div className="rank-progress-bar">
          <div className="rank-progress-fill" style={{ width: `${Math.round(rank.progress * 100)}%` }} />
        </div>
        <span className="rank-progress-label">
          {rank.next
            ? `${rank.xpIntoRank} / ${rank.xpForNext} XP → ${rank.next.name}`
            : 'Rango massimo raggiunto!'}
        </span>
      </div>

      <div className="status-row">
        <div className={`mini-goal ${dailyDone ? 'done' : ''}`}>
          <span className="latin-label">Pensvm diei · oggi</span>
          <div className="mini-bar">
            <div className="mini-fill" style={{ width: `${dailyPct}%` }} />
          </div>
          <span className="mini-val">
            {dailyDone ? '✓ Fatto!' : `${dailyXp} / ${DAILY_GOAL} XP`}
          </span>
        </div>
        <div className="mini-streak">
          <span className="latin-label">Dies · di fila</span>
          <span className="streak-big">🔥 {progress.streak}</span>
        </div>
      </div>
    </div>
  )
}
