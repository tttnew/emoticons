import React from "react";
import PropTypes from "prop-types";
import '../css/GameItem.css';

const GameItem = ({ children,  onClick}) => (
  <div className="GameItem" onClick={onClick}>
    <div>{children}</div>
  </div>
);

export default GameItem;
