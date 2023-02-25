
// GAME FUNCTION 
// Player must guess a number between a min and max
// player gets a certain amount of guesses
// notify player of guesses remaining 
// notify the player of the correct answer if loose 
// let player choose to play again 

//Game value 
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3,
    score = localStorage.getItem('high-score') || 0;

    clap = new Audio ('./Clap.mp3'),
    clap.volume = 0.2;

    
// UI Element 
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      gameScore = document.querySelector('.count'),
      reset = document.querySelector('#restart');

// Assign UL min and max value 
minNum.textContent = min;
maxNum.textContent = max;
gameScore.value = score;


// play again event listerner 
game.addEventListener('mousedown', (e) => {
    if(e.target.className === 'play-again'){
      window.location.reload();
    }
})

// listen for guess 
guessBtn.addEventListener('click', () => {
      let guess = parseInt(guessInput.value);

    //Validation
    if(isNaN (guess) || guess < min || guess > max){
        setMessage(`please enter a number between ${min} and ${max}`, 'red')
    }
 
    // check if won
    if(guess === winningNum){
        GameOver(true, `${winningNum} is correct, You WON!`);

        gameScore.value = parseInt(score) + 5;
        localStorage.setItem("high-score", gameScore.value)
        clap.play();

    } else if (isNaN (guess) || guess < min || guess > max){
        guessesLeft = guessesLeft
        
        // Clear Input 
        guessInput.value = '';

    } else {
      // Game continue - answer wrong
     // wrong number 
     guessesLeft = guessesLeft - 1;

     // change border color 
     guessInput.style.borderColor = 'red';

     // Clear Input 
     guessInput.value = '';

     // Tell user its a wrong number
     setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')

     if(guessesLeft === 0){
        //Game over - Lost

        GameOver (false, `Game Over, You lost!. The correct number was ${winningNum}`);
     }
    }
})

function GameOver (won, msg){
    let color;
    won === true ? color = 'green' : color = 'red'

    // Disable Input 
    guessInput.disabled = true;
    // change border color 
    guessInput.style.borderColor = color;
    // set text color 
    message.style.color = color;
    // Set a won message  
    setMessage(msg);

    // play Again 
    guessBtn.value = 'Play Again'
    guessBtn.className = 'play-again' 
}

// Clear Score from LS 
reset.addEventListener('click', clear);

function clear (){
    if(confirm('Are you sure')){
        localStorage.setItem('high-score', 0);
        window.location.reload();
    }
}

// get Random number 
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// set message 
function setMessage(msg,color){
    message.textContent = msg;
    message.style.color = color;
}