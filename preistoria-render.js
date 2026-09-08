// preistoria-render.js — un solo codice di rendering per le 8 pagine placeholder del ramo
// preistoria (8 file HTML distinti, ciascuno con un proprio URL stabile — coerente con
// PAGINE_ITEM e con le 4 pagine item del ramo bacio — ma tutti richiamano questa stessa
// funzione, così la logica non è duplicata 8 volte). Mostra solo i campi che esistono
// davvero in data/progetti.json per l'item; dichiara esplicitamente cosa non c'è ancora
// (mappa, testo TEI, argomento disteso) invece di lasciarlo intuire da una pagina vuota.

const TIPO_RISORSA_ETICHETTA = {
  "studio-primario": "Studio primario",
  "saggio-di-sintesi": "Saggio di sintesi",
  "volume-curato": "Volume curato",
  "fonte-primaria-testuale": "Fonte primaria testuale",
  "poster-multimediale": "Poster multimediale"
};

const LINK_ETICHETTA_PREISTORIA = {
  "doi": "DOI", "isbn": "ISBN", "rivista": "Rivista", "ente-dati": "Ente dati",
  "deposito-dati": "Deposito dati", "cdli": "CDLI", "museo": "Museo", "testo-integrale": "Testo integrale"
};

function formattaAnnoPreistoria(anno) {
  if (anno === null || anno === undefined) return null;
  return anno < 0 ? Math.abs(anno) + " a.C." : String(anno) + " d.C.";
}

function renderizzaSchedaPreistoria(id) {
  fetch("data/progetti.json")
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(dati => {
      const it = dati.item.find(x => x.id === id);
      if (!it) throw new Error('Item "' + id + '" non trovato in progetti.json');

      document.title = it.titolo + " — Atlante digitale della ricerca antropologica comparativa";
      const titoloEl = document.getElementById("titolo-item");
      if (titoloEl) titoloEl.textContent = it.titolo;

      const contenitore = document.getElementById("metadati-item");
      contenitore.innerHTML = "";

      const dl = document.createElement("dl");
      dl.className = "metadati-lista";

      function aggiungi(termine, nodoOTesto) {
        if (!nodoOTesto) return;
        const dt = document.createElement("dt");
        dt.textContent = termine;
        const dd = document.createElement("dd");
        if (typeof nodoOTesto === "string") {
          dd.textContent = nodoOTesto;
        } else {
          dd.appendChild(nodoOTesto);
        }
        dl.appendChild(dt);
        dl.appendChild(dd);
      }

      aggiungi("Tipo di risorsa", TIPO_RISORSA_ETICHETTA[it.tipo_risorsa] || it.tipo_risorsa);
      aggiungi("Nota sul tipo di risorsa", it.nota_tipo_risorsa);

      if (it.autori && it.autori.length > 0) {
        const span = document.createElement("span");
        it.autori.forEach((a, i) => {
          const link = document.createElement("a");
          link.href = a.ref;
          link.textContent = a.nome;
          span.appendChild(link);
          if (i < it.autori.length - 1) span.appendChild(document.createTextNode("; "));
        });
        aggiungi("Autori", span);
      } else if (it.nota_autori) {
        aggiungi("Autori", it.nota_autori);
      }

      const periodoDa = formattaAnnoPreistoria(it.periodo_da);
      const periodoA = formattaAnnoPreistoria(it.periodo_a);
      if (periodoDa && it.periodo_da === it.periodo_a) {
        aggiungi("Periodo", periodoDa);
      } else if (periodoDa && periodoA) {
        aggiungi("Periodo", periodoDa + " – " + periodoA);
      }
      aggiungi("Nota sul periodo", it.nota_periodo);

      if (it.marcature && it.marcature.length > 0) {
        const span = document.createElement("span");
        it.marcature.forEach((m, i) => {
          const a = document.createElement("a");
          a.href = "ricerca.html?marcatura=" + encodeURIComponent(m);
          a.className = "badge badge-marcatura";
          a.textContent = m;
          span.appendChild(a);
        });
        aggiungi("Marcature", span);
      }

      contenitore.appendChild(dl);

      if (it.link_riferimento && it.link_riferimento.length > 0) {
        const p = document.createElement("p");
        p.className = "link-riferimento-item";
        it.link_riferimento.forEach(lr => {
          const a = document.createElement("a");
          a.href = lr.url;
          a.className = "link-progetto link-piccolo";
          a.textContent = LINK_ETICHETTA_PREISTORIA[lr.tipo] || lr.tipo;
          p.appendChild(a);
        });
        contenitore.appendChild(p);
      } else {
        const p = document.createElement("p");
        p.className = "nota-vista";
        p.textContent = "Nessun link a un ente o a una fonte esterna collegato ancora per questo item.";
        contenitore.appendChild(p);
      }
    })
    .catch(errore => {
      const contenitore = document.getElementById("metadati-item");
      if (contenitore) {
        contenitore.innerHTML = "<p>Impossibile caricare i metadati (" + errore.message + "). " +
          "Se stai aprendo questo file con un doppio click, serve un server locale.</p>";
      }
    });
}
