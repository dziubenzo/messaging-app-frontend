import API_URL from './API';
import { toast } from 'react-toastify';
import { socket } from './socket';

// Clear logged in user's text status (Options component)
export const clearTextStatus = async (
  inProgress,
  setInProgress,
  user,
  setUser,
  navigate,
  setBottomBarText,
) => {
  if (inProgress || user.status_text === '') {
    return;
  }
  setInProgress(true);
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
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    setInProgress(false);
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
export const updateUser = async (
  event,
  inProgress,
  setInProgress,
  username,
  status,
  user,
  setUser,
  navigate,
  setBottomBarText,
) => {
  event.preventDefault();
  if (
    inProgress ||
    (username === user.username && status === user.status_text)
  ) {
    return;
  }
  setInProgress(true);
  const toastRef = toast.info('Making changes...');
  const formData = new FormData(event.target);
  const updates = {
    current_username: user.username,
    username: formData.get('username'),
    status_text: formData.get('status_text'),
  };
  const res = await fetch(`${API_URL}/users/${user.user_id}/update`, {
    method: 'PUT',
    body: JSON.stringify(updates),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    setInProgress(false);
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
  text,
  inProgress,
  setInProgress,
  isGroupChat,
  loggedInUser,
  recipient,
  setMessages,
  clearInputField,
) => {
  if (text === '<br>' || !text || inProgress) {
    return;
  }
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
        },
        credentials: 'include',
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
    setMessages((draft) => {
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
      },
      credentials: 'include',
    });
    if (!res.ok) {
      setInProgress(false);
      return toast.update(toastRef, {
        render: 'Sending message failed',
        type: 'error',
      });
    }
    const newMessage = await res.json();
    setMessages((draft) => {
      draft.push(newMessage);
    });
    socket.emit(
      'send message',
      loggedInUser.user_id,
      recipient.user_id,
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
