import { useState } from 'react';
import { StyledOptionsTab } from '../styles/OptionsTab.styled.js';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { clearTextStatus, updateUser } from '../fetchers';
import { HomePageOutletContext } from '../types.js';

const STATUS_CHARACTER_LIMIT = 70;

function OptionsTab() {
  const { user, setUser, setBottomBarText } =
    useOutletContext<HomePageOutletContext>();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [status, setStatus] = useState(user.status_text);
  const [charactersLeft, setCharactersLeft] = useState(
    STATUS_CHARACTER_LIMIT - user.status_text.length,
  );
  const [inProgress, setInProgress] = useState(false);

  // Disable Enter in text status field to prevent inserting new lines
  function disableEnter(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  // Update logged in user's username and/or text status
  function handleSaveButtonClick(event: React.FormEvent<HTMLFormElement>) {
    updateUser(
      event,
      inProgress,
      setInProgress,
      username,
      status,
      user,
      setUser,
      navigate,
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
      navigate,
      setBottomBarText,
    );
  }

  return (
    <StyledOptionsTab>
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
          readOnly={user.username === 'Guest' ? true : undefined}
        />
        <label htmlFor="status-text">Text Status:</label>
        <textarea
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
          onKeyDown={disableEnter}
        />
        <span className="characters-left">{charactersLeft}</span>
      </form>
      <div className="buttons">
        <button form="options-form" type="submit">
          Save
        </button>
        <button onClick={handleNoStatusButtonClick}>No Status</button>
        <button onClick={() => navigate('/home')}>Close</button>
      </div>
    </StyledOptionsTab>
  );
}

export default OptionsTab;
