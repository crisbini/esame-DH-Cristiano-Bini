// ricerca-barra.js — barra di ricerca compatta, iniettata in ogni pagina del sito da un solo
// script condiviso (un solo codice, non ventuno copie incollate a mano in altrettante pagine).
// Cerca per titolo, nome del progetto o marcatura (v. eseguiRicerca() in ricerca.html — corretto
// il 2026-09-08 perché cercava solo nel titolo); il pulsante "Amplia ricerca" porta alla pagina di ricerca completa
// (ricerca.html), dove si può filtrare anche per autore, marcatura, periodo storico, luogo
// ed ente produttore. Non montata su ricerca.html stessa: lì c'è già il modulo completo,
// due caselle di ricerca sulla stessa pagina sarebbero confuse, non doppiamente utili.

(function () {
  function montaBarraRicerca() {
    const mount = document.getElementById("barra-ricerca-globale");
    if (!mount) return;

    const form = document.createElement("form");
    form.className = "barra-ricerca";
    form.method = "GET";
    form.action = "ricerca.html";
    form.setAttribute("role", "search");
    form.setAttribute("aria-label", "Ricerca nell'atlante");

    const input = document.createElement("input");
    input.type = "search";
    input.name = "q";
    input.placeholder = "Cerca per titolo o parola chiave…";
    input.className = "input-ricerca";
    input.setAttribute("aria-label", "Cerca per titolo o parola chiave");

    const bottoneCerca = document.createElement("button");
    bottoneCerca.type = "submit";
    bottoneCerca.className = "btn-ricerca";
    bottoneCerca.textContent = "Cerca";

    const linkAmplia = document.createElement("a");
    linkAmplia.href = "ricerca.html";
    linkAmplia.className = "link-amplia-ricerca";
    linkAmplia.textContent = "Amplia ricerca ▸";

    form.appendChild(input);
    form.appendChild(bottoneCerca);
    form.appendChild(linkAmplia);
    mount.appendChild(form);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montaBarraRicerca);
  } else {
    montaBarraRicerca();
  }
})();
