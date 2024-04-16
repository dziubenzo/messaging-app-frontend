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
// Otherwise, populate user object
export const useCheckAuth = (setUser) => {
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
      setUser(retrievedUser);
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

// Status icons
export const statusIcons = {
  available:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/ryk3km39qhsbztiw6kmg.png',
  brb: 'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/ow69aeyceffooc1prqsy.png',
  invisible:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/nm9jy0qklrrsmabibu75.png',
  unavailable:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/eegejkm8yz0f8qko0x1q.png',
};

// Change status icon when logged in user goes offline or online
// Do not change it if their status icon is already the right one
export const changeStatusIcon = async (userId, currentStatusIcon, imageURL) => {
  if (currentStatusIcon === imageURL) {
    return;
  }
  await fetch(`${API_URL}/users/${userId}/change-status-icon`, {
    method: 'PUT',
    body: JSON.stringify({
      image_url: imageURL,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

// Hook for changing logged in user's status icon to unavailable on unload
export const useChangeToUnavailable = (user) => {
  useEffect(() => {
    function changeIcon() {
      // Make sure user object is populated
      if (Object.keys(user).length) {
        changeStatusIcon(
          user.user_id,
          user.status_icon,
          statusIcons.unavailable,
        );
      }
    }
    window.addEventListener('beforeunload', changeIcon);
    return () => {
      window.removeEventListener('beforeunload', changeIcon);
    };
  }, [user]);
};

// Hook for changing logged in user's status icon to available on load
export const useChangeToAvailable = (user) => {
  useEffect(() => {
    // Make sure user object is populated
    if (Object.keys(user).length) {
      changeStatusIcon(user.user_id, user.status_icon, statusIcons.available);
    }
  }, [user]);
};
