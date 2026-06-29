/** Minimal Web Audio tones — Hope Pass parity for frontier beats. */

/** @returns {{ tone: (freq: number, dur?: number, vol?: number) => void, setMuted: (m: boolean) => void, isMuted: () => boolean }} */
export function createAudio() {
  let soundOn = true;
  /** @type {AudioContext|null} */
  let actx = null;

  function tone(freq, dur = 0.06, vol = 0.1, type = "triangle") {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = vol;
      o.connect(g);
      g.connect(actx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
      o.stop(actx.currentTime + dur);
    } catch {
      /* audio unavailable */
    }
  }

  return {
    tone,
    setMuted(m) {
      soundOn = !m;
    },
    isMuted() {
      return !soundOn;
    },
  };
}
