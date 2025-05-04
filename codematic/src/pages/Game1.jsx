import React, { useState, useRef } from 'react';
import './game1.css';
import { useNavigate } from 'react-router-dom';
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";

const Game1 = () => {
  const [scoreLog, setScoreLog] = useState([]);
  const [shotCount, setShotCount] = useState(0);
  const cssInputRef = useRef();
  const arrowRef = useRef();
  const targetRef = useRef();
  const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate("/login");
    };
  
    const handleBack = () => {
      navigate("/games");
    };

  const launch = () => {
    const arrow = arrowRef.current;
    const cssInput = cssInputRef.current.value;

    arrow.style.display = 'none'; // Hide before reset

    try {
      arrow.style.cssText = "position: absolute; transition: all 1s ease;" + cssInput;
      void arrow.offsetWidth;
      arrow.style.display = 'block';

      setTimeout(() => {
        const arrowRect = arrow.getBoundingClientRect();
        const targetRect = targetRef.current.getBoundingClientRect();

        const arrowX = arrowRect.left + arrowRect.width / 2;
        const arrowY = arrowRect.top + arrowRect.height / 2;

        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        const dx = arrowX - targetX;
        const dy = arrowY - targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let points = 0;
        if (distance <= 20) points = 10;
        else if (distance <= 40) points = 9;
        else if (distance <= 60) points = 8;
        else if (distance <= 80) points = 7;
        else if (distance <= 100) points = 6;
        else if (distance <= 125) points = 4;
        else if (distance <= 150) points = 2;

        const newShot = `Shot ${shotCount + 1}: ${points} point${points !== 1 ? 's' : ''}`;
        setScoreLog((prev) => [...prev, newShot]);
        setShotCount((prev) => prev + 1);
      }, 1100);
    } catch (e) {
      alert("Invalid CSS. Try again.");
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

          <div className="game1container">
        
      <div className="score-panel">
        <h3>Score Card</h3>
        <div className="score-log">
          {scoreLog.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>

      <div className="game-area">
        <div className="target" ref={targetRef}>
          <div className="ring ring1"></div>
          <div className="ring ring2"></div>
          <div className="ring ring3"></div>
          <div className="ring ring4"></div>
          <div className="ring ring5"></div>
        </div>
        <div className="arrow" ref={arrowRef}></div>
      </div>

      <div className="right-panel">
        <h3>Write CSS for .arrow</h3>
        <textarea
          ref={cssInputRef}
          placeholder="e.g.&#10;top: 50%;&#10;left: 50%;&#10;transform: translate(-50%, -50%);"
        ></textarea>
        <button onClick={launch}>Launch</button>
      </div>
    </div>
    </>
    
  );
};

export default Game1;
