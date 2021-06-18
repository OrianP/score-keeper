// Buttons
const playerBtn1 = document.querySelector('#playerBtn1');
const playerBtn2 = document.querySelector('#playerBtn2');
const playerBtns = document.querySelectorAll('.playerBtns')
const resetBtn = document.querySelector('#resetBtn');

// Score display
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const scores = document.querySelectorAll('.scores');
let score1 = 0;
let score2 = 0;
// select element dropdown menu
const games = document.querySelector('select');
// initial value set to 1 game 
let finalGame = 1;
// winner announcement text 
const winner = document.querySelector('#winner');

// Event Listeners 
// player buttons
playerBtn1.addEventListener('click', updateScore1);
playerBtn2.addEventListener('click', updateScore2);
// reset button 
resetBtn.addEventListener('click', reset);
// select element: listen for change event on select element and update the value of finalGame to the selected option 
games.addEventListener('change', () => {
    finalGame = games.selectedIndex + 1;
})
    // another method to retrieve the selected value using the event object:
        // finalGame = Number(e.target.value); 
    // Another method using this keyword 
        // finalgame = Number(this.value); 

// Functions
// add up the total of both player's scores. 
let total = 0;
function scoreTotal() {    
    total = score1 + score2;       
}

function updateScore1() {
    // increment score by 1 and update the textContent 
        score1++;
        player1.textContent = score1;
    // get the score total   
        scoreTotal();
    // condition to check if the game has ended and run the endGame function to determine winner
        if (score1 === finalGame || score2 === finalGame || total === finalGame) {
            playerBtn1.removeEventListener('click', updateScore1);
            playerBtn2.removeEventListener('click', updateScore2);
            endGame();
        }
}

function updateScore2() {
        score2++
        player2.textContent = score2;
        scoreTotal();
        if (score1 === finalGame || score2 === finalGame || total === finalGame) {
            playerBtn1.removeEventListener('click', updateScore1);
            playerBtn2.removeEventListener('click', updateScore2);
            endGame();
        }
}

function endGame() {
    // add both btns to 'disabled' class
    for (let btn of playerBtns) {
        btn.classList.add('disabled');
    }
    // the winner score turns green and the loser score turns red
    // The p text changes to announce the winner
    if (score1 > score2 || score1 === finalGame) {
        player1.classList.add('green');
        player2.classList.add('red');
        winner.textContent = 'Woo! Orian wins'
    }
    if (score2 > score1 || score2 === finalGame) {
        player2.classList.add('green');
        player1.classList.add('red');
        winner.textContent = 'Boo! Obadiah wins'
    } 
    // If both scores are equal it is a tie
    if (score1 === score2) {
        winner.textContent = 'It\'s a tie!';
        for (let score of scores) {
            score.classList.add('tie');
        }
    }
    }

// When reset is clicked: scores and their textContent reset to 0, buttons are enabled, the select element is reset to 1 game and winner resets to initial text
function reset() {
    for (let score of scores) {
        score.textContent = 0; 
        score.classList.remove('green','red', 'tie');
    }
    for (let btn of playerBtns) {
        btn.classList.remove('disabled');
    }
    playerBtn1.addEventListener('click', updateScore1);
    playerBtn2.addEventListener('click', updateScore2);
    score1 = 0;
    score2 = 0;
    games.selectedIndex = 0;
    finalGame = 1; 
    winner.textContent = 'Use the buttons below to keep score';
}