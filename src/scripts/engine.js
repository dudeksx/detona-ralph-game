const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    livesLeft: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 500,
    enemyCurrentValue: 1,
    scoreCurrentValue: 0,
    currentTime: 60,
    gameActive: true,
    livesLeft: 3,
  },
};

function randomSquare() {
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  if (state.values.gameActive === true) {
    state.values.enemyCurrentValue = randomSquare.id;
    randomSquare.classList.add("enemy");
  }
}

function moveEnemy() {
  setTimeout(() => {
    randomSquare();
    moveEnemy();
  }, state.values.gameVelocity);
}

function playAudio() {
  const audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.1;
  audio.play();
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (!state.values.gameActive) return;

      if (
        state.values.gameActive &&
        square.id === state.values.enemyCurrentValue
      ) {
        state.values.scoreCurrentValue++;
        state.view.score.innerText = state.values.scoreCurrentValue;
        state.values.enemyCurrentValue = null;
        playAudio();
      } else {
        state.values.livesLeft--;
        state.view.livesLeft.innerText = state.values.livesLeft;

        if (state.values.livesLeft === 0) {
          state.values.gameActive = false;
          state.view.livesLeft.innerText = "0";
          alert("Game Over");
        }
      }
    });
  });
}

function decreasingTime() {
  const timerID = setInterval(() => {
    state.values.currentTime--;
    state.view.timeLeft.innerText = state.values.currentTime;
    if (state.values.currentTime <= 0) {
      clearInterval(timerID);
      state.values.gameActive = false;
      alert("Game Over");
    }
  }, 1000);
}

function initialize() {
  addListenerHitbox();
  moveEnemy();
  decreasingTime();
}

initialize();
