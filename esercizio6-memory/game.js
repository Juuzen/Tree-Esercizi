const playerName = document.getElementById("playerNameInput");

function startGame() {
  if (playerName.value == "" || playerName.value == undefined) {
    alert("Non puoi giocare senza aver scelto un nickname!");
    playerName.focus();
  } else {
    // avoiding that the player can change their nickname during the game
    playerName.disabled = true;

    // initialize the cardboard
    cardboardInit(); //TODO: riscrivi la gestione delle carte
    // enable the cards
    toggleCardboard(false);
    // start the timer
    timeStart();
  }
}

function quitGame() {
  endGame(true);
}

function endGame(quitted) {
  if (quitted == true) {
    alert(
      "Non hai completato tutto il gioco, mi dispiace! La tua partita verrà salvata ugualmente " +
        playerName.value +
        ".\n" +
        "Hai totalizzato " +
        matchesMade +
        " in " +
        gameTime +
        " secondi. Non male!"
    );
  } else {
    alert(
      "Complimenti " +
        playerName.value +
        "! Hai completato il gioco in " +
        gameTime +
        " secondi!"
    );
  }
  Ranking.store(playerName.value, gameTime, matchesMade);
  timeStop();
}
