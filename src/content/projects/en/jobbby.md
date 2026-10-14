---
name: 'Jobbby'
node: lowerRight
role: primary
kind: agent
tagline: 'Collects job postings, normalizes them with an LLM and judges their fit against a CV.'
summary: 'job postings judged against a CV'
problem: 'A job search returns hundreds of postings, and reading each one against your own profile by hand does not scale.'
outcome: 'Runs end to end on real postings: each run fetches from Adzuna, judges the fit and records the outcome in a ledger, and postings already seen cost no further LLM calls.'
stack: ['C#', '.NET 8', 'ASP.NET', 'LLM', 'Adzuna API']
status: active
repo: https://github.com/ragePolpette/Jobbby
---

Jobbby builds its searches from the settings and, optionally, from roles the LLM derives from the CV. It fetches postings from Adzuna and normalizes each one with the LLM. Matching has two stages: a first filter, including a minimum salary when it is known, then an LLM judgment of the fit against the CV that assigns an outcome. Outcomes go into a ledger, so no posting is evaluated twice, and every run writes its own report.

It has a CLI and a local web UI over the same data, and pending postings are approved or rejected by hand.

Postings are untrusted input: every prompt marks them as data to analyse, not instructions to follow, and the LLM output is validated before it is used. LLM calls are capped at a configurable concurrency and retried with backoff. Adzuna credentials are masked in error messages and kept out of the request logs.
