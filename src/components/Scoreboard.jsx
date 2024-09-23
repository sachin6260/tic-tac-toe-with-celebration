import React from 'react';
import './Scoreboard.css'; // Ensure styling

function Scoreboard({ xWins, oWins }) {
  return (
    <div className="scoreboard">
      <div className="score">
        <i className="fas fa-times"></i> X Wins: {xWins}
      </div>
      <div className="score">
        <i className="far fa-circle"></i> O Wins: {oWins}
      </div>
    </div>
  );
}

export default Scoreboard;
