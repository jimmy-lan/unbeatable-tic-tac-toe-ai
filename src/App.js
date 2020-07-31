import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import { Board } from "./containers/Board/Board";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
