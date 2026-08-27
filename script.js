const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];

let gameRunning = true;

const player = "X";
const computer = "O";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// ============================
// PLAYER MOVE
// ============================

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = Number(cell.dataset.index);

        // Don't allow move if already occupied
        // or game is finished
        if (board[index] !== "" || !gameRunning) {
            return;
        }

        // Player plays X
        board[index] = player;
        cell.textContent = player;

        const result = checkWinner();

        if (result) {
            return;
        }

        // Computer's turn
        statusText.textContent = "🤖 Computer is thinking...";

        setTimeout(computerMove, 500);
    });

});


// ============================
// COMPUTER MOVE
// ============================

function computerMove() {

    if (!gameRunning) {
        return;
    }

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            emptyCells.push(i);
        }

    }

    // No moves left
    if (emptyCells.length === 0) {
        return;
    }

    // Choose a random empty cell
    const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = computer;

    cells[randomIndex].textContent = computer;

    const result = checkWinner();

    if (result) {
        return;
    }

    statusText.textContent = "Your turn (X)";
}


// ============================
// CHECK WINNER
// ============================

function checkWinner() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            if (board[a] === player) {

                statusText.textContent = "🎉 You win!";

            } else {

                statusText.textContent = "🤖 Computer wins!";

            }

            gameRunning = false;

            return true;
        }
    }

    // Check draw
    if (!board.includes("")) {

        statusText.textContent = "🤝 It's a draw!";

        gameRunning = false;

        return true;
    }

    return false;
}


// ============================
// RESTART GAME
// ============================

restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    gameRunning = true;

    statusText.textContent = "Your turn (X)";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}