---
name: llm-bitbucket-mcp
sephirah: hod
role: satellite
tagline: Una superficie MCP ristretta per pull request e pipeline su Bitbucket Cloud.
problem: Gli agenti devono poter aprire, esaminare e commentare pull request e capire perché una pipeline è fallita, senza ricevere una workstation git generica e senza limiti.
stack: [Node.js, MCP (HTTP), Bitbucket Cloud API]
status: active
repo: https://github.com/ragePolpette/llm-bitbucket-mcp
---

Il server espone un set di tool mirato: cercare ed esaminare pull request, leggere diff, commenti, commit, task e stati, consultare le esecuzioni delle pipeline ed estrarre l'output dello step fallito, creare pull request e commentarle.

Altrettanto importante è quello che non fa, per scelta: niente checkout locale, niente commit, nessuna automazione di merge o approvazioni. Le azioni remote su Bitbucket stanno qui, il workflow git locale sta altrove.

Tra le protezioni ci sono una allowlist dei tool di scrittura, sessioni limitate per durata e numero, e un token API che viene rifiutato se lo si carica da un file `.env`.

In Exodia è il braccio sinistro: pull request e pipeline.
