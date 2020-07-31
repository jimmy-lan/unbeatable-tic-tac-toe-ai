import { Board } from "./Board";

export class Player {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth;
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

    if (isMaximizing) {
      /** Best value that can be obtained through the move */
      let bestValue = -100;

      board.getEmptyCells().forEach((cellIndex) => {
        // child board to compute score of this move
        let childBoard = new Board(board.state.slice());

        // compute optimal value of this move and update bestValue
        childBoard.placeMark("x", cellIndex);
        let childBestValue = this.getBestMove(childBoard, false, depth + 1);
        bestValue = Math.max(bestValue, childBestValue);

        if (depth === 0) {
          let moves = this.nodesMap.has(childBestValue)
            ? this.nodesMap.get(childBestValue).concat([cellIndex])
            : [cellIndex];
          this.nodesMap.set(childBestValue, moves);
        }
      });

      if (depth === 0) {
        const bestMoves = this.nodesMap.get(bestValue);
        // we select the first best move
        // note that when we have multiple best moves, we can select any one
        // of them
        let move = bestMoves[0];
        return new Promise((resolve) => {
          resolve(move);
        });
      }

      return bestValue;
    }
  }
}
