---
name: Jobbby
sephirah: netzach
role: primary
tagline: Motore a grafo di agenti, indipendente dal task. Primo caso d'uso, la ricerca di lavoro.
summary: grafo di agenti guidato via Telegram
problem: I workflow di agenti che durano a lungo hanno bisogno di concorrenza, di approvazione umana nei punti giusti e di un modo per guidarli da ovunque.
stack: [C#, .NET, LLM, Telegram]
status: active
repo: https://github.com/ragePolpette/Jobbby
---

Jobbby è un motore a grafo per agenti: i nodi fanno il lavoro e al grafo non interessa quale sia il task. Più run possono girare in parallelo.

Le nuove fonti trovate durante la discovery non vengono usate finché un umano non le approva. Lo steering è bidirezionale via Telegram: il motore chiede quando gli serve un input e io posso cambiargli direzione dal telefono.

Il primo caso d'uso è la ricerca di lavoro: raccoglie annunci, li normalizza con un LLM, valuta quanto ciascuno è compatibile con un CV e tiene traccia degli esiti.
