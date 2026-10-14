# Contributing

## Workflow

1. Open an issue to discuss non-trivial changes before starting.
2. Create a branch from `main` (for example `feat/<topic>` or `fix/<topic>`).
3. Keep changes focused and make sure `npm run verify` passes.
4. Open a pull request against `main` and fill in the template.

## Setup

Requires Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run verify
```

This runs `astro check`, `eslint`, `prettier --check` and `astro build`. Use
`npm run format` to apply Prettier formatting. The repository has no separate unit
test suite.

## Content changes

Every project needs one file per locale in `src/content/projects/en/` and
`src/content/projects/it/`. UI strings must be added to both `src/i18n/en.json` and
`src/i18n/it.json`. The build fails otherwise.

## Security rules

- Do not commit secrets, tokens or real `.env` files.
- Do not put the contact email address in plain text in the HTML.
- Do not weaken the CSP or the headers in `public/_headers` without explaining why
  in the pull request.
- Report vulnerabilities as described in [SECURITY.md](SECURITY.md), not in public
  issues.
