import en from './en.json';
import it from './it.json';

export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export type UiStrings = typeof en;

// Every locale must provide exactly the same keys as English: a missing
// translation is a type error, not a silent fallback.
const strings: Record<Locale, UiStrings> = { en, it: it satisfies UiStrings };

export function t(locale: Locale): UiStrings {
  return strings[locale];
}

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/**
 * Prefixes a root-relative path with the deploy base. The base is "/" on the real
 * domain and a sub-path on preview hosts such as GitHub Pages project sites.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Prefixes a root-relative path with the base and the locale segment (none for the default locale). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(locale === defaultLocale ? clean : `/${locale}${clean}`);
}
