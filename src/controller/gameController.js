import { Board } from "../classes/Board";
import { Player } from "../classes/Player";

export const getAIPlayerMove = (boardArr, isMaximizing) => {
  const board = new Board(boardArr);

  if (board.getEmptyCells().length === 0) {
    return -1;
  }

  if (board.isEmpty()) {
    return 4;
  }

  const aiPlayer = new Player();
  return aiPlayer.getBestMove(board, isMaximizing);
};
