// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import DocsPage from './pages/DocsPage';
import Gamelobby from './pages/Gameslobby';
import Game1 from './pages/Game1';
import Game2 from './pages/Game2';
import Game3 from './pages/Game3';
import Game4 from './pages/Game4';
import Rank from './pages/Rank';
import './App.css';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/chatbot" element={
            <PrivateRoute>
              <ChatbotPage />
            </PrivateRoute>
          } />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/games" element={
            <PrivateRoute>
              <Gamelobby />
            </PrivateRoute>
          } />
          <Route path="/game1" element={
            <PrivateRoute>
              <Game1 />
            </PrivateRoute>
          } />
          <Route path="/game2" element={
            <PrivateRoute>
              <Game2 />
            </PrivateRoute>
          } />
          <Route path="/game3" element={
            <PrivateRoute>
              <Game3 />
            </PrivateRoute>
          } />
          <Route path="/game4" element={
            <PrivateRoute>
              <Game4 />
            </PrivateRoute>
          } />
          <Route path="/rank" element={
            <PrivateRoute>
              <Rank />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
