# Piano — gianmarcobastianelli.dev

> Stato: **approvato** (24/09/2026). Le decisioni prese sono segnate con ✅.
> Legenda: ⚠️ = problema reale trovato durante la verifica · ❓ = decisione tua · `TODO` = informazione mancante, non la invento.

---

## 0. Cose che ho trovato verificando i repo (leggi prima queste)

Ho letto i README e la struttura dei repo pubblici. Alcune cose non tornano con il brief:

1. ⚠️ **Exodia è pubblico, con codice** (`ragePolpette/Exodia`, licenza MIT, CI attiva). Il brief dice "case study senza codice". Il repo sembra già ripulito (README "public-safe", hygiene scan, niente nomi cliente), ma solo tu sai se pubblicarlo va bene rispetto all'azienda. ✅ Si linka.
2. ⚠️ **llm_context non usa nomic-embed-code nel codice pubblico.** Il default è `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` (384 dimensioni, in `cli.py` e `config.yaml`); "nomic" non compare da nessuna parte. Se localmente usi nomic-embed-code tramite config, il sito può dirlo solo se il repo lo supporta davvero. ✅ Confermato: il repo non supporta nomic. Il sito scrive "local embeddings".
3. ⚠️ **Licenze mancanti.** `llm_context`, `llm-bitbucket-mcp`, `mcp-dashboard`, `intra-model-memval-lab` e `Jobbby` non hanno un file LICENSE. Senza licenza un repo è "source-available", non open source: per legge nessuno può riusarlo. Se la serie si chiama "MCP open-source", conviene aggiungere una licenza (MIT, come Exodia/llm-memory/llm-sql-db-mcp) prima di pubblicare il sito.
4. ⚠️ **Igiene di llm_context.** Nella root c'è `start_mcp_server_non serve pi ui a un caszoo.bat`, oltre a `config.rework.yaml` e `reingest_completo.bat`. Un recruiter che clicca dal sito vede quel nome. Ti consiglio una pulizia prima del lancio.
5. ⚠️ **Il README di Jobbby** è solo una guida alla dry run, in italiano. Non spiega il motore a grafo, i run concorrenti o lo steering via Telegram, che però esistono nel codice (`src/GraphEngine`, `src/Discovery`, `src/Notifications/TelegramGateway.cs`, `HumanInputNode.cs`). Chi arriva dal sito si aspetta di trovare quello che ha appena letto.
6. **Nome esatto del repo Bitbucket:** `llm-bitbucket-mcp` (non `llm_bitbucket`). Il README dice Bitbucket **Cloud**, PR e pipeline, niente merge automatico. Non parla esplicitamente di "N repository", ma i tool sono per repository: scrivo "più repository" solo se me lo confermi.
7. **latent-refine-lab è privato**, quindi niente link. **Yesod non ha un repo** tra quelli visibili, quindi niente link.
8. **llm-sql-db-mcp** supporta **solo SQL Server** (lo dice il README) e sostituisce `llm-db-dev-mcp` e `llm-db-prod-mcp` (pubblici, deprecati): non li includo.
9. **Repo pubblici non citati**: `Persona` e `heretic` (fork). **Esclusi entrambi** (confermato).
10. **Le 5 carte di Exodia** (confermate): **Testa** = Exodia, harness core · **Braccio destro** = Atlassian MCP, intake da Jira · **Braccio sinistro** = Bitbucket MCP (`llm-bitbucket-mcp`), PR e pipeline · **Gamba destra** = `llm_context`, retrieval semantico · **Gamba sinistra** = `llm-memory`, memoria per ticket. L'Atlassian MCP è un componente esterno, non un tuo repo: il sito lo presenta come integrazione, non come progetto tuo. Tre dei cinque MCP in vetrina sono quindi "pezzi" di Exodia: sull'albero questa relazione diventa visibile (vedi §2).

---

## 1. Stack

