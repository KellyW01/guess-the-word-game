

//game mesage
const message = document.querySelector(".message"); //game says good guess or sorry letter not included
//random word to guess
const wordInProgressElement = document.querySelector(".word-in-progress");//hidden word, appears w/ correct guesses
//number of guesses remaining
const guessCount = document.querySelector(".remaining span"); // sentence w/ number of remaining guesses
//list of guessed letters not in the word
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLetters =[];
//box where user can type thier letter guess
const letterInput = document.querySelector(".letter"); 
//button to click to enter letter
const guessButton = document.querySelector(".guess"); 
//button to play again
const playAgain = document.querySelector("button.pay-again"); 

const word = "magnolia"; // using to test code.  Will need to update to API

//split() =  a string into substrings and returns these elements as an array - break the word down to letters

//function to add placeholders for each letter
const wordToGuess = function () { 
    const wordArray = word.toUpperCase().split(''); //return word as array of uppercaase letters see: https://builtin.com/software-engineering-perspectives/split-string-javascript without a separator, the entire string will be treated as one elment in the resulting array, that's why we need ''.
    const placeholder = []; //array for circles

    for ( let letter of wordArray){ //for each letter in the word array
        placeholder.push("●"); //add a "●" to the placeholder array    
    };
    wordInProgressElement.innerText = placeholder.join('');//fill inner text of word in progress element w/ placeholder array. Without join('') each letter has a comma, also join() doesn't work, also leaves commas: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
};

wordToGuess(); //calls function

const clearInput = function(){
    letterInput.value = "";
    //changes input to blank
}

//guess button needs to capture whats in the letter input
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = ''; //empty text of message element - must be before goodGuess for goodGuess to work
    const usersGuess = letterInput.value.toUpperCase();//captures user's input & capitalizes it
    const goodGuess = validateGuess(usersGuess) //call function w/ input as argument, save the result as variable
    if (goodGuess){ 
        makeGuess(usersGuess);//if it passes validateGuess, add to screen and guessedLetters array
        console.log(usersGuess); 
    }
    
    clearInput(); //clears guest name from input box after click event
});

//if user presses enter instead of button
letterInput.addEventListener("keydown", function (e) {
    const usersGuess = letterInput.value.toUpperCase();
    if (e.key === "Enter") {//if user presses the enter key
        e.preventDefault();
        message.innerText = ''; //empty text of message element - must be before goodGuess for goodGuess to work
        const usersGuess = letterInput.value.toUpperCase();//captures user's input
        const goodGuess = validateGuess(usersGuess) //call function w/ input as argument, save the result as variable
        if (goodGuess){ 
            makeGuess(usersGuess);//if it passes validateGuess add to screen and guessedLetters array 
            console.log(usersGuess);    
    }
    
    clearInput();
}
});

//validate player guesses
const validateGuess = function (input){
    const acceptedLetter = /[A-Z]/g; //regular expression to make sure input is a letter not symbol or number

    //conditional block to test false user input scenarios:
    if (input.length === 0 ){ //if input is blank
        message.innerText = `Please type a guess to play.`;
            
        } else if (input.length > 1){ //if input is more than one character
             message.innerText = `Only one letter at a time, please!`;
             
        } else if (!input.match(acceptedLetter)){//if input is not a letter
          message.innerText = `Please use letters from the english alphabet.  More languages to come...`;
            
        }else{ //we got a single letter, woot woot!
            return input;
            
        }
};
const makeGuess = function(letter){
    //guessedLettersElement.innerText = '';
    if (guessedLetters.includes(letter)){
        message.innerText = `You already guessed ${letter}, try again.`
    }
    else {guessedLetters.push(letter); //add letter to guessedLetters array
    guessedLettersElement.innerText = guessedLetters.toString('');//show guessed letters on screen - need to convert to a string?
    console.log({guessedLetters});}
};


//};
//update guess count
// const updateGuessCount = function(){
//     const guesses = document.querySelectorAll(".guessed-letters li");
//     guessCount.innerText = Number(8-(guesses.length));
//     if (guesses.length === 8){
        //guesses are used regardless of correct or incorrect guess
        //message, you've used up your guesses
//     }
// };
// //populates the list of guessed letters
// const addToList = function (usersGuess){
//     const listItem = document.createElement("li"); //creates a list item
//     listItem.innerText = usersGuess; //adds guess to list
//     //adds guess to list if in the word?
//     guessedLettersElement.append(listItem);
//     guessedLetters.push(usersGuess); //adds guess to guess guess array
