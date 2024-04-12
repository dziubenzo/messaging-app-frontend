import { useEffect } from 'react';
import API_URL from './API';
import { useLocation, useNavigate } from 'react-router-dom';

// Check if the user is authenticated when they visit '/'
// If they are not, redirect to Login page
// Otherwise, set their id and redirect to Home page
export const useCheckAuth = (setUserId) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(`${API_URL}/users/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) {
        return navigate('/login');
      }
      const userId = await res.json();
      setUserId(userId);
      return navigate('/home');
    }
    if (pathname === '/') {
      checkAuth();
    }
  }, [pathname]);
};
