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
  toast.info('Making changes...');
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
    return toast.error(error);
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
  toast.success(`Changes made successfully!`);
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
  toast.info('Making changes...');
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
    return toast.error(error);
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
  toast.success(`Changes made successfully!`);
  return navigate('/home');
};
