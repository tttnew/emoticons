import React from "react";
import "../css/GameItem.css";

const GameItem = ({ children, onClick }) => (
  <div className="GameItem" onClick={onClick}>
    <div>{children}</div>
  </div>
);

export default GameItem;