**Astro + TypeScript strict, output statico, deploy su Cloudflare Pages.** Accolgo il tuo consiglio, perché qui Astro è la scelta giusta: l'HTML è statico di default e il JS arriva solo dove serve. Next/SvelteKit non ti farebbero guadagnare niente e porterebbero più runtime.

| Strato | Scelta | Perché |
|---|---|---|
| Framework | Astro (ultima stabile), `output: 'static'` | HTML statico per SEO, zero JS di default |
| Contenuti | Content collections + schema Zod | Un progetto = un file `.md` per lingua, validato in build |
| Albero | **SVG generato in build da Astro + un modulo TS vanilla** per le interazioni | Vedi sotto |
| Animazioni | CSS + Web Animations API; **GSAP solo se serve** | 0 KB contro ~25 KB gz; il 2.5D non richiede un motore |
| Transizione al dettaglio | **Cross-document View Transitions** (nativo) | Effetto "zoom" su URL reali e statiche, senza router SPA |
| Particelle | `<canvas>` 2D, lazy | Niente WebGL, first paint indipendente |
| Font | Self-hosted (Fontsource), woff2 con subset latin | Nessuna richiesta a Google, niente CLS |
| OG image | `satori` + `@resvg/resvg-js` **solo in build** | PNG per pagina con l'albero; zero peso lato client |
| Hosting | Cloudflare Pages | Statico, `_headers` per CSP/HSTS, gratis. Vercel va bene uguale: l'output è portabile |

**SVG vs Three.js/R3F.** SVG, senza dubbi. Three.js pesa più di 150 KB, rende il first paint dipendente da WebGL, rende i nodi inaccessibili (un canvas non ha link né focus) e non dà nulla di utile che non si possa ottenere in 2.5D con parallax a strati + glow. Con l'SVG in build, invece, ogni nodo è un vero `<a href="/projects/yesod">` nell'HTML: funziona senza JS, viene indicizzato e si naviga da tastiera gratis.

**Perché niente React/Svelte per l'isola.** L'albero non ha uno stato complesso: hover, focus, qualche classe e un'animazione. Un runtime di framework sarebbe peso morto. Se più avanti l'interazione cresce (per esempio con un filtro per stack), Svelte è l'aggiunta più leggera.

**Dipendenze runtime lato client: zero** (salvo GSAP, se lo vogliamo). Build: astro, @astrojs/sitemap, typescript, fontsource, satori, resvg.

### Tipografia (proposta)
- **Display: Syne** (700–800, variabile) — **confermato**. È quello con più carattere dei tre. Space Grotesk è pulito ma ormai è il font di default di metà dei siti tech: non "resta impresso". Unbounded è molto largo: sul mobile un titolo come "Gianmarco Bastianelli" va a capo male. Syne solo per i titoli, mai per il testo.
- **Mono: JetBrains Mono** per label, metadati e stato.
- **Testo corrente**: stack di sistema (`system-ui`), zero byte. Assunzione: se preferisci Inter lo aggiungo.
- **Lettere ebraiche**: **niente font ebraico**. Le 11 lettere diventano path SVG inline (`aria-hidden`): costo quasi nullo e resa identica ovunque.

---

## 2. Mapping progetti → sephirot

