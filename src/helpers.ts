import Cookies from 'js-cookie';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { type Updater } from 'use-immer';
import API_URL from './API';
import { EMOTICONS, STATUS_ICONS } from './constants';
import { UserContext } from './pages/SuspenseWrapper';
import { socket } from './socket';
import type {
  GroupChat,
  GroupChatMessage,
  GroupChatUser,
  HeaderBody,
  Message,
  StatusIcon,
  User,
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

// Check authentication and return user's MongoDB id for use on the server side
// This also prevents showing fallback skeletons if the user navigates to the page they are not authenticated to visit
export const useCheckAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState<User['_id']>('');

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/users/auth`, buildHeader('POST'));
        if (!res.ok) {
          setUserId('');
          setIsAuth(false);
        } else {
          const user = (await res.json()) as User;
          setUserId(user._id);
          setIsAuth(true);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          setIsAuth(false);
          return;
        }
        setIsAuth(false);
      }
    }
    checkAuth();
  }, [isAuth]);

  return [isAuth, setIsAuth, userId] as const;
};

// Log in as guest
export const logInAsGuest = async (
  setLoggingInAsGuest: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
) => {
  const user = {
    username: 'Guest',
    password: 'Guest',
  };
  setLoggingInAsGuest(true);
  toast.info('Logging in as Guest...');
  const res = await fetch(`${API_URL}/users/login`, buildHeader('POST', user));
  // Create a cookie with API-signed JWT
  const token = await res.json();
  Cookies.set('jwt', token, {
    expires: 3,
    secure: location.protocol === 'https:',
    sameSite: 'Lax',
  });
  setIsAuth(true);
  toast.dismiss();
  return navigate('/home');
};

// Close chat or emoticons container on Esc key press
export const useCloseChatOrEmoticons = (
  navigateToURL: string,
  isGroupChat: boolean,
  showEmoticons: boolean,
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    function closeChatOrEmoticons(event: KeyboardEvent) {
      if (event.key === 'Escape' && showEmoticons) {
        setIsClosing(true);
      } else if (event.key === 'Escape' && isGroupChat) {
        navigate('/home/group-chats');
      } else if (event.key === 'Escape') {
        navigate(navigateToURL);
      }
    }
    document.addEventListener('keydown', closeChatOrEmoticons);

    return () => {
      document.removeEventListener('keydown', closeChatOrEmoticons);
    };
  }, [navigateToURL, isGroupChat, showEmoticons]);
};

// Hide emoticons container on outside click if it is open
export const useHideEmoticons = () => {
  const [showEmoticons, setShowEmoticons] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const emoticonsContainerRef = useRef<HTMLDivElement>(null);
  const emoticonsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function hideEmoticons(event: MouseEvent) {
      if (!event.target) return;
      const clickedElement = event.target as Element;
      if (
        clickedElement !== emoticonsContainerRef.current &&
        clickedElement.parentElement?.parentElement !==
          emoticonsContainerRef.current &&
        clickedElement !== emoticonsButtonRef.current &&
        clickedElement.parentNode !== emoticonsButtonRef.current &&
        clickedElement.parentNode?.parentNode !== emoticonsButtonRef.current &&
        showEmoticons
      ) {
        setIsClosing(true);
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
    isClosing,
    setIsClosing,
    emoticonsContainerRef,
    emoticonsButtonRef,
  };
};

// Change status icon when logged in user goes offline or online or changes tabs
export const changeStatusIcon = async (
  user: User,
  setUser: Updater<User>,
  imageURL: StatusIcon,
) => {
  const res = await fetch(
    `${API_URL}/users/${user.user_id}/change-status-icon`,
    buildHeader('PUT', { image_url: imageURL }),
  );
  const updatedUser: User = await res.json();
  return setUser(updatedUser);
};

// Observe changes to messages div height to make sure scrolling to bottom works irrespective of emoticons loading time
// Stop observing after stopTime
export const useObserveMessagesDiv = (
  messagesDiv: React.RefObject<HTMLDivElement>,
  updateFrequency: number,
  stopTime: number,
) => {
  const [messagesDivHeight, setMessagesDivHeight] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messagesDiv.current === null) return;
      if (messagesDivHeight < messagesDiv.current.scrollHeight) {
        setMessagesDivHeight(messagesDiv.current.scrollHeight);
      }
    }, updateFrequency);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, stopTime);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return messagesDivHeight;
};

// Hook for scrolling to the bottom of messages on load, when new messages are sent or someone is typing
export const useScrollToBottom = (
  messagesRef: React.RefObject<HTMLDivElement>,
  messages: GroupChatMessage[] | Message[],
  someoneIsTyping: boolean,
  messagesDivHeight: number,
) => {
  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesDivHeight;
  }, [messagesRef, messages, someoneIsTyping, messagesDivHeight]);
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

// Sort by status icon
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
  return sortByUsername(a, b);
};

// Sort by username
// Ignore case
export const sortByUsername = (a: User, b: User) => {
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
export const getPreviousPathname = (state: unknown) => {
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
};

// Determine whether the last two characters of the input field match either of the emoticons regexes
// Return input field text without the last two characters along with the emoticon URL if they do
export const convertTextEndToEmoticon = (text: string) => {
  const smile = /:\)/;
  const wink = /;\)/;
  const grin = /[:;x]d/i;
  const tongue = /[:;]p/i;
  const cunningSmile = /[:;]]/;
  const grimaceSmile = /[:;]\//;

  // Get the last two characters and the third to last character
  const lastTwoChars = text.slice(text.length - 2);
  const thirdToLastChar = text[text.length - 3];

  let modifiedText = '';
  let emoticonURL = '';
  let isEmoticon = true;

  const verificationRegex = /[:;x]/i;
  // Do not proceed if the second to last character is 'x', ':', or ';'
  if (!verificationRegex.test(lastTwoChars[0])) {
    isEmoticon = false;
    return {
      modifiedText,
      isEmoticon,
      emoticonURL,
    };
  }

  function endsWith(regExp: RegExp) {
    let result = false;

    if (regExp.test(lastTwoChars)) {
      result = true;
      // Replace normal space with non-breaking space to maintain space after emoticon insertion
      if (thirdToLastChar === ' ') {
        modifiedText = text.slice(0, text.length - 3) + '&nbsp;';
      } else {
        modifiedText = text.slice(0, text.length - 2);
      }
    }

    return result;
  }

  switch (true) {
    case endsWith(smile):
      emoticonURL = EMOTICONS.smile.url;
      break;
    case endsWith(wink):
      emoticonURL = EMOTICONS.wink.url;
      break;
    case endsWith(grin):
      emoticonURL = EMOTICONS.grin.url;
      break;
    case endsWith(tongue):
      emoticonURL = EMOTICONS.tongue.url;
      break;
    case endsWith(cunningSmile):
      emoticonURL = EMOTICONS.cunningSmile.url;
      break;
    case endsWith(grimaceSmile):
      emoticonURL = EMOTICONS.grimace.url;
      break;
    default:
      isEmoticon = false;
      break;
  }

  return {
    modifiedText,
    isEmoticon,
    emoticonURL,
  };
};

// Move caret to the end of the input field
export const moveCaretToEnd = (inputField: HTMLDivElement) => {
  const selection = window.getSelection();
  if (selection === null) return;
  selection.selectAllChildren(inputField);
  selection.collapseToEnd();
};

// Create header for the fetch request
export const buildHeader = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: HeaderBody,
) => {
  return {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  };
};

// Throw an error if the user tries to request a resource from a protected route but is not authenticated
export const throwIfNoAuth = (response: Response) => {
  if (!response.ok && response.status === 401) {
    throw new ApiError('You are not logged in', 401);
  }
};
