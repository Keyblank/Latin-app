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

/** Suona una nota semplice (onda + inviluppo) all'istante `start` (in secondi). */
function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.14): void {
  const c = ctx
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  osc.connect(g)
  g.connect(c.destination)
  const t = c.currentTime + start
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.start(t)
  osc.stop(t + dur + 0.03)
}

/** Risposta corretta: due note che salgono, allegre. */
export function playCorrect(): void {
  if (!enabled || !audio()) return
  tone(660, 0, 0.12, 'triangle')
  tone(880, 0.08, 0.16, 'triangle')
}

/** Risposta sbagliata: un breve "buzz" grave. */
export function playWrong(): void {
  if (!enabled || !audio()) return
  tone(196, 0, 0.16, 'sawtooth', 0.1)
  tone(150, 0.12, 0.2, 'sawtooth', 0.1)
}

/** Lezione completata: piccola fanfara ascendente. */
export function playWin(): void {
  if (!enabled || !audio()) return
  tone(523, 0, 0.14, 'triangle')
  tone(659, 0.12, 0.14, 'triangle')
  tone(784, 0.24, 0.14, 'triangle')
  tone(1047, 0.36, 0.3, 'triangle')
}
