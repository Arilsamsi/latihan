const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (boardState[index] === '') {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');

        if (checkWin()) {
            highlightWinningCells();
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetGame();
            }, 200);
        } else if (boardState.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination =>
        combination.every(index => boardState[index] === currentPlayer)
    );
}

function getWinningCombination() {
    return winningCombinations.find(combination =>
        combination.every(index => boardState[index] === currentPlayer)
    );
}

function highlightWinningCells() {
    const winningCombination = getWinningCombination();
    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('win');
        });
    }
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'win');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', resetGame);
