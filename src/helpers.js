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

// Change status icon when logged in user goes offline or online or changes tabs
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
  const updatedUser = await res.json();
  return setUser(updatedUser);
};

// Hook for changing logged in user's status icon during the use of the app
// Change the icon to unavailable if the user triggers the "hidden" state
// Change the icon to either their previous one or available if the user triggers the "visible" state
export const useChangeStatusIcon = (
  user,
  setUser,
  previousStatusIcon,
  setPreviousStatusIcon,
) => {
  useEffect(() => {
    function changeIcon() {
      if (document.visibilityState === 'hidden') {
        socket.emit(
          'change status icon',
          user.user_id,
          statusIcons.unavailable,
        );
        setPreviousStatusIcon(user.status_icon);
        changeStatusIcon(user, setUser, statusIcons.unavailable);
      } else {
        if (
          previousStatusIcon !== statusIcons.unavailable &&
          previousStatusIcon
        ) {
          socket.emit('change status icon', user.user_id, previousStatusIcon);
          return changeStatusIcon(user, setUser, previousStatusIcon);
        }
        socket.emit('change status icon', user.user_id, statusIcons.available);
        changeStatusIcon(user, setUser, statusIcons.available);
      }
    }
    window.addEventListener('visibilitychange', changeIcon);
    return () => {
      window.removeEventListener('visibilitychange', changeIcon);
    };
  }, [user]);
};

// Hook for changing logged in user's status icon to available on Home page load
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

// Hook for scrolling to the bottom of messages if they change or someone is typing
export const useScrollToBottom = (messagesRef, messages, someoneIsTyping) => {
  useEffect(() => {
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [messagesRef, messages, someoneIsTyping]);
};

// Generate a comma-separated list of group chat members exclusive of logged in user
export const generateMembersList = (members, loggedInUserUsername) => {
  const usernamesArray = [];

  for (const member of members) {
    if (member.username === loggedInUserUsername) {
      continue;
    }
    usernamesArray.push(member.username);
  }

  return usernamesArray.join(', ');
};

// Sort by status icon (compare function)
export const sortByStatusIcon = (a, b) => {
  let statusIconA;
  let statusIconB;

  // Define comparison rules based on status icon
  if (a.status_icon === statusIcons.available) {
    statusIconA = 1;
  } else if (a.status_icon === statusIcons.brb) {
    statusIconA = 2;
  } else {
    statusIconA = 3;
  }

  if (b.status_icon === statusIcons.available) {
    statusIconB = 1;
  } else if (b.status_icon === statusIcons.brb) {
    statusIconB = 2;
  } else {
    statusIconB = 3;
  }

  if (statusIconA < statusIconB) {
    return -1;
  }
  if (statusIconA > statusIconB) {
    return 1;
  }

  // Sort by username if status icons are the same
  // Ignore case
  const usernameA = a.username.toUpperCase();
  const usernameB = b.username.toUpperCase();

  if (usernameA < usernameB) {
    return -1;
  } else {
    return 1;
  }
};

// Hook for emitting events when a user is typing or cleared their input field
export const useEmitTypingEvents = (
  text,
  isGroupChat,
  recipient,
  loggedInUser,
) => {
  useEffect(() => {
    if (text) {
      if (isGroupChat) {
        socket.emit(
          'user is typing (group chat)',
          recipient._id,
          loggedInUser.username,
          true,
        );
      } else {
        socket.emit(
          'user is typing (DM)',
          loggedInUser.user_id,
          recipient.user_id,
          loggedInUser.username,
          true,
        );
      }
    }
    if (!text) {
      if (isGroupChat) {
        socket.emit(
          'user is typing (group chat)',
          recipient._id,
          loggedInUser.username,
          false,
        );
      } else {
        socket.emit(
          'user is typing (DM)',
          loggedInUser.user_id,
          recipient.user_id,
          loggedInUser.username,
          false,
        );
      }
    }
  }, [text]);
};
