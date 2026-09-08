# Modello dei contenuti — versione aggiornata

Rispetto alla bozza iniziale (Giorno 1-2), i chiarimenti strutturali emersi da allora, in ordine:

1. Il layer Galton/Bateson non è un singolo campo a valori multipli: sono **due assi separati** (vedi sotto).
2. I dati "vivono" in due posti diversi a seconda della loro natura: il **teiHeader** descrive lo *studio* (bibliografia, metodo, standard), il **JSON/CSV** descrive i *risultati* (record per cultura/paese/evento, quelli che alimentano mappa/grafico/timeline). Il teiHeader non contiene mai i dati dei risultati.
3. Il progetto è ora **due rami sotto un unico atlante** (bacio + preistoria genere/lavoro), fusi non per raggiungere il numero minimo di item richiesto dalle linee guida ma perché condividono una tesi comune, resa esplicita in proemio: la scienza comparata costruisce ipotesi, le verifica, le rivede, talvolta le smentisce. Il ramo preistoria resta **solo in progettazione** (schema TEI/DC pensato, sito non implementato) — limite dichiarato, non omissione.
4. La navigazione non è un albero a scelta secca (bacio *oppure* preistoria come due mini-siti separati): è un **indice unico di record**, interrogabile per lista, mappa, timeline o ricerca per marcatura — un solo dato, più vie di accesso. Vedi "Schema del record condiviso" più sotto.

## Struttura per studio (livello item)

```
Studio (→ teiHeader, un file per studio)
├── titolo, autori (→ VIAF/ORCID, verificati per Jankowiak/Volsche/Garcia
│   e per i primi due firmatari di Watkins et al.; Arbøll/Rasmussen ancora da fare)
├── unità di analisi, scala (culturale / individuale-nazionale / testuale-storica)
├── metodologia, campione (N, criteri)
└── standard di codifica usato nel progetto (TEI / DC / CSV)

Risultati (→ record JSON/CSV, uno o più per studio, alimentano la UI)
├── cultura o area (→ Wikidata/GeoNames), o paese (→ ISO+Wikidata), o periodo storico
├── valore (presenza/assenza, frequenza, attestazione testuale)
├── stato del dato: documentato | interpretato-autore | interpretato-progetto
│     (riguarda la singola osservazione: chi ha prodotto questo dato e con
│      quanta mediazione interpretativa)
├── risoluzione_geografica: macro-regione | nazione | sito-puntuale
│     (NUOVO — v. nota sotto: serve perché sulla mappa unificata del ramo
│      bacio convivono dati a grana molto diversa)
├── fonte primaria citata (link, non riproduzione — es. CDLI P222183 per Barton)
├── relazione col nodo precedente (dc:relation)
└── layer Galton, SOLO dove il record confronta due o più culture/nodi:
      ├── tipo_relazione: diffusione-contatto | discendenza-comune | indipendenza-apparente
      │     (riguarda la relazione fra due osservazioni: perché due culture si
      │      somigliano o differiscono su questo tratto)
      └── confidenza_attribuzione: documentato | plausibile | indeterminato
            (riguarda quanto siamo sicuri di quel tipo_relazione — è l'attributo
             che aggancia il banner esplicativo sul "beneficio del dubbio")
```

Perché due assi e non uno a quattro valori: `tipo_relazione` è un'affermazione sostantiva (che genere di legame c'è, se c'è), `confidenza_attribuzione` è un giudizio epistemico su quell'affermazione (quanto ci fidiamo). Tenerli distinti evita di dire, per esempio, "indeterminato" come se fosse un quarto *tipo* di legame alla pari degli altri tre — non lo è, è l'ammissione che non sappiamo quale dei tre si applichi. In UI: `tipo_relazione` determina il colore/icona del collegamento sulla mappa; `confidenza_attribuzione` determina l'opacità o un badge, con il banner esplicativo agganciato a un click su quel badge.

Nota importante, da non confondere con quanto sopra: il ramo preistoria usa un **vocabolario relazionale diverso e non compatibile** — "tipo di relazione col nodo precedente" a valori conferma / critica-metodologica / complicazione, guidato dalla storiografia della scienza (come un nodo rivede quello prima), non dal problema di Galton (se una somiglianza fra culture è diffusione o discendenza indipendente). I due vocabolari restano deliberatamente distinti: usarne uno solo per entrambi i rami cancellerebbe proprio la distinzione fra "perché due culture si somigliano" (bacio) e "come la scienza corregge se stessa nel tempo" (preistoria) che è la tesi del proemio.

`risoluzione_geografica` — perché è stato aggiunto: senza questo campo, un punto sulla mappa che rappresenta "Africa subsahariana" (Jankowiak, macro-regione) e uno che rappresenta "Regno Unito" (Watkins, nazione) sarebbero disegnati come lo stesso tipo di dato. Non lo sono: hanno grana geografica diversa, e trattarli come equivalenti visivamente affermerebbe una precisione che i dati non hanno. Il campo determina forma/dimensione del marker e compare in legenda quando la mappa mostra più studi insieme.

## Schema del record condiviso (indice progetti/item)

Un solo indice (JSON, es. `progetti.json` o `indice.json`) alimenta: la pagina-catalogo dei progetti, le tre viste Lista/Mappa/Timeline di ogni ramo, e la ricerca per marcatura dalla pagina principale. Non è un file per il layer Risultati (quello resta per studio, come sopra) — è il livello sopra, un record per ogni **progetto** e uno per ogni **item** dentro un progetto:

