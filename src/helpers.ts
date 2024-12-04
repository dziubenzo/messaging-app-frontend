import { useContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Updater } from 'use-immer';
import API_URL from './API';
import { STATUS_ICONS } from './constants';
import { UserContext } from './pages/SuspenseWrapper';
import { socket } from './socket';
import type {
  GroupChat,
  GroupChatMessage,
  GroupChatUser,
  Message,
  StatusIcon,
  User
} from './types';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new ApiError('useUser must be used within UserContext', 500);
  }

  return context;
};

// Class for API errors
export class ApiError extends Error {
  status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

// Log in as guest
export async function logInAsGuest(
  setLoggingInAsGuest: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
) {
  const user = {
    username: 'Guest',
    password: 'Guest',
  };
  setLoggingInAsGuest(true);
  toast.info('Logging in as Guest...');
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const loggedInUser = await res.json();
  socket.emit(
    'change status icon',
    loggedInUser.user_id,
    STATUS_ICONS.unavailable,
  );
  toast.dismiss();
  return navigate('/home');
}

// Close chat on Esc key press
export function useCloseChatWithEsc(navigateToURL: string) {
  const navigate = useNavigate();

  useEffect(() => {
    function closeChat(event: KeyboardEvent) {
      if (event.key === 'Escape') navigate(navigateToURL);
    }
    document.addEventListener('keydown', closeChat);

    return () => {
      document.removeEventListener('keydown', closeChat);
    };
  }, [navigateToURL]);
}

// Hide emoticons container on outside click if it is open
export function useHideEmoticons() {
  const [showEmoticons, setShowEmoticons] = useState(false);

  const emoticonsContainerRef = useRef<HTMLDivElement>(null);
  const emoticonsButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function hideEmoticons(event: MouseEvent) {
      if (!event.target) return;
      const clickedElement = event.target as Element;
      if (
        clickedElement !== emoticonsContainerRef.current &&
        clickedElement !== emoticonsButtonRef.current &&
        clickedElement.parentNode !== emoticonsButtonRef.current &&
        clickedElement.parentNode?.parentNode !== emoticonsButtonRef.current &&
        showEmoticons
      ) {
        setShowEmoticons(false);
      }
    }
    document.addEventListener('click', hideEmoticons);

    return () => {
      document.removeEventListener('click', hideEmoticons);
    };
  }, [showEmoticons]);

  return {
    showEmoticons,
    setShowEmoticons,
    emoticonsContainerRef,
    emoticonsButtonRef,
  };
}

// Change status icon when logged in user goes offline or online or changes tabs
export const changeStatusIcon = async (
  user: User,
  setUser: Updater<User>,
  imageURL: StatusIcon,
) => {
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
  const updatedUser: User = await res.json();
  return setUser(updatedUser);
};

// Hook for changing logged in user's status icon during the use of the app
// Change the icon to unavailable if the user triggers the "hidden" state
// Change the icon to either their previous one or available if the user triggers the "visible" state
export const useChangeStatusIcon = (
  user: User,
  setUser: Updater<User>,
  previousStatusIcon: StatusIcon,
  setPreviousStatusIcon: React.Dispatch<React.SetStateAction<StatusIcon>>,
) => {
  useEffect(() => {
    function changeIcon() {
      if (document.visibilityState === 'hidden') {
        socket.emit(
          'change status icon',
          user.user_id,
          STATUS_ICONS.unavailable,
        );
        setPreviousStatusIcon(user.status_icon);
        changeStatusIcon(user, setUser, STATUS_ICONS.unavailable);
      } else {
        if (
          previousStatusIcon !== STATUS_ICONS.unavailable &&
          previousStatusIcon
        ) {
          socket.emit('change status icon', user.user_id, previousStatusIcon);
          return changeStatusIcon(user, setUser, previousStatusIcon);
        }
        socket.emit('change status icon', user.user_id, STATUS_ICONS.available);
        changeStatusIcon(user, setUser, STATUS_ICONS.available);
      }
    }
    window.addEventListener('visibilitychange', changeIcon);
    return () => {
      window.removeEventListener('visibilitychange', changeIcon);
    };
  }, [user]);
};

// Hook for changing logged in user's status icon to available on Home page load
export const useChangeToAvailable = (user: User, setUser: Updater<User>) => {
  useEffect(() => {
    changeStatusIcon(user, setUser, STATUS_ICONS.available);
    socket.emit('change status icon', user.user_id, STATUS_ICONS.available);
  }, []);
};

// Hook for fetching data
export const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(endpoint: string) {
      try {
        const res = await fetch(`${API_URL}${endpoint}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Server error');
        }
        const data: T = await res.json();
        setData(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    }
    fetchData(endpoint);
  }, [endpoint]);

  return { data, error, loading };
};

// Hook for scrolling to the bottom of messages if they change or someone is typing
export const useScrollToBottom = (
  messagesRef: React.RefObject<HTMLDivElement>,
  messages: GroupChatMessage[] | Message[],
  someoneIsTyping: boolean,
) => {
  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [messagesRef, messages, someoneIsTyping]);
};

// Generate a comma-separated list of group chat members exclusive of logged in user
export const generateMembersList = (
  members: GroupChatUser[],
  loggedInUserUsername: User['username'],
) => {
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
export const sortByStatusIcon = (a: User, b: User) => {
  let statusIconA;
  let statusIconB;

  // Define comparison rules based on status icon
  if (a.status_icon === STATUS_ICONS.available) {
    statusIconA = 1;
  } else if (a.status_icon === STATUS_ICONS.brb) {
    statusIconA = 2;
  } else {
    statusIconA = 3;
  }

  if (b.status_icon === STATUS_ICONS.available) {
    statusIconB = 1;
  } else if (b.status_icon === STATUS_ICONS.brb) {
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
  text: string,
  isGroupChat: boolean,
  recipient: User | GroupChat,
  loggedInUser: User,
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
          (recipient as User).user_id,
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
          (recipient as User).user_id,
          loggedInUser.username,
          false,
        );
      }
    }
  }, [text]);
};

// Determine the tab to go back to from a chat or the Options tab (either to the previous tab or the Home page if the previous tab cannot be established)
export function getPreviousPathname(state: unknown) {
  if (
    state &&
    typeof state === 'object' &&
    'previousPathname' in state &&
    typeof state.previousPathname === 'string'
  ) {
    return state.previousPathname;
  } else {
    return '/home';
  }
}
