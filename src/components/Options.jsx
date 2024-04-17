import PropTypes from 'prop-types';
import API_URL from '../API';
import { useState } from 'react';
import { StyledOptions } from '../styles/HomePage.styled';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { socket } from '../socket';

const STATUS_CHARACTER_LIMIT = 70;

function Options({ showOptions, setShowOptions, setBottomBarText }) {
  const { user, setUser } = useOutletContext();

  const [username, setUsername] = useState(user.username);
  const [status, setStatus] = useState(user.status_text);
  const [charactersLeft, setCharactersLeft] = useState(
    STATUS_CHARACTER_LIMIT - user.status_text.length,
  );
  const [inProgress, setInProgress] = useState(false);

  // Update logged in user's username and/or text status
  async function updateUser(event) {
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
    setShowOptions(!showOptions);
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
    return toast.success(`Changes made successfully!`);
  }

  return (
    <StyledOptions>
      <form id="options-form" method="post" onSubmit={updateUser}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          minLength={3}
          maxLength={16}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="status-text">Status:</label>
        <textarea
          type="text"
          name="status_text"
          id="status-text"
          maxLength={STATUS_CHARACTER_LIMIT}
          rows={3}
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setCharactersLeft(
              STATUS_CHARACTER_LIMIT - event.target.value.length,
            );
          }}
        />
        <span className="characters-left">{charactersLeft}</span>
      </form>
      <div className="buttons">
        <button form="options-form" type="submit">
          Save
        </button>
        <button onClick={() => setShowOptions(!showOptions)}>Close</button>
      </div>
    </StyledOptions>
  );
}

Options.propTypes = {
  showOptions: PropTypes.bool,
  setShowOptions: PropTypes.func,
  setBottomBarText: PropTypes.func,
};

export default Options;
