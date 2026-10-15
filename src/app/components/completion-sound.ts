/**
 * Completion feedback — plays the bundled success bell. The element is created
 * lazily on the first completion (a user gesture); a blocked or missing audio
 * file leaves completion itself untouched.
 */

const COMPLETION_SOUND_SRC = "/sounds/success-bell.mp3";

let completionAudio: HTMLAudioElement | null = null;

function getCompletionAudio(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") {
    return null;
  }
  if (!completionAudio) {
    completionAudio = new Audio(COMPLETION_SOUND_SRC);
    completionAudio.preload = "auto";
  }
  return completionAudio;
}

export function playCompletionSound(): void {
  const audio = getCompletionAudio();
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  void audio.play().catch(() => {
    // Autoplay blocked — completion still stands.
  });
}
