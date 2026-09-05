/* Subtle UI sound engine — Web Audio, no asset files required.
   To replace with real sound files later, load an <audio> element or decodeAudioData
   buffer inside the same lazy `ensureCtx()` gate and swap playHover()/playSelect(). */

const MUTE_KEY = "strwbiezxcv-projects-sound-muted";

let ctx: AudioContext | null = null;
let muted = false;

function readMutePref(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(MUTE_KEY) === "1";
}

export function initSoundPrefs() {
  muted = readMutePref();
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    window.sessionStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* storage unavailable — session-only preference lost, non-fatal */
  }
}

/* Lazily create the AudioContext on first user gesture so autoplay policies
   are always respected — sounds can never fire before an interaction. */
function ensureCtx(): AudioContext | null {
  if (muted) return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freq: number, startDelay: number, duration: number, gain: number) {
  const audio = ensureCtx();
  if (!audio) return;
  const t0 = audio.currentTime + startDelay;
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, t0);
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(amp).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Very short, quiet tick for card hover. */
export function playHover() {
  if (muted) return;
  blip(1250, 0, 0.05, 0.025);
}

/** Slightly fuller two-note sound when switching projects. */
export function playSelect() {
  if (muted) return;
  blip(620, 0, 0.07, 0.045);
  blip(930, 0.055, 0.09, 0.045);
}
