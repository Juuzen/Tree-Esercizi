/* - Regione per timer - */

// https://jsfiddle.net/Daniel_Hug/pvk6p/
// https://stackoverflow.com/questions/8779845/javascript-setinterval-not-working

/* - Variabili globali */

let seconds = 0;
let minutes = 0;

let gameTimer = document.getElementById("gameTimer");

let timer = null;

/* Funzioni */

function addSecond() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    // parte da 00:01
    if (seconds < 10) {
        gameTimer.textContent = "0" + minutes + ":" + "0" + seconds;
    } else {
        gameTimer.textContent = "0" + minutes + ":" + seconds;
    }
    // richiama setTimer per impostare la nuova chiamata ad addSeconds

}

function startGameTimer() {
    // check se il nome è presente

    // se è presente, disabilitare il text input

    // rendere attive le carte


    // avvio timer
    timer = window.setInterval(addSecond, 1000);

    // disabilitare il tasto start
    document.getElementById("startTimerButton").disabled = true;
}

function stopGameTimer() {
    clearInterval(timer);
    // salvataggio in localStorage
    // flush del timer
}

/* - Fine regione per timer -*/