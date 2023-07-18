

//game mesage
const message = document.querySelector(".message"); //game says good guess or sorry letter not included
//random word to guess

//number of guesses remaining
const guessCount = document.querySelector(".remaining span"); // sentence w/ number of remaining guesses
//list of guessed letters not in the word
//box where user can type thier letter guess
const letterInput = document.querySelector(".letter");
//button to click to enter letter
const guessButton = document.querySelector(".guess");
//button to play again

const playAgain = document.querySelector("button.pay-again");

const word = "magnolia"; // using to test code.  Will need to update to API
const wordInProgressElement = document.querySelector(".word-in-progress");//hidden word, appears w/ correct guesses
let wordInProgress = []; //array to hold circles and correct letters

const guessedLettersElement = document.querySelector(".guessed-letters"); //display of all guessed letters
const guessedLetters = []; //array for all guesses - correct and incorrect.

const wordArray = word.toUpperCase().split(''); //return word as array of uppercaase letters see: https://builtin.com/software-engineering-perspectives/split-string-javascript without a separator, the entire string will be treated as one elment in the resulting array, that's why we need ''.

//function to add placeholders for each letter
const placeholder = function () {
    for (let letter of wordArray) { //for each letter in the word array
        wordInProgress.push("●"); //add a "●" to the circles array    
    };
   console.log(wordInProgress);
    wordInProgressElement.innerText = wordInProgress.join('');//fill inner text of word in progress element w/ placeholder array. Without join('') each letter has a comma, also join() doesn't work, also leaves commas: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join  join() converts all elements of an array to a single string
    

};
placeholder();


const clearInput = function () {
    letterInput.value = "";
    //changes input to blank
}

//guess button needs to capture whats in the letter input
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ''; //empty text of message element - must be before goodGuess for goodGuess to work
    const usersGuess = letterInput.value.toUpperCase();//captures user's input & capitalizes it
    const validGuess = validateGuess(usersGuess) //call function w/ input as argument, save the result as variable
    makeGuess(validGuess); //prevents same letter twice
    updateWordInProgress(guessedLetters);
    // updateWordInProgress(usersGuess);
    // updateWordInProgress(guessedLetters, wordArray);
    // updateWordInProgress(usersGuess);
    
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
        message.innerText = `You already guessed ${letter}, try again.`
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
//function to replace circle symbols w/ the correct letters guessed
//1. the letters of the word being guessed are looped over and in each loop the players guess is compared to the letter in the word being guessed.
//if the letter guessed is included in the word being guessed the letter is pushed to the array.
//if not a circle symbol is pushed to the reveal word array
//then that array becomes the inner text of the variable word in progreess - replacing the dots added when the site was loaded.


//*** doubles each time.  with guess "A" its an array of 8 that includes two A's.  Second guess M, starts with M but now has 16 characters: *A*****AM******* third guess adds another 8 characterss.  Reveal word is doubling. tried adding return revealWord, code wouldn't run.  Tried making reveal word's scope local instead of global and it stops doubling but forgets which letter was guessed first.  So A = *A*****A* and then you enter 'm' and its m******* instead of combining them  --- I'm so close!!*/

// const updateWordInProgress = function (usersGuess){
//     const revealWord = [];
//     for (letter of wordArray){
//         if (letter === usersGuess){
//             revealWord.push(usersGuess);
//            } else {
//             revealWord.push("●");
//             }};
        
//         wordInProgress =revealWord;
//         console.log({revealWord});
//     wordInProgressElement.innerText = wordInProgress.join('');
    
 //   };
//**********only works the first time ... needs to account for more than one correct guess*********
const updateWordInProgress = function (guessedLetters){
    const revealWord = [];
    for (var letter of wordArray){ 
        if (letter == guessedLetters){ 
            revealWord.push(letter);
           } else {
            revealWord.push("●");
            }};
        
    wordInProgress =revealWord;
    console.log({revealWord});
    wordInProgressElement.innerText = wordInProgress.join('');
    return revealWord;
    };

// **** same thing, only works the first time***
// const updateWordInProgress = function (guessedLetters){
//     const revealWord = [];
//     wordArray.forEach(function(letter, index) {
//         if (letter == guessedLetters){
//             revealWord.push(letter);
//         }else {
//             revealWord.push("●")
//         };
//         wordInProgress = revealWord;
//         console.log({revealWord});
        
//     });
//     wordInProgressElement.innerText = wordInProgress.join('');
// }


    //****   doubles revealWord - two guesses is 16 characters*/
// const updateWordInProgress = function (usersGuess){
//     wordArray.forEach(function(letter,index){
//         if (letter === usersGuess){ 
//             revealWord.push(usersGuess);
//         } else {
//             revealWord.push("●")
//             console.log({revealWord})
//         };
//         wordInProgress = revealWord;
//     });
//     wordInProgressElement.innerText = wordInProgress.join(''); 
// };

//*** this doesn't work.  reveal word is all m's and doesn't show up in the wordInProgressElement */
// const updateWordInProgress = function (usersGuess){
    // for (letter of wordArray){
    // if (wordArray.includes(usersGuess)){
    //     revealWord.push(usersGuess);
    // } else {
    //     revealWord.push("●");
    //     wordInProgress = revealWord;
    // }}

//****** Doesn't work yet.  word in progress element changes to a single * and M is not recognized as a correct guess ****/
 
// const updateWordInProgress = function (guessedLetters){
//     if (wordArray.includes(guessedLetters)){
//         revealWord.push(guessedLetters);
//     }else{
//         revealWord.push("●");
//         console.log({revealWord});
//     }
//     wordInProgress = revealWord;
//     wordInProgressElement.innerText = wordInProgress.join('');
// };
//********* doesnt work, 8 different arrays but doesn't find A as a letter in the wordArray */
// const updateWordInProgress = function (guessedLetters){
//     wordArray.forEach(function(letter,index){
//             if (letter === guessedLetters){ 
//                 revealWord.push(guessedLetters);
//             } else {
//                 revealWord.push("●")
//                 console.log({revealWord})
//             };
//             wordInProgress = revealWord;
//             wordInProgressElement.innerText = wordInProgress.join(''); 
//         });
//     };

//** doesnt work, same reason as above */
// function updateWordInProgress(guessedLetters, wordArray){
//     if (wordArray.includes(guessedLetters)){
//         revealWord.push(guessedLetters)
//     }else{
//         revealWord.push("*");
//         console.log({revealWord})
//         return revealWord;
//     }
//     wordInProgressElement.innerText = wordInProgress.join('');}




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
