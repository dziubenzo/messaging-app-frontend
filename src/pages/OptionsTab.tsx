import { useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { clearTextStatus, updateUser } from '../fetchers';
import { getPreviousPathname } from '../helpers.js';
import { StyledOptionsTab } from '../styles/OptionsTab.styled.js';
import { OutletContext } from '../types.js';

const STATUS_CHARACTER_LIMIT = 70;

function OptionsTab() {
  const { user, setUser, setBottomBarText } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPathname = getPreviousPathname(state);

  const [username, setUsername] = useState(user.username);
  const [status, setStatus] = useState(user.status_text);
  const [charactersLeft, setCharactersLeft] = useState(
    STATUS_CHARACTER_LIMIT - user.status_text.length,
  );
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [inProgress, setInProgress] = useState(false);
  const [saveBtnText, setSaveBtnText] = useState('Save');
  const [noStatusBtnText, setNoStatusBtnText] = useState('No Status');

  // Disable Enter to prevent inserting new lines
  // Simulate Save button click to submit the form
  function submitForm(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (saveButtonRef.current) saveButtonRef.current.click();
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
      setSaveBtnText,
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
      setNoStatusBtnText,
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
          onKeyDown={submitForm}
        />
        <span className="characters-left">{charactersLeft}</span>
      </form>
      <div className="buttons">
        <button ref={saveButtonRef} form="options-form" type="submit">
          {saveBtnText}
        </button>
        <button onClick={handleNoStatusButtonClick}>{noStatusBtnText}</button>
        <button onClick={() => navigate(previousPathname)}>Close</button>
      </div>
    </StyledOptionsTab>
  );
}

export default OptionsTab;
