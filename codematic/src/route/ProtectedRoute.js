import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      if (!isAuthenticated()) {
        navigate('/login');
      } else {
        await getCurrentUser();
      }
    }
    checkAuth();
  }, [isAuthenticated, navigate, getCurrentUser]);

  return isAuthenticated() ? children : null;
}