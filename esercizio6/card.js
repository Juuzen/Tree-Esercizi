const deck = document.querySelectorAll(".flip-card");

var carta1 = undefined,
  carta2 = undefined;
//cardboardInit();

function cardboardInit() {
  let randomNumbers = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  for (card of deck) {
    let index = parseInt(Math.random() * randomNumbers.length);
    card.querySelector(".numeroCarta").textContent = randomNumbers[index];
    randomNumbers.splice(index, 1);
    card.addEventListener("click", turnCard);
    card.classList.add("disabled-card");
    card.classList.remove("scompari");
  }
}

function turnCard(event) {
  if (carta1 === undefined) {
    carta1 = event.currentTarget;
    carta1.classList.add("selezionate");
  } else if (carta2 === undefined && carta1 !== event.currentTarget) {
    carta2 = event.currentTarget;
    carta2.classList.add("selezionate");
    window.setTimeout("checkCarta()", 750);
  }
}

function checkCarta() {
  if (carta1 !== undefined && carta2 !== undefined) {
    let figlio1 = carta1.querySelector(".numeroCarta").textContent;
    let figlio2 = carta2.querySelector(".numeroCarta").textContent;

    if (figlio1 === figlio2) {
      coppiaCorretta(carta1, carta2);
    } else {
      coppiaScorretta(carta1, carta2);
    }
  }
}

function togliCoppiaCorretta() {
  carta1.classList.add("scompari");
  carta2.classList.add("scompari");
  carta1.classList.remove("selezionate");
  carta2.classList.remove("selezionate");
  carta1.classList.remove("mostra-successo");
  carta2.classList.remove("mostra-successo");
  setUndefined();
}

function togliCoppiaScorretta() {
  carta1.classList.remove("mostra-errore");
  carta2.classList.remove("mostra-errore");
  setUndefined();
}

function coppiaScorretta(carta1, carta2) {
  carta1.classList.remove("selezionate");
  carta2.classList.remove("selezionate");
  carta1.classList.add("mostra-errore");
  carta2.classList.add("mostra-errore");
  window.setTimeout("togliCoppiaScorretta()", 350);
}

function coppiaCorretta(carta1, carta2) {
  carta1.classList.add("mostra-successo");
  carta2.classList.add("mostra-successo");
  window.setTimeout("togliCoppiaCorretta()", 350);
}

function setUndefined() {
  carta1 = undefined;
  carta2 = undefined;
}

/////////////////////// Sotto questa riga non considerate

function checkCarteInCampo(carta) {
  //Non ultimata
  let cartaGiaPresente = 0;

  if (carteInCampo.length > 0) {
    carteInCampo.forEach((cartaCorrente) => {
      cartaCorrente == carta ? cartaGiaPresente++ : null;
    });
  }
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
