import { Board } from "./Board";

export class Player {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth;
    /**
     * Map where key is some optimal score and value is an array of
     * moves that will result in the optimal score assuming all players
     * play rationally.
     */
    this.nodesMap = new Map();
  }

  getBestMove(board, isMaximizing = true, depth = 0) {
    // when we call the function from the root, clear any
    // previous calculations
    if (depth === 0) {
      this.nodesMap.clear();
    }

    const terminalState = board.isTerminal();

    if (terminalState || depth === this.maxDepth) {
      if (terminalState.winner === "x") {
        return 100 - depth;
      } else if (terminalState.winner === "o") {
        return -100 + depth;
      }
      // a draw occurs
      return 0;
    }

    /** Best value that can be obtained through all moves */
    let bestValue = isMaximizing ? -100 : 100;
    const currentMark = isMaximizing ? "x" : "o";

    board.getEmptyCells().forEach((cellIndex) => {
      // child board to compute score of this move
      let childBoard = new Board(board.state.slice());

      // compute optimal value of this move and update bestValue
      childBoard.placeMark(currentMark, cellIndex);
      let childBestValue = this.getBestMove(
        childBoard,
        !isMaximizing,
        depth + 1
      );
      if (isMaximizing) {
        bestValue = Math.max(bestValue, childBestValue);
      } else {
        bestValue = Math.min(bestValue, childBestValue);
      }

      if (depth === 0) {
        let moves = this.nodesMap.has(childBestValue)
          ? this.nodesMap.get(childBestValue).concat([cellIndex])
          : [cellIndex];
        this.nodesMap.set(childBestValue, moves);
      }
    });

    if (depth === 0) {
      const bestMoves = this.nodesMap.get(bestValue);
      // when we have multiple best moves, we can select any
      // one of them
      const rnd = Math.floor(Math.random() * bestMoves.length);
      return bestMoves[rnd];
    }

    return bestValue;
  }
}
