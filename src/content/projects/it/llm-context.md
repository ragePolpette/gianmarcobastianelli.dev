---
name: 'llm_context'
node: midRight
role: satellite
kind: mcp
tagline: 'Retrieval su codice e documentazione per agenti via MCP, su PostgreSQL + pgvector.'
summary: 'retrieval sul codice con pgvector'
problem: 'Gli agenti hanno bisogno di contesto tecnico preciso senza caricare un intero repository nel prompt.'
outcome: "Il livello di retrieval con cui Exodia trova il codice giusto per un ticket. Il passaggio da SQLite a pgvector ha reso praticabile l'indicizzazione continua su più progetti."
stack: ['Python', 'PostgreSQL', 'pgvector', 'embedding locali', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm_context
---

llm_context indicizza codice sorgente e documenti tecnici in PostgreSQL con pgvector, usando embedding locali, e li espone tramite tool MCP per il retrieval di contesto, la ricerca semantica e la ricerca per simboli.

Ogni operazione è legata a un progetto esplicito, così il contesto non passa mai da un repository all'altro. L'ingest è incrementale e resta fuori dalla superficie MCP sempre attiva. Ogni documento viene sostituito in un'unica transazione, così le query continuano a vedere la versione precedente finché la nuova non è confermata. Il modello di embedding è un'impostazione del server: un client non può chiederne uno diverso.
