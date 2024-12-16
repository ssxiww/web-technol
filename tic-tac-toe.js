export class TicTacToe {
    constructor(options) {
        this.el = options.el;
        this.onMove = options.onMove;
        this.currentPlayer = 'X';
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.moves = 0;
        this.gameOver = false;
    }

    static init(options) {
        return new TicTacToe(options);
    }

    startGame() {
        this.el.addEventListener('click', this.handleCellClick.bind(this));
        this.onMove(true);
    }

    restartGame() {
        this.resetBoard();
        this.currentPlayer = 'X';
        this.moves = 0;
        this.gameOver = false;
        this.onMove(true);
        this.updateBoard();
    }

    handleCellClick(event) {
        if (this.gameOver) return;

        const cell = event.target;
        const row = parseInt(cell.getAttribute('data-row')) - 1;
        const col = parseInt(cell.getAttribute('data-col')) - 1;

        if (this.board[row][col] === '') {
            this.board[row][col] = this.currentPlayer;
            cell.innerText = this.currentPlayer;
            this.moves++;

            if (this.checkWin(row, col)) {
                alert(`Игрок ${this.currentPlayer} выиграл!`);
                this.gameOver = true;
            } else if (this.checkDraw()) {
                alert('Ничья!');
                this.gameOver = true;
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.onMove(this.currentPlayer === 'X');
            }
        }
    }

    checkWin(row, col) {
        const player = this.board[row][col];

        // Проверка строки
        if (this.board[row].every(cell => cell === player)) return true;

        // Проверка столбца
        if (this.board.every(r => r[col] === player)) return true;

        // Проверка диагоналей
        if (row === col && this.board.every((r, i) => r[i] === player)) return true;
        if (row + col === 2 && this.board.every((r, i) => r[2 - i] === player)) return true;

        return false;
    }

    checkDraw() {
        return this.moves === 9;
    }

    updateBoard() {
        const cells = this.el.querySelectorAll('.tic-tac-toe__ceil');
        cells.forEach(cell => {
            const row = parseInt(cell.getAttribute('data-row')) - 1;
            const col = parseInt(cell.getAttribute('data-col')) - 1;
            cell.innerText = this.board[row][col];
        });
    }

    resetBoard() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        const cells = this.el.querySelectorAll('.tic-tac-toe__ceil');
        cells.forEach(cell => {
            cell.innerText = '';
        });
    }
}