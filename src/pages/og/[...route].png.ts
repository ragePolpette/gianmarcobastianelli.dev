import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, t } from '../../i18n';
import { site } from '../../data/site';
import { getPages } from '../../lib/pages';
import { getProjects } from '../../lib/projects';
import { renderOg, type OgCard } from '../../lib/og';

// One image per page and per locale: /og/<locale>/home.png, /og/<locale>/<section>.png,
// /og/<locale>/projects/<slug>.png.
export const getStaticPaths = (async () => {
  const routes: { params: { route: string }; props: { card: OgCard } }[] = [];
  for (const locale of locales) {
    const ui = t(locale);
    routes.push({
      params: { route: `${locale}/home` },
      props: { card: { eyebrow: ui.hero.role, title: site.name, subtitle: ui.hero.tagline } },
    });
    for (const page of await getPages(locale)) {
      const d = page.entry.data;
      routes.push({
        params: { route: `${locale}/${page.slug}` },
        props: {
          card: {
            eyebrow: `${d.eyebrow} · ${site.name}`,
            title: d.title,
            subtitle: d.summary,
            highlight: d.node,
          },
        },
      });
    }
    for (const project of await getProjects(locale)) {
      const d = project.entry.data;
      routes.push({
        params: { route: `${locale}/projects/${project.slug}` },
        props: {
          card: {
            eyebrow: `${ui.kinds[d.kind]} · ${site.name}`,
            title: d.name,
            subtitle: d.tagline,
            highlight: d.node,
          },
        },
      });
    }
  }
  return routes;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
