---
name: 'llm-bitbucket-mcp'
node: lowerLeft
role: satellite
kind: mcp
tagline: 'Una superficie MCP ristretta per pull request e pipeline su Bitbucket Cloud, su più repository.'
summary: 'PR e pipeline per agenti'
problem: 'Gli agenti devono poter aprire e commentare pull request, capire perché una pipeline è fallita e rilanciarla, senza ricevere una workstation git senza limiti.'
outcome: 'È il modo in cui Exodia apre le pull request e legge le pipeline fallite. Il merge passa solo da un flusso confermato in due passi, e solo sui repository che lo consentono.'
stack: ['Node.js', 'MCP (HTTP)', 'Bitbucket Cloud API']
status: active
repo: https://github.com/ragePolpette/llm-bitbucket-mcp
---

Il server lavora su un elenco di repository approvati, scelti a ogni chiamata. Può cercare ed esaminare pull request; leggere diff, commenti, commit, task e stati; leggere i log degli step di una pipeline, falliti e non; attendere la fine di una pipeline con un timeout limitato; avviare una pipeline su un branch; creare pull request e commentarle.

Merge e decline sono disattivati finché un repository non li abilita con un proprio flag. Anche allora, la prima chiamata restituisce solo un riepilogo e un token monouso: l'agente deve mostrare il riepilogo, aspettare un sì esplicito dall'utente e richiamare il tool con il token, che è legato alla sessione, al repository e ai parametri del merge.

Non fa nulla in locale: niente checkout, niente commit. I tool di review, come le approvazioni, vanno attivati esplicitamente, e il token API viene rifiutato se arriva da un file `.env`.
