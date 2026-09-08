# Didascalie da rivedere — ramo "Il bacio"

Ogni voce ha un numero (usalo per rispondere: "C4: nuovo testo..."), la pagina, dove si trova
(classe/sezione), e il testo attuale per intero. Ho tolto solo i tag HTML per leggibilità — i
link restano segnalati fra parentesi quadre.

---

## jankowiak-2015.html

**C1** — sottotitolo (sotto il titolo)
> Jankowiak, Volsche & Garcia (2015) — studio primario, sintesi comparativa su 168 culture

**C2** — sezione "Il dato aggregato", primo paragrafo
> Su un campione di 168 culture (128 da eHRAF World Cultures, 27 dal Standard Cross-Cultural Sample, 13 da corrispondenza diretta con 88 etnografi), gli autori trovano il bacio romantico-sessuale attestato in 77 di esse — il 46% del totale: meno della metà, non la quasi-universalità che il titolo dello studio sembra suggerire a chi si ferma al titolo. La tabella sotto riporta solo le macro-regioni nominate esplicitamente nel testo dell'articolo — dato quindi **documentato** a fonte primaria, non ricostruito da noi. Fonte: [tei/jankowiak-2015.xml], dato di dettaglio in [data/jankowiak-risultati.json].

**C3** — stessa sezione, nota sotto la tabella
> **Nota sul limite dichiarato, diversa da quella qui sopra**: la tabella qui sopra mostra solo 5 macro-regioni, quelle nominate nel testo dell'articolo. La vista Mappa di questo progetto (v. [pagina del ramo, vista Mappa]) mostra invece 164 delle 168 culture del campione, una per una — un dato più fine, ma di provenienza diversa: non letto dal testo dell'articolo, bensì dai dati grezzi della mappa di Bååth & Anikin (v. critica qui sotto), incluso il beneficio del dubbio sui 23 casi ricodificati. Questa tabella e quella mappa raccontano quindi lo stesso studio a due risoluzioni e da due fonti diverse: non vanno confuse fra loro, ed è per questo che restano separate invece di essere fuse in un'unica vista.

