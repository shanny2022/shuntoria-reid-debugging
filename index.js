const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const form = document.getElementById('guess-form');

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
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
}

function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  // basic validation and stretch goal: 1 to 99 only
  if (Number.isNaN(guess) || guess < 1 || guess > 99) {
    hideAllMessages();
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.textContent =
      'Please enter a number between 1 and 99.';
    guessInput.value = '';
    return;
  }

  attempts += 1;
  hideAllMessages();

  if (guess === targetNumber) {
    const guessWord = attempts === 1 ? 'guess' : 'guesses';

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML =
      `You guessed ${guess}. <br> You made ${attempts} ${guessWord}.`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    // wrong guess
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    const guessWord = remainingAttempts === 1 ? 'guess' : 'guesses';

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML =
      `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;

    if (attempts === maxNumberOfAttempts) {
  submitButton.disabled = true;
  guessInput.disabled = true;

  // do NOT hide all messages here
  maxGuessesMessage.style.display = '';
  numberOfGuessesMessage.style.display = '';
  numberOfGuessesMessage.innerHTML =
    `You guessed ${guess}. <br> 0 guesses remaining`;
}

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

// Handle form submit so the page does not reload
form.addEventListener('submit', function (event) {
  event.preventDefault();
  checkGuess();
});

// Reset button starts a new game
resetButton.addEventListener('click', setup);

// Initialize game on page load
setup();

