// Initialize the secret number and number of guesses
var secretNumber = 0,
	numberOfGuesses = 0;

// Function to write messages to a specified HTML element
function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	// Append message if appendMessage is true, otherwise replace the message
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

// Function to start a new game
function newGame() {
	// Generate a new secret number between 1 and 100
	secretNumber = Math.floor(Math.random() * 100) + 1;
	// Reset the number of guesses
	numberOfGuesses = 0;
	// Clear the history list
	writeMessage('historyList', '');
}

// Function to check if the guessed number is within the valid range
function guessInRange(guess) {
	return (guess > 0 && guess < 101);
}

// Function to handle the user's guess
function userGuessed() {
	var userGuessed = document.getElementById('userGuess').value;
	var statusArea = document.getElementById('statusArea');
	var historyList = document.getElementById('historyList');

	// Check if the input is empty or out of range
	if (userGuessed.length == 0 || !guessInRange(userGuessed)) {
		// Display a message if the input is invalid
		writeMessage('statusArea', '<p>Please enter a number 1-100 and press the Guess button.</p>');
	} else if (userGuessed.indexOf('.') != -1) {
		// Display a message if the input is not a whole number
		writeMessage('statusArea', '<p>Please enter a whole number 1-100 and press the Guess button.</p>');
	} else {
		// Increment the number of guesses
		numberOfGuesses++;

		if (userGuessed == secretNumber) {
			// User guessed correctly
			writeMessage('statusArea', '<p>You got me in ' + numberOfGuesses + ' guesses, I was thinking ' + secretNumber + '. Let\'s go again...</p>');
			// Start a new game
			newGame();
		} else if (userGuessed < secretNumber) {
			// User's guess is too low
			writeMessage('statusArea', '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
			// Add the guess to the history list
			writeMessage('historyList', '<li>' + userGuessed + ' (too low)</li>', true);
		} else {
			// User's guess is too high
			writeMessage('statusArea', '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
			// Add the guess to the history list
			writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
		}
	}

	// Clear the input field for the next guess
	document.getElementById('userGuess').value = '';
}

// Initialize the game when the window loads
window.onload = function() {
	newGame();
	// Add event listener to the guess button
	document.getElementById('buttonArea').addEventListener('click', userGuessed);
};
