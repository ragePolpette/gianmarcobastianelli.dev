---
name: 'mcp-dashboard'
node: lowerLeft
role: primary
kind: tooling
tagline: 'Un pannello di controllo locale per avviare, osservare e configurare uno stack MCP sulla workstation.'
summary: 'pannello di controllo dello stack MCP'
problem: 'Far girare più server MCP in locale significa destreggiarsi tra processi, log e segreti sparsi in una pila di terminali.'
outcome: 'Un unico posto per avviare, osservare e configurare il mio stack MCP locale, compresi i server usati da Exodia, senza mai mostrare segreti in chiaro.'
stack: ['Python', 'FastAPI', 'JavaScript']
status: active
repo: https://github.com/ragePolpette/mcp-dashboard
---

Ogni servizio MCP si avvia, si ferma e si riavvia dall'interfaccia, con pid, porta, stato di salute ed eventi recenti. I log dei diversi servizi confluiscono, normalizzati, in un unico flusso filtrabile.

I segreti stanno in un vault locale cifrato e i servizi li richiamano come `vault://…`. Il vault si blocca da solo dopo un periodo di inattività configurabile. La dashboard tiene anche i registri dei target SQL per llm-sql-db-mcp e dei repository Bitbucket per llm-bitbucket-mcp, e ha viste di amministrazione per llm-memory: audit, progetti, candidati della memoria fast ed esecuzioni di distillazione.

Per impostazione predefinita ascolta solo su loopback e accetta nell'header `Host` solo nomi di loopback. Ogni richiesta che modifica lo stato deve portare un header anti-CSRF e un token di sessione rigenerato a ogni avvio.
