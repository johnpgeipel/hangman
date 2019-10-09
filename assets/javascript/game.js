var wins = 0;
var losses = 0;
var numGuesses = 10;
var secretArray = ["PONG", "BREAKOUT", "PITFALL", "CENTIPEDE", "DONKY KONG"] 
var secretPhrase;
var phraseArray = [];
var blankArray = [];
var letterGuessed = [];
var currentGuess;
var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var spanWins = document.getElementById("spanWins");
var spanLosses = document.getElementById("spanLosses");
var spanNumGuesses = document.getElementById("spanNumGuesses");
var spanLettersGuessed = document.getElementById("spanLettersGuessed");
var spanSecretRandom = document.getElementById("spanSecretRandom");
var changeGameStatus = document.getElementById("gameStatus");

// Declared variables

// Generate random number to choose secretPhrase from secretArray

function randomSelection() {
    secretPhrase = secretArray[Math.floor(Math.random() * secretArray.length)];
    console.log(secretPhrase)
}

// Create an array of letters in the secret phrase and a corresponding array for the blamk spaces

function createArrays() {
    phraseArray = [];
    blankArray = [];
    var numBlanks = 0;

    phraseArray = secretPhrase.split("");
    numBlanks = phraseArray.length;

    for (var i = 0; i < numBlanks; i++) {
        blankArray.push("_");
    }

    spanSecretRandom.innerHTML = blankArray.join(" ");
    console.log(phraseArray);
}

// New Game function to start the play
function newGame() {
    randomSelection();
    createArrays();

    for ( var i = 0; i < phraseArray.length; i++) {
        if (phraseArray[i] === " ") {
            blankArray[i] = "&nbsp;";
            spanSecretRandom.innerHTML = blankArray.join(" ");
        }
    }

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
    changeGameStatus.innerHTML = "THE SECRET PHRASE WAE " + secretPhrase + ".";
}

// function called when the user guesses the correct answer
function youWin() {
    wins++;
    spanWins.innerHTML = wins;
    changeGameStatus.innerHTML  = "YOU WIN";
}



//  function to check the letters guessed
function checkLetter() {
    console.log(secretPhrase);
    console.log(currentGuess);
    console.log("test: " + secretPhrase.indexOf(currentGuess))
    if (validKeys.indexOf(currentGuess) > -1) {
       if ((secretPhrase.indexOf(currentGuess) > -1)) {
           for (var i = 0; i < secretPhrase.length; i++) {
               if (phraseArray[i] === currentGuess) {
                   blankArray[i] = currentGuess;
                   spanSecretRandom.innerHTML = blankArray.join(" ");
                   console.log(phraseArray[i])
               }
           }
       } else {
           lettersGuessed.push(currentGuess);
           spanLettersGuessed.innerHTML = lettersGuessed.join(" ");
           numGuesses--;
           spanNumGuesses.innerHTML = numGuesses;
       }
   } else {
       alert("Please guess a valid letter");
   }
}

// Code to start new game

newGame();

document.onkeyup = function(event) {
    console.log("you pressed a key");
     if (numGuesses < 1) {
        return;
     } else if (blankArray.indexOf("_") < 0) {
        return;
     }

     let keyHit = event.key;
     currentGuess = keyHit.toUpperCase();
     console.log(currentGuess)

     checkLetter();

     if (blankArray.indexOf("_") < 0 ) {
         youWin();
     } else if (numGuesses === 0) {
         gameOver();
     }
 }

















