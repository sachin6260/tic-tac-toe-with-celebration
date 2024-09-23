import React, { useState } from 'react';
import './PlayerSetup.css';

function PlayerSetup({ onSetupComplete }) {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const generateAvatar = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=ffffff`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileX = generateAvatar(playerX);
    const profileO = generateAvatar(playerO);
    onSetupComplete({ playerX, playerO, profileX, profileO });
  };

  return (
    <div className="player-setup">
      <h2>Player Setup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player X Name:</label>
          <input type="text" value={playerX} onChange={(e) => setPlayerX(e.target.value)} required />
        </div>
        <div>
          <label>Player O Name:</label>
          <input type="text" value={playerO} onChange={(e) => setPlayerO(e.target.value)} required />
        </div>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default PlayerSetup;
