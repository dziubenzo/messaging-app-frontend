import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Updater } from 'use-immer';
import API_URL from './API';
import { socket } from './socket';
import type {
  BottomBar,
  GroupChat,
  GroupChatMessage,
  Message,
  User,
} from './types';

// Clear logged in user's text status (Options component)
export const clearTextStatus = async (
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  user: User,
  setUser: Updater<User>,
  navigate: NavigateFunction,
  setBottomBarText: React.Dispatch<React.SetStateAction<BottomBar>>,
  setNoStatusBtnText: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (inProgress || user.status_text === '') {
    return;
  }
  setInProgress(true);
  setNoStatusBtnText('Saving...');
  const toastRef = toast.info('Clearing text status...');
  const updates = {
    current_username: user.username,
    username: user.username,
    status_text: '',
  };
  const res = await fetch(`${API_URL}/users/${user.user_id}/update`, {
    method: 'PUT',
    body: JSON.stringify(updates),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setInProgress(false);
    setNoStatusBtnText('No Status');
    return toast.update(toastRef, { render: error, type: 'error' });
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  setBottomBarText({
    id: updatedUser.user_id,
    status: updatedUser.status_text,
  });
  socket.emit(
    'change username/text status',
    updatedUser.user_id,
    updatedUser.username,
    updatedUser.status_text,
  );
  toast.update(toastRef, {
    render: 'Text status cleared successfully',
    type: 'success',
  });
  return navigate('/home');
};

// Update logged in user's username and/or text status
// Prevent tampering with guest user's username
export const updateUser = async (
  event: React.FormEvent<HTMLFormElement>,
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  username: User['username'],
  status: User['status_text'],
  user: User,
  setUser: Updater<User>,
  navigate: NavigateFunction,
  setBottomBarText: React.Dispatch<React.SetStateAction<BottomBar>>,
  setSaveBtnText: React.Dispatch<React.SetStateAction<string>>,
) => {
  event.preventDefault();
  if (
    inProgress ||
    (username === user.username && status === user.status_text)
  ) {
    return;
  }
  setInProgress(true);
  setSaveBtnText('Saving...');
  const toastRef = toast.info('Making changes...');
  const formData = new FormData(event.currentTarget);
  const updates = {
    current_username: user.username,
    username: user.username === 'Guest' ? 'Guest' : formData.get('username'),
    status_text: formData.get('status_text'),
  };
  const res = await fetch(`${API_URL}/users/${user.user_id}/update`, {
    method: 'PUT',
    body: JSON.stringify(updates),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    setInProgress(false);
    setSaveBtnText('Save');
    return toast.update(toastRef, { render: error, type: 'error' });
  }
  const updatedUser = await res.json();
  setUser(updatedUser);
  setBottomBarText({
    id: updatedUser.user_id,
    status: updatedUser.status_text,
  });
  socket.emit(
    'change username/text status',
    updatedUser.user_id,
    updatedUser.username,
    updatedUser.status_text,
  );
  toast.update(toastRef, {
    render: 'Changes made successfully',
    type: 'success',
  });
  return navigate('/home');
};

// Send message (Editor component) if it is not empty and if it doesn't contain <br>, which gets created after using formatting options and then clearing input field manually
// Clear input fields if operation successful
// Support both DMs and group chats
export const sendMessage = async (
  text: string,
  inProgress: boolean,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  isGroupChat: boolean,
  loggedInUser: User,
  recipient: User | GroupChat,
  setMessages: Updater<Message[]> | Updater<GroupChatMessage[]>,
  clearInputField: () => void,
) => {
  if (!text || inProgress) return;
  setInProgress(true);
  const toastRef = toast.info('Sending message...');
  // Group chat case
  if (isGroupChat) {
    const message = {
      sender: loggedInUser._id,
      text,
    };
    const res = await fetch(
      `${API_URL}/group-chats/${recipient._id}/messages`,
      {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      },
    );
    if (!res.ok) {
      setInProgress(false);
      return toast.update(toastRef, {
        render: 'Sending message failed',
        type: 'error',
      });
    }
    const newMessage = await res.json();
    (setMessages as Updater<GroupChatMessage[]>)((draft) => {
      draft.push(newMessage);
    });
    socket.emit('send group chat message', recipient._id, newMessage);
    clearInputField();
    setInProgress(false);
    return toast.update(toastRef, {
      render: 'Message delivered',
      type: 'success',
    });
    // Direct message case
  } else {
    const message = {
      sender: loggedInUser._id,
      recipient: recipient._id,
      text,
    };
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    });
    if (!res.ok) {
      setInProgress(false);
      return toast.update(toastRef, {
        render: 'Sending message failed',
        type: 'error',
      });
    }
    const newMessage = await res.json();
    (setMessages as Updater<Message[]>)((draft) => {
      draft.push(newMessage);
    });
    socket.emit(
      'send message',
      loggedInUser.user_id,
      (recipient as User).user_id,
      newMessage,
      loggedInUser.username,
    );
    clearInputField();
    setInProgress(false);
    return toast.update(toastRef, {
      render: 'Message delivered',
      type: 'success',
    });
  }
};
