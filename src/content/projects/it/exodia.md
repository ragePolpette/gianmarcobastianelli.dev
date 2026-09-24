---
name: Exodia
sephirah: malkuth
role: primary
tagline: Agente autonomo che porta un ticket Jira fino alla pull request.
summary: dal ticket Jira alla pull request
problem: Quasi tutte le demo ticket-to-code riducono il lavoro a un unico passo rischioso. Exodia lo divide in fasi, verifica ogni proposta prima di scrivere una riga e, quando non è sicuro, si ferma a chiedere invece di improvvisare.
stack: [Node.js, MCP, Jira, Bitbucket, runtime LLM indipendente dal provider]
status: active
repo: https://github.com/ragePolpette/Exodia
components:
  - card: Testa
    label: Exodia
    role: harness core
  - card: Braccio destro
    label: Atlassian MCP
    role: intake da Jira
    external: true
  - card: Braccio sinistro
    label: Bitbucket MCP
    role: pull request + pipeline
    project: llm-bitbucket-mcp
  - card: Gamba destra
    label: llm_context
    role: retrieval semantico
    project: llm-context
  - card: Gamba sinistra
    label: llm-memory
    role: memoria per ticket
    project: llm-memory
---

Exodia legge un ticket, lo associa al repository giusto, carica contesto e memoria, propone un'implementazione, la verifica, la esegue in un worktree controllato, controlla il risultato e apre la pull request solo se le policy lo consentono.

È composto da cinque parti, che prendono il nome dalle cinque carte di Exodia il Proibito: l'harness è la testa e quattro server MCP sono gli arti.

La verifica è multi-agente: un passaggio separato controlla la proposta prima di qualsiasi scrittura, un altro verifica le prove dell'implementazione alla fine.

Quando la confidenza è troppo bassa, Exodia non tira a indovinare: lascia una domanda come commento sul ticket e mette il run in attesa. Se in un run successivo trova una risposta, riparte da lì. È un controllo asincrono tra un run e l'altro, non un blocco sincrono.

È in produzione e l'ho presentato a una QBR aziendale.
