/** Web Audio — interaction comfort + frontier hope. Mechanics unchanged. */

/**
 * @returns {{
 *   tone: (freq: number, dur?: number, vol?: number, type?: OscillatorType) => void,
 *   pick: () => void,
 *   drop: () => void,
 *   cancel: () => void,
 *   spark: () => void,
 *   curtain: (strong: boolean) => void,
 *   setMuted: (m: boolean) => void,
 *   isMuted: () => boolean,
 *   resume: () => void,
 * }}
 */
export function createAudio() {
  let soundOn = true;
  /** @type {AudioContext|null} */
  let actx = null;

  function ctx() {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return actx;
  }

  function resume() {
    if (!soundOn) return;
    try {
      const c = ctx();
      if (c.state === "suspended") c.resume();
    } catch {
      /* unavailable */
    }
  }

  /**
   * @param {number} freq
   * @param {number} [dur]
   * @param {number} [vol]
   * @param {OscillatorType} [type]
   */
  function tone(freq, dur = 0.06, vol = 0.1, type = "triangle") {
    if (!soundOn) return;
    try {
      resume();
      const c = ctx();
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      o.connect(g);
      g.connect(c.destination);
      o.start();
      o.stop(c.currentTime + dur);
    } catch {
      /* unavailable */
    }
  }

  function pick() {
    tone(520, 0.04, 0.06, "sine");
  }

  function drop() {
    tone(380, 0.05, 0.07, "sine");
    window.setTimeout(() => tone(480, 0.04, 0.05, "sine"), 30);
  }

  function cancel() {
    tone(260, 0.05, 0.04, "sine");
  }

  function spark() {
    tone(160, 0.1, 0.09, "triangle");
    window.setTimeout(() => tone(220, 0.08, 0.07, "triangle"), 50);
  }

  /** @param {boolean} strong */
  function curtain(strong) {
    if (strong) {
      tone(392, 0.14, 0.1, "sine");
      window.setTimeout(() => tone(587, 0.18, 0.08, "sine"), 90);
      window.setTimeout(() => tone(784, 0.22, 0.06, "sine"), 180);
    } else {
      tone(330, 0.1, 0.06, "sine");
    }
  }

  return {
    tone,
    pick,
    drop,
    cancel,
    spark,
    curtain,
    resume,
    setMuted(m) {
      soundOn = !m;
    },
    isMuted() {
      return !soundOn;
    },
  };
}
