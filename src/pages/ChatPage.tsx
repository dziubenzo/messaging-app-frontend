import { useState } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Editor from '../components/Editor';
import Messages from '../components/Messages';
import { STATUS_ICONS } from '../constants';
import {
  getPreviousPathname,
  useUser
} from '../helpers';
import { useEventsChatPage } from '../socket';
import { StyledChatPage } from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { Message, User } from '../types';

function ChatPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPathname = getPreviousPathname(state);

  const {
    user,
    recipient: fetchedRecipient,
    messages: fetchedMessages,
  } = useUser();

  // States for messages
  const [messages, setMessages] = useImmer<Message[]>(fetchedMessages!);
  // State for managing chat recipient
  const [recipient, setRecipient] = useImmer<User>(fetchedRecipient!);

  // States for managing is typing indicator
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState<User['username']>('');

  // Manage events emitted by the server
  useEventsChatPage(
    user,
    recipient,
    setRecipient,
    setMessages,
    setSomeoneIsTyping,
    setTypingUsername,
  );

  return (
    <StyledChatPage>
      <StyledTopBar>
        <img src={STATUS_ICONS.message} alt="Message Icon" />
        <p>
          {recipient.username}
          {recipient.status_text ? ` (${recipient.status_text})` : undefined}
        </p>
        <button
          className="close-chat-btn"
          title="Close Chat"
          onClick={() => navigate(previousPathname)}
        >
          <LiaWindowCloseSolid />
        </button>
      </StyledTopBar>
      <Messages
        messages={messages}
        loggedInUser={user}
        someoneIsTyping={someoneIsTyping}
        typingUsername={typingUsername}
      />
      <Editor
        loggedInUser={user}
        recipient={recipient}
        setMessages={setMessages}
      />
    </StyledChatPage>
  );
}

export default ChatPage;
