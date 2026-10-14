---
name: 'memval-lab'
node: upperLeft
role: primary
kind: research
tagline: 'Consolidare la memoria dentro il modello: training LoRA reale, eval prima e dopo, un gate che promuove o fa rollback.'
summary: 'memoria consolidata nei pesi'
problem: 'Un modello piccolo può imparare dai propri episodi senza rompere in silenzio quello che sapeva già? E come ce ne accorgeremmo, se succedesse?'
outcome: "Il ciclo completo funziona dall'inizio alla fine: un aggiornamento LoRA su Gemma 3 270M IT viene addestrato, valutato prima e dopo, e promosso o annullato in automatico."
stack: ['Python', 'PyTorch', 'Transformers', 'PEFT/LoRA', 'Gemma 3 270M IT']
status: research
repo: https://github.com/ragePolpette/intra-model-memval-lab
---

Un gate di verifica filtra le lezioni candidate, e un replay buffer mescola gli esempi nuovi con esempi di ancoraggio. Il modello base viene valutato, si addestra un adapter LoRA, si rivaluta il modello e il gate decide se promuovere l'adapter o fare rollback. Le valutazioni coprono casi target, correlati e non correlati, così il gate intercetta sia il "non ha imparato" sia l'"ha imparato, ma ha rotto qualcos'altro".

Le risposte sono valutate con una rubrica: gruppi di termini obbligatori con alternative, più termini vietati, così anche una parafrasi può passare. È un'evidenza basata su parole chiave, non un giudizio semantico. Ogni run scrive un manifest dell'esperimento con versioni dei pacchetti, commit git, revisione del modello, configurazione, seed e metriche prima e dopo, così ogni risultato si può ricondurre esattamente a ciò che l'ha prodotto.

**Prossimo passo:** misurare il drift delle feature dentro il modello con sparse autoencoder (Gemma Scope 2), come parte del gate. Per ora c'è solo uno spike usa e getta per caricarli su questo modello: il controllo del drift vero e proprio non è ancora implementato.
