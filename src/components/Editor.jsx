import PropTypes from 'prop-types';
import API_URL from '../API';
import {
  StyledEditor,
  StyledInputField,
  StyledInputButtons,
} from '../styles/ChatPage.styled';
import { useRef, useState } from 'react';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Editor({ senderID, recipientID, setMessages }) {
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
      sendMessage();
    }
  }

  // Send message if it is not empty and if it doesn't contain <br>, which gets created after using formatting options and then clearing input field manually
  // Clear input fields if operation successful
  async function sendMessage() {
    if (text === '<br>' || !text || inProgress) {
      return;
    }
    setInProgress(true);
    toast.info('Sending message...');
    const message = {
      sender: senderID,
      recipient: recipientID,
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
      toast.error('Sending message failed');
      return;
    }
    const newMessage = await res.json();
    setMessages((draft) => {
      draft.push(newMessage);
    });
    clearInputField();
    setInProgress(false);
    return toast.success('Message sent!');
  }

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
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearInputField}>Clear</button>
        <button onClick={() => navigate('/home')}>Close</button>
      </StyledInputButtons>
    </StyledEditor>
  );
}

Editor.propTypes = {
  senderID: PropTypes.string,
  recipientID: PropTypes.string,
  setMessages: PropTypes.func,
};

export default Editor;
