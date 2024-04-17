import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledOptions } from '../styles/HomePage.styled';
import { useOutletContext } from 'react-router-dom';

function Options({ showOptions, setShowOptions }) {
  const STATUS_CHARACTER_LIMIT = 70;

  const { user, setUser } = useOutletContext();

  const [username, setUsername] = useState(user.username);
  const [status, setStatus] = useState(user.status_text);
  const [charactersLeft, setCharactersLeft] = useState(
    STATUS_CHARACTER_LIMIT - user.status_text.length,
  );

  return (
    <StyledOptions>
      <form id="options-form" method="post">
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
};

export default Options;
