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

    // abilita il bottone PAUSA
    // al momento disabilitato, richiede un po' di testing
    //document.getElementById("pauseGameButton").disabled = false;

    // fa partire il cronometro
    Timer.start();
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
        " secondi con ben " +
        matchesMade +
        " match corretti effettuati!"
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
