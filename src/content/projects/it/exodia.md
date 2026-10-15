---
name: 'Exodia'
node: base
role: primary
kind: agent
tagline: 'Agente autonomo che porta un ticket Jira fino alla pull request.'
summary: 'dal ticket Jira alla pull request'
problem: 'Quasi tutte le demo ticket-to-code riducono il lavoro a un unico passo rischioso: leggere il ticket, modificare i file, aprire la pull request.'
outcome: 'Testato e usato in produzione: dai ticket escono pull request pronte per la review, e i dubbi tornano su Jira come domande invece di finire nel codice come supposizioni.'
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

Exodia divide il lavoro in fasi. Legge il ticket, lo associa al repository giusto, carica contesto e memoria, propone una modifica e la verifica prima di scrivere qualsiasi cosa. Poi implementa la modifica, controlla le prove e apre la pull request solo se le policy lo consentono.

Ogni run parte da un worktree pulito: Exodia aggiorna il branch base, si ferma se trova modifiche non committate e crea da lì il branch del ticket. Se il ticket si blocca o fallisce, quel worktree viene ripristinato. Il modello lavora in una sandbox di sola lettura in tutte le fasi tranne l'implementazione vera e propria. Prima del commit, un diff gate limita il numero di file e di righe modificate, e vengono messi in stage solo i percorsi ammessi per quel repository.

Quando la confidenza è troppo bassa, Exodia lascia una domanda sul ticket e mette il run in attesa; un run successivo trova la risposta e prosegue. Risposte e approvazioni valgono solo se arrivano dall'elenco configurato di persone autorizzate. Tutti gli altri vengono ignorati.

È composto da cinque parti, che prendono il nome dalle cinque carte di Exodia il Proibito: l'harness è la testa, quattro server MCP sono gli arti.
