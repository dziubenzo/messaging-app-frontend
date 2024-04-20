import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledOptions } from '../styles/HomePage.styled';
import { useOutletContext } from 'react-router-dom';
import { clearTextStatus, updateUser } from '../fetchers';

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
  function handleSaveButtonClick(event) {
    updateUser(
      event,
      inProgress,
      setInProgress,
      username,
      status,
      user,
      setUser,
      showOptions,
      setShowOptions,
      setBottomBarText,
    );
  }

  // Clear logged in user's text status
  function handleNoStatusButtonClick() {
    clearTextStatus(
      inProgress,
      setInProgress,
      user,
      setUser,
      showOptions,
      setShowOptions,
      setBottomBarText,
    );
  }

  return (
    <StyledOptions>
      <form id="options-form" method="post" onSubmit={handleSaveButtonClick}>
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
        <label htmlFor="status-text">Text Status:</label>
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
        <button onClick={handleNoStatusButtonClick}>No Status</button>
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