```
Record progetto
├── id, nome ("bacio" | "preistoria")
├── stato_implementazione: sito-interattivo-completo | solo-progettazione
├── tesi_comune (testo breve, richiamato in lista progetti)
├── marcature[] (temi ad ampio spettro del progetto nel suo complesso — NON determina
│     l'ordine di visualizzazione, v. nota sotto; serve per un'eventuale ricerca/filtro
│     per tema quando i progetti saranno abbastanza numerosi da giustificarlo)
└── item[] (→ record item, sotto)
```

**Nota sull'ordine di visualizzazione della lista progetti**: è editoriale, non calcolato — coincide con l'ordine dell'array `progetti` nel JSON, deciso da chi cura l'atlante. Scartate deliberatamente due alternative "automatiche": ordine cronologico di inserimento (mescola la storia amministrativa del sito con il contenuto, non scala bene: il progetto più vecchio resterebbe sempre in cima solo per anzianità) e categorizzazione tematica rigida (prematura con solo due progetti: rischia di imporre una tassonomia sbagliata, da rifare al terzo o quarto progetto — lo stesso errore già corretto altrove in questo schema popolandolo con dati veri). Il campo `marcature` sopra tiene aperta la strada a un filtro per tema in futuro, senza forzare oggi una gerarchia sull'ordine della lista.

```

Record item (uno per studio/fonte: Jankowiak, Watkins, Arbøll/Rasmussen, Barton;
             8 citazioni nel ramo preistoria — v. nota sotto sulla granularità)
├── id, titolo, progetto di appartenenza
├── tipo_risorsa: studio-primario | saggio-di-sintesi | volume-curato | fonte-primaria-testuale | poster-multimediale
│     (affinato rispetto alla bozza iniziale, scrivendo il file vero: "studio-accademico"
│      appiattiva cose diverse — Jankowiak/Watkins raccolgono dato originale,
│      Arbøll/Rasmussen e Harari e Graeber/Wengrow argomentano su fonti altrui,
│      Lee&DeVore e Gero&Conkey sono volumi curati multi-autore. È anche il campo
│      che dimostra l'eterogeneità di tipologie richiesta dalle linee guida)
├── autori[]: { nome, ref (URI VIAF, ORCID, o Wikidata come rete di sicurezza
│     quando VIAF/ORCID non è reperibile — v. preistoria-bibliografia-normalizzata.md) }
│     — SOLO i firmatari dell'item, non nomi citati nell'apparato: v. limite dichiarato sotto
├── periodo_da, periodo_a (interi, non testo libero — es. Barton: -2500/-2500;
│     Jankowiak: 2015/2015 come proxy dichiarato, non datazione storica vera)
│     RINOMINATO da "anno_da/anno_a": rappresenta il periodo storico a cui il
│     contenuto dell'item si riferisce, NON l'anno di pubblicazione — altrimenti
│     un manufatto del 2500 a.C. pubblicato nel 2016 finirebbe piazzato nel 2016
│     su una timeline. Dove il periodo storico rappresentato non è verificabile
│     con la stessa cura degli altri dati (6 item del ramo preistoria) o non è
│     applicabile (opere teoriche/divulgative senza un singolo periodo), il campo
│     resta null con una nota_periodo esplicita — mai un numero indovinato.
├── risoluzione_geografica: macro-regione | nazione | sito-puntuale (dove pertinente)
├── aree_geografiche[] (NUOVO — nomi di luogo/regione, non coordinate: { nome, e a seconda del
│     caso iso2+n per un paese, presenza_bacio per una macro-regione in un confronto binario).
│     Le coordinate lat/lon per la vista Mappa si calcolano in JS da un dizionario nome→centroide,
│     non sono salvate qui: il dato che conta per la ricerca/verifica è il nome del luogo, non la
│     sua proiezione cartografica, che è un dettaglio di rendering)
├── nota_geografica (dove il dato ha un limite da dichiarare: fonte singola non incrociata,
│     provenienza incerta secondo il catalogo di riferimento, o una correzione fatta rispetto
│     a un valore precedente — stesso principio di nota_periodo)
├── anno_pubblicazione (NUOVO — intero, opzionale: l'anno in cui l'opera MODERNA è stata
│     pubblicata, distinto da periodo_da/periodo_a che è il periodo storico di cui l'opera
│     PARLA. Per Jankowiak 2015 e Watkins 2019 coincide col periodo (proxy dichiarato); per
│     Arbøll & Rasmussen è 2023, ben distinto dal periodo -2500/-600 discusso nel saggio.
│     Assente per fonti prive di un'opera moderna propria con autore identificato — qui il
│     Barton Cylinder, che ha autori:[] — su indicazione dello studente: alimenta la vista
│     Timeline "anno di pubblicazione", tenuta separata da quella "periodo storico
│     rappresentato" proprio per non mischiare le due cose)
├── anno_pubblicazione_alt (opzionale: { anno, nota } — per un'opera con più di una data di
│     pubblicazione rilevante, es. un'edizione originale e una traduzione anni dopo. Non
│     ancora usato da nessuno dei 4 item del bacio; predisposto per quando il ramo preistoria
│     avrà una pagina propria — es. Harari, edizione originale ebraica 2011, traduzione
│     inglese Harvill Secker 2014, quella citata nel progetto)
├── marcature[] (vocabolario controllato di temi: es. "genere-e-corpo", "comparazione-interculturale",
│     "fonte-primaria" — alimenta la ricerca dalla home)
└── link_riferimento[]: array di { url, tipo: "doi" | "cdli" | "museo" | "deposito-dati" | "isbn" }
      (array, non un singolo oggetto: alcuni item — es. Barton, Watkins — hanno più
      di un link tipizzato da mostrare in UI, non solo nel codice — richiesto dalle linee guida)
```

