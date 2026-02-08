'use client';

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speak, stopSpeaking, isSpeechSupported } from '@/lib/audio';

interface AudioButtonProps {
  text: string;
  language: string;
}

export function AudioButton({ text, language }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);

  if (!isSpeechSupported()) {
    return (
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-db-gray-700/50 text-db-gray-500"
        title="Озвучка недоступна в этом браузере"
        role="img"
        aria-label="Озвучка недоступна"
      >
        <Volume2 className="h-6 w-6" aria-hidden />
      </span>
    );
  }

  const handleClick = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speak(text, language, { rate: 0.9 });
    const synth = window.speechSynthesis;
    const check = () => {
      if (!synth.speaking) setPlaying(false);
      else setTimeout(check, 100);
    };
    setTimeout(check, 100);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-db-red focus:ring-offset-2 focus:ring-offset-db-dark ${
        playing
          ? 'bg-db-red text-white'
          : 'bg-db-gray-700 text-db-red hover:bg-db-gray-600'
      }`}
      aria-label={playing ? 'Остановить озвучку' : 'Воспроизвести'}
      title={playing ? 'Остановить' : 'Воспроизвести'}
    >
      <Volume2 className="h-6 w-6" aria-hidden />
    </button>
  );
}
