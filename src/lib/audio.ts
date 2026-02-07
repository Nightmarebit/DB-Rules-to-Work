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

let speechSynth: SpeechSynthesis | null = null;

function getSpeechSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null;
  if (!speechSynth) speechSynth = window.speechSynthesis;
  return speechSynth;
}

export function speak(
  text: string,
  lang: string = 'de',
  options?: { rate?: number; volume?: number }
): void {
  const synth = getSpeechSynth();
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_MAP[lang] || lang;
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
