---
name: 'Persona'
node: lowerMid
role: primary
kind: tooling
tagline: "Anonimizza i documenti prima che arrivino a un'AI, e ripristina la risposta da un vault locale cifrato."
summary: "documenti anonimi prima dell'AI"
problem: "Chiedere a un'AI di lavorare su un contratto o sul foglio clienti significa mandarle nomi, codici fiscali e IBAN che non dovrebbero uscire dalla macchina."
outcome: 'Sul suo corpus di test sintetico, 16 documenti con 152 valori sensibili, ne individua 146 senza glossario e tutti i 152 con il glossario. Tratto questi numeri come un ratchet contro le regressioni, non come una garanzia.'
stack: ['Python', 'Argon2id', 'AES-GCM', 'DOCX', 'XLSX']
status: active
repo: https://github.com/ragePolpette/Persona
---

Persona sostituisce i valori sensibili con segnaposto brevi e deterministici come `[PERSONA_1]` o `[AZIENDA_2]`: all'interno di un progetto, lo stesso valore riceve sempre lo stesso segnaposto. La corrispondenza resta sulla mia macchina, in un vault per progetto cifrato con AES-256-GCM e chiave derivata con Argon2id. Quando l'AI risponde, `persona restore` rimette al loro posto i valori originali e segnala i segnaposto inventati, persi o alterati.

Legge DOCX, XLSX, Markdown e testo semplice. Il rilevamento lavora a strati: un glossario per progetto, identificativi validati con checksum come IBAN, codice fiscale, partita IVA e indirizzi email, numeri di telefono, ed euristiche per nomi, aziende e indirizzi. Nelle tabelle, ogni cella sotto un'intestazione come `Nome`, `Email` o `Codice Fiscale` viene mascherata per intero, anche quando nessun rilevatore riconosce il valore.

Prima di dichiarare un file condivisibile, Persona riapre il file effettivamente scritto e lo analizza di nuovo; se resta qualcosa di sensibile, non scrive nulla. Il rilevamento è euristico, quindi l'output va comunque rivisto da una persona prima che escano dati reali.