*(la sezione "Critica: Bååth & Anikin (2015)" non è in questa lista: l'abbiamo già scritta insieme di recente — dimmi se va toccata anche quella)*

---

## watkins-2019.html

**C4** — sottotitolo
> Watkins et al. (2019) — studio primario, survey quantitativo, N = 2.379, 13 paesi

**C5** — nota sotto il grafico a dispersione (spiegazione dei dati)
> Ogni punto è un paese: in ascissa l'indice GINI (disuguaglianza di reddito, valori più alti = più disuguaglianza), in ordinata la frequenza auto-riportata del bacio romantico (percentuale). Correlazione riportata dagli autori: r = 0,67. I 13 valori sono ricalcolati da noi dal dato individuale grezzo del deposito OSF (osf.io/pbqwm, N = 2.379, filtro `Ex_Cross==0`) e verificati per coincidenza a due decimali con la tabella aggregata già pubblicata dagli stessi autori nello stesso deposito — non un dato preso per buono senza controllo incrociato. Fonte: [tei/watkins-2019.xml], dato di dettaglio in [data/watkins-risultati.json].

**C6** — nota successiva (nota tecnica sul grafico)
> Il grafico è costruito qui direttamente in SVG dal dato JSON (nessuna libreria esterna): la scala di entrambi gli assi è lineare fra il valore minimo e massimo osservato nei 13 paesi, non fra 0 e il massimo teorico — scelta che rende leggibile la dispersione reale invece di schiacciarla in un angolo del grafico.

*(qui è dove, nella bozza dei Grafici, hai chiesto di spiegare meglio cosa sia il GINI — lo aggiungo lì, non serve rifare questa nota)*

---

## arboll-rasmussen-2023.html

**C7** — sottotitolo
> Arbøll & Rasmussen (2023) — saggio di sintesi (Perspective, Science), non ricerca originale

**C8** — nota (perché non c'è un dato da mappare/graficare)
> **Nessun file di Risultati JSON per questo nodo**, a differenza di Jankowiak e Watkins: non c'è dato puntuale da mappare o graficare, solo argomentazione su fonti già pubblicate. Per lo stesso motivo il layer interpretativo Galton (`tipo_relazione` / `confidenza_attribuzione`) non è applicato qui: il saggio discute continuità *entro* un'unica tradizione mesopotamica nel tempo, non una comparazione fra culture diverse nello spazio — la domanda a cui quel layer risponde altrove nel progetto (v. Jankowiak, Watkins) non si applica a questo tipo di fonte.

**C9** — nota sul periodo storico (cautela sulla stima)
> **Attenzione sul periodo storico**: il campo periodo di questo item (ca. 2500–600 a.C.) è una stima approssimativa non verificata fonte per fonte, costruita solo per collocare genericamente il saggio sulla timeline del progetto insieme agli altri nodi — copre l'arco fra il Barton Cylinder (il testo più antico discusso) e i testi medici assiri più tardi citati nel saggio. Non è un intervallo confermato con la stessa cura filologica degli altri campi di questo progetto: se lo vedi comparire nella vista Timeline, va letto con questa cautela dichiarata, non come dato certo.

**C10** — nota_periodo (metadati, campo "Nota sul periodo")
> Stima approssimativa, non verificata fonte per fonte: il saggio discute testi mesopotamici che vanno indicativamente dal Barton Cylinder (ca. 2500 a.C.) a testi medici assiri più tardi. Da trattare con cautela se mostrato su una timeline — non è un intervallo confermato con la stessa cura degli altri campi di questo file.

**C11** — nota_geografica (metadati, campo "Nota geografica")
> CORRETTO da "sito-puntuale" a "macro-regione" dopo verifica sul testo integrale del saggio (Oxford Research Archive, versione accettata): il saggio non nomina mai un sito specifico, parla sempre di "Mesopotamia" come area lungo Eufrate e Tigri. Assegnare un punto preciso sulla mappa avrebbe affermato una precisione che la fonte non fornisce.

---

## murray-2016.html

**C12** — sottotitolo
> Murray, Fessler, Kerry, White & Marin — studio primario, riuso del dataset di Jankowiak et al. 2015 per una domanda diversa

**C13** — sezione "Perché questa scheda", primo paragrafo
> Questo studio riusa lo stesso campione a 168 culture di Jankowiak, Volsche & Garcia (2015) — non lo ricontrolla né lo mette in discussione, come fa invece la critica di Bååth & Anikin — per testare una domanda causale diversa: se la prevalenza storica di patogeni predice il livello di contatto fisico rituale tollerato in una cultura, bacio romantico incluso. Tre ipotesi testate, due supportate: i saluti con contatto fisico e il bacio romantico risultano entrambi meno diffusi dove la minaccia storica di malattia è più alta (bacio: presente nel 63% delle culture a bassa prevalenza di patogeni, contro il 42% di quelle ad alta prevalenza; B = −0,79, p = 0,01); i rituali funebri non mostrano una relazione significativa.

**C14** — stessa sezione, secondo paragrafo (limiti dichiarati)
> Limiti dichiarati dagli stessi autori: disegno correlazionale, non causale; misure di contatto fisico e di prevalenza storica di patogeni entrambe descritte come "crude and noisy"; nessun controllo per variabili terze non misurate; disallineamento temporale fra le stime di patogeni (contemporanee) e il comportamento (storico). Non abbiamo cercato il dato di prevalenza patogeni per singola cultura — solo questa statistica aggregata, dalla pubblicazione stessa. Per questo motivo la scheda resta volutamente leggera: nessun dato da mappare o graficare, a differenza delle schede di Jankowiak e Watkins.

**C15** — terzo paragrafo (collegamento con Arbøll & Rasmussen)
> Il collegamento con Arbøll & Rasmussen (2023) — un incantesimo assiro contro un contagio trasmesso col bacio — non è una verifica reciproca: sono due registri incompatibili (correlazione statistica contemporanea contro fonte testuale antica) sullo stesso interrogativo di fondo, a duemila anni di distanza. Nessuno dei due risponde all'altro; messi vicino, però, la domanda "il bacio come veicolo di contagio è un timore solo moderno o ricorrente nella storia umana" resta aperta in un modo più interessante che se restassero separati.

---

## barton-cylinder.html

**C16** — sottotitolo
> Colonna II, righe 7-8 (di 20-21 colonne complessive)

**C17** — nota su trascrizione/traduzione
> Trascrizione e traduzione dalla lettura diretta di Lisman, J.J.W., "The Barton Cylinder: A Lament for Keš?", JEOL 46 (2016-2017), pp. 146-172 — verificate anche su CDLI P222183 (formato ATF). Le lacune sono segnalate come tali, non colmate. Le colonne III-XX (il cilindro ne ha 20 secondo Lisman/CDLI, 21 secondo la scheda del Penn Museum — discrepanza reale fra fonti, non un nostro errore) non sono trascritte qui: il testo integrale è su CDLI. Fonte TEI di questa sezione: tei/barton-cylinder-testo.xml. Metadati Dublin Core anche come file XML autonomo: dc/barton-cylinder-dc.xml.

**C18** — didascalia sotto il testo tradotto (righe 7-8 nel loro contesto)
> Il testo si apre con una formula d'invocazione tipica della letteratura sumerica ("in quei giorni remoti…"), poi passa alla scena dell'unione fra Igizigalana/Ninḫursaĝa e una figura maschile non nominata in queste righe (l'attribuzione a An o a Enki resta dibattuta fra le edizioni), da cui nasce un settuplo di gemelli. Le righe evidenziate sono quelle già citate nell'epigrafe di apertura del progetto — qui si leggono nel loro contesto narrativo diretto, non isolate.

**C19** — nota_geografica (metadati, campo "Nota geografica")
> Provenienza come registrata da CDLI (P222183): "Nippur (mod. Nuffar) [uncertain]", con ipotesi alternativa segnalata dalla stessa scheda ("Kesh?"). Non è un findspot da scavo scientifico controllato: è un'attribuzione con margine di dubbio dichiarato dall'istituzione che cataloga il pezzo, coerente con l'incertezza già segnalata in tei/bacio-epigrafe-barton.xml su chi bacia chi nel testo.

---

## Non incluse qui (già toccate o fuori scope per ora)

- Le 4 epigrafi della home (Popper/Geertz/Ingold/Hurston) e il sottotitolo della home — già confermati punti 1-4.
- Il sottotitolo del catalogo e la tesi di "Il bacio" nel catalogo — già in discussione separata (punti 5/6).
- La didascalia estesa di ramo-bacio.html — appena ripristinata (punto 8), dimmi se anche quella va riscritta.
- Le 8 pagine bibliografiche del ramo preistoria — restano fuori scope come deciso all'inizio.
