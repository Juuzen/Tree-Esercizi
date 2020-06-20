const cards = document.querySelectorAll(".flip-card");

var carta1 = undefined,

    carta2 = undefined;
cardsInizialization();


function cardsInizialization() {
    let carteDaPosizionare = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    console.log(cards);
    for (card of cards) {
        let numero = parseInt(Math.random() * carteDaPosizionare.length);
        card.querySelector(".numeroCarta").textContent = carteDaPosizionare[numero];
        carteDaPosizionare.splice(numero, 1);
        card.addEventListener("click", turnCard);
    }
}

function turnCard(event) {
    if (carta1 === undefined) {
        carta1 = event.currentTarget;
        carta1.classList.add("selezionate");
        console.log(carta1);
    } else if (carta2 === undefined && carta1 !== event.currentTarget) {
        carta2 = event.currentTarget;
        carta2.classList.add("selezionate");
        console.log(carta2);
    }
    window.setTimeout("checkCarta()", 2000);
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

        console.log(carta1);
        console.log(carta2);
    }
}

function togliCoppiaCorretta() {
    carta1.classList.add("scompari");
    carta2.classList.add("scompari");
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
    window.setTimeout("togliCoppiaScorretta()", 500);
    // lascia stare perfetto così
    console.log("Oh mi dispiace!");
}


function coppiaCorretta(carta1, carta2) {
    carta1.classList.add("mostra-successo");
    carta2.classList.add("mostra-successo");
    window.setTimeout("togliCoppiaCorretta()", 500);
    // lascia stare perfetto così
    console.log("Yatta!");
}


function setUndefined() {
    carta1 = undefined;
    carta2 = undefined;
}





/////////////////////// Sotto questa riga non considerate

function checkCarteInCampo(carta) { //Non ultimata
    let cartaGiaPresente = 0;

    if (carteInCampo.length > 0) {
        carteInCampo.forEach((cartaCorrente) => {
            cartaCorrente == carta ? cartaGiaPresente++ : null;
        });
    }
}

function posizionaCartaInCampo() { //Non ultimata

    for (let i = 0; i < 12; i++) { //for solo per il testing

        if (carteDaPosizionare.length > 0) {

            let numeroRandom = parseInt(Math.random() * (Math.max(...carteDaPosizionare) - Math.min(...carteDaPosizionare)));

            if (carteDaPosizionare.includes(numeroRandom) == true) {
                carteDaPosizionare.splice(numeroRandom, 1);
                // chiamata alla funzione che posiziona la carta;
                console.log(numeroRandom);
            } else {

            }
        }

    }
}

function resettaCarteDaPosizionare() {
    carteDaPosizionare = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
}

const mazzoCarte = {
    0: { carta: "Gatto", url: "assets/etcetc" },
    1: { carta: "Cane", url: "assets/etcetc" },
    2: { carta: "Gufo", url: "assets/etcetc" },
    3: { carta: "Pagolino", url: "assets/etcetc" },
    4: { carta: "PipistrelloColCovid", url: "assets/etcetc" },
    5: { carta: "Nunzio", url: "assets/etcetc" },
};

const campo2 = [12];

function posiziona2() {
    let ArrayNumeriPossibili = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    campo.forEach((card) => {
        let numero = parseInt(Math.random() * ArrayNumeriPossibili.length);
        card = numero;
        ArrayNumeriPossibili.splice(numero, 1);
    });
}


function PosizionaNumeri() {
    let ArrayNumeriPossibili = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

    let numero = parseInt(Math.random() * ArrayNumeriPossibili.length) + 1;
    ArrayNumeriPossibili.splice(numero, 1);
    campo[i][j].numero = 1;
}


function inserisciStorage() {
    let nome = document.getElementById('nome').value;
    let tempo = 'ciao';
    window.localStorage.setItem(nome, tempo);
}


/*
function start(id) {
    let second = 0;
    setInterval(() => {
        id.textContent = 'Secondi trascorsi: '+ secondi;
        second++;
    }, 1000);
}

*/