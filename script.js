let currentPlayer = 'O';
let board = ['', '', '', '', '', '', '', '', ''];
let gameFinished = true;
let scorePlayerX = 0;
let scorePlayerO = 0;
let scoreDraw = 0;
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', processingCellClick));

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameFinished = false;
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    clearBoard();
    document.getElementById("currentPlayerInfo").innerHTML = "It's " + currentPlayer + "'s turn";
    document.getElementById("scoreTable").innerHTML = "Player(X): " + scorePlayerX + " Draw: " + scoreDraw + " Player(O): " + scorePlayerO;
}

function clearBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; ++i) {
        cells[i].textContent = '';
    }
}

function processingCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.id);
    if (board[index] !== '' || gameFinished) {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWin();
    if (!gameFinished && currentPlayer === 'X') {
        currentPlayer = 'O';
    } else if (!gameFinished && currentPlayer === 'O') {
        currentPlayer = 'X';
    }
    document.getElementById("currentPlayerInfo").innerHTML = "It's " + currentPlayer + "'s turn";
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; ++i) {
        const [a, b, c] = winConditions[i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            gameFinished = true;
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                startGame();
            }, 100);
            if (currentPlayer === 'X') {
                ++scorePlayerX;
            } else {
                ++scorePlayerO;
            }
            return;
        }
    }
    let isBoardFull = true;
    for (let i = 0; i < board.length; ++i) {
        if (board[i] === '') {
            isBoardFull = false;
            break;
        }
    }
    if (isBoardFull) {
        gameFinished = true;
        setTimeout(() => {
            alert('Draw!');
            startGame();
        }, 100);
        ++scoreDraw;
    }
}

function resetGame() {
    if (!gameFinished) {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'O';
        clearBoard();
        scorePlayerX = 0;
        scorePlayerO = 0;
        scoreDraw = 0;
        document.getElementById("scoreTable").innerHTML = "Player(X): " + scorePlayerX + " Draw: " + scoreDraw + " Player(O): " + scorePlayerO;
        startGame();
    }
}
