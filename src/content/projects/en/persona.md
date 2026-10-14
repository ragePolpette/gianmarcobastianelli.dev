---
name: 'Persona'
node: lowerMid
role: primary
kind: tooling
tagline: 'Anonymizes documents before they reach an AI, and restores the answer from a local encrypted vault.'
summary: 'documents anonymized before the AI'
problem: 'Asking an AI to work on a contract or a client spreadsheet means sending it names, tax codes and IBANs that should not leave the machine.'
outcome: 'On its synthetic test corpus, 16 documents with 152 sensitive values, it catches 146 without a glossary and all 152 with one. I treat those numbers as a regression ratchet, not a guarantee.'
stack: ['Python', 'Argon2id', 'AES-GCM', 'DOCX', 'XLSX']
status: active
repo: https://github.com/ragePolpette/Persona
---

Persona replaces sensitive values with short, deterministic placeholders such as `[PERSONA_1]` or `[AZIENDA_2]`: within a project, the same value always gets the same placeholder. The mapping lives on my machine, in one vault per project, encrypted with AES-256-GCM under an Argon2id key. When the AI answers, `persona restore` puts the original values back and reports placeholders that were invented, dropped or altered.

It reads DOCX, XLSX, Markdown and plain text. Detection works in layers: a per-project glossary, checksum-validated identifiers such as IBAN, codice fiscale, VAT numbers and e-mail addresses, phone numbers, and heuristics for names, companies and addresses. In tables, every cell under a header such as `Nome`, `Email` or `Codice Fiscale` is masked whole, even when no detector recognises the value.

Before a file is declared shareable, the output actually written is reopened and scanned again; if anything sensitive is left, nothing is written. Detection is heuristic, so the output still needs a human review before real data goes out.
