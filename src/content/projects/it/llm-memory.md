---
name: llm-memory
sephirah: chesed
role: primary
tagline: Memoria persistente per agenti via MCP, con due livelli, tre scope e un audit trail completo.
problem: Gli agenti gestiscono bene il contesto a breve termine e male tutto quello che va ricordato tra una sessione e l'altra. llm-memory dà loro una memoria duratura e governata, da cercare, promuovere e invalidare.
stack: [Python, SQLite, ricerca vettoriale, MCP]
status: active
repo: https://github.com/ragePolpette/llm-memory
---

Lo uso ogni giorno per lavoro. Non è una demo.

La memoria ha due livelli: una memoria **strong** per fatti, decisioni e convenzioni durature, e una memoria **fast** per le note operative episodiche, che in seguito si possono distillare e promuovere. Il retrieval combina tre scope: progetto, workspace e globale.

Ogni scrittura passa da una policy di persistenza, da uno scoring di importanza e da controlli sulla privacy, e lascia un audit trail. I record si possono promuovere, invalidare e deduplicare, ed esportare o importare in JSONL e Markdown.

Gira in locale, senza servizi cloud nella configurazione di default. In Exodia è la gamba sinistra: la memoria per ticket.
