import { createSlice } from "@reduxjs/toolkit";
import { getAIPlayerMove } from "../controller/gameController";
import { Board } from "../classes/Board";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    board: new Array(9).fill(""),
    currentMark: "x",
    canPlay: true,
    highlightNodes: [],
  },
  reducers: {
    placeMark(state, action) {
      const index = action.payload;
      if (index >= 9 || index < 0 || state.board[index] || !state.canPlay) {
        return;
      }
      state.board[index] = state.currentMark;
      state.currentMark = state.currentMark === "x" ? "o" : "x";

      // calculate highlight nodes
      const currentBoard = new Board(state.board);
      const terminal = currentBoard.isTerminal();
      if (terminal) {
        state.highlightNodes = terminal.highlight;
        state.canPlay = false;
      }
    },
    aiMove(state) {
      const aiPlayerMove = getAIPlayerMove(
        state.board,
        state.currentMark === "x"
      );
      if (aiPlayerMove === -1) {
        return;
      }
      state.board[aiPlayerMove] = state.currentMark;
      state.currentMark = state.currentMark === "x" ? "o" : "x";

      // calculate highlight nodes
      const currentBoard = new Board(state.board);
      const terminal = currentBoard.isTerminal();
      if (terminal) {
        state.highlightNodes = terminal.highlight;
        state.canPlay = false;
      }
    },
    setCanPlay(state, action) {
      state.canPlay = action.payload;
    },
  },
});

const { actions, reducer } = gameSlice;

export const { placeMark, aiMove, setCanPlay } = actions;
export default reducer;
