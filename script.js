"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//*starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//?Rolling dice functionality

btnRoll.addEventListener("click", function () {
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
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
});
