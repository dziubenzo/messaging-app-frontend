import { useEffect } from 'react';
import API_URL from './API';
import { useLocation, useNavigate } from 'react-router-dom';

// Check if the user is authenticated when they visit '/'
// If they are not, redirect to Login page
// Otherwise, populate user object and redirect to Home page
export const useCheckRootAuth = (setUser) => {
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
      const user = await res.json();
      setUser(user);
      return navigate('/home');
    }
    if (pathname === '/') {
      checkAuth();
    }
  }, [pathname]);
};

// Check if the user is authenticated
// If they are not, redirect to Login page
// Otherwise, populate user object if it is empty (e.g. after browser refresh)
export const useCheckAuth = (user, setUser) => {
  const navigate = useNavigate();

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
      const retrievedUser = await res.json();
      if (!user.length) {
        setUser(retrievedUser);
      }
    }
    checkAuth();
  }, []);
};

// Class for API errors
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}
