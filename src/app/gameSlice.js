const { createSlice } = require("@reduxjs/toolkit");
const { Board } = require("./Board");

const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: new Board(),
    currentMark: "x",
  },
  reducers: {
    placeMark: (state, action) =>
      state.board.placeMark(state.currentMark, action.payload),
  },
});

const { actions, reducer } = boardSlice;

export const { placeMark } = actions;
export default reducer;
