export class Board {
  constructor(state = new Array(9).fill("")) {
    this.state = state;
  }

  /**
   * Return whether the board is empty
   */
  isEmpty() {
    return this.state.every((mark) => !mark);
  }

  /**
   * Return whether the board is full
   */
  isFull() {
    return this.state.every((mark) => mark);
  }

  // Note: when the board is larger, we can
  // iterate over all cells and check whether each
  // cell with a mark is part of the winning row/col/diagonal
  // Since the board is so small, we brute force it
  isTerminal() {
    // check horizontal wins
    if (
      this.state[0] === this.state[1] &&
      this.state[0] === this.state[2] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "H", row: 1 };
    }
    if (
      this.state[3] === this.state[4] &&
      this.state[3] === this.state[5] &&
      this.state[3]
    ) {
      return { winner: this.state[3], direction: "H", row: 2 };
    }
    if (
      this.state[6] === this.state[7] &&
      this.state[6] === this.state[8] &&
      this.state[6]
    ) {
      return { winner: this.state[6], direction: "H", row: 3 };
    }
    // checking vertical wins
    if (
      this.state[0] === this.state[3] &&
      this.state[0] === this.state[6] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "V", row: 1 };
    }
    if (
      this.state[1] === this.state[4] &&
      this.state[1] === this.state[7] &&
      this.state[1]
    ) {
      return { winner: this.state[1], direction: "V", row: 2 };
    }
    if (
      this.state[2] === this.state[5] &&
      this.state[2] === this.state[8] &&
      this.state[2]
    ) {
      return { winner: this.state[2], direction: "V", row: 3 };
    }
    // check diagonal wins
    if (
      this.state[0] === this.state[4] &&
      this.state[0] === this.state[8] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "D", row: 1 };
    }
    if (
      this.state[2] === this.state[4] &&
      this.state[2] === this.state[6] &&
      this.state[2]
    ) {
      return { winner: this.state[2], direction: "D", row: 2 };
    }
    // if no winner but the board is full, then it's a draw
    if (this.isFull()) {
      return { winner: "draw" };
    }

    return false;
  }

  /**
   * Place a mark on cell index
   * @param {string} mark the mark to be placed. "x" | "o"
   * @param {number} index the index of cell to place this mark
   */
  placeMark(mark, index) {
    if (index >= 9 || this.state[index]) {
      return false;
    }
    this.state[index] = mark;
    return true;
  }

  /**
   * Return a list of indices corresponding to
   * empty cells.
   */
  getEmptyCells() {
    const cells = [];
    this.state.forEach((cell, index) => {
      if (!cell) cells.push(index);
    });
    return cells;
  }
}
