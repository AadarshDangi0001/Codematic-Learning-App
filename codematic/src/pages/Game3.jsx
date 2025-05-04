import React, { useState } from "react";
import "./Game3.css";
import { useNavigate } from 'react-router-dom';
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";

const Game3 = () => {
  const [selector, setSelector] = useState("");
  const [styleInput, setStyleInput] = useState("");
  const [message, setMessage] = useState("");
   const { currentUser, logout } = useAuth();
        const navigate = useNavigate();
      
        const handleLogout = () => {
          logout();
          navigate("/login");
        };
      
        const handleBack = () => {
          navigate("/games");
        };

  const shoot = () => {
    const playground = document.getElementById("playground");
    const allElements = playground.querySelectorAll("*");
    allElements.forEach(el => el.classList.remove("highlight"));

    if (!selector.trim()) return;

    let matched;
    try {
      matched = playground.querySelectorAll(selector);
    } catch (err) {
      setMessage("❌ Invalid CSS selector.");
      return;
    }

    if (matched.length > 0) {
      matched.forEach(el => el.classList.add("highlight"));
    }
  };

  const applyStyles = () => {
    const highlighted = document.querySelectorAll(".highlight");
    if (highlighted.length === 0) {
      setMessage("❌ No highlighted elements to apply styles.");
      return;
    }

    if (!styleInput.trim()) {
      setMessage("Please enter a valid CSS style.");
      return;
    }

    try {
      highlighted.forEach(el => {
        el.style.cssText += styleInput;
      });
      setMessage(`✅ Applied styles: ${styleInput}`);
    } catch {
      setMessage("❌ Invalid CSS property.");
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

              <div className="game3">
      <h2>🎯 Selector Shooting Game</h2>
      <p>Type a CSS selector to highlight elements in blue:</p>

      <div className="playground" id="playground">
        <div className="box">.box</div>
        <div className="target">.target</div>
        <p id="special">#special</p>
        <span className="label">.label</span>
        <div data-type="enemy">[data-type="enemy"]</div>
        <p className="text">.text</p>
        <span className="note">.note</span>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Try: .box or #special"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
        />
        <button onClick={shoot}>Shoot</button>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a color or CSS property (e.g., red, font-size: 20px)"
          value={styleInput}
          onChange={(e) => setStyleInput(e.target.value)}
        />
        <button onClick={applyStyles}>Apply Styles</button>
      </div>

      <p id="message">{message}</p>
    </div>
    </>
   
  );
};

export default Game3;
