'use strict';
//Button Variables
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');

//Display String Variables
const Player1 = document.querySelector('.player--0');
const Player2 = document.querySelector('.player--1');
const dicePic = document.querySelector('.dice');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
let playing = true;

//Math Variables

let rolledScore = 0;
let currentScore = 0;
let score = [0, 0];
let activePlayer = 0;

//Start Page varibles
scorePlayer1.textContent = 0;
scorePlayer2.textContent = 0;
dicePic.style.display = 'none';

//Functions
const activate = function (playerNum) {
  playerNum.classList.add('player--active');
};

const deactivate = function (playerNum) {
  playerNum.classList.remove('player--active');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player1.classList.toggle(`player--active`);
  Player2.classList.toggle(`player--active`);
};

rollDice.addEventListener('click', function () {
  if (playing) {
    rolledScore = Math.trunc(Math.random() * 6) + 1;

    if (rolledScore !== 1) {
      currentScore += rolledScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }

    dicePic.style.display = 'block';

    dicePic.src = `dice-${rolledScore}.png`;

    console.log(rolledScore);
    console.log(currentScore);
  }
});

holdScore.addEventListener('click', function () {
  if (playing) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner', 'name');
      dicePic.style.display = 'none';
      playing = false;
    }
    switchPlayer();
  }
});

newGame.addEventListener('click', function () {
  rolledScore = 0;
  currentScore = 0;
  activate(Player1);
  deactivate(Player2);
  score = [0, 0];

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  dicePic.style.display = 'none';
  Player1.classList.remove('player--winner', 'name');
  Player2.classList.remove('player--winner', 'name');
  playing = true;
});
