// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production is the root of gianmarcobastianelli.dev. Preview builds (GitHub Pages)
// override the origin and the sub-path through SITE_URL and BASE_PATH.
const site = process.env.SITE_URL ?? 'https://gianmarcobastianelli.dev';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // The whole stylesheet is small: inlining it saves a render-blocking request.
  build: { inlineStylesheets: 'always' },
  vite: {
    // Never inline assets as data: URIs; fonts would violate font-src 'self'.
    build: { assetsInlineLimit: 0 },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
    }),
  ],
  env: {
    schema: {
      // true on preview deployments: every page gets noindex and robots.txt disallows all.
      PREVIEW: envField.boolean({ context: 'server', access: 'public', default: false }),
    },
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
