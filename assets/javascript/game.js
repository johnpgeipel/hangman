let wins = 0;
let losses = 0;
let numGuesses = 10;
let secretPhrase;
let phraseArray = [];
let blankArray = [];
let letterGuessed = [];
let currentGuess;
const validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const secretArray = ["PONG", "BREAKOUT", "PITFALL", "CENTIPEDE", "DONKY KONG"] 
const spanWins = document.getElementById("spanWins");
const spanLosses = document.getElementById("spanLosses");
const spanNumGuesses = document.getElementById("spanNumGuesses");
const spanLettersGuessed = document.getElementById("spanLettersGuessed");
const spanSecretRandom = document.getElementById("spanSecretRandom");
const changeGameStatus = document.getElementById("gameStatus");

// Generate random number to choose secretPhrase from secretArray
function randomSelection() {
    secretPhrase = secretArray[Math.floor(Math.random() * secretArray.length)];
    console.log(secretPhrase)
}

// Create an array of letters in the secret phrase and a corresponding array for the blamk spaces
function createArrays() {
    phraseArray = [];
    blankArray = [];
    phraseArray = secretPhrase.split("");
    phraseArray.forEach( () => blankArray.push("_"));
    spanSecretRandom.innerHTML = blankArray.join(" ");
}

// New Game function to start the play
function newGame() {
    randomSelection();
    createArrays();

    phraseArray.forEach( letter => letter === " "? ( blankArray.indexOf(letter) = "&nbsp;",
        spanSecretRandom.innerHTML = blankArray.join(" ") ) : "");

    numGuesses = 10;
    lettersGuessed = [];
    spanLettersGuessed.innerHTML = lettersGuessed;
    spanWins.innerHTML = wins;
    spanLosses.innerHTML = losses;
    spanNumGuesses.innerHTML = numGuesses;
    changeGameStatus.innerHTML = "PRESS ANY KEY TO PLAY";
}

// Function called when user runs put of guesses
function gameOver() {
    losses++;
    spanLosses.innerHTML = losses;
    changeGameStatus.innerHTML = "THE SECRET PHRASE WAS " + secretPhrase + ".";
}

// function called when the user guesses the correct answer
function youWin() {
    wins++;
    spanWins.innerHTML = wins;
    changeGameStatus.innerHTML  = "YOU WIN";
}

//  function to check the letters guessed
function checkLetter() {
    if (validKeys.indexOf(currentGuess) > -1) {
        if ((secretPhrase.indexOf(currentGuess) > -1)) {
            for (var i = 0; i < secretPhrase.length; i++) {
                if (phraseArray[i] === currentGuess) {
                    blankArray[i] = currentGuess;
                    spanSecretRandom.innerHTML = blankArray.join(" ");
                }
            }
        } else {
            lettersGuessed.push(currentGuess);
            spanLettersGuessed.innerHTML = lettersGuessed.join(" ");
            numGuesses--;
            numGuesses <= 0 ? spanNumGuesses.innerHTML = 0 : spanNumGuesses.innerHTML = numGuesses;
        }
    } else {
        alert("Please guess a valid letter");
    }
}

// Code to start new game
newGame();

document.onkeyup = function(event) {
    if (numGuesses < 1) {
        return;
    } else if (blankArray.indexOf("_") < 0) {
        return;
    };

    let keyHit = event.key;
        currentGuess = keyHit.toUpperCase();
        console.log(currentGuess)

    checkLetter();

    blankArray.indexOf("_") < 0 ? youWin() : numGuesses === 0 ? gameOver() : "";
 }