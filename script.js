'use strict';
//Dice Button
const rollDiceBtn = document.querySelector('.btn--roll');
const diceImg = document.querySelector('.dice');
//Hold Button
const holdScoreBtn = document.querySelector('.btn--hold');
const playerOneTotalScore = document.getElementById('score--0');
const playerTwoTotalScore = document.getElementById('score--1');
//NewGame Button
const newGameBtn = document.querySelector('.btn--new');
//Player Total score
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
//Current player score
const playerOneCurrentScore = document.getElementById('current--0');
const playerTwoCurrentScore = document.getElementById('current--1');
let hasFinished = false;
//Logic
diceImg.classList.add('hidden');
const updatePlayerCurrentScore = function (
  playerScore,
  diceValue,
  activePlayer,
  inactivePlayer
) {
  if (diceValue === 1) {
    //The Player Looses all his score
    playerScore.textContent = '0';
    activePlayer.classList.remove('player--active');
    inactivePlayer.classList.add('player--active');
  } else {
    //add the curren dice value to the player score
    const playerPreviousScore = Number(playerScore.textContent);
    playerScore.textContent = `${playerPreviousScore + diceValue}`;
  }
};
rollDiceBtn.addEventListener('click', function () {
  if (hasFinished === true) {
    return;
  }
  diceImg.classList.remove('hidden');
  const diceValue = Math.trunc(Math.random() * 6 + 1);
  diceImg.setAttribute('src', `dice-${diceValue}.png`);
  if (playerOne.classList.contains('player--active')) {
    //Player one is active
    updatePlayerCurrentScore(
      playerOneCurrentScore,
      diceValue,
      playerOne,
      playerTwo
    );
  } else {
    updatePlayerCurrentScore(
      playerTwoCurrentScore,
      diceValue,
      playerTwo,
      playerOne
    );
  }
});
const updatePlayerTotalScore = function (
  playerCurrScore,
  playerTotScore,
  activePlayer,
  inactivePlayer
) {
  const playerCurrScoreValue = Number(playerCurrScore.textContent);
  const playerTotalScoreValue = Number(playerTotScore.textContent);
  playerTotScore.textContent = `${
    playerCurrScoreValue + playerTotalScoreValue
  }`;
  playerCurrScore.textContent = '0';
  activePlayer.classList.remove('player--active');
  inactivePlayer.classList.add('player--active');
  thereIsAWinner(activePlayer, playerTotScore);
};
holdScoreBtn.addEventListener('click', function () {
  if (hasFinished === true) {
    return;
  }
  //Find the active player
  if (playerOne.classList.contains('player--active')) {
    updatePlayerTotalScore(
      playerOneCurrentScore,
      playerOneTotalScore,
      playerOne,
      playerTwo
    );
  } else {
    updatePlayerTotalScore(
      playerTwoCurrentScore,
      playerTwoTotalScore,
      playerTwo,
      playerOne
    );
  }
});
newGameBtn.addEventListener('click', function () {
  hasFinished = false;
  diceImg.classList.add('hidden');
  diceImg.setAttribute('src', 'dice-5.png');
  playerOneCurrentScore.textContent = '0';
  playerOneTotalScore.textContent = '0';
  playerTwoCurrentScore.textContent = '0';
  playerTwoTotalScore.textContent = '0';
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  diceImg.setAttribute('src', '');
});
const thereIsAWinner = function (activePlayer, currTotScore) {
  const currTotScoreValue = Number(currTotScore.textContent);
  if (currTotScoreValue >= 10) {
    newGameBtn.click();
    if (activePlayer === playerOne) {
      playerOne.classList.add('player--winner');
      playerOne.classList.remove('player--active');
    } else {
      playerTwo.classList.add('player--winner');
      playerTwo.classList.remove('player--active');
    }
    hasFinished = true;
  }
};
