# gianmarcobastianelli.dev

Personal site of Gianmarco Bastianelli: backend .NET developer and AI engineer.
Static Astro site, TypeScript strict, English at `/` and Italian at `/it/`.

## Develop

Requires Node.js 22.12+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run verify   # astro check + eslint + prettier + build
```

## Content

- **Projects**: `src/content/projects/<locale>/<slug>.md`, one file per locale.
  The frontmatter schema lives in `src/content.config.ts`. The build fails if a
  translation is missing, if two primary projects share a sephirah, or if a repo is
  not a public `github.com/ragePolpette/*` URL.
- **UI strings**: `src/i18n/en.json` and `src/i18n/it.json`. Both must have the same
  keys; a missing key is a type error.
- Placeholders written as `TODO: …` render as a visible marker.

To add a project, create `en/<slug>.md` and `it/<slug>.md` with a `sephirah` and a
`role` (`primary` or `satellite`). No component changes are needed.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`

Security headers are in `public/_headers`. Script and style hashes are emitted per
page by Astro's CSP support.

## Plan

See [`docs/PLAN.md`](docs/PLAN.md).
