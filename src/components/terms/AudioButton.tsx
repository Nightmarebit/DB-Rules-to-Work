'use client';

import { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { speak, stopSpeaking, isSpeechSupported } from '@/lib/audio';

interface AudioButtonProps {
  text: string;
  lang?: string;
  className?: string;
  label?: string;
}

export function AudioButton({
  text,
  lang = 'de',
  className = '',
  label,
}: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);

  if (!isSpeechSupported()) return null;

  const handleClick = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speak(text, lang, { rate: 0.85 });
    const end = () => setPlaying(false);
    const synth = window.speechSynthesis;
    const check = () => {
      if (!synth.speaking) end();
      else setTimeout(check, 100);
    };
    setTimeout(check, 100);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-db-gray-700 text-db-red hover:bg-db-gray-600 focus:ring-2 focus:ring-db-red focus:ring-offset-2 focus:ring-offset-db-dark ${className}`}
      aria-label={label ?? (playing ? 'Stop' : 'Play pronunciation')}
      title={label ?? (playing ? 'Stop' : 'Play pronunciation')}
    >
      {playing ? (
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
      ) : (
        <Volume2 className="h-6 w-6" aria-hidden />
      )}
    </button>
  );
}
