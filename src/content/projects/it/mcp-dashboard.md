---
name: mcp-dashboard
sephirah: hod
role: primary
tagline: Un pannello di controllo locale per far girare e osservare uno stack MCP sulla workstation.
summary: pannello di controllo dello stack MCP
problem: Far girare più server MCP in locale significa destreggiarsi tra processi, log e segreti sparsi in una pila di terminali.
stack: [Python, FastAPI, JavaScript]
status: active
repo: https://github.com/ragePolpette/mcp-dashboard
---

Da un'unica interfaccia avvio, fermo e riavvio ogni servizio MCP e ne vedo pid, porta, stato di salute ed eventi recenti. I log dei diversi servizi confluiscono, normalizzati, in un unico flusso filtrabile.

I segreti stanno in un vault locale e sono richiamati come `vault://…`, così l'interfaccia non li mostra mai in chiaro dopo il salvataggio. La dashboard gestisce anche il registro dei target SQL usato da llm-sql-db-mcp e ha viste di amministrazione per llm-memory: riepilogo, audit, progetti, candidati della memoria fast ed esecuzioni di distillazione.
