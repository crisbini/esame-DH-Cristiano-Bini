# Note per l'orale — materiale per le slide

Raccoglie problemi reali incontrati e risolti durante il lavoro (bug, correzioni, errori auto-corretti),
in un formato già pensato per diventare slide: problema → causa → correzione → cosa dimostra.
Non è un changelog completo (quello è nei `<revisionDesc>` dei file TEI e nelle `nota_*` di
`progetti.json`): è la selezione di ciò che vale la pena raccontare in sede di discussione,
sia alla commissione sia a te stesso in fase di ripasso.

---

## 1. Bug di specificità CSS: `hidden` ignorato dal browser (ramo-bacio.html, 2026-08-30)

**Problema**: passando dalla vista Lista alla vista Mappa in `ramo-bacio.html`, le card della
Lista restavano visibili *insieme* alla mappa invece di sparire — le due viste si sovrapponevano.

**Causa**: il JS imposta correttamente l'attributo `hidden` sulla sezione non attiva
(`sezione.hidden = sezione.id !== "vista-" + nomeVista`), ma in CSS esisteva già una regola
`#vista-lista { display: flex; flex-direction: column; ... }`. Un selettore per **ID** ha
specificità più alta di quella (bassissima) con cui il browser implementa `[hidden] { display: none }`
di default — quindi la regola `display: flex` vinceva sempre, e l'attributo `hidden` restava
scritto nell'HTML ma senza alcun effetto visivo.

**Correzione**: aggiunta una regola esplicita in `style.css`, con specificità sufficiente a vincere:
```css
.vista[hidden] {
  display: none !important;
}
```

**Trovato con**: test automatizzato headless (Playwright) — non a occhio. Il DOM diceva "nascosto"
(`hidden` presente), lo screenshot mostrava il contrario: è il motivo per cui in questo progetto
ogni pagina viene testata rendendola davvero in un browser, non solo letta come codice.

**Cosa dimostra, per l'orale**: la differenza fra "il codice sembra corretto" e "il codice si
comporta correttamente" — un caso concreto di cascata (la "C" di CSS) che produce un bug
controintuitivo: l'HTML è giusto, il JS è giusto, eppure il risultato visivo è sbagliato per
un'interazione fra regole scritte in punti diversi del foglio di stile.

---

## 2. Trascrizione del Barton Cylinder: verificare prima di trascrivere, e dichiarare il limite (2026-08-30)

**Problema**: serviva il testo TEI a pieno di almeno un item (richiesto dalle linee guida), e il Barton
Cylinder — già citato in epigrafe per la riga sul bacio — era il candidato naturale. Ma trascrivere
da soli un testo cuneiforme sumerico, senza formazione assiriologica, è un rischio reale di errore:
meglio verificare prima se esiste già un lavoro filologico pubblicato da citare o da cui verificare,
invece di partire subito a trascrivere.

