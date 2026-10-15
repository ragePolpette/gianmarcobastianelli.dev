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
- `src/content/pages/<locale>/<slug>.md`: site sections (about, work, contact).
- `src/content.config.ts`: content collection schema.
- `src/lib/projects.ts`, `src/lib/pages.ts`: cross-entry validation that fails the build.
- `src/i18n/`: UI strings (`en.json`, `it.json`).
- `src/data/`, `src/lib/`: site data and tree/project helpers.
- `src/pages/`, `src/components/`, `src/layouts/`: routes and presentation.
- `public/_headers`: HTTP security headers served by Cloudflare Pages.

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

The home page shows a tree of eleven nodes (`src/data/nodes.ts`, positions in
`src/data/tree.ts`). Each node holds one of:

- a **primary project**, optionally with **satellites** drawn around it;
- a **page** (`about` on `top`, `contact` on `upperMid`, `work` on `middle`);
- nothing: a **dormant** node is drawn dimmed, without label or link.

Current layout:

| Node         | Content                                    |
| ------------ | ------------------------------------------ |
| `top`        | About (page)                               |
| `upperLeft`  | dormant                                    |
| `upperRight` | memval-lab                                 |
| `upperMid`   | Contact (page)                             |
| `midLeft`    | llm-sql-db-mcp                             |
| `midRight`   | llm-memory, satellite llm_context          |
| `middle`     | Work (page)                                |
| `lowerLeft`  | mcp-dashboard, satellite llm-bitbucket-mcp |
| `lowerRight` | dormant                                    |
| `lowerMid`   | Persona                                    |
| `base`       | Exodia                                     |

The frontmatter schema lives in `src/content.config.ts`, including length limits
(`summary` up to 40 characters for projects and 44 for pages, page `description` up
to 200). The build fails if:

- a project or page exists in one locale but not in the other;
- two primary projects, or two pages, share a node;
- a satellite has no primary on its node, or a component references an unknown project;
- a `repo` is not a `https://github.com/ragePolpette/*` URL;
- any frontmatter field or Markdown body contains `TODO`.

UI strings live in `src/i18n/en.json` and `src/i18n/it.json` and must have the same
keys; a missing key is a type error.

To add a project:

1. Create `src/content/projects/en/<slug>.md` and `src/content/projects/it/<slug>.md`
   with the same frontmatter shape (see an existing entry).
2. Set `node` to a free node and `role: primary`, or to an occupied node and
   `role: satellite` (use `order` to sort satellites).
3. Run `npm run verify`. The tree, the list view, the project page, its Open Graph
   image and its structured data are generated from the content; no component
   changes are needed.

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
