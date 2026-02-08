'use client';

import { useEffect } from 'react';

/**
 * Ensures manifest.json link points to the correct path (with basePath).
 * Fixes 404 when site is under a subpath (e.g. GitHub Pages /DB-Rules-to-Work/).
 */
export function FixManifestLink() {
  useEffect(() => {
    const LOCALES = ['de', 'en', 'ru', 'ar', 'pl', 'ro', 'sq', 'uk'];
    const basePath =
      (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BASE_PATH) ||
      (() => {
        const pathname = window.location.pathname;
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length >= 1 && parts[0] && !LOCALES.includes(parts[0].toLowerCase())) {
          return '/' + parts[0];
        }
        return '';
      })();
    const manifestPath = basePath ? `${basePath}/manifest.json` : '/manifest.json';
    const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (link && link.getAttribute('href') !== manifestPath) {
      link.setAttribute('href', manifestPath);
    }
  }, []);
  return null;
}
