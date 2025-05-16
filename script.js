"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, isPlaying;

function init() {
  //*starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  isPlaying = true;
}

//? calling the init function to initialize the game
init();

//? function to switch player
const switchplayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//?Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (!isPlaying) {
    return;
  }
  //? 1. Generating arandom dice roll
  // debugger;
  let dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  //* 2. Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `./assets/dice-${dice}.png`;

  //? 3. check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchplayer();
  }
});

btnHold.addEventListener("click", function () {
  //? 1. Add current score to active player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //? 2. Check if player won the game and finish the game
  checkWinner();

  //? 3. Switch to the next player
  switchplayer();
});

function checkWinner() {
  if (scores[activePlayer] >= 20) {
    isPlaying = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    switchplayer();
    diceEl.classList.add("hidden");
  }
}

btnNew.addEventListener("click", init);
