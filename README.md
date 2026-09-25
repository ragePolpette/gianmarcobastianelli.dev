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
  translation is missing, if two primary projects share a tree node, or if a repo is
  not a public `github.com/ragePolpette/*` URL.
- **Sections** (about, work, contact): `src/content/pages/<locale>/<slug>.md`. Each
  one sits on a node of the tree, next to the projects.
- **UI strings**: `src/i18n/en.json` and `src/i18n/it.json`. Both must have the same
  keys; a missing key is a type error.
- Placeholders written as `TODO: …` render as a visible marker.

To add a project, create `en/<slug>.md` and `it/<slug>.md` with a `node` (one of the ids in
`src/data/nodes.ts`), a `kind`, an `outcome` and a `role` (`primary` or `satellite`). No component changes are needed.

## Open Graph images

`src/pages/og/[...route].png.ts` renders one 1200×630 PNG per page and locale at build
time (satori + resvg), with the tree drawn and the page's node highlighted. Nothing
from this runs in the browser.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`

Security headers are in `public/_headers`. Script and style hashes are emitted per
page by Astro's CSP support.

## Preview (GitHub Pages)

`.github/workflows/preview-pages.yml` builds every push to `main` and `step/**` and
publishes it to the `gh-pages` branch, served at
<https://ragepolpette.github.io/gianmarcobastianelli.dev/>. Preview builds set
`SITE_URL`, `BASE_PATH` and `PREVIEW=true`: pages are `noindex` and `robots.txt`
disallows everything. One-time setup: Settings → Pages → Deploy from a branch →
`gh-pages` / root.

## Plan

See [`docs/PLAN.md`](docs/PLAN.md).
