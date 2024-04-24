import PropTypes from 'prop-types';
import {
  StyledEditor,
  StyledInputField,
  StyledInputButtons,
} from '../styles/ChatPage.styled';
import { useRef, useState } from 'react';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../fetchers';
import { useEmitTypingEvents } from '../helpers';

function Editor({ loggedInUser, recipient, setMessages, isGroupChat = false }) {
  const navigate = useNavigate();
  const inputFieldRef = useRef(null);

  // State for grabbing user chat message from input field
  const [text, setText] = useState('');
  // State for preventing multiple messages from being sent
  const [inProgress, setInProgress] = useState(false);

  // Clear input field and focus on it
  function clearInputField() {
    inputFieldRef.current.innerHTML = '';
    setText('');
    inputFieldRef.current.focus();
  }

  // Make Enter send message
  // This also prevents sending messages containing <br> only
  function sendMessageOnEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendButtonClick();
    }
  }

  // Send message (DMs and group chats)
  function handleSendButtonClick() {
    sendMessage(
      text,
      inProgress,
      setInProgress,
      isGroupChat,
      loggedInUser,
      recipient,
      setMessages,
      clearInputField,
    );
  }

  // Emit events when a user is typing or cleared their input field
  useEmitTypingEvents(text, isGroupChat, recipient, loggedInUser);

  return (
    <StyledEditor>
      <Toolbar inputFieldRef={inputFieldRef} />
      <StyledInputField
        ref={inputFieldRef}
        contentEditable
        onInput={(event) => setText(event.currentTarget.innerHTML)}
        onKeyDown={sendMessageOnEnter}
      ></StyledInputField>
      <StyledInputButtons>
        <button onClick={handleSendButtonClick}>Send</button>
        <button onClick={clearInputField}>Clear</button>
        <button
          onClick={() => {
            isGroupChat ? navigate('/home/group-chats') : navigate('/home');
          }}
        >
          Close
        </button>
      </StyledInputButtons>
    </StyledEditor>
  );
}

Editor.propTypes = {
  loggedInUser: PropTypes.object,
  recipient: PropTypes.object,
  setMessages: PropTypes.func,
  isGroupChat: PropTypes.bool,
};

export default Editor;
