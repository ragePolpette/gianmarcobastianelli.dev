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

/** Prefixes a root-relative path with the locale segment (none for the default locale). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean}`;
}

/** Strips the locale segment, returning the locale-neutral path. */
export function unlocalizePath(path: string): string {
  const [, first, ...rest] = path.split('/');
  if (isLocale(first) && first !== defaultLocale) return `/${rest.join('/')}`;
  return path;
}
