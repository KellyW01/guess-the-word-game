
                         //*** GLOBAL VARIABLES ***//
//*** GAME MESSAGE ***/
const message = document.querySelector(".message"); //game says good guess or sorry letter not included

//*** NUMBER OF GUESSES REMAINING ELEMENT ***/
const guessCount = document.querySelector(".remaining span"); // sentence w/ number of remaining guesses

//** INPUT ELEMENT FOR GUESSING LETTERS ***/
const letterInput = document.querySelector(".letter");

// *** GUESS BUTTON  ***/
const guessButton = document.querySelector(".guess");

//*** PLAY AGAIN BUTTON ***/
const playAgain = document.querySelector("button.pay-again");

//TEST CODE WORD//
const word = "magnolia"; // using to test code.  Will need to update to API

// *** WORD IN PROGRESS ELEMENT & ARRAY*** /
const wordInProgressElement = document.querySelector(".word-in-progress");//hidden word, appears w/ correct guesses
let wordInProgress = []; //array to hold circles and correct letters

// *** GUESSED LETTERS DISPLAY & ARRAY *** /
const guessedLettersElement = document.querySelector(".guessed-letters"); 
const guessedLetters = []; //array for all guesses - correct and incorrect.

// ***WORD ARRAY FOR WORD TO GUESS ***/
const wordArray = word.toUpperCase().split(''); // split: to return word as array of uppercase letters, see: https://builtin.com/software-engineering-perspectives/split-string-javascript without a separator, the entire string will be treated as one elment in the resulting array, that's why we need ''.

                               //** GAME BEGINS **/
//function to add placeholders for each letter for before any guesses are made
const placeholder = function () {
    for (let letter of wordArray) { //for each letter in the word array
        wordInProgress.push("●"); //add a "●" to the circles array    
    };
   console.log(wordInProgress);
    wordInProgressElement.innerText = wordInProgress.join('');//fill inner text of word in progress element w/ placeholder array. Without join('') each letter has a comma, also join() doesn't work, also leaves commas: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join  join() converts all elements of an array to a single string
    };

placeholder(); //call placeholder function


const clearInput = function () {
    letterInput.value = "";
    //changes input to blank
}

//guess button to capture whats been entered in the letter input
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ''; //empty text of message element

    const usersGuess = letterInput.value.toUpperCase();//captures user's input & capitalizes it
    const validGuess = validateGuess(usersGuess) //call function w/ input as argument, save the result as variable
    makeGuess(validGuess); //prevents same letter twice
    updateWordInProgress(guessedLetters);
    clearInput(); //clears letter input box
});


//validate player guesses
const validateGuess = function (input) {
    const acceptedLetter = /[A-Z]/g; //regular expression to make sure input is a letter not symbol or number

    //conditional block to test false user input scenarios:
    if (input.length === 0) { //if input is blank
        message.innerText = `Please type a guess to play.`;

    } else if (input.length > 1) { //if input is more than one character
        message.innerText = `Only one letter at a time, please!`;

    } else if (!input.match(acceptedLetter)) {//if input is not a letter
        message.innerText = `Please use letters from the english alphabet.  More languages to come...`;

    } else { //we got a single letter, woot woot!
        return input;
    }
};

const makeGuess = function (letter) {
   
    if (guessedLetters.includes(letter)) {
        message.innerText = `You already tried that one, guess again.`
    } else {
    guessedLetters.push(letter);
    guessedLettersElement.innerHTML = ''; 
    console.log({guessedLetters});
    
    let listItem = document.createElement("li");
    guessedLettersElement.append(listItem);
    listItem.innerText = (letter);
    guessedLettersElement.innerText = guessedLetters.join(', ');
    
};
};

const updateWordInProgress = function (guessedLetters){
        const revealWord = [];
        for (const letter of wordArray){ //for each letter of wordArray
        if (guessedLetters.includes(letter)){ //see if guessedLetters array includes letters from word Array
            revealWord.push(letter.toUpperCase()); //if it does, push the letter to revealWord.
        }else {
            revealWord.push('●'); //if it doesn't, push *
        }
       }
        console.log({revealWord}, {wordArray});
        wordInProgressElement.innerText = revealWord.join(''); //update inner text to revealWord
        wonTheGame(revealWord);
};

const wonTheGame = function(revealWord){ //check to see if their word in progress matches the word to guess
    
//     if ( revealWord == wordArray) why doesn't this work?
if (word.toUpperCase() === wordInProgressElement.innerText){
message.classList.add("win");
message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};



//if user presses enter instead of button
// letterInput.addEventListener("keydown", function (e) {
//     const usersGuess = letterInput.value.toUpperCase();
//     if (e.key === "Enter") {//if user presses the enter key
//         e.preventDefault();
//         message.innerText = ''; //empty text of message element - must be before goodGuess for goodGuess to work
//         const usersGuess = letterInput.value.toUpperCase();//captures user's input
//         const validGuess = validateGuess(usersGuess) //call function w/ input as argument, save the result as variable
//         if (validGuess) {
//             makeGuess(usersGuess);//if it passes validateGuess add to screen and guessedLetters array 
//             //correctGuess(usersGuess);
//             console.log(usersGuess);
//         }

//         clearInput();
//     }
// });
