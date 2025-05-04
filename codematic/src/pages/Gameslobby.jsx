import React, { useState } from 'react';
import './Gameslobby.css';
import certificate from '../assets/certi.jpeg';
import { useNavigate } from 'react-router-dom';
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";

function Gameslobby() {
  const [showCertificate, setShowCertificate] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const games = [
    { name: 'Game 1', route: '/game1' },
    { name: 'Game 2', route: '/game2' },
    { name: 'Game 3', route: '/game3' },
    { name: 'Game 4', route: '/game4' },
    { name: 'Game 5', route: '/game2' },
    { name: 'Game 6', route: '/game3' }
  ];

  return (
    <>
      <header className="docs-header">
        <div className="docs-right">
          <i onClick={handleBack} className="ri-arrow-left-line"></i>
          <h2>Hello, Aadarsh </h2>
          <div className="hey-img">
            <img src={hey} alt="" />
          </div>
        </div>

        <div className="docs-header-left">
          <i className="ri-search-line"></i>
          <i className="ri-notification-3-line"></i>
          <button>
            <i onClick={handleLogout} className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </header>

      <div className="games">
        <h1 className="heading">Matic Games</h1>

        <div className="game-grid">
          {games.slice(0, 3).map((game, index) => (
            <div className="game-box" key={index}>
              <h2>{game.name}</h2>
              <button onClick={() => navigate(game.route)}>Play Now</button>
            </div>
          ))}
        </div>

        <div className="game-grid">
          {games.slice(3, 6).map((game, index) => (
            <div className="game-box" key={index + 3}>
              <h2>{game.name}</h2>
              <button onClick={() => navigate(game.route)}>Play Now</button>
            </div>
          ))}
        </div>

        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill">100%</div>
          </div>
          <button className="download-btn" onClick={() => setShowCertificate(true)}>
            Download Certificate
          </button>
        </div>

        {showCertificate && (
          <div className="certificate-popup" onClick={() => setShowCertificate(false)}>
            <img src={certificate} alt="Certificate" />
          </div>
        )}
      </div>
    </>
  );
}

export default Gameslobby;

