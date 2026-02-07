const KEY_PREFIX = 'db-safelearn:';

export function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    if (raw == null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
  } catch {
    // quota or disabled
  }
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(KEY_PREFIX + key);
  } catch {
    // ignore
  }
}
