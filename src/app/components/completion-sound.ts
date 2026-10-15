/** Completion chime synthesised with the Web Audio API — no audio asset needed. */

const COMPLETION_TONES = [
  { frequency: 1318.51, offset: 0, duration: 0.26 },
  { frequency: 1975.53, offset: 0.085, duration: 0.4 },
] as const;

const PEAK_GAIN = 0.12;
const ATTACK_SECONDS = 0.008;
const SILENCE = 0.0001;

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioContext;
}

export function playCompletionSound(): void {
  const context = getAudioContext();
  if (!context) {
    return;
  }
  if (context.state === "suspended") {
    void context.resume();
  }
  const start = context.currentTime;
  for (const tone of COMPLETION_TONES) {
    const toneStart = start + tone.offset;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(tone.frequency, toneStart);
    gain.gain.setValueAtTime(0, toneStart);
    gain.gain.linearRampToValueAtTime(PEAK_GAIN, toneStart + ATTACK_SECONDS);
    gain.gain.exponentialRampToValueAtTime(SILENCE, toneStart + tone.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(toneStart);
    oscillator.stop(toneStart + tone.duration + 0.02);
  }
}
