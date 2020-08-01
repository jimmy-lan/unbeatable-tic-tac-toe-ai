import { Board } from "../classes/Board";
import { Player } from "../classes/Player";

export const getAIPlayerMove = (boardArr, isMaximizing) => {
  const board = new Board(boardArr);

  if (board.getEmptyCells().length === 0) {
    return -1;
  }

  if (board.isEmpty()) {
    const bestMoves = [0, 2, 4, 6, 8];
    const rnd = Math.floor(Math.random() * bestMoves.length);
    return bestMoves[rnd];
  }

  const aiPlayer = new Player();
  return aiPlayer.getBestMove(board, isMaximizing);
};
