import React from "react";
import PropTypes from "prop-types";
import '../css/GamePanel.css';

const GamePanel = ({ moves, time }) => {
  let mod = time%60;
  let minutes = Math.floor(time/60);
  minutes = (minutes < 10 ? '0':'' ) + minutes;
  mod = (mod < 10 ? '0':'' ) + mod;
  return (
  <div className="GamePanel">
    <div>Ходов: {moves}</div>
    <div>Время: {minutes}:{mod}</div>
  </div>
)};

GamePanel.propTypes = {
  moves: PropTypes.number,
  time: PropTypes.number
};

export default GamePanel;
