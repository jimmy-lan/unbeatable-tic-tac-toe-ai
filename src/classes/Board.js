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
      return { winner: this.state[0], highlight: [0, 1, 2] };
    }
    if (
      this.state[3] === this.state[4] &&
      this.state[3] === this.state[5] &&
      this.state[3]
    ) {
      return { winner: this.state[3], highlight: [3, 4, 5] };
    }
    if (
      this.state[6] === this.state[7] &&
      this.state[6] === this.state[8] &&
      this.state[6]
    ) {
      return { winner: this.state[6], highlight: [6, 7, 8] };
    }
    // checking vertical wins
    if (
      this.state[0] === this.state[3] &&
      this.state[0] === this.state[6] &&
      this.state[0]
    ) {
      return { winner: this.state[0], highlight: [0, 3, 6] };
    }
    if (
      this.state[1] === this.state[4] &&
      this.state[1] === this.state[7] &&
      this.state[1]
    ) {
      return { winner: this.state[1], highlight: [1, 4, 7] };
    }
    if (
      this.state[2] === this.state[5] &&
      this.state[2] === this.state[8] &&
      this.state[2]
    ) {
      return { winner: this.state[2], highlight: [2, 5, 8] };
    }
    // check diagonal wins
    if (
      this.state[0] === this.state[4] &&
      this.state[0] === this.state[8] &&
      this.state[0]
    ) {
      return { winner: this.state[0], highlight: [0, 4, 8] };
    }
    if (
      this.state[2] === this.state[4] &&
      this.state[2] === this.state[6] &&
      this.state[2]
    ) {
      return { winner: this.state[2], highlight: [2, 4, 6] };
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

  /**
   * Return a string representation of the board
   */
  toString() {
    let output = "";
    this.state.forEach((mark, index) => {
      output += mark ? ` ${mark} |` : "    |";
      if ((index + 1) % 3 === 0) {
        output = output.slice(0, -1);
        if (index < 8) {
          output +=
            "\n \u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015 \n";
        }
      }
    });
    return output;
  }
}
