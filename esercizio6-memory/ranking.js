const LS = {
  key: "Ranking",

  // salva Ranking.list nel localstorage
  save: function () {
    window.localStorage.setItem(this.key, JSON.stringify(Ranking.get()));
  },

  // carica le informazioni dal localstorage in Ranking.list
  // se non è presente una entry nel localstorage, ne inserisce una vuota
  load: function () {
    if (window.localStorage.getItem(this.key) != null) {
      Ranking.set(this.get());
    } else {
      this.save();
    }
  },

  // getter (da localstorage)
  get: function () {
    return JSON.parse(window.localStorage.getItem(this.key));
  },
};

// si occupa di tenere traccia della classifica
const Ranking = {
  list: [],

  // getter
  get: function () {
    return this.list;
  },

  // setter
  set: function (array) {
    this.list = array;
  },

  // salva la partita nella propria lista
  store: function (playerName, time, matches) {
    let rank = {
      playerName: playerName,
      time: time,
      matches: matches,
    };
    this.list.push(rank);
    this.save();
  },

  // carica la propria lista nel DB, dopo averla ordinata
  save: function () {
    this.sort();
    LS.save();
  },

  // ordina la lista in base al tempo di esecuzione (e ai match effettuati in caso di parità)
  sort: function () {
    this.list.sort((a, b) => {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      if (a.matches > b.matches) return 1;
      if (a.matches < b.matches) return -1;
      return 0;
    });
  },

  // riscrive la classifica
  refresh: function () {
    let rankDiv = document.getElementById("ranking-list");
    rankDiv.innerHTML = "";
    this.get().forEach((player, index) => {
      if (index >= 5) {
        return;
      }
      // creo la riga per la classifica
      let tableTag = document.createElement("tr");

      // creo l'elemento "posizione"
      let rankTag = document.createElement("th");
      rankTag.setAttribute("scope", "row");
      rankTag.textContent = index + 1;
      tableTag.appendChild(rankTag);

      // creo l'elemento "nome"
      let playerTag = document.createElement("td");
      playerTag.textContent = player.playerName;
      tableTag.appendChild(playerTag);

      // creo l'elemento "time"
      let timeTag = document.createElement("td");
      timeTag.textContent = player.time;
      tableTag.appendChild(timeTag);

      let matchesTag = document.createElement("td");
      matchesTag.textContent = player.matches;
      tableTag.appendChild(matchesTag);

      // faccio l'append di tutta la tabella al table body
      rankDiv.appendChild(tableTag);
    });
  },
};

window.onload = () => {
  LS.load();
  Ranking.refresh();
};
