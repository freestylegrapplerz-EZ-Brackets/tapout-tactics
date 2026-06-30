/** Web Audio — room comfort + frontier hope. Mechanics unchanged. */

/**
 * @returns {{
 *   tone: (freq: number, dur?: number, vol?: number, type?: OscillatorType) => void,
 *   pick: () => void,
 *   drop: () => void,
 *   cancel: () => void,
 *   spark: () => void,
 *   frontierHit: (el: string, chain: number, total: number, arc: boolean) => void,
 *   curtain: (strong: boolean) => void,
 *   startRoom: () => void,
 *   stopRoom: () => void,
 *   setMuted: (m: boolean) => void,
 *   isMuted: () => boolean,
 *   resume: () => void,
 * }}
 */
export function createAudio() {
  let soundOn = true;
  /** @type {AudioContext|null} */
  let actx = null;
  /** @type {OscillatorNode|null} */
  let roomOsc = null;
  /** @type {GainNode|null} */
  let roomGain = null;

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

  function stopRoom() {
    try {
      roomOsc?.stop();
    } catch {
      /* already stopped */
    }
    roomOsc = null;
    roomGain = null;
  }

  function startRoom() {
    if (!soundOn || roomOsc) return;
    try {
      resume();
      const c = ctx();
      roomOsc = c.createOscillator();
      roomGain = c.createGain();
      roomOsc.type = "sine";
      roomOsc.frequency.value = 92;
      roomGain.gain.value = 0.012;
      roomOsc.connect(roomGain);
      roomGain.connect(c.destination);
      roomOsc.start();
    } catch {
      stopRoom();
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
    tone(540, 0.035, 0.05, "sine");
  }

  function drop() {
    tone(400, 0.045, 0.06, "sine");
    window.setTimeout(() => tone(500, 0.035, 0.04, "sine"), 28);
  }

  function cancel() {
    tone(270, 0.045, 0.035, "sine");
  }

  function spark() {
    tone(150, 0.11, 0.075, "triangle");
    window.setTimeout(() => tone(210, 0.09, 0.06, "triangle"), 55);
  }

  /**
   * @param {string} el
   * @param {number} chain
   * @param {number} total
   * @param {boolean} arc
   */
  function frontierHit(el, chain, total, arc) {
    const types = { F: "triangle", L: "square", W: "sine", C: "sawtooth" };
    const base = { F: 255, L: 340, W: 290, C: 375 }[el] ?? 280;
    const pitch = base + chain * 36 + (arc ? 28 : 0);
    const vol = 0.045 + (chain / total) * 0.05;
    tone(pitch, 0.085, vol, /** @type {OscillatorType} */ (types[el] ?? "triangle"));
  }

  /** @param {boolean} strong */
  function curtain(strong) {
    if (strong) {
      tone(392, 0.16, 0.08, "sine");
      window.setTimeout(() => tone(523, 0.2, 0.065, "sine"), 100);
      window.setTimeout(() => tone(659, 0.28, 0.05, "sine"), 200);
    } else {
      tone(330, 0.12, 0.045, "sine");
    }
    window.setTimeout(() => stopRoom(), 400);
  }

  return {
    tone,
    pick,
    drop,
    cancel,
    spark,
    frontierHit,
    curtain,
    startRoom,
    stopRoom,
    resume,
    setMuted(m) {
      soundOn = !m;
      if (!soundOn) stopRoom();
    },
    isMuted() {
      return !soundOn;
    },
  };
}
