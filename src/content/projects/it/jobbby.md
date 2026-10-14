---
name: 'Jobbby'
node: lowerRight
role: primary
kind: agent
tagline: 'Raccoglie annunci di lavoro, li normalizza con un LLM e ne valuta la compatibilità con un CV.'
summary: 'annunci di lavoro valutati sul CV'
problem: 'Una ricerca di lavoro restituisce centinaia di annunci, e confrontarli a mano uno per uno con il proprio profilo non è sostenibile.'
outcome: "Funziona dall'inizio alla fine su annunci reali: ogni run li scarica da Adzuna, ne valuta la compatibilità e annota l'esito in un registro, e gli annunci già visti non costano altre chiamate al LLM."
stack: ['C#', '.NET 8', 'ASP.NET', 'LLM', 'API Adzuna']
status: active
repo: https://github.com/ragePolpette/Jobbby
---

Jobbby costruisce le ricerche a partire dalle impostazioni e, se richiesto, dai ruoli che il LLM ricava dal CV. Scarica gli annunci da Adzuna e normalizza ciascuno con il LLM. La valutazione ha due stadi: un primo filtro, che include uno stipendio minimo quando è noto, poi un giudizio del LLM sulla compatibilità con il CV, che assegna un esito. Gli esiti finiscono in un registro, così nessun annuncio viene valutato due volte, e ogni run scrive il proprio report.

Ha una CLI e un'interfaccia web locale che lavorano sugli stessi dati, e gli annunci in sospeso si approvano o si scartano a mano.

Gli annunci sono input non fidato: ogni prompt li delimita come dati da analizzare, non istruzioni da seguire, e l'output del LLM viene validato prima di essere usato. Le chiamate al LLM hanno un limite di concorrenza configurabile e vengono ritentate con backoff. Le credenziali Adzuna sono mascherate nei messaggi di errore e restano fuori dai log delle richieste.