**Causa/limite reale incontrato**: l'accesso diretto a CDLI (Cuneiform Digital Library Initiative),
che ha l'edizione ATF completa del cilindro, era bloccato da questo ambiente in due modi diversi:
`curl` diretto rifiutato dal proxy di rete (403), e il fetch tramite `robots.txt` in timeout su un
mirror. Solo lo strumento di fetch riassuntivo è riuscito a leggere la pagina CDLI, ma quello stesso
strumento riformula il testo (non restituisce l'HTML/ATF grezzo) — quindi non affidabile per
trascrivere *verbatim* tutte le 20 colonne senza rischio di introdurre errori miei nella riformulazione.

**Correzione/compromesso negoziato**: invece di (a) trascrivere tutto rischiando errori non
verificabili, o (b) rinunciare e limitarsi a un link, ho verificato il testo già citato in epigrafe
su **tre fonti indipendenti** (il file TEI dell'epigrafe già esistente, l'edizione ATF di CDLI via
fetch riassuntivo, e il PDF ad accesso libero di Lisman, J.J.W., "The Barton Cylinder: A Lament for
Keš?", *JEOL* 46, 2016-2017 — letto direttamente, non riassunto) e ho encodato in TEI solo le colonne
I-II (quelle contestualizzanti la riga già citata), lasciando le colonne III-XX linkate all'edizione
CDLI invece di ri-trascriverle. Il limite è dichiarato esplicitamente nel `sourceDesc` del file TEI e
nella pagina HTML, non nascosto.

**Cosa dimostra, per l'orale**: due cose insieme. Primo, un principio filologico applicato prima di
scrivere codice — non fidarsi della propria trascrizione quando esiste un lavoro specialistico già
pubblicato, e usarlo per verificare piuttosto che duplicare il lavoro peggio. Secondo, un limite
tecnico reale di questo ambiente di lavoro (accesso di rete filtrato) trasformato in una scelta
metodologica dichiarata — la differenza fra un "non ho potuto verificare tutto, quindi mi fermo dove
posso garantire l'accuratezza" e un errore taciuto.

---

## 3. Due tabelle diverse per lo stesso studio: Jankowiak, 5 regioni contro 8 (2026-08-30)

**Problema apparente**: costruendo la pagina item di Jankowiak, il file `jankowiak-risultati.json`
(pensato mesi prima per il dato "duro" pubblicato nell'articolo) elenca solo 5 macro-regioni, mentre
`aree_geografiche` in `progetti.json` (costruito dopo, per la vista Mappa) ne elenca 8. A prima vista
sembra un'incoerenza dei dati — lo stesso studio, due conteggi diversi.

**In realtà non è un errore**: sono due fonti diverse con affidabilità diversa, tenute
deliberatamente separate. Le 5 regioni di `jankowiak-risultati.json` sono quelle nominate
esplicitamente nel testo dell'articolo — dato di prima mano, `stato_dato: documentato`. Le 8 di
`aree_geografiche` vengono invece da HRAF (l'istituzione che gestisce la base dati eHRAF usata dallo
studio), una fonte secondaria e singola, usata solo per estendere la copertura geografica della
mappa, con l'affidabilità inferiore dichiarata esplicitamente in `nota_geografica`.

**Correzione applicata**: nella pagina `jankowiak-2015.html` le due liste restano visibilmente
separate — una tabella per il dato "documentato" (5 regioni), una nota a parte che spiega perché la
mappa ne mostra 8, invece di fonderle in un'unica lista che nasconderebbe la differenza di
affidabilità. Sulla mappa stessa (`ramo-bacio.html`), discusse alcune alternative (marker
pieno/tratteggiato, cerchi geografici, zone sfumate — scartate perché implicano un'estensione
spaziale non presente nei dati, o perché premature per la fase attuale del CSS, ancora senza
colore), la scelta finale dello studente è stata la più semplice: nel popup delle 3 aree da HRAF
compare la dicitura "Area non interna al testo dell'articolo — aggiunta da fonte secondaria (HRAF),
non incrociata", senza introdurre alcuna nuova convenzione grafica.

**Cosa dimostra, per l'orale**: è, in miniatura, la tesi stessa del progetto — la scienza comparata
non tratta ogni dato con lo stesso grado di certezza, e un buon apparato digitale deve rendere quella
differenza visibile invece di appiattirla in un'unica lista pulita ma disonesta.

---

## 4. "Item correlati": perché un criterio solo automatico avrebbe fallito (2026-08-30)

**Problema**: le linee guida del corso chiedono un `<aside>` di navigazione contestuale verso
"item correlati" in almeno una pagina item. Il criterio più semplice da implementare sarebbe stato
automatico: item con almeno una `marcatura` condivisa.

**Perché non basta, verificato sui dati veri**: ho calcolato le marcature condivise fra i 4 item del
ramo bacio prima di scrivere codice. Risultato: Jankowiak e Watkins condividono
`comparazione-interculturale` (collegamento debole ma reale — stessa domanda di ricerca). Ma Arbøll &
Rasmussen e il Barton Cylinder — che **sono** effettivamente collegati, il saggio discute proprio quel
testo, è scritto a chiare lettere nella pagina di Arbøll — non condividono nessuna marcatura letterale
(`collegamento-barton-cylinder` è una stringa diversa da `fonte-primaria`/`testo-cuneiforme`). Un
criterio puramente automatico avrebbe perso l'unico collegamento verificato e citazionale che questo
progetto ha, mostrando al suo posto solo la coppia più debole.

**Correzione**: due criteri, tenuti visibilmente distinti nell'aside. (1) `correlati`, curato a mano
in `progetti.json`, con un campo `motivo` che dichiara esplicitamente la natura del legame — "citazione
reale" per Barton↔Arbøll, "stessa famiglia di studio, non citazione verificata" per Jankowiak↔Watkins,
mai presentato come più forte di quanto accertato. (2) marcatura condivisa, calcolata a runtime, che
con i 4 item attuali non aggiunge nulla oltre al criterio (1) — verificato con un test, non lasciato
come ipotesi — ma resta un meccanismo pronto per quando il ramo (o il progetto preistoria) crescerà.

**Cosa dimostra, per l'orale**: lo stesso principio già visto per la mappa di Jankowiak (nota 3) — un
criterio "pulito" e automatico può essere meno accurato di uno curato a mano quando i dati sono pochi
e la relazione che conta davvero non è quella che l'euristica saprebbe trovare da sola.

---

## 5. Marcature a due livelli: un bug reale trovato testando la ricerca (2026-09-03)

`ricerca.html` filtra per marcatura da un menu a tendina popolato leggendo `item[].marcature`. Prima
versione: 30 opzioni invece delle 34 marcature realmente uniche nel progetto — mancavano 5 marcature
che esistono **solo** a livello di progetto (`progetti[].marcature`), non su nessun singolo item:
`problema-di-galton` e `corpo-e-affetti` (bacio), `revisione-storiografica`/`genere-e-lavoro`/
`archeologia` (preistoria). Sintomo concreto: un link diretto `ricerca.html?marcatura=problema-di-galton`
non precompilava il campo (nessuna `<option>` corrispondente) e restituiva tutti e 12 gli item invece
dei 4 del ramo bacio — un dato scritto in `progetti.json` ma di fatto irraggiungibile dalla ricerca.

Trovato testando con Playwright (non ipotizzato): contare le `<option>` generate e confrontarle col
numero atteso di marcature uniche ha subito mostrato lo scarto (30 invece di 34/35 con il placeholder).
Corretto trattando le marcature di progetto come **ereditate** da tutti i suoi item ai fini della
ricerca: `popolaMarcature()` ora scandisce anche `progetti[].marcature`, e `eseguiRicerca()` considera
un item corrispondente se la marcatura è sua o del suo progetto. Effetto collaterale corretto insieme:
i badge dei risultati ora mostrano anche le marcature ereditate, altrimenti un risultato trovato per
`problema-di-galton` sarebbe apparso senza quel badge — un match che sembra un errore senza esserlo.

**Cosa dimostra, per l'orale**: un modello dati "a due livelli" (item + progetto) richiede che *ogni*
meccanismo che legge quel dato — non solo la visualizzazione, anche la ricerca — sappia dei due
livelli. Il bug non era nel dato (`progetti.json` era corretto fin dall'inizio, con le marcature di
progetto già lì), era in un consumatore del dato che ne conosceva solo metà. Lo stesso principio del
punto 3 (due tabelle diverse per lo stesso studio) applicato al lato ricerca invece che alla vista.

## 6. Bootstrap o scritto a mano? Decisione componente per componente, non un rapporto fisso (2026-09-03)

Le linee guida chiedono 5 componenti fra Bootstrap e W3Schools, senza specificare il rapporto. Invece
di sceglierne uno a priori (es. "3 vanilla e 2 Bootstrap" deciso sulla carta), ogni componente è stato
valutato singolarmente contro la sua reale complessità d'implementazione:

- **Breadcrumb**: quasi solo markup statico + un separatore CSS via `::before` — nessun vantaggio
  reale a usare un framework per questo. Vanilla.
- **Tabs**: il selettore Lista/Mappa/Timeline era già scritto a mano e funzionante in `ramo-bacio.html`
  da prima di questo lavoro — riformalizzarlo col pattern ARIA corretto (non riscriverlo da zero con
  Bootstrap) evita di duplicare un componente già testato. Vanilla.
- **Badge**: anche il Badge di Bootstrap non ha comportamento JS proprio — è puro CSS. Nessun vantaggio
  del framework rispetto a una classe scritta a mano; qui inoltre le marcature-badge portano una
  logica di click-to-search propria del progetto, non generica. Vanilla.
- **Accordion**: animazione dell'altezza, gestione di `aria-expanded`/focus, comportamento collassabile
  — complessità reale che un framework testato riduce concretamente rispetto a scriverla a mano.
  Bootstrap.
- **Tooltip**: posizionamento (bordo pagina, spazio disponibile), gestione di focus/hover/touch in modo
  coerente — la stessa classe di complessità dell'Accordion. Bootstrap.

Bootstrap vendorizzato localmente in `lib/bootstrap/` (scaricato da npm, non da CDN) per coerenza con
la scelta già fatta per Leaflet: stessa versione testata disponibile offline durante la discussione in
aula. Caricato **prima** di `style.css` nell'head di `dati.html` (l'unica pagina che lo usa): il CSS
del progetto arriva dopo nella cascata e vince sugli stessi selettori di elemento (`body`, `a`,
tabelle) — verificato con un test (font del `body` ancora quello di sistema, non quello di Bootstrap),
non solo assunto per ordine di `<link>`.

**Cosa dimostra, per l'orale**: la domanda giusta non è "quanti componenti per libreria", è "quale
libreria per quale componente" — e la risposta cambia da caso a caso. Un framework vale la complessità
che toglie, non il fatto di essere un framework.

---

*(sezione aperta: aggiungere qui altri casi — es. la correzione della datazione Suontaka/Moilanen,
la riclassificazione di `risoluzione_geografica` di Arbøll & Rasmussen da sito-puntuale a
macro-regione, la verifica dei 13 paesi Watkins da dato grezzo OSF — man mano che si decide cosa
portare in slide)*
