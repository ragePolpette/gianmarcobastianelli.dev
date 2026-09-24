---
name: llm-sql-db-mcp
sephirah: gevurah
role: primary
tagline: Server MCP per SQL Server governato da policy, con guard rail e anonimizzazione.
problem: Lasciare che un agente "esegua SQL e basta" è un incidente annunciato, soprattutto vicino alla produzione.
stack: [Node.js, SQL Server, MCP]
status: active
repo: https://github.com/ragePolpette/llm-sql-db-mcp
---

I database sono dichiarati in un registro dei target, ed è quel registro, non il client, a decidere cosa è consentito. Ogni target ha la sua policy per letture, scritture e anonimizzazione.

Ogni query passa da guard rail SQL lessicali e strutturali prima dell'esecuzione. I target di produzione mantengono protezioni non aggirabili. I campi sensibili si possono mascherare, in modo deterministico o tramite un provider, prima che i risultati escano dal server, e i log non contengono mai SQL, parametri o righe in chiaro.

Sostituisce i due server precedenti, che separavano database di sviluppo e di produzione in progetti distinti.
