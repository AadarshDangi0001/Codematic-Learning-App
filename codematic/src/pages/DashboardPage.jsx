// src/pages/DashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';
import myImage from '../assets/Card7.png';
import hey from '../assets/Wave.png';
import Payment from '../components/Payment.jsx';


export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const goToDocs = () => {
    navigate('/docs');
  };

  const handleLogout = () => {
    logout();
  };

  const handlerank = () => {
    navigate('/rank');
  };

  const goToChatbot = () => {
    navigate('/chatbot');
  };

  const goToGames = () => {
    navigate('/games');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dash-right">
          <h2>Hello, {currentUser?.name || 'Aadarsh'} </h2>
          <div className="hey-img">
            <img src={hey} alt="" />
          </div>
        </div>
        <div className="dashboard-header-left">
          <div className="dash-head-img">
            <img onClick={handlerank} src={myImage} alt="" />
          </div>
          <i className="ri-search-line"></i>
          <i className="ri-notification-3-line"></i>
          <button onClick={handleLogout}>
            <i className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <h2>CodeMatic</h2>
        <div className="card-section">
          <div className="dashboard-card">
            <div className="card-text">
              <h2>CodeMatic Bot</h2>
            </div>
            <button onClick={goToChatbot} className="primary-button">
              Check Out Matic Bot
            </button>
          </div>
          <div className="dashboard-card3">
            <div className="card-text">
              <h2>Gamified Mode</h2>
            </div>
            <button onClick={goToGames} className="primary-button">
              Check Out Matic Games
            </button>
          </div>
          <div className="dashboard-card4">
            <div className="card-text">
              <h2>CodeMatic Docs</h2>
            </div>
            <button onClick={goToDocs} className="primary-button">
              Check Out Matic Docs
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content2">
        <h2 className='dash2text'>Upcoming features</h2>
        <div className="card-section2">
          <div className="dashboard-card2">
            <div className="card-text">
              <h2>Learn Offline</h2>
            </div>
            <button onClick={goToChatbot} className="primary-button">
              Check Out Matic LLM
            </button>
          </div>
          <div className="dashboard-card2">
            <div className="card-text">
              <h2>Learn with Community</h2>
            </div>
            <button onClick={goToChatbot} className="primary-button">
              Check Out Matic Friends
            </button>
          </div>
        </div>
      </div>
      <div className="paytemgate">
  <div className="card-text11">
    <h2>Upgrade Plan</h2>
    <p>Unlock premium features</p>
  </div>
  <Payment />
</div>
    </div>
  );
}