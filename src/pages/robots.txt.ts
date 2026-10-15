import type { APIRoute } from 'astro';
import { PREVIEW } from 'astro:env/server';

// Preview deployments are closed to crawlers; production points them to the sitemap.
export const GET: APIRoute = ({ site }) => {
  const body = PREVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', new URL(import.meta.env.BASE_URL, site)).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