Layout classico: pilastro destro (Chokhmah, Chesed, Netzach) **ciano**, sinistro (Binah, Gevurah, Hod) **magenta**, centrale (Keter, Da'at, Tiferet, Yesod, Malkuth) **oro**.

I progetti sono 10 più 3 sezioni, per 11 nodi. Due nodi devono ospitare più di un progetto. Propongo **un progetto principale per nodo più eventuali "satelliti"**: piccoli punti che orbitano attorno al nodo. Così ogni nodo mostra comunque *un* nome e *una* riga, come chiedi, e gli altri si vedono nel pannello.

| Sephirah | Significato | Contenuto | Motivazione |
|---|---|---|---|
| **Keter** (vertice) | la corona, l'origine | Chi sono + manifesto | L'origine di tutto il resto è il "perché" |
| **Chokhmah** | l'intuizione grezza, il lampo | **latent-refine-lab** | Idea architetturale speculativa, in fase seminale |
| **Binah** | la comprensione che dà forma | **memval-lab** | Pipeline rigorosa: eval, gate, misura di cosa il modello ha davvero imparato. Nessun progetto si chiama "Binah" |
| **Da'at** (nascosta) | la conoscenza, il nodo invisibile | Contatti | Easter egg: nodo "velato" che si rivela all'hover. **I contatti restano comunque nell'header e nel footer**: trovarli non può dipendere dall'easter egg |
| **Chesed** | espansione, il dare senza misura | **llm-memory** + satellite **llm_context** | Open source come dono; espandere ciò che un agente sa e ricorda |
| **Gevurah** | limite, rigore, giudizio | **llm-sql-db-mcp** | Il più "Gevurah" di tutti: policy per target, SQL guard, recinti non aggirabili in produzione, anonimizzazione |
| **Tiferet** (centro) | equilibrio, bellezza, il cuore | Lavoro enterprise (.NET/WCF multi-tenant, SDI, conservazione a norma) | Il centro di gravità: il lavoro che tiene insieme tutto |
| **Netzach** | perseveranza, vittoria, spinta | **Jobbby** | Motore che insiste: run concorrenti, fonti che si allargano; primo caso d'uso la ricerca di lavoro |
| **Hod** | Mercurio: comunicazione, strumenti, precisione | **mcp-dashboard** + satellite **llm-bitbucket-mcp** | Strumentazione e messaggeri: osservare lo stack, parlare con i repository |
| **Yesod** | il fondamento | **Yesod** | Stesso nome; poggia su Exodia e la supera |
| **Malkuth** (base) | il regno manifesto | **Exodia** | Arrivato in produzione e presentato in QBR |

Con questo mapping **nessun nodo resta dormiente**.

**Satelliti o un progetto per nodo?** ✅ **Scelta A (satelliti).** Ci sono 8 progetti (2 di ricerca, 5 MCP e Jobbby) da distribuire su 6 nodi liberi. "Un progetto per nodo", quindi, in senso stretto non ci sta. Le alternative sono:
- **A. Satelliti** (consigliata): ogni nodo ha un progetto principale, con nome e riga di descrizione. I progetti in più sono piccoli punti in orbita, ognuno con il proprio link, il proprio focus e la propria pagina. Tutti gli 8 progetti stanno sull'albero.
- **B. Uno per nodo**: 6 progetti sull'albero; gli altri 2 (per esempio mcp-dashboard e llm-bitbucket-mcp) finiscono in una fila "tooling" sotto l'albero e nella vista lista. L'albero è più pulito, ma quei due progetti diventano cittadini di serie B.

*(Correzione rispetto alla prima bozza: l'alternativa che avevo scritto metteva comunque due progetti in Gevurah, quindi non era davvero "uno per nodo".)*

**Overlay "Exodia assemblato".** Hover o focus su Malkuth (Exodia) illumina anche i nodi e i satelliti delle sue carte: llm-memory, llm_context e llm-bitbucket-mcp. È una relazione reale fra i progetti, sovrapposta ai sentieri classici dell'albero. Funziona con entrambe le opzioni.

Nota onesta sul concept: la Kabbalah è una tradizione religiosa viva. L'estetica "circuito, non pergamena" evita l'effetto new age, ma aggiungerei una riga in pagina del tipo "Why these names? I name my projects after the sephirot; the tree is just the map", così nessuno pensa a un sito esoterico.

---

## 3. Pagine e rotte

Inglese su `/`, italiano su `/it/`, con URL speculari. Ogni pagina ha `hreflang`, canonical e OG propri.

```
/                        Home: hero, albero, vista lista, footer contatti
/projects/[slug]         Dettaglio progetto (statico, deep-linkabile)
/about                   Keter: storia (autodidatta), manifesto, stack, moto
/work                    Tiferet: lavoro enterprise (nessun case study sulla migrazione)
/contact                 Da'at: contatti (esiste come pagina per il deep link)
/404
/og/[slug].png           OG image generate in build
/sitemap-index.xml, /robots.txt
/it/...                  stesse rotte in italiano
```

**Home, dall'alto in basso.** Per i 30 secondi del recruiter, *prima* dell'albero e senza animazioni che la nascondano, c'è una riga "at a glance":
`Backend .NET · 6+ anni · Bologna · AI engineering (agenti, MCP, memoria LLM) · GitHub · LinkedIn`.
Poi viene l'albero, con il toggle "Albero / Lista" sticky e sempre visibile.

**Click su un nodo.** Si naviga a `/projects/[slug]` con una View Transition: il nodo "si espande" nel titolo della pagina di dettaglio. Il risultato è un URL vero e statico, con HTML completo. Senza supporto (Firefox, reduced-motion) diventa una navigazione normale. Un pannello-overlay SPA sopra l'albero sarebbe più scenografico, ma costerebbe un router lato client e HTML duplicato: non ne vale la pena.

**Struttura del codice e dei contenuti.**
```
src/content/projects/{en,it}/<slug>.md   frontmatter: name, tagline, problem, stack[], status,
                                         repo?, sephirah, role (primary|satellite), order
src/content/pages/{en,it}/*.md           about, work, manifesto
src/i18n/{en,it}.json                    UI strings (label, nav, nomi e significati sephirot)
src/data/tree.ts                         geometria: posizioni nodi, sentieri, pilastri (layout, non testo)
src/components/tree/                     Tree.astro (SVG in build) + tree.ts (enhancement)
```
Lo schema Zod fa fallire la build se due progetti primari occupano la stessa sephirah, se `repo` non è un URL `github.com/ragePolpette/...` o se manca la traduzione di un progetto. Per aggiungere un progetto basta creare un file `.md` per lingua.

---

## 4. Rischi e mitigazioni

### Performance (obiettivo Lighthouse mobile ≥ 90, LCP < 2.5s)
| Rischio | Mitigazione |
|---|---|
| Il glow con `feGaussianBlur` animato è costosissimo, soprattutto su mobile | Glow = tratto duplicato già sfocato e statico, di cui si anima solo l'`opacity`. Filtri solo sul nodo attivo |
| Grana/noise a tutto schermo con `feTurbulence` animato | Tile di rumore statico piccolo (PNG/SVG, circa 2 KB) in `background`, mai animato |
| Energia che scorre sui sentieri | `stroke-dashoffset` via WAAPI (compositor-friendly), solo sui sentieri attivi |
| Particelle | Canvas 2D con numero di particelle limitato e DPR ≤ 2. Pausa fuori viewport (IntersectionObserver) e con tab nascosta. Spente con reduced-motion, `saveData` e sui dispositivi con pochi core |
| Parallax sul mouse | Un solo listener, throttling con `rAF`, solo `transform`. Spento su touch e con reduced-motion |
| L'"accensione" dell'albero ritarda l'LCP | L'LCP è l'`<h1>` del nome, che **non** parte da `opacity: 0`. L'albero si accende *dopo* ed è già visibile, anche se spento, senza JS |
| Font e CLS | Solo 2 famiglie, woff2 subset, preload del display, fallback con `size-adjust` |
| Il JS dell'albero blocca il main thread | Modulo caricato lazy quando l'albero entra in viewport; niente JS nel critical path |

### Accessibilità
- Ogni nodo è un `<a>` dentro l'SVG, con testo visibile, `aria-label` completo e **focus ring evidente**. L'ordine di tabulazione segue il DOM (Keter → Malkuth). Le frecce per muoversi lungo i sentieri sono un extra, non un requisito.
- **L'anteprima dell'hover compare anche al focus**: nessuna informazione è disponibile solo con l'hover.
- Sentieri, particelle e lettere ebraiche sono `aria-hidden`, così lo screen reader non legge "alef" o fonemi a caso.
- Contrasto: gli accenti ciano, magenta e oro servono per tratti e glow, mentre **il testo resta quasi bianco** su `#07070B`. Il magenta non raggiunge l'AA come testo piccolo: verifico ogni coppia in fase di scaffold.
- `prefers-reduced-motion`: albero statico già acceso, niente particelle, niente parallax, niente View Transitions.
- La vista lista è una `<ul>` semantica con gli stessi contenuti. L'albero e la lista sono due viste dello stesso nav, non contenuti duplicati letti due volte.

### Mobile
L'albero rimpicciolito non funziona: 3 colonne di label a 360px sono illeggibili. Propongo uno **scroll guidato**: un mini-albero sticky in alto (circa 64px, solo punti e sentieri) evidenzia il nodo corrente, mentre sotto le card scorrono nell'ordine dell'albero, da Keter a Malkuth. Il sentiero si illumina man mano che scorri. Su mobile questa *è* anche la vista lista, quindi un solo componente copre due requisiti.

### Rischio di progetto (onesto)
L'albero è la parte più costosa e quella che interessa meno al recruiter frettoloso. Per questo propongo di costruire la **vista lista** già nello scaffold: in qualsiasi momento esiste un sito completo e pubblicabile, e l'albero è un miglioramento sopra.

### Sicurezza
- CSP stretta via `_headers` (niente script inline, oppure con hash tramite il supporto CSP di Astro). HSTS è già imposto dal TLD `.dev`, ma lo dichiaro comunque. Aggiungo `Referrer-Policy` e `Permissions-Policy`.
- Email: non compare mai in chiaro nell'HTML. È salvata offuscata in un attributo `data-` e ricomposta in JS al click (`mailto:`). Senza JS resta un fallback testuale tipo `gianmarco.bastianelli [at] gmail [dot] com`. Onestamente questo ferma solo gli scraper stupidi, cioè la maggior parte, ma non tutti.
- Nessun form, nessuna chiave, nessuna analytics di default: quindi niente cookie banner. Se vuoi le metriche, c'è Cloudflare Web Analytics, che è cookieless.

---

## 5. Tabella progetti (verificata)

Sorgente: elenco dei repo di `ragePolpette` con la loro visibilità e lettura dei README (24/09/2026). Le descrizioni sono in inglese perché l'inglese è la lingua di default; le versioni italiane arrivano nei file di contenuto.

| Progetto | Repo pubblico | Stato | Stack (da repo) | Descrizione (1 riga) | Note |
|---|---|---|---|---|---|
| **llm-memory** | https://github.com/ragePolpette/llm-memory | active | Python, SQLite + vettori, MCP | Local-first MCP memory: two tiers (strong + fast) across three scopes (project / workspace / global), with governance and audit trail. | ❓ "3 livelli" = i 3 scope? Confermami. Aggiungo "used daily in real work" come da brief |
| **llm_context** | https://github.com/ragePolpette/llm_context | active | Python, PostgreSQL + pgvector, MCP | Local-first MCP retrieval over code and docs: project-scoped, incremental ingest, pgvector-backed. | Embedding locali (nomic non supportato). ⚠️ Pulizia file (§0.4). ⚠️ Nessuna licenza |
| **llm-bitbucket-mcp** | https://github.com/ragePolpette/llm-bitbucket-mcp | active | Node.js, MCP HTTP | Constrained MCP surface for Bitbucket Cloud pull requests and pipelines, including failed-step log extraction. | Nome corretto rispetto al brief. ⚠️ Nessuna licenza |
| **llm-sql-db-mcp** | https://github.com/ragePolpette/llm-sql-db-mcp | active | Node.js, SQL Server (`mssql`), MCP | **[da validare]** Policy-driven MCP server for SQL Server: per-target read/write rules, SQL guard rails and anonymization before results leave the server. | Sostituisce llm-db-dev/prod-mcp |
| **mcp-dashboard** | https://github.com/ragePolpette/mcp-dashboard | active | Python (FastAPI) + frontend | **[da validare]** Local control plane for a workstation MCP stack: start/stop services, unified logs, vault-backed secrets, llm-memory admin. | ⚠️ Nessuna licenza |
| **memval-lab** | https://github.com/ragePolpette/intra-model-memval-lab | research · active | Python, transformers + peft, Gemma 3 270M IT | In-model memory consolidation: real LoRA training, before/after evals and a working promote/rollback gate. Next: SAE-based feature drift (Gemma Scope 2) and activation-direction probes. | Il README conferma che il drift SAE **non** c'è ancora: lo presento come "next step". ⚠️ Nessuna licenza |
| **latent-refine-lab** | — (privato) | early research | `TODO` | Hybrid architecture POC: diffusion in training and ingest, autoregressive output; starts from a frozen decoder on a single GPU. | Niente link |
| **Exodia** | https://github.com/ragePolpette/Exodia | active (in produzione) | Node.js, MCP, provider-agnostic | Autonomous agent that takes a Jira ticket to a pull request, with multi-agent verification and an async clarification loop via ticket comments. | ⚠️ Pubblico, al contrario di quanto dice il brief (§0.1). Le 5 carte sono in §0.10 |
| **Yesod** | — (nessun repo) | active | NousResearch Hermes Agent, `TODO` | Personal meta-orchestrator on Hermes Agent: runs tasks autonomously, refines or expands my inputs, supports mid-run steering (validated with spike tests). | Niente link |
| **Jobbby** | https://github.com/ragePolpette/Jobbby | active | C# / .NET | Task-agnostic agent-graph engine with concurrent runs, human-approved source discovery and two-way steering via Telegram. First use case: job search. | ⚠️ README da aggiornare (§0.5). ⚠️ Nessuna licenza |

Altri `TODO` che non posso ricavare dai repo:
- link alla serie "build in public" su LinkedIn (post o hashtag);
- ~~case study della migrazione di 7M righe~~: ✅ **escluso per ora**, sia come case study sia come riga;
- Exodia: i 5 componenti e un'immagine o diagramma presentabile (senza dettagli aziendali).

---

## 6. Assunzioni esplicite

1. Il dominio `gianmarcobastianelli.dev` è già tuo e lo punteremo su Cloudflare Pages.
2. Niente analytics e niente cookie.
3. Il testo corrente usa font di sistema; Syne solo per i titoli.
8. La migrazione di 7M righe per ora non compare sul sito.
4. Moto: una riga in /about, niente di più.
5. Il copy lo scrivo io partendo dal brief e dai README, poi lo rivedi tu. Nessuna metrica, stella o feature inventata; dove manca un'informazione compare un `TODO` visibile anche in pagina, in dev.
6. Firme dei commit: autore `Claudio⚡`, senza trailer (ho interpretato "Cluadio" come un refuso).
7. `main` è il branch predefinito. Ogni macro step ha un proprio branch e una propria PR, che viene unita a `main`.

## 7. Fasi

Ogni macro step ha un proprio branch e una propria PR verso `main`, e viene unito a `main` quando è completo e validato.

1. **Scaffold**: Astro, TS strict, lint, i18n, content collections con schema, layout base, vista lista funzionante, header e footer con i contatti, `_headers`, sitemap. A questo punto il sito è già pubblicabile.
2. **Prototipo albero** isolato su `/lab/tree` (non linkato, `noindex`): SVG, accensione, hover/focus, sentieri, View Transition, reduced-motion, versione mobile. **Validazione con te.**
3. **Pagine di contenuto**: dettagli dei progetti, /about, /work, /contact, OG image, traduzione in italiano.
4. **Audit**: Lighthouse mobile, axe, test da tastiera, verifica del contrasto.
