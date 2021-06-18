// Variables

// player objects
const player1 = {
    score: 0,
    button: document.querySelector('#playerBtn1'),
    display: document.querySelector('#player1')
}

const player2 = {
    score: 0,
    button: document.querySelector('#playerBtn2'),
    display: document.querySelector('#player2')
}
// two span elements that hold scores
const scores = document.querySelectorAll('.scores');
// p element with winner announcement 
const winner = document.querySelector('#winner');
// select element dropdown menu
const games = document.querySelector('select');
const submitBtn = document.querySelector('.submit-btn');
const resetBtn = document.querySelector('#resetBtn');
// Initial value set to 1 game 
let finalGame = 1;
let isGameOver = false;
let total = 0;

// Functions

function scoreTotal() {    
    total = player1.score + player2.score;       
}

function updateScore (player, opponent) {
    if (!isGameOver) {
        player.score++;
        scoreTotal();

        if (total === finalGame) {
            isGameOver = true;
            for (let p of [player1, player2]) {
                p.button.classList.add('disabled');
            }

            if (player.score === opponent.score) {
                winner.textContent = 'It\'s a tie!';
                for (let score of scores) {
                    score.classList.add('tie');
                }
            }

            if (player.score > opponent.score || player.score === finalGame) {
                player.display.classList.add('winner');
                opponent.display.classList.add('loser');
                winner.textContent = `${player.name} wins!`
            }
            if (opponent.score > player.score || opponent.score === finalGame) {
                opponent.display.classList.add('winner');
                player.display.classList.add('loser');
                winner.textContent = `${opponent.name} wins!`
            }
        }
    } 
        player.display.textContent = player.score;    
}

function reset () {
    isGameOver = false;
    // remove all dynamic classes and reset score and display to 0
    for (let p of [player1, player2] ) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('winner', 'loser', 'tie');
        p.button.classList.remove('disabled');    
    }
    // reset select element to first option
    games.selectedIndex = 0;
    // reset final game to 1 game
    finalGame = 1; 
    // reset winner announcement text
    winner.textContent = 'Use the buttons below to keep score';
    // clear player input fields 
    const playerInputs = document.querySelectorAll('input');
    for (let input of playerInputs) {
        input.value = '';
    }
    // reset player button name display 
    player1.button.textContent = '+1 Player 1';
    player2.button.textContent = '+1 Player 2';
    }

// Event Listeners 

submitBtn.addEventListener('click', () => {
    // get value from player name inputs 
    const player1Name = document.querySelector('#player1-name').value;
    const player2Name = document.querySelector('#player2-name').value;
    // display names on player buttons
    player1.button.textContent = `+1 ${player1Name}`;
    player2.button.textContent = `+1 ${player2Name}`;
    // add name property to player objects 
    player1.name = player1Name;
    player2.name = player2Name;
})
// listen for change event on select element and update the value of finalGame to the selected option 
games.addEventListener('change', () => {
    finalGame = games.selectedIndex + 1;
    // reset();
})

player1.button.addEventListener('click', function() {
    updateScore(player1, player2) 
});
player2.button.addEventListener('click', function() {
    updateScore (player2, player1)
});
resetBtn.addEventListener('click', reset);