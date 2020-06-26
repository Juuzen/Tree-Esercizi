// row tag (for the visibility)
const rowRef = document.getElementById("timeRow");
// span tag (for showing the time)
const timerSpanRef = document.getElementById("gameTimer");

/* 
pauseButtonListener will contain the reference to the last listener added to pauseGameButton 
since we can't know what kind of listener will be attached to that button (pauseTime or resumeTime) 
in this way we can detatch safely the listener when stopTime is called (avoiding messy code)
*/
const pauseButtonRef = document.getElementById("pauseGameButton");
let pauseButtonListener = null;

const startButtonRef = document.getElementById("startGameButton");
const quitButtonRef = document.getElementById("quitGameButton");

let gameTime = 0;
let timer = null;

function timeRedrawSpan() {
  timerSpanRef.textContent = gameTime + " secondi trascorsi.";
}

function timeFlush() {
  gameTime = 0;
}

function timeAdd() {
  gameTime++;
  timeRedrawSpan();
}

function timeReset() {
  timeFlush();
  timeRedrawSpan();
}

function timePause() {
  if (pauseButtonListener !== null) {
    //FIXME: perché quando lo avvio la prima volta, entra qui dentro e mi cambia l'innertext?
    pauseButtonRef.innerText = "RIPRENDI";
  }
  pauseButtonRef.removeEventListener("click", timePause);
  pauseButtonRef.addEventListener("click", timeResume);
  pauseButtonListener = timeResume;

  clearInterval(timer);
}

function timeResume() {

  pauseButtonRef.removeEventListener("click", timeResume);
  pauseButtonRef.addEventListener("click", timePause);
  pauseButtonListener = timePause;
  pauseButtonRef.innerText = "PAUSA";
  timer = window.setInterval(timeAdd, 1000);
}

function timeStart() {
  timeReset();
  rowRef.style.visibility = "";
  // disabling startGameButton
  startButtonRef.disabled = true;
  // enabling pauseGameButton
  pauseButtonRef.disabled = false;
  // enabling quitGameButton
  quitButtonRef.disabled = false;
  // attaching timePause to pauseGameButton
  pauseButtonRef.addEventListener("click", timePause);
  pauseButtonListener = timePause;
  // start the timer
  timer = window.setInterval(timeAdd, 1000);
}

function timeStop() {
  // stopping time
  clearInterval(timer);
  // hiding the time row
  rowRef.style.visibility = "hidden";
  // disabling pauseGameButton
  pauseButtonRef.disabled = true;
  // disabling quitGameButton
  quitButtonRef.disabled = true;
  // enabling startGameButton
  startButtonRef.disabled = false;
  // detatching pauseGameButton from the last listener function
  pauseButtonRef.removeEventListener("click", pauseButtonListener);
  pauseButtonListener = null;
  timeFlush();
  timeRedrawSpan();
}