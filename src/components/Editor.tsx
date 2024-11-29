import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Updater } from 'use-immer';
import { sendMessage } from '../fetchers';
import { getPreviousPathname, useEmitTypingEvents } from '../helpers';
import {
  StyledEditor,
  StyledInputButtons,
  StyledInputField,
} from '../styles/ChatPage.styled';
import type { GroupChat, GroupChatMessage, Message, User } from '../types';
import Toolbar from './Toolbar';

type EditorProps = {
  loggedInUser: User;
  recipient: User | GroupChat;
  setMessages: Updater<Message[]> | Updater<GroupChatMessage[]>;
  isGroupChat?: boolean;
};

function Editor({
  loggedInUser,
  recipient,
  setMessages,
  isGroupChat = false,
}: EditorProps) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const inputFieldRef = useRef<HTMLDivElement>(null);
  const previousPathname = getPreviousPathname(state);

  // State for grabbing user chat message from input field
  const [text, setText] = useState('');
  // State for preventing multiple messages from being sent
  const [inProgress, setInProgress] = useState(false);

  // Clear input field and focus on it
  function clearInputField() {
    if (!inputFieldRef.current) return;
    inputFieldRef.current.innerHTML = '';
    setText('');
    inputFieldRef.current.focus();
  }

  // Make Enter send message
  // This also prevents sending messages containing <br> only
  function sendMessageOnEnter(event: React.KeyboardEvent<HTMLDivElement>) {
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
            return isGroupChat
              ? navigate('/home/group-chats')
              : navigate(previousPathname);
          }}
        >
          Close
        </button>
      </StyledInputButtons>
    </StyledEditor>
  );
}

export default Editor;
