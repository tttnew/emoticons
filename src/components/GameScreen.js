import React from "react";
import "../css/GameScreen.css";

const GameScreen = ({ children }) => (
  <div className="GameScreen">
    <div>{children}</div>
  </div>
);

export default GameScreen;
