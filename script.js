'use strict';

// console.log(document.querySelector('.message').textContent); //seleciona apenas o texto da classe message 7

// document.querySelector('.message').textContent = `🎉 Corret Number`;

// document.querySelector(`.number`).textContent = 13;

// document.querySelector(`.score`).textContent = 10;

// document.querySelector(`.guess`).value = 23;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const startGuessingMessage = `Start guessing...`;
const NoNumberMessage = `⛔ No Number!`;
const winMessage = `🎉 Corret Number`;
const loseMessage = `💥 GAME OVER!`;
const toHighMessage = `📈 Too high!`;
const toLowMessage = `📉 Too low!`;
const closeMessage = `😱 Almost there!`;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

function messageHintOrGameOver(hint) {
  if (score > 1) {
    displayMessage(hint);
    score--;
    document.querySelector(`.score`).textContent = score;
  } else {
    score--;
    document.querySelector(`.score`).textContent = score;
    displayMessage(loseMessage);
  }
}

document.querySelector(`.again`).addEventListener(`click`, function () {
  //location.href = location.href; atualiza a pag
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(`body`).style.backgroundColor = ` #222`;
  document.querySelector(`.number`).style.width = `15rem`;
  score = 20;
  displayMessage(startGuessingMessage);
  document.querySelector(`.guess`).value = ``;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.score`).textContent = score;
});

document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);
  console.log(typeof guess);

  //when there is no input
  if (!guess) {
    displayMessage(NoNumberMessage);

    //When player wins
  } else if (guess === secretNumber && score >= 1) {
    displayMessage(winMessage);
    document.querySelector(`.number`).textContent = secretNumber;
    document.querySelector(`body`).style.backgroundColor = ` #60b347`;
    document.querySelector(`.number`).style.width = `30rem`;

    if (score > highscore) {
      highscore = score;
      document.querySelector(`.highscore`).textContent = highscore;
    }
  } else if (guess > secretNumber && guess - secretNumber > 2 && score >= 1) {
    messageHintOrGameOver(toHighMessage);
    //when guess is to low
  } else if (guess < secretNumber && secretNumber - guess > 2 && score >= 1) {
    messageHintOrGameOver(toLowMessage);

    //when guess is close
  } else if (
    (guess > secretNumber && guess - secretNumber <= 2 && score >= 1) ||
    (guess < secretNumber && secretNumber - guess <= 2 && score >= 1)
  ) {
    messageHintOrGameOver(closeMessage);
  }
});
