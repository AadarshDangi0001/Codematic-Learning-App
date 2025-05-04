import React, { useState, useEffect } from 'react';
import './Game4.css';
import { useNavigate } from 'react-router-dom';
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";

const Game4 = () => {
  const colors = [
    { name: 'Pink', hex: '#ff69b4' },
    { name: 'Blue', hex: '#0000ff' },
    { name: 'Cyan', hex: '#00ffff' },
    { name: 'Red', hex: '#ff0000' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#ffff00' }
  ];

  const [targetColor, setTargetColor] = useState(null);
  const [inputColor, setInputColor] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('white');
  const [progress, setProgress] = useState(0);
  const [wallColor, setWallColor] = useState('#ffffff');
  const [painting, setPainting] = useState(false);

   const { currentUser, logout } = useAuth();
          const navigate = useNavigate();
        
          const handleLogout = () => {
            logout();
            navigate("/login");
          };
        
          const handleBack = () => {
            navigate("/games");
          };

  useEffect(() => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(random);
    setMessage(`Task: Paint the wall in ${random.name} color!`);
  }, []);

  const paintWall = () => {
    if (painting) return;

    if (inputColor.trim().toLowerCase() === targetColor.hex.toLowerCase()) {
      setMessage(`Correct! Start painting the wall in ${targetColor.name}!`);
      setMessageColor('green');
      setWallColor(inputColor);
      setPainting(true);

      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 2;
        setProgress(progressValue);
        if (progressValue >= 100) {
          clearInterval(interval);
          setMessage(`🎉 Congratulations! The wall is painted in ${targetColor.name} correctly!`);
        }
      }, 50);
    } else {
      setMessage(`❌ Incorrect! Try again with the correct color code for ${targetColor.name}.`);
      setMessageColor('red');
    }
  };

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
    
    <div className="game4-container">
      <h2>🎨 Wall Painter Game</h2>
      <div id="wall" style={{ backgroundColor: wallColor }}></div>

      <div className="input-area">
        <label htmlFor="color-input">Enter the color code (Hex, RGB, HSL):</label><br />
        <input
          type="text"
          id="color-input"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          placeholder="#ff5733 or rgb(255,87,51)"
        />
      </div>

      <button className="btn" onClick={paintWall}>Start Painting</button>

      <div id="message" style={{ color: messageColor }}>{message}</div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
    </>
  );
};

export default Game4;
