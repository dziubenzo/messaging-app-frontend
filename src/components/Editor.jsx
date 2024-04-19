import PropTypes from 'prop-types';
import API_URL from '../API';
import {
  StyledEditor,
  StyledToolbar,
  StyledInputField,
  StyledInputButtons,
} from '../styles/ChatPage.styled';
import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { MdInsertEmoticon } from 'react-icons/md';
import { useRef, useState } from 'react';
import Emoticons from './Emoticons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Editor({ senderID, recipientID, setMessages }) {
  const navigate = useNavigate();
  const inputFieldRef = useRef(null);

  // States for grabbing user chat message and showing/hiding emoticons
  const [text, setText] = useState('');
  const [showEmoticons, setShowEmoticons] = useState(false);

  // Bold, italicise or underline selected text in input field
  function changeSelection(action) {
    document.execCommand(action, false, null);
  }

  // Add emoticon to the end of the input field
  function insertEmoticon(event) {
    // Move caret to the end of the input field
    const selection = window.getSelection();
    selection.selectAllChildren(inputFieldRef.current);
    selection.collapseToEnd();
    document.execCommand('insertImage', false, event.target.src);
    setShowEmoticons(false);
  }

  // Clear input field and focus on it
  function clearInputField() {
    inputFieldRef.current.innerHTML = '';
    setText('');
    inputFieldRef.current.focus();
  }

  // Make Enter do nothing
  // This prevents sending messages containing <br> only
  function disableEnter(event) {
    return event.key === 'Enter' && event.preventDefault();
  }

  // Send message if it is not empty and if it doesn't contain <br>, which gets created after using formatting options and then clearing input field manually
  // Clear input fields if operation successful
  async function sendMessage() {
    if (text === '<br>' || !text) {
      return;
    }
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
      toast.error('Sending message failed');
      return;
    }
    const newMessage = await res.json();
    setMessages((draft) => {
      draft.push(newMessage);
    });
    clearInputField();
    return toast.success('Message sent!');
  }

  return (
    <StyledEditor>
      <StyledToolbar>
        <FaBold
          title="Bold Selection"
          onMouseDown={() => changeSelection('bold')}
        />
        <FaItalic
          title="Italicise Selection"
          onMouseDown={() => changeSelection('italic')}
        />
        <FaUnderline
          title="Underline Selection"
          onMouseDown={() => changeSelection('underline')}
        />
        <div className="emoticons-wrapper">
          <MdInsertEmoticon
            title="Emoticons"
            onClick={() => setShowEmoticons(!showEmoticons)}
          />
          {showEmoticons && <Emoticons insertEmoticon={insertEmoticon} />}
        </div>
      </StyledToolbar>
      <StyledInputField
        ref={inputFieldRef}
        contentEditable
        onInput={(event) => setText(event.currentTarget.innerHTML)}
        onKeyDown={disableEnter}
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