File vero: `data/progetti.json` — 2 progetti, 12 item (4 bacio, 8 preistoria a livello di singola citazione bibliografica, non ancora ricondotti alla struttura a sei nodi tematici dello schema originale preistoria: riconciliazione ancora da fare, dichiarata nel file stesso). Per la bibliografia normalizzata completa del ramo preistoria (identificativi, livello di certezza per ciascuno, le due correzioni di data/editore trovate) v. `preistoria-bibliografia-normalizzata.md`.

### Cosa è ricercabile (`ricerca.html`, aggiornato — non più solo un limite dichiarato)

**Aggiornamento**: il filtro descritto come "non ancora in UI" nella versione precedente di questo paragrafo è stato costruito — `ricerca.html` (con `ricerca-barra.js` montata su ogni pagina del sito, v. sotto §"Ricerca trasversale"). Il paragrafo resta qui, riscritto, perché descrive comunque cosa è ricercabile e cosa no — solo non più come limite futuro.

Ricercabili come entità (non come sottostringa libera su tutto il documento, per evitare falsi positivi): **titolo** (sottostringa, case-insensitive), **autore** (per nome, sottostringa su `autori[].nome`), **marcatura** (valore esatto, da un menu popolato a runtime — non testo libero, per evitare refusi silenziosi che restituirebbero zero risultati senza spiegazione), **luogo/area** (sottostringa su `aree_geografiche[].nome`), **periodo storico** (intervallo numerico su `periodo_da`/`periodo_a` — stesso dato della vista Timeline, non un meccanismo separato), **ente produttore** (per tipo, sui soli `link_riferimento[].tipo` che indicano un ente che detiene/produce il dato: `ente-dati`, `deposito-dati`, `cdli`, `museo` — non `rivista`, che pubblica lo studio ma non lo detiene).

