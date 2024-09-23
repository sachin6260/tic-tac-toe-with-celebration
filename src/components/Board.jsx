import React, { useState } from 'react';
import Square from './Square';
import Scoreboard from './Scoreboard';
import PlayerSetup from './PlayerSetup';
import Confetti from 'react-confetti';
import './Board.css';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [winningLine, setWinningLine] = useState([]);
  const [players, setPlayers] = useState(null);
  const [winnerProfile, setWinnerProfile] = useState(null);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      if (winner.player === 'X') {
        setXWins(xWins + 1);
        setWinnerProfile(players.profileX);
      } else {
        setOWins(oWins + 1);
        setWinnerProfile(players.profileO);
      }
      setWinningLine(winner.line);
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 5000); // Celebration duration
    }
  };

  const winner = calculateWinner(squares)?.player;
  let status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setWinningLine([]);
    setWinnerProfile(null);
  };

  const handleSetupComplete = (playerData) => {
    setPlayers(playerData);
    restartGame(); // Reset the game state
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      {!players ? (
        <PlayerSetup onSetupComplete={handleSetupComplete} />
      ) : (
        <>
          <Scoreboard xWins={xWins} oWins={oWins} />
          <div className="status">{status}</div>
          <div className="player-info">
            <div className="player">
              <img src={players.profileX} alt="Player X" className="player-avatar" />
              <span>{players.playerX}</span>
            </div>
            <div className="player">
              <img src={players.profileO} alt="Player O" className="player-avatar" />
              <span>{players.playerO}</span>
            </div>
          </div>
          <div className="board">
            {squares.map((square, i) => (
              <Square 
                key={i} 
                value={square} 
                onClick={() => handleClick(i)} 
                isWinningSquare={winningLine.includes(i)} 
              />
            ))}
          </div>
          <button className="reset-btn" onClick={restartGame}>
            <i className="fas fa-redo"></i> Restart
          </button>
          {isCelebrating && winnerProfile && (
            <div className="celebration-overlay">
              <Confetti />
              <h2>🎉 Congratulations {winner === 'X' ? players.playerX : players.playerO}! 🎉</h2>
              <p>You played exceptionally well! Let's celebrate your victory! 🎊</p>
              <img src={winnerProfile} alt="Winner Profile" className="winner-image" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line };
    }
  }

  return null;
}

export default Board;
