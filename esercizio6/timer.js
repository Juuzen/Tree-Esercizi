/* - Variabili globali */

let seconds = 0;
let minutes = 0;

// il cronometro
let gameTimer = document.getElementById("gameTimer");

let timer = null;

/* Funzioni */

function flushTimer() {
  gameTimer.innerText = "00:00";
  seconds = 0;
  minutes = 0;
}

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
    cardboardInit();
    toggleCardboard(false);

    // abilita il bottone QUIT
    document.getElementById("quitGameButton").disabled = false;

    // fa partire il cronometro
    timer = window.setInterval(addSecond, 1000);
  }
}

function endGame(isDropped) {
  let playerName = document.getElementById("playerNameInput");
  let gameTimer = document.getElementById("gameTimer");

  //ferma il timer
  clearInterval(timer);

  //riabilita text input e bottone START
  document.getElementById("startGameButton").disabled = false;
  playerName.disabled = false;

  //disabilita il tasto QUIT
  document.getElementById("quitGameButton").disabled = true;

  //alert PARTITA INTERROTTA/PARTITA VINTA
  if (isDropped) {
    alert(
      "Ciao " +
        playerName.value +
        ", sei arrivato a " +
        gameTimer.innerText +
        " secondi con ben X match corretti effettuati!"
    );
  } else {
    alert(
      "Hai completato il livello in " +
        gameTimer.innerText +
        "! La sessione verrà salvata."
    );
    window.localStorage.setItem(playerName.value, gameTimer.innerText);
  }
  // flush del timer
  flushTimer();

  // disabilita le carte
  toggleCardboard(true);
}
