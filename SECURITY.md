# Security Policy

## Scope

This repository contains the source of a static website. It has no backend, no
database, no authentication and no user-submitted data. The relevant surface is:

- the generated HTML, CSS and JavaScript;
- the HTTP headers in `public/_headers` and the Content Security Policy configured
  in `astro.config.mjs`;
- the build and CI configuration and the npm dependency tree.

## Threat model

- Content injection or script execution on the site (XSS). Mitigated by a strict CSP
  with per-page script and style hashes, `object-src 'none'`, `form-action 'none'`
  and `frame-ancestors 'none'`.
- Email harvesting. The contact address is not present in the HTML; it is decoded
  client-side from an encoded value.
- Vulnerable or malicious dependencies. Dependencies are pinned through
  `package-lock.json` and installed with `npm ci`.
- Accidental secret disclosure. No secrets are required by the build; `.env` files
  are ignored by git.

## Reporting a vulnerability

Please report issues privately through
[GitHub Security Advisories](https://github.com/ragePolpette/gianmarcobastianelli.dev/security/advisories/new).
If that is not possible, open an issue that asks for a private contact channel and
omits the details. Do not publish exploit details before the issue is resolved.

## Not covered

- Third-party services and sites linked from the pages, including GitHub and
  Cloudflare.
- Findings that require a compromised browser, device or user account.
- Denial of service by traffic volume and automated scanner output without a
  demonstrated impact.
- The content of the separate repositories the site links to.