Le marcature vivono a **due livelli**: sul singolo item, o sul progetto nel suo complesso (es. `problema-di-galton` descrive l'intera cornice epistemologica del ramo bacio, non un item specifico — v. §"Vocabolario dei facet" sotto). Il filtro cerca su entrambi i livelli: un item eredita, ai fini della ricerca, anche le marcature del proprio progetto. Bug reale trovato in test e corretto: la prima versione del filtro leggeva solo `item[].marcature`, perdendo 5 marcature esistenti solo a livello di progetto — un link diretto tipo `ricerca.html?marcatura=problema-di-galton` restituiva tutti e 12 gli item invece dei soli 4 del ramo bacio. I badge dei risultati mostrano ora entrambi i livelli, altrimenti un risultato trovato per una marcatura di progetto apparirebbe senza quel badge, come un errore di corrispondenza.

Non sono marcati né ricercabili: nomi di studiosi citati solo nell'apparato bibliografico o nelle didascalie senza essere autori di un item (es. autori menzionati di sfuggita in una nota editoriale). Fare authority control su ogni nome mai nominato nel sito è un progetto a sé, fuori scala per un lavoro d'esame di dieci giorni — lo si dichiara qui esplicitamente come **limite di perimetro**, sullo stesso modello con cui sono già stati dichiarati i limiti di accesso a eHRAF (Jankowiak) e l'uso dei soli dati aggregati OSF ricalcolati (Watkins): non è un'omissione silenziosa, è una scelta di scopo motivata e verificabile, riportabile in sede di orale.

Ricerca su un autore presente (in astratto, per progetti futuri) in più progetti: risolve sulla sottostringa del nome (non ancora sull'identificativo VIAF/ORCID — limite dichiarato, coerente con la ricerca per nome, non per URI, di tutti gli altri campi testuali di questo modulo); apre una pagina di risultati con un item per riga, ciascuno marcato col progetto di appartenenza e link diretto alla scheda — non un menu a scomparsa. Con gli autori attuali (nessuno condiviso fra i due rami) questo caso non si presenta mai in pratica, ma il campo è già cercabile per quando/se si presentasse.

## I quattro item del ramo bacio, con lo stato dati aggiornato

| Item | Fonte per i Risultati | Stato |
|---|---|---|
| Jankowiak, Volsche & Garcia 2015 | **Solo dato aggregato pubblicato**: 46% (77/168 culture) presentano bacio romantico-sessuale, con le macro-aree nominate nel testo. Niente eHRAF (accesso non disponibile, Bologna non è tra gli enti convenzionati, trial individuale escluso da policy HRAF per lavori di corso). Risoluzione: macro-regionale, non per singola cultura — limite dichiarato. | teiHeader e JSON completi |
| Watkins et al. 2019 | Dati **individuali reali** scaricati dal deposito OSF ufficiale (osf.io/pbqwm): N = 2.379 partecipanti idonei su 2.988 raccolti, aggregati per noi a livello di paese (13 paesi, 6 continenti) e verificati per coincidenza a due decimali con la tabella aggregata già pubblicata dagli stessi autori nello stesso deposito. Risoluzione: nazione — più fine di Jankowiak, per questo il campo `risoluzione_geografica` è necessario sulla mappa condivisa. | teiHeader e JSON completi |
| Arbøll & Rasmussen 2023 | Science 380(6646), pp. 688-690, DOI 10.1126/science.adf0512 — **Perspective**, non ricerca originale: sintesi argomentativa su fonti testuali già note (incluso, indirettamente, il Barton Cylinder) + letteratura epidemiologica su HSV-1 e simili. Nessun file di Risultati: non produce dato osservazionale per mappa/grafico. | teiHeader completo (`tei/arboll-rasmussen-2023.xml`). ORCID di entrambi gli autori confermato (Arbøll su portale istituzionale; Rasmussen verificato manualmente dallo studente) |
| Barton Cylinder | Fonte primaria testuale, ca. 2500 a.C., CDLI P222183 / Penn Museum CBS 8383. Trascrizione/traduzione: Lisman 2016-2017, JEOL 46. | Epigrafe TEI in `tei/bacio-epigrafe-barton.xml`; testo TEI a pieno delle colonne I-II in `tei/barton-cylinder-testo.xml` (verificato su 3 fonti indipendenti: epigrafe già esistente, ATF di CDLI, PDF di Lisman — v. `docs/note-per-orale.md` §2), colonne III-XX linkate a CDLI anziché ri-trascritte, limite dichiarato nel `sourceDesc`; item-page `barton-cylinder.html` costruita e testata |

**Dati geografici (`aree_geografiche`) verificati per la futura vista Mappa**: Watkins — i 13 paesi e i relativi N sono ricalcolati direttamente dal CSV grezzo del deposito OSF (somma = 2.379, identica al paper: verifica da fonte primaria). Jankowiak — le 8 macro-regioni (4 con bacio, 4 senza) vengono da una fonte secondaria unica (HRAF), non dall'abstract ufficiale (bloccato da Wiley) né incrociata: certezza a fonte singola, dichiarata come tale. Arbøll & Rasmussen — **corretto** `risoluzione_geografica` da "sito-puntuale" a "macro-regione" dopo aver controllato il testo integrale (Oxford Research Archive): il saggio non nomina mai un sito, solo "Mesopotamia" in generale — assegnargli un punto preciso avrebbe affermato una precisione inesistente nella fonte. Barton Cylinder — provenienza Nippur secondo CDLI, ma la stessa scheda CDLI la marca "[uncertain]" con un'alternativa ("Kesh?"): incertezza dichiarata dall'istituzione che cataloga il pezzo, non nostra.

## Proemio e struttura del sito

`tei/proemio-epigrafi.xml`: un paragrafo redazionale di cornice + citazione epistemologica (Popper, *Conjectures and Refutations*, 1963) + tre epigrafi antropologiche (Geertz 1973, Ingold 2018, Hurston 1935), ciascuna con `<note type="didascalia">` redazionale distinta dalla fonte citata. Scartate in corso d'opera: Benedict 1946 (giudizio dello studente) e Mead 1928 (nessuna citazione verificabile da fonte primaria attribuibile a lei stessa, solo alla prefazione di Boas — scelta di onestà citazionale, non di merito sul suo lavoro). Due epigrafi in precedenza qui sono state spostate altrove, per motivi diversi e in momenti diversi: il Barton Cylinder in `tei/bacio-epigrafe-barton.xml` (fonte primaria del solo ramo bacio, non del proemio generale); l'AAA *Statement on Human Rights* (1947) in `tei/catalogo-epigrafe-aaa1947.xml`, su indicazione dello studente — il tema (relativismo culturale contro pretese di universalità) è risultato più pertinente nel punto in cui si sceglie fra le due indagini comparative che nella cornice epistemologica generale.

Sitemap:

```
index.html — proemio (cornice + 4 citazioni: Popper, Geertz, Ingold, Hurston)
  + pulsante "vai al catalogo"
  └── catalogo.html — epigrafe AAA 1947 "in alto a lato" (testo integrale,
      non condensato — v. sopra), lista progetti (bacio: sito completo;
      preistoria: solo progettazione, etichettato in modo diseguale e onesto),
      tesi comune in testa
        └── pagina ramo bacio (ramo-bacio.html, fatta) — Barton Cylinder in cima,
            poi tre viste (Lista / Mappa / Timeline) sullo stesso indice di 4 item
              └── quattro pagine item, tutte fatte — metadata HTML+DC caricati da
                  progetti.json via fetch, TEI/DC linkati, visualizzazione propria:
                  barton-cylinder.html (testo TEI colonne I-II in HTML bilingue,
                  righe del bacio evidenziate), jankowiak-2015.html (tabella del
                  dato aggregato per macro-regione), watkins-2019.html (scatterplot
                  GINI×bacio in SVG puro), arboll-rasmussen-2023.html (sintesi
                  argomentativa, nessun dato osservazionale proprio)
```

## Vocabolario dei facet (`marcature`) e ricerca trasversale (`ricerca.html`)

I 12 record item hanno `marcature[]` popolate con temi reali (non ipotetici), raggruppabili in famiglie di facet che emergono dai dati stessi:

- **genere/corpo** — attraversa entrambi i rami: `genere-e-corpo` (Jankowiak), `genere-e-guerra` (Hedenstierna-Jonson, Price), `genere-e-lavoro` (marcatura di progetto, preistoria), `identità-di-genere` (Moilanen). È il facet più significativo perché un filtro su questo tema restituisce item da entrambi i progetti — mostra nell'interfaccia, non solo in prosa, la tesi comune dell'atlante.
- **metodo/critica epistemologica** — `problema-di-galton` (bacio, a livello di progetto), `critica-metodologica` (Gero & Conkey), `riesame-metodologico` (Moilanen), `critica-a-modelli-evolutivi-lineari` (Graeber & Wengrow): il facet che riprende in pratica il tema Popper del proemio.
- **tipo di evidenza** — `fonte-primaria`/`testo-cuneiforme` (Barton), `genomica-antica`/`isotopi-e-osteologia` (Hedenstierna-Jonson, Price, Haas), `dato-quantitativo-individuale` (Watkins), `sintesi-argomentativa`/`sintesi-divulgativa` (Arbøll & Rasmussen, Harari, Graeber & Wengrow): distingue chi lavora su fonti dirette da chi argomenta su fonti altrui.

**Aggiornamento — il limite qui sotto è stato risolto**: la versione precedente di questo paragrafo dichiarava il filtro come non ancora costruito, per un motivo preciso — a livello di *progetto* (solo 2 record) qualunque facet produce risultati binari (0/1/2), che non è filtrare, è decorare un'interfaccia con una profondità di dati che non esiste (principio del faceted search: Hearst, *Design Recommendations for Hierarchical Faceted Search Interfaces*, 2006; progetto Flamenco, UC Berkeley — un facet è utile quando distribuisce i risultati in modo abbastanza vario da orientare una scelta). A livello di *item* (12 record) la distribuzione è già utile, com'era già chiaro allora: è lì che il filtro andava costruito, non nel catalogo dei soli 2 progetti — ed è lì che è stato costruito.

**`ricerca.html`** (con `ricerca-barra.js`, la barra compatta montata su ogni pagina del sito — v. `<div id="barra-ricerca-globale">` in ciascun `<header>`, tranne `index.html`, dove non c'è ancora nulla da cercare al primo carico, e la stessa `ricerca.html`, per non duplicare l'interfaccia): filtro client-side su `data/progetti.json`, per titolo/parola chiave, autore, marcatura (menu a tendina popolato a runtime, non testo libero), luogo/area, periodo storico (intervallo, riusa `periodo_da`/`periodo_a`), ente produttore (solo `link_riferimento[].tipo` che detengono/producono il dato — `ente-dati`, `deposito-dati`, `cdli`, `museo` — non `rivista`, distinzione dichiarata anche nell'interfaccia). Nessun campo obbligatorio; i criteri si combinano in AND, non in OR. Ogni badge-marcatura del sito (pagine item, `dati.html`, risultati stessi) è un link diretto a `ricerca.html?marcatura=...`, precompilato leggendo `location.search` — la marcatura non è mai un vicolo cieco testuale.

Le marcature vivono a **due livelli**, item e progetto (v. sopra: `problema-di-galton`, `genere-e-lavoro` ecc. esistono solo su `progetti[].marcature`, non su un item specifico) — il filtro cerca su entrambi, un item eredita ai fini della ricerca le marcature del proprio progetto, altrimenti una marcatura scritta in `progetti.json` sarebbe tecnicamente presente ma di fatto irraggiungibile dalla ricerca.

## La pagina dei dati (`dati.html`)

Tabella di riconciliazione delle autorità esterne, costruita a runtime da `data/progetti.json` (più `jankowiak-risultati.json` e `watkins-risultati.json`) — nessun dato ridigitato a mano. Tre sezioni: **Persone** (18 autori deduplicati per `ref`, entrambi i rami, con tipo di identificativo dedotto dal dominio dell'URL e livello di certezza della verifica); **Luoghi e aree culturali** (le 8 macro-regioni di Jankowiak con QID Wikidata dove esiste, i 13 paesi di Watkins, la stessa distinzione "nel testo dell'articolo / aggiunta da HRAF" già usata sulla mappa); **Altre fonti di autorità** (CDLI e Penn Museum per il Barton Cylinder, che non ha né un autore né un gazetteer geografico pertinente).

Per farlo, il campo `autori[].verifica` (valori: `doppia-fonte-o-istituzionale`, `confermato-dallo-studente`, `standard-non-incrociato`, `wikidata-sostitutivo`, `da-riverificare`; opzionale `nota_verifica` per il dettaglio) è stato aggiunto a `data/progetti.json` per tutti e 12 gli item — prima quel livello di certezza esisteva solo come prosa in `docs/preistoria-bibliografia-normalizzata.md` e nei `<revisionDesc>` dei TEI del ramo bacio. Struttura invece di duplicare, stesso principio del resto del modello dati.

## "Item correlati" e link a enti/riviste esterne

Due aggiunte, entrambe sulle 4 pagine item del ramo bacio.

`item.correlati[]` (`{ id, motivo }`) in `progetti.json`: navigazione contestuale mostrata in un `<aside>` in ciascuna pagina item, curata a mano e non calcolata a runtime. Prima di implementarla è stato testato un criterio automatico alternativo (marcature `marcature[]` condivise fra item): confrontato con i dati reali, avrebbe segnalato Jankowiak↔Watkins (marcature condivise, ma nessuna citazione diretta fra i due) e mancato Arbøll↔Barton (l'unico legame di citazione reale nel corpus, perché Arbøll & Rasmussen discute esplicitamente testi mesopotamici del bacio incluso, indirettamente, lo stesso Barton Cylinder). Il criterio scelto resta quindi curatoriale, con le marcature condivise come criterio *aggiuntivo* di supporto, non sostitutivo — scelta dello studente. Dettaglio in `docs/note-per-orale.md` §4.

`link_riferimento[]` esteso, per tutti e 4 gli item, con collegamenti tipizzati a enti e riviste esterne (rivista, ente-dati, deposito-dati, testo-integrale), specchiati come `<ref target="..." type="...">` nei rispettivi teiHeader — stesso pattern già in uso per CDLI/museo nel Barton Cylinder. Richiesta dello studente, motivata esplicitamente come compensazione per l'assenza nel progetto di un'integrazione con un catalogo bibliotecario reale per gli oggetti fisici. Un solo URL (Oxford Research Archive, per Arbøll & Rasmussen) non ha superato la verifica finale per un limite tecnico dello strumento di fetch (session limit) — dichiarato esplicitamente nel `<ref>` e nel `revisionDesc`, non nascosto; gli altri quattro sono verificati su fonti incrociate indipendenti. Non ancora esteso alle 3 monografie del ramo preistoria prive di link (Lee & DeVore, Gero & Conkey, Harari) — rimandato su scelta esplicita dello studente.

## File DC/XML autonomo e `<placeName>` nel TEI

Due riscontri diretti a un requisito esplicito del PDF delle linee guida ("riconciliare anche nel codice XML", non solo in JSON/HTML).

`dc/barton-cylinder-dc.xml`: record OAI-DC (root `oai_dc:dc`, importa i 15 elementi Simple DC dal namespace DCMI `http://purl.org/dc/elements/1.1/`, schema `http://www.openarchives.org/OAI/2.0/oai_dc.xsd`) — non un formato improvvisato, lo standard reale per l'interscambio Dublin Core. Stessi valori già nei tag `<meta name="DC.xxx">` dell'head di `barton-cylinder.html`, qui solo restituiti come file autonomo: un solo dato, due formati di esposizione. Linkato sia nell'head (`<link rel="alternate">`) sia nel testo della pagina.

`<placeName ref="QID">` dentro `<profileDesc><settingDesc><listPlace>` in tre teiHeader: Jankowiak (le 5 macro-regioni documentate nel testo, non le 3 aggiunte da HRAF — stessa distinzione già vista su mappa e in `dati.html`), Watkins (tutti e 13 i paesi), Arbøll & Rasmussen (Mesopotamia, QID Q11767). Tutti i QID riusano l'identico valore già verificato e accettato nei JSON di Risultati (`jankowiak-risultati.json`, `watkins-risultati.json`) — nessuna nuova ricerca, nessun nuovo rischio rispetto a quanto già dichiarato lì (incluso il limite già noto su "Amazzonia": tre entità Wikidata simili, disambiguazione non confermata).

**Lasciato esplicitamente sospeso**: il Barton Cylinder non ha un `<placeName>` per "Nippur". Una ricerca mirata ha trovato due entità Wikidata plausibili (Q188395 "Nippur", Q530686 "Nippur de Lagash") e non è stato possibile disambiguarle: `WebFetch` su `wikidata.org` ha restituito un errore ("dominio cache-only, non fetchabile" in questa sessione). Coerente col principio del progetto — mai un identificativo scelto a caso quando la verifica non è conclusa; da riprendere aprendo la pagina direttamente.

## Vocabolario controllato per le marcature (`vocabolario_marcature`)

Riconciliazione di tutte e 34 le `marcature` uniche del progetto (entrambi i rami) con Wikidata, dove esiste una corrispondenza difendibile. Metodo: WebSearch incrociando titolo e descrizione della voce su più fonti indipendenti per ciascun termine (doppia verifica sempre, su richiesta esplicita dello studente) — mai apertura diretta di `wikidata.org`, non fetchabile con gli strumenti disponibili in questa sessione.

Struttura in `data/progetti.json`: un dizionario `vocabolario_marcature`, chiave = marcatura, valore = `{ stato, vocabolario, uri, etichetta, nota }` (o `componenti[]` per un tag composto spezzato in due concetti). Quattro stati, non due, per non confondere "nessuna corrispondenza trovata" con "non è un soggetto":

- `corrispondenza-trovata` / `corrispondenza-trovata-composita` (19 voci): incluse `disuguaglianza-economica` → "income inequality" Q5055020 (preferito al generico "economic inequality" perché coincide esattamente con l'indice GINI di Watkins), `testo-cuneiforme` → "Sumerian writing" Q12680174 (non il generico "cuneiform", condiviso anche da accadico/elamita/persiano antico), `genere-e-guerra` → il sotto-periodo medievale Q8031595 (coerente con la datazione 940-950 d.C. di Birka), `critica-a-modelli-evolutivi-lineari` → "unilineal evolution" Q1382550 (aderenza diretta alla tesi di Graeber & Wengrow).
- `nessuna-corrispondenza-difendibile` (8 voci): es. `epidemiologia-storica` (vicino più prossimo "paleopathology", concetto adiacente non equivalente), `rivoluzione-cognitiva` (vicino più prossimo "behavioral modernity" Q2706556, termine accademico diverso dalla formula divulgativa di Harari) — non forzate, stesso principio già applicato ai cerchi sulla mappa di Jankowiak.
- `non-applicabile-etichetta-interna` (4 voci: `collegamento-barton-cylinder`, `attestazione-più-antica`, `volume-fondativo`, `risposta-a-critiche`): descrittori interni al progetto, non soggetti generalizzabili.
- `non-applicabile-luogo` (2 voci: `birka`, `ande`): scoperti in corso d'opera come toponimi, non concetti — da riconciliare eventualmente come `placeName`, non fatto in questo passaggio, dichiarato come limite.

Un caso di verifica riuscita grazie a un'osservazione dello studente: il QID Wikidata inizialmente sospeso per "Nippur" (Barton Cylinder) aveva due candidati, Q188395 e Q530686; quest'ultimo si è rivelato — dopo osservazione dello studente e verifica incrociata su 4 fonti indipendenti (Wikipedia, Fandom, GoodReads, GitHub) — un personaggio di un fumetto argentino (Robin Wood), non il sito mesopotamico. Risolto: Q188395, aggiunto come `placeName` in `tei/barton-cylinder-testo.xml`.

Encoding nel TEI: `<profileDesc><textClass><keywords scheme="#vocabolario-marcature-progetto"><term ref="QID">…</term></keywords></textClass></profileDesc>` nei 4 teiHeader del ramo bacio, solo per le marcature di quell'item con `stato: corrispondenza-trovata`. In `dati.html`: nuova sezione "Soggetti e concetti", tabella che rilegge `vocabolario_marcature` — nessun dato duplicato a mano, stesso principio del resto della pagina.

## Le 8 pagine segnaposto del ramo preistoria

Il ramo preistoria resta **solo in progettazione** (nessuna mappa, nessun testo TEI a pieno, nessun argomento disteso proprio) — ma i suoi 8 item hanno ora una pagina propria e stabile, non solo una voce in `data/progetti.json`: `lee-devore-1968.html`, `gero-conkey-1991.html`, `hedenstierna-jonson-2017.html`, `price-et-al-2019.html`, `haas-et-al-2020.html`, `moilanen-et-al-2022.html`, `harari-2014.html`, `graeber-wengrow-2021.html`. Otto file distinti, non un unico template condiviso via routing lato client — scelta esplicita dello studente, con un vantaggio tecnico concreto: un URL stabile per item, coerente con `PAGINE_ITEM`/la convenzione già in uso per le 4 pagine item del bacio, senza bisogno di logica di instradamento.

Ogni pagina mostra solo dati realmente marcati in `progetti.json` (tipo di risorsa, autori, periodo, marcature come badge cliccabili, link a fonti esterne) — mai contenuto placeholder generico — con un banner esplicito (`.banner-non-disponibile`, stesso linguaggio tratteggiato già usato per `badge-stato`) che dichiara cosa manca invece di lasciarlo intuire da una pagina vuota. Le quattro pagine condividono un solo script di rendering, `preistoria-render.js` (`renderizzaSchedaPreistoria(id)`), incluso via `<script src="...">` — un solo codice, otto punti di accesso, stesso principio già seguito per i dati.

Effetto collaterale positivo, non il motivo primario della scelta: con le 8 pagine costruite, `index.html` ora rende 14 link attivi nella sitemap (erano 6) — la funzione `renderizzaSitemap()` non è cambiata, legge lo stesso `PAGINE_ITEM` esteso a tutti e 12 gli item. Il progetto "preistoria" in sé resta correttamente non cliccabile (`stato_implementazione` ancora `"solo-progettazione"` a livello di ramo): sono i singoli item ad avere ora una scheda, non il ramo nel suo complesso.

## Breadcrumb, Tabs, Badge, Accordion, Tooltip — i cinque componenti richiesti dalle linee guida

Split deciso componente per componente, non con un rapporto arbitrario: tre restano scritti a mano ("vanilla"/stile W3Schools — nessuna libreria esterna), due usano Bootstrap vendorizzato in `lib/bootstrap/` (v. 5.3.8, da npm, non da CDN — stesso principio già seguito per Leaflet in `ramo-bacio.html`; un CDN resterebbe un'alternativa valida per un progetto finito e ben collegato a enti fidati, qui evitato solo per non dipendere dalla rete durante la discussione in aula).

- **Breadcrumb** (vanilla) — su ogni pagina tranne `index.html` (radice: un percorso Home>Home non avrebbe senso). Sostituisce il vecchio singolo link "&larr; torna a X" col percorso completo (Home &rsaquo; Catalogo &rsaquo; Ramo &rsaquo; Item): più informazione con la stessa quantità di markup. `<nav><ol>` semantico, non il `<div>` non accessibile dell'esempio classico W3Schools "How To - Breadcrumbs" — stessa idea (separatore via CSS generato `::before`, zero dipendenze), corretta per chi naviga con uno screen reader. Un livello senza pagina propria (il ramo preistoria) resta testo semplice, non un link.
- **Tabs** (vanilla) — `ramo-bacio.html`, il selettore Lista/Mappa/Timeline: prima un gruppo di bottoni `aria-pressed` (semantica da toggle indipendente, non corretta per tre viste mutuamente esclusive), ora pattern ARIA Tabs reale (`role="tablist"/"tab"/"tabpanel"`, `aria-selected`, tabindex "roving", frecce sinistra/destra con avvolgimento + Home/End per la navigazione da tastiera — non solo click).
- **Badge** (vanilla) — classe base `.badge` condivisa (prima tre blocchi CSS quasi identici per stato/tipo-risorsa/marcatura, unificati in uno). Le marcature cliccabili (`.badge-marcatura`, verso `ricerca.html?marcatura=...`), prima solo su preistoria e nei risultati di ricerca, ora anche sulle 4 pagine item del bacio e nella vista Lista di `ramo-bacio.html` — coerenza dell'interfaccia di ricerca in tutto il sito, non un'eccezione per metà dei contenuti.
- **Accordion** (Bootstrap) — le quattro sezioni di `dati.html` (Persone/Luoghi/Altre autorità/Soggetti e concetti). Variante "sempre aperta" (nessun `data-bs-parent` comune): collassare una sezione non chiude le altre, più adatta a una pagina di consultazione con quattro tabelle di riferimento che una fisarmonica a scelta singola. Tutte e quattro aperte di default — il collassare è un'opzione per ridurre lo scroll, non lo stato di partenza; non si nasconde nessun dato dietro un click in più.
- **Tooltip** (Bootstrap) — solo `nota_verifica` nella tabella Persone di `dati.html` (5 voci su 18), non anche la colonna "Nota" della tabella Soggetti: quest'ultima era già interamente visibile come testo di cella, non un `title` nativo — convertirla in tooltip l'avrebbe resa *meno* accessibile (note spesso lunghe, nascoste dietro hover che su touch non esiste), non di più. Correzione in corso d'opera rispetto al piano iniziale, non un'esecuzione automatica di quanto previsto. Il `title` nativo sostituito non è raggiungibile da tastiera né da touch screen; il componente Tooltip lo è (focus/tap, non solo hover) — richiede inizializzazione JS esplicita per elemento, testata anche da tastiera.

Caricamento CSS in `dati.html`: `bootstrap.min.css` **prima** di `style.css` nell'head, cosicché il nostro CSS (che arriva dopo nella cascata) vinca sugli stessi selettori di elemento (`body`, `a`, tabelle) dove li ridefinisce — verificato empiricamente (non solo assunto) che il font del `body` resta quello di sistema dichiarato in `style.css`, non quello di Bootstrap. Bootstrap resta usato solo per Accordion/Tooltip, non per il resto dell'aspetto del sito, ancora deliberatamente "strutturale non estetico".

Corretta in corso d'opera anche un'incoerenza trovata testando il Badge "Tipo di risorsa": le 4 pagine item del bacio scrivevano l'etichetta a mano ("Studio primario" ecc.) invece di leggerla da `it.tipo_risorsa` come già faceva `preistoria-render.js` — disallineabile dal dato se mai cambiato. Corretto leggendo da un'unica mappa `TIPO_RISORSA_ETICHETTA` (stessa in tutte le pagine); il dettaglio editoriale perso nell'etichetta generica di Arbøll & Rasmussen ("Saggio di sintesi (Perspective)") è stato spostato in un nuovo campo opzionale `nota_tipo_risorsa` (`data/progetti.json`), mostrato come riga propria — stesso modello di `nota_periodo`/`nota_geografica`, non un dato perso.

## Prossimo passo

Fatto: `index.html`, `catalogo.html`, `ramo-bacio.html` (tutte e tre le viste, ora Tabs ARIA), il testo TEI a pieno del Barton Cylinder, tutte e quattro le item-page del ramo bacio, le 8 pagine segnaposto del ramo preistoria, `dati.html` (incluse le sezioni Persone/Luoghi/Altre autorità/Soggetti e concetti, ora un Accordion Bootstrap), l'`<aside>` "item correlati", i link tipizzati a enti/riviste esterne sui 4 item bacio, il file DC/XML autonomo del Barton Cylinder, i `<placeName>` a QID Wikidata in tutti e 4 i TEI (Nippur incluso, disambiguato), il vocabolario controllato `vocabolario_marcature` (34 marcature, Wikidata, con `<textClass><keywords>` nei 4 TEI del ramo bacio), la ricerca trasversale `ricerca.html`/`ricerca-barra.js` (montata su ogni pagina tranne sé stessa e `index.html`), e tutti e cinque i componenti Bootstrap/W3Schools richiesti dalle linee guida (Breadcrumb, Tabs, Badge vanilla; Accordion, Tooltip Bootstrap vendorizzato). Resta da fare: estensione facoltativa di `placeName` a `birka`/`ande` (scoperti come toponimi durante la riconciliazione delle marcature, non ancora fatta); estensione facoltativa dei link a enti/riviste esterne alle 8 monografie del ramo preistoria (rimandata su scelta esplicita dello studente). Il CSS estetico/di brand resta fase finale, da rivedere insieme allo studente.
