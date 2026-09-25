---
name: 'llm-sql-db-mcp'
node: midLeft
role: primary
kind: mcp
tagline: 'Server MCP per SQL Server governato da policy, con guard rail e anonimizzazione.'
summary: 'SQL per agenti, dietro guard rail'
problem: 'Lasciare che un agente "esegua SQL e basta" è un incidente annunciato, soprattutto vicino alla produzione.'
outcome: 'Gli agenti hanno un accesso utile ai database senza una strada verso scritture pericolose, e un unico server governato da policy ha sostituito i due separati per sviluppo e produzione.'
stack: ['Node.js', 'SQL Server', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm-sql-db-mcp
---

I database sono dichiarati in un registro dei target, ed è quel registro, non il client, a decidere cosa è consentito: ogni target ha la sua policy per letture, scritture e anonimizzazione.

Ogni query passa da guard rail lessicali e strutturali prima di essere eseguita. I target di produzione mantengono protezioni non aggirabili, i campi sensibili si possono mascherare prima che i risultati escano dal server, e i log non contengono mai SQL, parametri o righe in chiaro.
