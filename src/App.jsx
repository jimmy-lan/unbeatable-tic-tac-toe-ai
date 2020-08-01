import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import store from "./app/store";
import { PlayingArea } from "./containers/PlayingArea";

function App() {
  return (
    <Provider store={store}>
      <PlayingArea />
    </Provider>
  );
}

export default App;
