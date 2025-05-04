import React, { useEffect, useRef, useState } from 'react';
import './Game2.css';
import { useNavigate } from 'react-router-dom';
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";

function Game2() {
  const customPieceRef = useRef(null);
  const [margin, setMargin] = useState(5);
  const [padding, setPadding] = useState(10);
  const [border, setBorder] = useState(3);
  const [correctBoxModel, setCorrectBoxModel] = useState({ margin: 0, padding: 0, border: 0 });
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState('');
  const [success, setSuccess] = useState(false);

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
    const getRandomValue = () => Math.floor(Math.random() * 21) + 1;
    setCorrectBoxModel({
      margin: getRandomValue(),
      padding: getRandomValue(),
      border: getRandomValue()
    });
  }, []);

  useEffect(() => {
    if (customPieceRef.current) {
      customPieceRef.current.style.margin = `${margin}px`;
      customPieceRef.current.style.padding = `${padding}px`;
      customPieceRef.current.style.border = `${border}px solid black`;
    }
  }, [margin, padding, border]);

  const allowDrop = (e) => e.preventDefault();

  const drag = (e) => {
    e.dataTransfer.setData("text", "custom-piece");
  };

  const drop = (e) => {
    e.preventDefault();
    if (
      margin === correctBoxModel.margin &&
      padding === correctBoxModel.padding &&
      border === correctBoxModel.border
    ) {
      setSuccess(true);
      setMessage('✅ Great! You matched the block correctly!');
    } else {
      setMessage('❌ Not matched! Try again with correct values.');
      setHint('');
      const piece = customPieceRef.current;
      piece.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(0)' }
        ],
        { duration: 300, iterations: 1 }
      );
    }
  };

  const showHint = () => {
    setHint(`Hint 👉 Margin: ${correctBoxModel.margin}px, Padding: ${correctBoxModel.padding}px, Border: ${correctBoxModel.border}px`);
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

              <div className="game2-container">
      <h2>🎮 Box Model Breaker - Drag the right block!</h2>

      <div className="game-board">
        <div className="block" style={{ margin: '5px', padding: '10px', border: '3px solid black' }}></div>
        <div className="block" style={{ margin: '10px', padding: '5px', border: '1px solid black' }}></div>
        {!success ? (
          <div
            className="block missing"
            onDrop={drop}
            onDragOver={allowDrop}
          ></div>
        ) : (
          <div
            className="block custom-preview"
            style={{ margin: `${margin}px`, padding: `${padding}px`, border: `${border}px solid black` }}
          ></div>
        )}
      </div>

      <div>
        <h3>Create the missing piece</h3>
        <div
          id="custom-piece"
          className="block custom-preview"
          draggable={!success}
          ref={customPieceRef}
          onDragStart={drag}
        ></div>

        <div className="controls">
          <label>Margin</label>
          <input type="number" value={margin} onChange={(e) => setMargin(parseInt(e.target.value))} />px<br />
          <label>Padding</label>
          <input type="number" value={padding} onChange={(e) => setPadding(parseInt(e.target.value))} />px<br />
          <label>Border</label>
          <input type="number" value={border} onChange={(e) => setBorder(parseInt(e.target.value))} />px<br />
        </div>

        <div id="message" style={{ fontWeight: 'bold', color: success ? 'green' : 'red' }}>{message}</div>
        <button onClick={showHint}>Show Hint</button>
        <div id="hint" style={{ color: 'blue', fontWeight: 'bold' }}>{hint}</div>
      </div>
    </div>
    </>
   
  );
}

export default Game2;
