// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gianmarcobastianelli.dev',
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
      filter: (page) => !page.includes('/lab/'),
    }),
  ],
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
