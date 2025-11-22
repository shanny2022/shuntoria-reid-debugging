const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  // basic validation and stretch goal: 1 to 99 only
  if (Number.isNaN(guess) || guess < 1 || guess > 99) {
    hideAllMessages();
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = 'Please enter a number between 1 and 99.';
    guessInput.value = '';
    return;
  }

  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    submitButton.disabled = true;
    guessInput.disabled = true;

    hideAllMessages();
    maxGuessesMessage.style.display = '';
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> 0 guesses remaining`;
  }

  guessInput.value = '';
  resetButton.style.display = '';
}

function setup() {
  // Get random number from 1 to 99
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  // Clear input
  guessInput.value = '';

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
