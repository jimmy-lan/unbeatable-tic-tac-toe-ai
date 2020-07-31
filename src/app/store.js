import { configureStore } from "@reduxjs/toolkit";
import { reducer as boardReducer } from "./gameSlice";

const store = configureStore({ board: boardReducer });

export default store;
