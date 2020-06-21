const deck = document.querySelectorAll(".flip-card");
const maxMatches = 6;

var card1;
var card2;
var matchesMade;

function cardboardInit() {
  // valori da assegnare alle carte
  let randomNumbers = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  for (card of deck) {
    // prende un elemento dell'array
    let index = parseInt(Math.random() * randomNumbers.length);
    // assegna tale valore alla carta
    card.querySelector(".numeroCarta").textContent = randomNumbers[index];
    // rimuove tale valore dall'array
    randomNumbers.splice(index, 1);
    // assegna il listener alla carta
    card.addEventListener("click", turnCard);
    // assegna la classe "disabled-card" alla carta per prevenire che l'utente possa cliccarla prima dell'inizio del gioco
    card.classList.add("disabled-card");
    // se è assente, ripristina la visibilità
    card.classList.remove("scompari");
    // pone entrambe le carte a null
    resetPair();
    // resetta il numero di match effettuati a inizio partita
    resetMatchesMade();
  }
}

function turnCard(event) {
  // se viene selezionata la prima carta della coppia
  if (card1 === null) {
    card1 = event.currentTarget;
    card1.classList.add("selezionate");
  }

  // altrimenti viene selezionata la seconda carta della coppia
  else if (card2 === null && card1 !== event.currentTarget) {
    card2 = event.currentTarget;
    card2.classList.add("selezionate");
    // si effettua il confronto tra le due carte
    window.setTimeout("checkCarta()", 500);
  }
}

function checkCarta() {
  if (card1 !== null && card2 !== null) {
    let figlio1 = card1.querySelector(".numeroCarta").textContent;
    let figlio2 = card2.querySelector(".numeroCarta").textContent;

    if (figlio1 === figlio2) {
      coppiaCorretta(card1, card2);
    } else {
      coppiaScorretta(card1, card2);
    }
  }
}

function togliCoppiaCorretta() {
  card1.classList.add("scompari");
  card2.classList.add("scompari");
  card1.classList.remove("selezionate");
  card2.classList.remove("selezionate");
  card1.classList.remove("mostra-successo");
  card2.classList.remove("mostra-successo");
  resetPair();
  matchesMade++;
  if (matchesMade == maxMatches) {
    endGame(false);
  }
}

function togliCoppiaScorretta() {
  card1.classList.remove("mostra-errore");
  card2.classList.remove("mostra-errore");
  resetPair();
}

function coppiaScorretta(card1, card2) {
  card1.classList.remove("selezionate");
  card2.classList.remove("selezionate");
  card1.classList.add("mostra-errore");
  card2.classList.add("mostra-errore");
  window.setTimeout("togliCoppiaScorretta()", 350);
}

function coppiaCorretta(card1, card2) {
  card1.classList.add("mostra-successo");
  card2.classList.add("mostra-successo");
  window.setTimeout("togliCoppiaCorretta()", 350);
}

function resetPair() {
  card1 = null;
  card2 = null;
}

function resetMatchesMade() {
  matchesMade = 0;
}

function toggleCardboard(isDisabled) {
  for (card of deck) {
    if (isDisabled) {
      card.classList.add("disabled-card");
    } else {
      card.classList.remove("disabled-card");
    }
  }
}
