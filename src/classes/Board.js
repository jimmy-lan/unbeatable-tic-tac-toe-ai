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
}
