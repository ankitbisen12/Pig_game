"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelectorAll(".show-modal");

const updateScore = function () {
  if (playing) {
    // Generating a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //  console.log(diceNumber);

    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNumber}.png`;

    // Check for rolled 1.
    if (diceNumber !== 1) {
      //Add dice to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  // console.log('Button clicked');
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  openModal();
};
init();

// Rolling dice functionality
btnRoll.addEventListener("click", updateScore);

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player's scores
    scores[activePlayer] += currentScore;
    // scores[1] = scores[i] + currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if the Players score >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
  // Switch to the next player
  //  switchPlayer();
});

btnNew.addEventListener("click", init);

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log('A key was pressed');
  // console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    // console.log('Esc was pressed');
  }
});
