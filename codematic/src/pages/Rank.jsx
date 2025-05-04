import React from 'react';
import './rank.css';
import { useNavigate } from 'react-router-dom';
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";


const ranks = [
  { name: 'Aadarsh Dangi', points: 69 },
  { name: 'Riya Sharma', points: 65 },
  { name: 'Kunal Mehta', points: 62 },
  { name: 'Sneha Patel', points: 60 },
  { name: 'Arjun Verma', points: 58 },
  { name: 'Ishita Roy', points: 55 },
  { name: 'Yash Kapoor', points: 53 },
  { name: 'Naina Joshi', points: 50 },
  { name: 'Rajeev Nair', points: 48 },
  { name: 'Tanvi Desai', points: 45 }
];

const Rank = () => {

      const { currentUser, logout } = useAuth()
        const navigate = useNavigate()
      
        
        
      
        const handleLogout = () => {
          logout()
          navigate('/login')
        }
        const handleBack = () => {
            navigate("/dashboard");
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
                  <div className="rank-container">
      <h1>🏆 Top 10 Leaderboard</h1>
      <ul className="rank-list">
        {ranks.map((user, index) => (
          <li key={index} className={`rank-item ${index === 0 ? 'first' : ''}`}>
            <span className="rank-position">#{index + 1}</span>
            <span className="rank-name">{user.name}</span>
            <span className="rank-points">{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
                  
    </>
    
  );
};

export default Rank;
