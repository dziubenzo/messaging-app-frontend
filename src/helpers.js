import { useEffect, useState } from 'react';
import API_URL from './API';
import { useLocation, useNavigate } from 'react-router-dom';
import { socket } from './socket';

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
  message:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/u21cswfqngpmklkfr3uh.png',
  availableMessage:
    'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/m9ucqz7totsstdus4vtb.png',
};

// Change status icon when logged in user goes offline or online
export const changeStatusIcon = async (user, setUser, imageURL) => {
  const res = await fetch(
    `${API_URL}/users/${user.user_id}/change-status-icon`,
    {
      method: 'PUT',
      body: JSON.stringify({
        image_url: imageURL,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );
  // Do not update user state if it is an exit operation (logout, tab close etc.)
  if (imageURL === statusIcons.unavailable) {
    return;
  }
  const updatedUser = await res.json();
  return setUser(updatedUser);
};

// Hook for changing logged in user's status icon to unavailable on unload
export const useChangeToUnavailable = (user, setUser) => {
  useEffect(() => {
    function changeIcon() {
      socket.emit('change status icon', user.user_id, statusIcons.unavailable);
      changeStatusIcon(user, setUser, statusIcons.unavailable);
    }
    window.addEventListener('beforeunload', changeIcon);
    return () => {
      window.removeEventListener('beforeunload', changeIcon);
    };
  }, []);
};

// Hook for changing logged in user's status icon to available on load
export const useChangeToAvailable = (user, setUser) => {
  useEffect(() => {
    changeStatusIcon(user, setUser, statusIcons.available);
    socket.emit('change status icon', user.user_id, statusIcons.available);
  }, []);
};

// Hook for fetching data
export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(endpoint) {
      try {
        const res = await fetch(`${API_URL}${endpoint}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Server error');
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData(endpoint);
  }, [endpoint]);

  return { data, error, loading };
};

// Hook for scrolling to the bottom of messages if they change
export const useScrollToBottom = (messagesRef, messages) => {
  useEffect(() => {
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [messagesRef, messages]);
};
