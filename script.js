const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const statusElement = document.getElementById('status');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let board = Array(3).fill(null).map(() => Array(3).fill(null));
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
    statusElement.textContent = `É a vez do jogador ${currentPlayer}`;
}

function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (board[row][col] || !gameActive) {
        return;
    }

    board[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWinner()) {
        statusElement.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        updateScore(currentPlayer);
        
        // Reinicia o jogo após 2 segundos
        setTimeout(restartGame, 500);
    } else if (isBoardFull()) {
        statusElement.textContent = 'Empate!';
        gameActive = false;
        
        // Reinicia o jogo após 2 segundos
        setTimeout(restartGame, 500);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `É a vez do jogador ${currentPlayer}`;
    }
}

function checkWinner() {
    // Verifica linhas
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return true;
        }
    }
    // Verifica colunas
    for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return true;
        }
    }
    // Verifica diagonais
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
    }
    return false;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell));
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (winner === 'O') {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function restartGame() {
    board = Array(3).fill(null).map(() => Array(3).fill(null));
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
    statusElement.textContent = `É a vez do jogador ${currentPlayer}`;
}

// Adiciona o evento de clique ao botão de reiniciar
restartButton.addEventListener('click', restartGame);
createBoard();
