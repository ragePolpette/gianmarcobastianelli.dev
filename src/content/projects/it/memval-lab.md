---
name: memval-lab
sephirah: binah
role: primary
tagline: Consolidare la memoria dentro il modello, con training LoRA reale, eval prima e dopo e un gate che promuove o fa rollback.
problem: Un modello piccolo può imparare dai propri episodi senza rompere in silenzio quello che sapeva già? E come ce ne accorgeremmo, se succedesse?
stack: [Python, PyTorch, Transformers, PEFT/LoRA, Gemma 3 270M IT]
status: research
repo: https://github.com/ragePolpette/intra-model-memval-lab
---

Il lab esegue un ciclo completo di consolidamento dall'inizio alla fine. Un gate di verifica filtra le lezioni candidate. Un replay buffer mescola gli esempi nuovi con degli esempi di ancoraggio. Il modello base viene valutato, poi si addestra un adapter LoRA su **Gemma 3 270M IT**, si rivaluta il modello e un gate decide se promuovere l'aggiornamento o fare rollback.

Le valutazioni coprono casi target, correlati e non correlati, così il gate intercetta sia il "non ha imparato" sia l'"ha imparato ma ha rotto qualcos'altro". Per ora lo scorer è volutamente semplice: prima serviva validare il ciclo.

**Prossimo passo:** misurare il drift delle feature dentro il modello, con sparse autoencoder (Gemma Scope 2) e sonde lungo direzioni nello spazio delle attivazioni, come la refusal direction. Niente di tutto questo esiste ancora: è il prossimo passo, non una feature.
