export const TicTacToe = {

  el: null,


  isGameEnd: false,


  isXTurn: true,

  matrix: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],


  wonCombinations: [
    [[0, 0], [0, 1], [0, 2]], // Строка 1
    [[1, 0], [1, 1], [1, 2]], // Строка 2
    [[2, 0], [2, 1], [2, 2]], // Строка 3
    [[0, 0], [1, 0], [2, 0]], // Столбец 1
    [[0, 1], [1, 1], [2, 1]], // Столбец 2
    [[0, 2], [1, 2], [2, 2]], // Столбец 3
    [[0, 0], [1, 1], [2, 2]], // Диагональ 1
    [[0, 2], [1, 1], [2, 0]], // Диагональ 2
  ],

  /**
   * @returns {object}
   */
  init({ el, onMove }) {
    this.el = el;
    this.onMove = onMove;
    this.boxes = el.querySelectorAll('.tic-tac-toe__ceil');

    return this;
  },

  initListeners() {
    this.boxes.forEach(box => {
      box.addEventListener('click', event => {

        if (
          this.isGameEnd ||
          !this.isBlockEmpty(event.target)
        ) {
          return;
        }

        this.setBlockValue(event.target);

        this.setBlockDom(event.target);

        if (this.checkForWin()) {

          this.setGameEndStatus();
          setTimeout(() => {
            alert('Конец игры: Победил ' + this.getCurrentTurnValue());
          });
          return;
        }

        if (!this.checkHasEmptyBlocks()) {

          this.setGameEndStatus();
          setTimeout(() => {
            alert('Конец игры: Ничья');
          });
          return;
        }

        this.changeTurnValue();

        if (this.onMove) {
          this.onMove(this.isXTurn);
        }
      });
    });
  },

  /**
   * @returns {boolean} 
   */
  checkHasEmptyBlocks() {
    return this.matrix.some(row => row.some(cell => cell === null));
  },

  startGame() {
    this.initListeners();
    this.onMove(this.isXTurn);
  },


  restartGame() {
    this.isGameEnd = false;
    this.isXTurn = true;
    this.matrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.boxes.forEach(box => (box.innerText = ''));
    this.onMove(this.isXTurn);
  },

  /**
   * @param {HTMLDivElement} target
   * @returns {boolean} 
   */
  isBlockEmpty(target) {
    const [row, col] = this.getBlockPosition(target);

    return !this.matrix[row - 1][col - 1];
  },

  /**
   * @param {HTMLDivElement} target 
   * @returns {array} 
   */
  getBlockPosition(target) {
    const { row, col } = target.dataset;

    return [parseInt(row), parseInt(col)];
  },

  /**
   * @param {HTMLDivElement} target 
   * @param {boolean?} clear 
   */
  setBlockValue(target, clear = false) {
    const [row, col] = this.getBlockPosition(target);
    this.matrix[row - 1][col - 1] = clear ? null : this.getCurrentTurnValue();
  },

  /**
   * @param {HTMLDivElement} target 
   * @param {boolean?} clear 
   */
  setBlockDom(target, clear = false) {
    target.innerText = clear ? '' : this.getCurrentTurnValue();
  },

  /**
   * @returns {string}
   */
  getCurrentTurnValue() {
    return this.isXTurn ? 'X' : 'O';
  },


  changeTurnValue() {
    this.isXTurn = !this.isXTurn;
  },

  /**
   * @returns {boolean} 
   */
  checkForWin() {
    for (let i = 0; i < this.wonCombinations.length; i++) {
      const [first, second, third] = this.wonCombinations[i];

      if (
        this.matrix[first[0]][first[1]] &&
        this.matrix[first[0]][first[1]] === this.matrix[second[0]][second[1]] &&
        this.matrix[third[0]][third[1]] === this.matrix[second[0]][second[1]]
      ) {
        return true;
      }
    }

    return false;
  },

  setGameEndStatus() {
    this.isGameEnd = true;
  }
};