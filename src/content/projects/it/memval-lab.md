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

Un gate di verifica filtra le lezioni candidate, e un replay buffer mescola gli esempi nuovi con esempi di ancoraggio. Il modello base viene valutato, si addestra un adapter LoRA, si rivaluta il modello e il gate decide. Le valutazioni coprono casi target, correlati e non correlati, così il gate intercetta sia il "non ha imparato" sia l'"ha imparato, ma ha rotto qualcos'altro".

**Prossimo passo:** misurare il drift delle feature dentro il modello con sparse autoencoder (Gemma Scope 2) e con sonde lungo direzioni nello spazio delle attivazioni, come la refusal direction. È il prossimo passo, non ancora una feature.
