const LANG_MAP: Record<string, string> = {
  de: 'de-DE',
  ru: 'ru-RU',
  en: 'en-US',
  ar: 'ar-SA',
  pl: 'pl-PL',
  ro: 'ro-RO',
  sq: 'sq-AL',
  uk: 'uk-UA',
};

/** Supported BCP-47 codes: de-DE, ru-RU, en-US, ar-SA (plus pl, ro, sq, uk via LANG_MAP) */

let speechSynth: SpeechSynthesis | null = null;

function getSpeechSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null;
  if (!speechSynth) speechSynth = window.speechSynthesis;
  return speechSynth;
}

/**
 * Text-to-speech via Web Speech API (speechSynthesis).
 * @param text - Text to speak
 * @param lang - Locale code (e.g. 'de', 'ru'); mapped to de-DE, ru-RU, en-US, ar-SA
 * @param options - rate (default 0.9), volume (default 1)
 * @throws Error if speechSynthesis is not supported
 */
export function speak(
  text: string,
  lang: string,
  options?: { rate?: number; volume?: number }
): void {
  const synth = getSpeechSynth();
  if (!synth) {
    throw new Error('Speech synthesis is not supported in this environment');
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_MAP[lang] ?? lang ?? 'de-DE';
  utterance.rate = options?.rate ?? 0.9;
  utterance.volume = options?.volume ?? 1;

  synth.cancel();
  synth.speak(utterance);
}

export function stopSpeaking(): void {
  getSpeechSynth()?.cancel();
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
