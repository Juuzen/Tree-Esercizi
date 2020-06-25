const Timer = {
  rowRef: document.getElementById("timeRow"),
  timerRef: document.getElementById("gameTimer"),
  gameTime: 0,
  timer: null,

  get: function () {
    return this.gameTime;
  },

  refresh: function () {
    console.log(this.timerRef);
  },

  flush: function () {
    gameTime = 0;
  },

  add: function () {
    gameTime++;
    this.refresh();
  },

  start: function () {
    this.stop();
    this.rowRef.style.visibility = "";
    timer = window.setInterval(function () {
      this.add();
    }, 1000);
  },

  pause: function () {
    clearInterval(this.timer);
  },

  stop: function () {
    this.pause();
    this.rowRef.style.visibility = "hidden";
    this.flush();
    this.refresh();
  },
};
