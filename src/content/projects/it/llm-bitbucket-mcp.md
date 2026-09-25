---
name: 'llm-bitbucket-mcp'
node: lowerLeft
role: satellite
kind: mcp
tagline: 'Una superficie MCP ristretta per pull request e pipeline su Bitbucket Cloud.'
summary: 'PR e pipeline per agenti'
problem: 'Gli agenti devono poter aprire e commentare pull request e capire perché una pipeline è fallita, senza ricevere una workstation git senza limiti.'
outcome: 'È il modo in cui Exodia apre le pull request e legge le pipeline fallite, con merge e approvazioni lasciati di proposito fuori dalla sua portata.'
stack: ['Node.js', 'MCP (HTTP)', 'Bitbucket Cloud API']
status: active
repo: https://github.com/ragePolpette/llm-bitbucket-mcp
---

Il server espone un set di tool mirato: cercare ed esaminare pull request; leggere diff, commenti, commit, task e stati; consultare le esecuzioni delle pipeline ed estrarre l'output dello step fallito; creare pull request e commentarle.

Di proposito non fa nulla in locale: niente checkout, niente commit, nessuna automazione di merge o approvazioni. I tool di scrittura si possono limitare con una allowlist, le sessioni hanno limiti di durata e numero, e il token API viene rifiutato se arriva da un file `.env`.
