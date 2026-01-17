const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const resetBtn = document.querySelector('#resetBtn');
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

cells.forEach(cell => cell.addEventListener('click', cellClicked));
resetBtn.addEventListener('click', restartGame);

function cellClicked() {
    const index = this.getAttribute('data-index');
    if (options[index] != "" || !running) return;
    updateCell(this, index);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true; break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player X's Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
