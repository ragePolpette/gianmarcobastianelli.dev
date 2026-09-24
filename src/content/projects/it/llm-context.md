---
name: llm_context
sephirah: chesed
role: satellite
tagline: Retrieval su codice e documentazione tecnica per agenti, via MCP, su PostgreSQL + pgvector.
problem: Gli agenti hanno bisogno di contesto tecnico preciso senza caricare un intero repository nel prompt.
stack: [Python, PostgreSQL, pgvector, embedding locali, MCP]
status: active
repo: https://github.com/ragePolpette/llm_context
---

llm_context indicizza codice sorgente e documenti tecnici in un vector store locale e li espone tramite tool MCP come il retrieval di contesto, la ricerca semantica e la ricerca per simboli.

Ogni operazione è legata a un progetto esplicito, così il contesto non passa da un repository all'altro. L'ingest è incrementale, quindi vengono rielaborati solo i file cambiati, e resta fuori dalla superficie MCP sempre attiva.

È nato su SQLite. Quando l'indicizzazione continua su un codebase reale ha reso scomodo uno store embedded, l'ho spostato su PostgreSQL con pgvector: ho rinunciato a un po' di portabilità in cambio di throughput, concorrenza e crescita su più progetti.

In Exodia è la gamba destra: il retrieval semantico.
