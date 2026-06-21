// Tapout Tactics sound engine — synthesized via Web Audio API, no audio files needed.

const SFX = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, type, duration, volume = 0.18, delay = 0) {
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime + delay);
      gain.gain.setValueAtTime(0, c.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, c.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
      osc.start(c.currentTime + delay);
      osc.stop(c.currentTime + delay + duration + 0.05);
    } catch (e) { /* audio not supported */ }
  }

  function noise(duration, volume = 0.08, delay = 0) {
    try {
      const c = getCtx();
      const bufSize = c.sampleRate * duration;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      const gain = c.createGain();
      src.connect(gain);
      gain.connect(c.destination);
      gain.gain.setValueAtTime(volume, c.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
      src.start(c.currentTime + delay);
    } catch (e) { /* audio not supported */ }
  }

  return {
    // Slap hands at match start — two quick clap tones
    slapHands() {
      noise(0.06, 0.12, 0);
      noise(0.05, 0.1, 0.12);
    },

    // Takedown impact — heavy thud
    takedown() {
      tone(80, "sine", 0.25, 0.22);
      tone(55, "sine", 0.35, 0.18, 0.04);
      noise(0.12, 0.14, 0);
    },

    // Submission attempt — tense rising tone
    submissionAttempt() {
      tone(220, "sawtooth", 0.08, 0.08);
      tone(330, "sawtooth", 0.08, 0.08, 0.07);
      tone(440, "sawtooth", 0.12, 0.08, 0.14);
    },

    // TAP OUT — triumphant resolution
    tapOut() {
      tone(523, "sine", 0.15, 0.22);
      tone(659, "sine", 0.15, 0.22, 0.12);
      tone(784, "sine", 0.25, 0.22, 0.24);
      tone(1047, "sine", 0.4, 0.2, 0.38);
    },

    // Points scored — quick positive ping
    scorePoints() {
      tone(660, "triangle", 0.08, 0.14);
      tone(880, "triangle", 0.12, 0.12, 0.08);
    },

    // Chain combo activated — distinctive spark
    chainCombo() {
      tone(440, "square", 0.05, 0.1);
      tone(554, "square", 0.05, 0.1, 0.06);
      tone(659, "square", 0.05, 0.1, 0.12);
      tone(880, "square", 0.1, 0.1, 0.18);
    },

    // Belt rank up — fanfare
    beltUp() {
      const notes = [523, 659, 784, 1047, 784, 1047, 1319];
      const times = [0, 0.12, 0.24, 0.38, 0.52, 0.62, 0.74];
      notes.forEach((freq, i) => tone(freq, "sine", 0.18, 0.2, times[i]));
    },

    // Defense / counter — low blocking thud
    counter() {
      tone(160, "square", 0.1, 0.12);
      noise(0.08, 0.08, 0.02);
    },

    // Adrenaline burst result
    adrenalinePerfect() {
      tone(880, "sine", 0.08, 0.18);
      tone(1100, "sine", 0.08, 0.18, 0.06);
      tone(1320, "sine", 0.12, 0.18, 0.12);
      tone(1760, "sine", 0.22, 0.16, 0.22);
    },

    adrenalineGood() {
      tone(660, "sine", 0.1, 0.14);
      tone(880, "sine", 0.14, 0.12, 0.1);
    },

    adrenalineMiss() {
      tone(300, "sawtooth", 0.08, 0.1);
      tone(200, "sawtooth", 0.12, 0.1, 0.08);
    },

    // Venue select
    select() {
      tone(440, "triangle", 0.06, 0.1);
      tone(550, "triangle", 0.08, 0.1, 0.07);
    }
  };
})();
