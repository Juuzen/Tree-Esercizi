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

function startGame() {
  let playerName = document.getElementById("playerNameInput");
  if (playerName.value == "") {
    alert("Non puoi iniziare il gioco se non scegli un nome!");
  } else {
    // disabilita il text input
    playerName.disabled = true;

    // disabilita il bottone START
    document.getElementById("startGameButton").disabled = true;

    // abilita il campo di gioco
    toggleCardboard(false);

    // abilita il bottone QUIT
    document.getElementById("quitGameButton").disabled = false;

    // fa partire il cronometro
    timer = window.setInterval(addSecond, 1000);
  }
}

function quitGame() {
  let playerName = document.getElementById("playerNameInput");
  let gameTimer = document.getElementById("gameTimer");

  //ferma il timer
  clearInterval(timer);

  //riabilita text input e bottone START
  document.getElementById("startGameButton").disabled = false;
  playerName.disabled = false;

  //disabilita il tasto QUIT
  document.getElementById("quitGameButton").disabled = true;

  // salvataggio in localStorage
  window.localStorage.setItem(playerName.value, gameTimer.innerText);

  //alert PARTITA INTERROTTA/PARTITA VINTA

  // flush del timer
  gameTimer.innerText = "00:00";

  // disabilita le carte
  toggleCardboard(true);
}
