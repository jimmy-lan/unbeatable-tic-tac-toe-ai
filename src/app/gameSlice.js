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
    gameComplete: false,
  },
  reducers: {
    placeMark(state, action) {
      const index = action.payload;
      if (index >= 9 || index < 0 || state.board[index] || !state.canPlay) {
        return;
      }
      state.board[index] = state.currentMark;
      state.currentMark = state.currentMark === "x" ? "o" : "x";
      state.canPlay = false;

      // calculate highlight nodes
      const currentBoard = new Board(state.board);
      const terminal = currentBoard.isTerminal();
      if (terminal) {
        if (terminal.winner === "draw") {
          state.highlightNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        } else {
          state.highlightNodes = terminal.highlight;
        }
        state.canPlay = false;
        state.gameComplete = true;
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
      state.canPlay = true;

      // calculate highlight nodes
      const currentBoard = new Board(state.board);
      const terminal = currentBoard.isTerminal();
      if (terminal) {
        if (terminal.winner === "draw") {
          state.highlightNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        } else {
          state.highlightNodes = terminal.highlight;
        }
        state.canPlay = false;
        state.gameComplete = true;
      }
    },
    setCanPlay(state, action) {
      state.canPlay = action.payload;
    },
    resetBoard(state) {
      state.board = new Array(9).fill("");
      state.currentMark = "x";
      state.canPlay = true;
      state.gameComplete = false;
      state.highlightNodes = [];
    },
  },
});

const { actions, reducer } = gameSlice;

export const { placeMark, aiMove, setCanPlay, resetBoard } = actions;
export default reducer;
