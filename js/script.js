
                         //*** GLOBAL VARIABLES ***//
const guessedLettersElement = document.querySelector(".guessed-letters"); //shows guesssed letters
const guessButton = document.querySelector(".guess"); //guess button
const letterInput = document.querySelector(".letter");// where the player enters the letter
const wordInProgressElement = document.querySelector(".word-in-progress");//hidden word, appears w/ correct guesses
const guessCount = document.querySelector(".remaining span"); // sentence w/ number of remaining guesses
const message = document.querySelector(".message"); //game message
const playAgain = document.querySelector("button.play-again");

let word = "magnolia";//default word incase API fails
const guessedLetters = []; //array for all guesses - correct and incorrect.
let remainingGuessess = 8;



//choose a random word

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

//guess button to capture whats been entered in the letter input
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); 
    message.innerText = ''; //empty text of message element

    const guess = letterInput.value.toUpperCase();//captures user's input & capitalizes it
    const validGuess = validateGuess(guess) //call function w/ input as argument, save the result as variable

    if (validGuess){ //if guess passes validation
        makeGuess(guess);// calls makeGues function which checks to see if that letter has already been tried, and if not pushes the letter to the guessedLetters array and updates the guess count.
    }
     letterInput.value = ""; //clears the letter input for the user to make another guess
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

//!! need help here - not sure how to access 'word'
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
        
        wonTheGame();
};
//!! same here - can't access 'word'
const wonTheGame = function(){ //check to see if their word in progress matches the word to guess

    if (word.toUpperCase() === wordInProgressElement.innerText){
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
//startOver();

    }
};
//!! same here, can't access 'word'
const guessCountdown = function(guess){ 
   //make an array with the letters of the word
   const letterArray = word.toUpperCase().split(); //but I can't access word
    if (letterArray.includes(guess)){
        message.innerText = "Good Guess!"
    }
    else{
        message.innerText = `Nope, not that one, try a different letter.`;
        remainingGuessess = (remainingGuessess - 1);
        guessCount.innerText = `(${remainingGuessess})`
    }

    if (remainingGuessess == 1){
        message.innerText = "You only have one guess left!"
    }
    if (remainingGuessess == 0){
        message.innerText = "Tough luck, try again next time."
        playAgain.classList.remove("hide");
    };
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
