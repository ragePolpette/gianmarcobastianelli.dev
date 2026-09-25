---
name: 'llm-memory'
node: midRight
role: primary
kind: mcp
tagline: 'Memoria persistente per agenti via MCP: due livelli, tre scope, un audit trail.'
summary: 'memoria persistente per agenti'
problem: "Gli agenti gestiscono bene il contesto a breve termine e dimenticano tutto tra una sessione e l'altra."
outcome: 'In uso ogni giorno nel mio lavoro, ed è la memoria per ticket di Exodia.'
stack: ['Python', 'SQLite', 'ricerca vettoriale', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm-memory
---

La memoria ha due livelli: una memoria strong per fatti, decisioni e convenzioni durature, e una memoria fast per le note episodiche, che in seguito si possono distillare e promuovere. Il retrieval combina tre scope: progetto, workspace e globale.

Ogni scrittura passa da una policy di persistenza, da uno scoring di importanza e da controlli sulla privacy, e lascia un audit trail. I record si possono promuovere, invalidare e deduplicare, ed esportare o importare in JSONL e Markdown. Gira in locale, senza servizi cloud.
