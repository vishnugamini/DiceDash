'use strict';
var playerOneScore = document.querySelector('#score--0');
var playerOneCurrentScore = document.querySelector('#current--0');

var playerTwoScore = document.querySelector('#score--1');
var playerTwoCurrentScore = document.querySelector('#current--1');

var playerOneActivity = true;
var playerTwoActivity = false;

var dice = document.querySelector('.dice');

var playerZero = document.querySelector('.player--0');
var playerOne = document.querySelector('.player--1');

var hasWon = false;

dice.classList.add('hidden');

document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--hold').addEventListener('click', MainScoreUpdate);

document.querySelector('.btn--new').addEventListener('click', function () {
  playerOneActivity = true;
  playerTwoActivity = false;
  playerZero.classList.add('player--active');
  playerOne.classList.remove('player--active');
  playerOneScore.textContent = '0';
  playerOneCurrentScore.textContent = '0';
  playerTwoScore.textContent = '0';
  playerTwoCurrentScore.textContent = '0';
  document.querySelector('.dice').src = '';
  hasWon = false;
  playerZero.classList.remove('player--loser');
  playerOne.classList.remove('player--loser');
  playerZero.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  document.querySelector('body').classList.remove('right-wins');
  document.querySelector('body').classList.remove('left-wins');
});

function rollDice() {
  dice.classList.remove('hidden');
  if (hasWon === true) {
  } else if (hasWon === false) {
    var value = Math.trunc(Math.random() * 6) + 1;
    console.log(`dice-${value}.png`);
    dice.src = `dice-${value}.png`;
    addscores(value);
  }
}

function addscores(diceValue) {
  if (playerOneActivity === true) {
    if (diceValue != 1) {
      var playerOneNum = String(
        Number(playerOneCurrentScore.textContent) + diceValue
      );
      playerOneCurrentScore.textContent = playerOneNum;
    } 
    else if (diceValue == 1) {
      playerOneCurrentScore.textContent = '0';
      playerOneActivity = false;
      playerTwoActivity = true;
      activePlayer();
    }
  } 
  else if (playerTwoActivity === true) {
    if (diceValue != 1) {
      var playerTwoNum = String(
        Number(playerTwoCurrentScore.textContent) + diceValue
      );
      playerTwoCurrentScore.textContent = playerTwoNum;
    } else if (diceValue == 1) {
      playerTwoCurrentScore.textContent = '0';
      playerTwoActivity = false;
      playerOneActivity = true;
      activePlayer();
    }
  }
}

function MainScoreUpdate() {
  if (hasWon === true) {
  } else if (playerOneActivity === true) {
    var playerOneValue =
      Number(playerOneCurrentScore.textContent) +
      Number(playerOneScore.textContent);
    playerOneScore.textContent = String(playerOneValue);
    playerOneCurrentScore.textContent = '0';
    playerOneActivity = false;
    playerTwoActivity = true;
    activePlayer();
  } else if (playerTwoActivity === true) {
    var playerTwoValue =
      Number(playerTwoCurrentScore.textContent) +
      Number(playerTwoScore.textContent);
    playerTwoScore.textContent = String(playerTwoValue);
    playerTwoCurrentScore.textContent = '0';
    playerTwoActivity = false;
    playerOneActivity = true;
    activePlayer();
  }
  winner();
}

function activePlayer() {
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
}

function winner() {
  if (Number(playerOneScore.textContent) >= 200) {
    playerZero.classList.remove('player--active');
    playerZero.classList.add('player--winner');
    playerOne.classList.add('player--loser');
    hasWon = true;
    document.querySelector('body').classList.add('right-wins')
  }
   else if (Number(playerTwoScore.textContent) >= 200) {
    playerOne.classList.remove('player--active');
    playerOne.classList.add('player--winner');
    playerZero.classList.add('player--loser');
    hasWon = true;
    document.querySelector('body').classList.add('left-wins')
  }
  
}
