import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, localizePath, type Locale } from '../i18n';

export type PageEntry = CollectionEntry<'pages'>;

export interface Page {
  slug: string;
  locale: Locale;
  href: string;
  entry: PageEntry;
}

let validated = false;

function validate(all: Page[]): void {
  if (validated) return;
  const errors: string[] = [];
  for (const locale of locales) {
    const own = all.filter((p) => p.locale === locale);
    const seen = new Map<string, string>();
    for (const p of own) {
      const taken = seen.get(p.entry.data.sephirah);
      if (taken) errors.push(`[${locale}] ${p.entry.data.sephirah} used by ${taken} and ${p.slug}`);
      seen.set(p.entry.data.sephirah, p.slug);
    }
    for (const other of locales) {
      if (other === locale) continue;
      const otherSlugs = new Set(all.filter((p) => p.locale === other).map((p) => p.slug));
      for (const p of own) {
        if (!otherSlugs.has(p.slug))
          errors.push(`page ${p.slug} exists in ${locale} but not in ${other}`);
      }
    }
  }
  if (errors.length > 0) throw new Error(`Invalid page content:\n  ${errors.join('\n  ')}`);
  validated = true;
}

export async function getPages(locale: Locale): Promise<Page[]> {
  const entries = await getCollection('pages');
  const all = entries.map((entry): Page => {
    const [l, slug] = entry.id.split('/');
    if (!slug || !(locales as readonly string[]).includes(l ?? '')) {
      throw new Error(`Page "${entry.id}" must live in src/content/pages/<locale>/<slug>.md`);
    }
    return { slug, locale: l as Locale, href: localizePath(`/${slug}/`, l as Locale), entry };
  });
  validate(all);
  return all.filter((p) => p.locale === locale);
}

export async function getPage(locale: Locale, slug: string): Promise<Page> {
  const page = (await getPages(locale)).find((p) => p.slug === slug);
  if (!page) throw new Error(`Missing page ${locale}/${slug}`);
  return page;
}
