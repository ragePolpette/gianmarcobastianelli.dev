---
name: 'llm-sql-db-mcp'
node: midLeft
role: primary
kind: mcp
tagline: 'Server MCP per SQL Server governato da policy, con guard T-SQL, recinto sulla produzione e anonimizzazione.'
summary: 'SQL per agenti, dietro guard rail'
problem: 'Lasciare che un agente "esegua SQL e basta" è un incidente annunciato, soprattutto vicino alla produzione.'
outcome: 'Gli agenti hanno un accesso utile ai database senza alcuna strada verso scritture in produzione, e un unico server governato da policy ha sostituito i due separati che usavo per sviluppo e produzione.'
stack: ['Node.js', 'SQL Server', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm-sql-db-mcp
---

I database sono dichiarati in un registro dei target, ed è quel registro, non il client, a decidere cosa è consentito: ogni target ha la sua policy per letture, scritture e anonimizzazione.

Ogni query passa da un guard che scompone il T-SQL in token in un'unica passata, così virgolette e commenti non possono nascondere una seconda istruzione: una lettura è esattamente una `SELECT`, una scrittura esattamente una `INSERT`, `UPDATE`, `DELETE` o `MERGE`. Il recinto sulla produzione sta nel codice: un target `prod` è sempre in sola lettura, qualunque cosa dicano il registro o le variabili d'ambiente.

Sui target che lo richiedono, i risultati vengono anonimizzati prima di uscire dal server. Le colonne sono classificate per target, e i verdetti finiscono in un catalogo che una persona può rivedere e correggere. Su quei target vengono oscurati anche i messaggi di errore di SQL Server che potrebbero riportare valori dei dati. Un token di accesso condiviso è facoltativo su loopback e obbligatorio su qualsiasi altro indirizzo, e i log non contengono mai SQL, parametri o righe in chiaro.
