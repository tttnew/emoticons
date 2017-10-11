import React, { Component } from "react";
import Game from "./components/Game";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game moves={20} time={180} />
      </div>
    );
  }
}

export default App;
