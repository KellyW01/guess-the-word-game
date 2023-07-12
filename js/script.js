

//game mesage
const message = document.querySelector(".message"); //game says good guess or sorry letter not included
//random word to guess
const wordInProgress = document.querySelector(".word-in-progress");//hidden word, appears w/ correct guesses
//number of guesses remaining
const guessCount = document.querySelector(".remaining span"); // sentence w/ number of remaining guesses
//list of guessed letters not in the word
const guessedLetters = document.querySelector(".guessed-letters");
//box where user can type thier letter guess
const guessInput = document.querySelector(".guess-form input"); 
//button to click to enter letter
const guessButton = document.querySelector(".guess"); 
//button to play again
const playAgain = document.querySelector("button.pay-again"); 

let word = "magnolia"; // using to test code.  Will need to update to API

//split a string into substrings and 
    //return these elements as an array - break the word down to letters
const wordArray = word.split("");

const wordToGuess = function (word) { //function to add placeholders for each lette
    // const length = Number(word.length);
    //add 'word' to 'wordInProgress' element
    wordInProgress.innerText = wordArray.fill("●");
    
    // const placeholder = ["●"];
    //for each letter of word, replace letter with 0
// wordArray.splice(0,length,placeholder);
};

wordToGuess(word); //calls function

//guess button needs to capture whats in the letter input
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const usersGuess = guessInput.value;
    if (usersGuess !== "") {
    //   addToList(usersGuess); will add letter 
      clearInput(); //clears guest name from input box after click event
      updateGuessCount();
      console.log(usersGuess);
    }
});

guessInput.addEventListener("keydown", function (e) {//if user presses enter
    const usersGuess = guessInput.value;
    if (usersGuess !== "" && e.key === "Enter") {
    //   addToList(usersGuess); 
      clearInput(); //clears guest name from input box after click event
      updateGuessCount();
      console.log(usersGuess);
    }
  });
const clearInput = function(){
    guessInput.value = ""; //changes input to blank
}
//update guess count
const updateGuessCount = function(){
    const guesses = document.querySelectorAll(".guessed-letters li");
    guessCount.innerText = Number(8-(guesses.length));
    if (guesses.length === 8){
        //guesses are used regardless of correct or incorrect guess
        //message, you've used up your guesses
    }
};
//populates the list of guessed letters
const addToList = function (usersGuess){
    const listItem = document.createElement("li"); //creates a list item
    listItem.innerText = usersGuess; //adds guess to list
    //adds guess to list if in the word?
    guessedLetters.append(listItem);
}