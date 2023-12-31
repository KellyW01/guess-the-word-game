
                         //*** GLOBAL VARIABLES ***//
const body = document.querySelector("body");                         
const guessedLettersElement = document.querySelector(".guessed-letters"); //shows guesssed letters
const guessButton = document.querySelector(".guess"); //guess button
const letterInput = document.querySelector(".letter");// where the player enters the letter
const wordInProgressElement = document.querySelector(".word-in-progress");//hidden word, appears w/ correct guesses
const guessCountElement = document.querySelector('.remaining'); // whole sentence of remaining guesses
const guessCount = document.querySelector(".remaining span"); // number of remaining guesses
const message = document.querySelector(".message"); //game message
const playAgain = document.querySelector("button.play-again");

let word = "magnolia";//default word incase API fails
let guessedLetters = []; //array for all guesses - correct and incorrect.
let remainingGuessess = 8;


const getWord = async function(){
    const response = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'); 
    const words = await response.text(); //creates an array of words all attached together like: ability\nable\nabout\nabove\naccept\
    const wordArray = words.split("\n");//creates a new array of words, separated like so: 'ability', 'able', 'about', 'above', 'accept',
    const randomIndex = Math.floor(Math.random()* wordArray.length); //finds the length of the wordListArray, and pulls a random index #
    word = wordArray[randomIndex].trim(); //grabs one word from wordListArray
    console.log({word});
    placeholder(word);
};    
// Start Game
getWord();

// function to add placeholders for each letter for before any guesses are made
const placeholder = function (word) {
    const wordArray = word.toUpperCase().split('');
    console.log({wordArray});
    const wordInProgress = []; //array to hold circles and correct letters
    for (let letter of wordArray) { //for each letter in the word array
        wordInProgress.push("●"); //add a "●" to the circles array    
    };
   
    wordInProgressElement.innerText = wordInProgress.join('');
};


guessButton.addEventListener("click", function (e) {//guess button to capture users input

    e.preventDefault(); 
    message.innerText = ''; //empty text of message element

    const guess = letterInput.value.toUpperCase();//captures user's input & capitalizes it
    const validGuess = validateGuess(guess) //call function w/ input as argument, save the result as variable

    if (validGuess){ //if guess passes validation
        makeGuess(guess);// calls makeGues function which checks to see if that letter has already been tried, and if not pushes the letter to the guessedLetters array and updates the guess count.
    }
     letterInput.value = ""; //clears the letter input for the user to make another guess
});
playAgain.addEventListener("click", function (e){//starts the game over

    body.classList.remove("celebrate");
    message.classList.remove("win");
    message.innerText = ''; //empty text of message element
    guessedLettersElement.innerText = '';
    guessCountElement.innerText = '';
    remainingGuessess = 8;
    // guessedLetters = [];
    guessCount.innerText = remainingGuessess;
    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});

const validateGuess = function (input) {

    const acceptedLetter = /[A-Z]/g; //regular expression to make sure input is a letter not symbol or number

    //conditional block to test false user input scenarios:
    if (input.length === 0) { //if input is empty
        message.innerText = `Please enter a letter to play.`;

    } else if (input.length > 1) { //if input is more than one letter
        message.innerText = `Only one letter at a time, please!`;

    } else if (!input.match(acceptedLetter)) {//if input is not a letter
        message.innerText = `Please use letters from the english alphabet.  More languages to come...`;

    } else { //we got a single letter, woot woot!
        return input;
    }
};

const makeGuess = function (guess) {
   
    if (guessedLetters.includes(guess)) {
        message.innerText = `You already tried that one, guess again.`
    } else {
    guessedLetters.push(guess);
    showguessedLetters(); //shows user what they already guessed
    guessCountdown(guess); //update guess count 
    updateWordInProgress(guessedLetters);
    }
};

const showguessedLetters = function (){

    guessedLettersElement.innerHTML = ''; //clears the list first
    for (const letter of guessedLetters){
        let listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    }
    guessedLettersElement.innerText = guessedLetters.join(', ');
    
};

const updateWordInProgress = function (guessedLetters){

    const wordArray = word.toUpperCase().split('');
    const revealWord = [];
    for (const letter of wordArray){ //for each letter of wordArray
        if (guessedLetters.includes(letter)){ //see if guessedLetters array includes letters from word Array
            revealWord.push(letter.toUpperCase()); //if it does, push the letter to revealWord.
        }else {
            revealWord.push('●'); //if it doesn't, push *
        }
       }
        
        wordInProgressElement.innerText = revealWord.join(''); //update inner text to revealWord
        
        wonTheGame(); //checks to see if word in progress matches the word to guess, see function below
};

const wonTheGame = function(){ //check to see if their word in progress matches the word to guess

    if (word.toUpperCase() === wordInProgressElement.innerText){
        celebrate();
        guessCountElement.classList.add("hide");
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();

    }
};

const guessCountdown = function(guess){ //make an array with the letters of the word
   
   const letterArray = word.toUpperCase().split(); 
    if (letterArray.includes(guess)){
        message.innerText = "Good Guess!"
    }
    else{
        message.innerText = `Nope, not that one, try a different letter.`;
        remainingGuessess = (remainingGuessess - 1);
        guessCount.innerText = `(${remainingGuessess})`
    }

    if (remainingGuessess === 1){
        message.innerText = "You only have one guess left!"
    }
    if (remainingGuessess === 0){
        message.innerHTML = '<p class="highlight">GAME OVER</p>';
        guessCountElement.innerText = `Tough luck!  The word was '${word}' want to try again?`;
        startOver();
    };
};
const startOver = function (){ //starts over whether player wins or looses
    guessButton.classList.add("hide");//hides the guess button
    playAgain.classList.remove("hide");//shows play again button
    guessedLettersElement.classList.add("hide"); //hides guessed letters element
    
};

const celebrate = function(){
    body.classList.add("celebrate")
}


