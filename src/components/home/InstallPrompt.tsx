'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

export function InstallPrompt() {
  const t = useTranslations('home');
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<{ prompt: () => Promise<unknown> } | null>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setShow(false);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      const ev = e as unknown as { prompt: () => Promise<unknown> };
      if (typeof ev.prompt === 'function') {
        setDeferredPrompt({ prompt: () => ev.prompt() });
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    setShow(true);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    deferredPrompt?.prompt?.();
  };

  if (!show) return null;

  return (
    <section className="rounded-xl border border-db-gray-600 bg-db-red/10 p-4 md:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-db-red/20 text-db-red">
          <Smartphone className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-db-light">{t('installApp')}</h2>
          <p className="mt-1 text-sm text-db-gray-400">{t('installHint')}</p>
          {deferredPrompt && (
            <button
              type="button"
              onClick={handleInstall}
              className="mt-3 min-h-[48px] rounded-lg bg-db-red px-4 py-2.5 text-sm font-medium text-white hover:bg-db-red/90 focus:ring-2 focus:ring-db-red focus:ring-offset-2 focus:ring-offset-db-dark"
            >
              {t('installApp')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
