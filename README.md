# gianmarcobastianelli.dev

Personal site of Gianmarco Bastianelli: backend .NET developer and AI engineer.
A static Astro site, written in strict TypeScript, with English at `/` and Italian at `/it/`.

[![CI](https://github.com/ragePolpette/gianmarcobastianelli.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/ragePolpette/gianmarcobastianelli.dev/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js >=22.12](https://img.shields.io/badge/node-%3E%3D22.12-339933.svg)

## Overview

The site presents a set of projects as nodes of a tree. Pages are generated at build
time from Markdown content files and two UI string catalogs. There is no backend.

## Architecture

- `src/content/projects/<locale>/<slug>.md`: project entries, one file per locale.
- `src/content.config.ts`: content collection schema and build-time validation.
- `src/i18n/`: UI strings (`en.json`, `it.json`).
- `src/data/`, `src/lib/`: site data and tree/project helpers.
- `src/pages/`, `src/components/`, `src/layouts/`: routes and presentation.
- `public/_headers`: HTTP security headers served by Cloudflare Pages.
- `docs/`: design notes.

## Quick start

Requires Node.js 22.12 or newer (`.nvmrc` pins 22).

```bash
npm ci
npm run dev      # http://localhost:4321
```

## Configuration

There are no runtime environment variables. Deployment settings (Cloudflare Pages):

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`

## Content

- **Projects**: the frontmatter schema lives in `src/content.config.ts`. The build
  fails if a translation is missing, if two primary projects share a sephirah, or if
  a repo is not a public `github.com/ragePolpette/*` URL.
- **UI strings**: `src/i18n/en.json` and `src/i18n/it.json` must have the same keys;
  a missing key is a type error.
- Placeholders written as `TODO: ...` render as a visible marker.

To add a project, create `en/<slug>.md` and `it/<slug>.md` with a `sephirah` and a
`role` (`primary` or `satellite`). No component changes are needed.

## Security

Security headers are in `public/_headers`. Script and style hashes are emitted per
page by Astro's CSP support. See [SECURITY.md](SECURITY.md) for scope and reporting.

## Development

```bash
npm run check         # astro check (types)
npm run lint          # eslint
npm run format:check  # prettier
npm run build         # static build into dist/
npm run verify        # all of the above
```

The repository has no unit test suite; `npm run verify` is the check run in CI.
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Project status

Under active development.

## License

[MIT](LICENSE)
