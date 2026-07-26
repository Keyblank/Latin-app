// Effetti sonori di gioco, sintetizzati al volo con la Web Audio API.
// Niente file audio: suoni generati dal codice → funzionano ovunque
// (anche offline, nel file singolo e su GitHub Pages).

const SFX_KEY = 'ianua-sfx'

let enabled: boolean = (() => {
  try {
    return localStorage.getItem(SFX_KEY) !== 'off'
  } catch {
    return true
  }
})()

export function sfxEnabled(): boolean {
  return enabled
}

export function setSfxEnabled(on: boolean): void {
  enabled = on
  try {
    localStorage.setItem(SFX_KEY, on ? 'on' : 'off')
  } catch {
    /* localStorage non disponibile */
  }
}

let ctx: AudioContext | null = null
function audio(): AudioContext | null {
  const AC = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
  const Ctor = AC.AudioContext || AC.webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Nota "a pizzico" di lira: attacco rapido, decadimento veloce, con armonica. */
function pluck(freq: number, start: number, dur = 0.34, peak = 0.16): void {
  const c = ctx
  if (!c) return
  const t = c.currentTime + start
  const g = c.createGain()
  g.connect(c.destination)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  const o1 = c.createOscillator()
  o1.type = 'triangle'
  o1.frequency.value = freq
  o1.connect(g)
  const o2 = c.createOscillator() // armonica (ottava) per il timbro di corda
  o2.type = 'sine'
  o2.frequency.value = freq * 2
  const g2 = c.createGain()
  g2.gain.value = 0.35
  o2.connect(g2)
  g2.connect(g)
  o1.start(t)
  o1.stop(t + dur + 0.05)
  o2.start(t)
  o2.stop(t + dur + 0.05)
}

/** Nota di ottone (corno/tuba): sawtooth filtrato, attacco morbido. */
function brass(freq: number, start: number, dur: number, peak = 0.14): void {
  const c = ctx
  if (!c) return
  const t = c.currentTime + start
  const o = c.createOscillator()
  o.type = 'sawtooth'
  o.frequency.value = freq
  const f = c.createBiquadFilter()
  f.type = 'lowpass'
  f.frequency.value = 1300
  f.Q.value = 0.7
  const g = c.createGain()
  o.connect(f)
  f.connect(g)
  g.connect(c.destination)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + 0.03)
  g.gain.setValueAtTime(peak, t + dur * 0.6)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.start(t)
  o.stop(t + dur + 0.05)
}

/** Risposta corretta: arpeggio di lira che sale. */
export function playCorrect(): void {
  if (!enabled || !audio()) return
  pluck(523, 0)
  pluck(659, 0.07)
  pluck(880, 0.14, 0.42)
}

/** Risposta sbagliata: corno grave, due note che scendono. */
export function playWrong(): void {
  if (!enabled || !audio()) return
  brass(196, 0, 0.18, 0.12)
  brass(147, 0.15, 0.3, 0.12)
}

/** Lezione completata: fanfara di trionfo (corno romano) che sale. */
export function playWin(): void {
  if (!enabled || !audio()) return
  brass(392, 0, 0.16) // Sol
  brass(523, 0.15, 0.16) // Do
  brass(659, 0.3, 0.16) // Mi
  brass(784, 0.45, 0.6, 0.15) // Sol (tenuto)
}
