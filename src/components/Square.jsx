import React from 'react';
import './Square.css'; // Ensure styling

function Square({ value, onClick, isWinningSquare }) {
  return (
    <button 
      className={`square ${isWinningSquare ? 'highlight' : ''}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
