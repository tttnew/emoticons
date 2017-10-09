import React from "react";
import PropTypes from "prop-types";
import "../css/GameScreen.css";

const GameScreen = ({ children }) => (
  <div className="GameScreen">
    <div>{children}</div>
  </div>
);

export default GameScreen;
