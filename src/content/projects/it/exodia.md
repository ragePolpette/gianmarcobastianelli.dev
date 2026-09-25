---
name: 'Exodia'
node: base
role: primary
kind: agent
tagline: 'Agente autonomo che porta un ticket Jira fino alla pull request.'
summary: 'dal ticket Jira alla pull request'
problem: 'Quasi tutte le demo ticket-to-code riducono il lavoro a un unico passo rischioso: leggere il ticket, modificare i file, aprire la pull request.'
outcome: "In produzione su un vero codebase enterprise: dai ticket escono pull request pronte per la review, e i dubbi tornano su Jira come domande invece di finire nel codice come supposizioni. L'ho presentato a una QBR aziendale."
stack: ['Node.js', 'MCP', 'Jira', 'Bitbucket', 'runtime LLM indipendente dal provider']
status: active
repo: https://github.com/ragePolpette/Exodia
components:
  - card: 'Testa'
    label: 'Exodia'
    role: 'harness core'
  - card: 'Braccio destro'
    label: 'Atlassian MCP'
    role: 'intake da Jira'
    external: true
  - card: 'Braccio sinistro'
    label: 'Bitbucket MCP'
    role: 'pull request + pipeline'
    project: llm-bitbucket-mcp
  - card: 'Gamba destra'
    label: 'llm_context'
    role: 'retrieval semantico'
    project: llm-context
  - card: 'Gamba sinistra'
    label: 'llm-memory'
    role: 'memoria per ticket'
    project: llm-memory
---

Exodia divide il lavoro in fasi. Legge il ticket, lo associa al repository giusto, carica contesto e memoria, propone una modifica e la verifica prima di scrivere qualsiasi cosa. Poi implementa la modifica in un worktree controllato, controlla le prove e apre la pull request solo se le policy lo consentono.

È composto da cinque parti, che prendono il nome dalle cinque carte di Exodia il Proibito: l'harness è la testa, quattro server MCP sono gli arti. Quando la confidenza è troppo bassa lascia una domanda sul ticket e mette il run in attesa; un run successivo trova la risposta e prosegue. Il controllo avviene tra un run e l'altro, mai come un blocco sincrono.
