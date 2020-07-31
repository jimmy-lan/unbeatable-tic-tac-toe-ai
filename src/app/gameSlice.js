import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    board: new Array(9).fill(""),
    currentMark: "x",
  },
  reducers: {
    placeMark(state, action) {
      const index = action.payload;
      if (index >= 9 || index < 0 || state.board[index]) {
        return;
      }
      state.board[index] = state.currentMark;
      state.currentMark = state.currentMark === "x" ? "o" : "x";
    },
  },
});

const { actions, reducer } = gameSlice;

export const { placeMark } = actions;
export default reducer;
